import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ItemsListComponent } from '../../shared/components/items-list/items-list.component';
import { ItemListConfiguration } from '../../shared/models/item-list-configuration.model';
import { TariffItemModel } from '../../models/tariff-item.model';
import { Router, RouterModule } from '@angular/router';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tariffs-compare',
  standalone: true,
  imports: [RouterModule, ItemsListComponent, GenericButtonComponent],
  templateUrl: './tariffs-compare.component.html',
  styleUrl: './tariffs-compare.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TariffsCompareComponent implements OnInit {
  listConfig!: ItemListConfiguration<TariffItemModel>;
  navigationState: { data: TariffItemModel[], headers: Set<string> } | undefined;
  
  ngOnInit(): void {
    const headers = this.navigationState?.headers ? new Set<string>(this.navigationState.headers) : new Set<string>();
    this.listConfig = {
      title: 'Electricity Tariffs Comparison',
      data: this.navigationState?.data ?? [],
      headers
    };
  }

  backClick(): void {
    this.location.back();
  }

  constructor(private readonly router: Router, private readonly location: Location) {
    this.navigationState = this.router.getCurrentNavigation()?.extras.state as { data: TariffItemModel[], headers: Set<string> } | undefined;
  }
}
