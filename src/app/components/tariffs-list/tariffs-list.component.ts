import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ItemsListComponent } from '../../shared/components/items-list/items-list.component';
import { ItemListConfiguration } from '../../shared/models/item-list-configuration.model';
import { TariffItemModel } from '../../models/tariff-item.model';
import { TariffsDataService } from '../../services/tariffs-data.service';
import { takeUntil } from 'rxjs';
import { DisposableDirective } from '../../shared/directives/disposable.directive';
import { ObjectKeysPipe } from '../../shared/pipes/object-keys.pipe';
import { GenericButtonComponent } from "../../shared/components/generic-button/generic-button.component";
import { Router, RouterModule } from '@angular/router';

const ITEMS_SELECTION_LIMIT = 3;
@Component({
  selector: 'app-tariffs-list',
  standalone: true,
  imports: [RouterModule, ItemsListComponent, GenericButtonComponent],
  providers: [TariffsDataService, ObjectKeysPipe],
  templateUrl: './tariffs-list.component.html',
  styleUrl: './tariffs-list.component.scss'
})
export class TariffsListComponent extends DisposableDirective implements OnInit {
  listConfig!: ItemListConfiguration<TariffItemModel>;
  selectedItems = new Set<TariffItemModel>();
  
  ngOnInit(): void {
    this.dataService.getAll().pipe(takeUntil(this.destroyed$)).subscribe(data => this.updateListConfig(data));
  }

  updateListConfig(data: TariffItemModel[]): void {
    this.listConfig = {
      title: 'Electricity Tariffs List',
      data,
      headers: this.getHeaders(data),
      sortFields: ['price'],
      actions: [
        {
          action: 'Add',
          callback: this.getActionCallback.bind(this),
          disabled: (item: TariffItemModel) => this.selectedItems.size >= ITEMS_SELECTION_LIMIT || this.selectedItems.has(item)
        },
        {
          action: 'Remove',
          callback: this.getActionCallback.bind(this),
          disabled: (item: TariffItemModel) => !this.selectedItems.has(item)
        }
      ] 
    };
  }

  getHeaders(data: TariffItemModel[]): Set<string> {
    if (!data.length) return new Set<string>();
    const headers = this.objectKeysPipe.transform(data[0]);
    return new Set<string>(headers);
  }

  getActionCallback(action: string, item: TariffItemModel) {
    if (action === 'Add')
      this.selectedItems.add(item);
    else if (action === 'Remove')
      this.selectedItems.delete(item);
    else
      throw new Error('Unsupported Action');

    this.updateListConfig(this.listConfig.data);
  }

  resetClick(): void {
    this.selectedItems.clear();
    this.updateListConfig(this.listConfig.data);
  }

  compareClick(): void {
    this.router.navigate(['/compare'], {
      state: {
        data: Array.from(this.selectedItems),
        headers: Array.from(this.listConfig.headers),
      }
    })
  }

  constructor(
    private readonly dataService: TariffsDataService,
    private readonly objectKeysPipe: ObjectKeysPipe,
    private readonly router: Router
  ) {
    super();
  }
}
