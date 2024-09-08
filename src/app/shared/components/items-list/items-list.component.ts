import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ItemListConfiguration } from '../../models/item-list-configuration.model';
import { SortDirection } from '../../models/sort-direction';
import { ObjectKeysPipe } from '../../pipes/object-keys.pipe';
import { ArraysHelper } from '../../utils/arrays-helper';
import { GenericButtonComponent } from "../generic-button/generic-button.component";

@Component({
  selector: 'app-items-list[listConfig]',
  standalone: true,
  imports: [CommonModule, GenericButtonComponent],
  providers: [ObjectKeysPipe],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent<T extends Record<string, any>> implements OnInit {
  @Input() listConfig!: ItemListConfiguration<T>;
  keys: Array<keyof T> = [];
  fieldsSortDirection: {[key: string]: SortDirection } = {};

  ngOnInit(): void {
    this.keys = this.getKeysOfTArray();
    this.validateInputData();
    this.listConfig.sortFields?.forEach(field => {
      this.fieldsSortDirection[field] = 'desc';
      this.listConfig.data.sort(this.getCompareFn(field, 'desc'));
    });
  }

  getKeysOfTArray(): Array<keyof T> {
      return this.listConfig.data.length ?
        this.objectKeysPipe.transform(this.listConfig.data[0]) : [];
  }

  validateInputData(): void | never {
    if (this.listConfig.headers.size && !this.listConfig.headers.has('id')) 
      throw new Error('"id" must be presented in passed headers array');
    if (this.keys.length !== this.listConfig.headers.size) 
      throw new Error('Count of headers must be equal to count of data columns');
    if (this.listConfig.sortFields?.some(sortField => !this.listConfig.headers.has(sortField)))
      throw new Error('Invalid sort column/s');
  }

  isFieldSortable(field: string): boolean {
    if (!this.listConfig.sortFields || !this.listConfig.sortFields.length) return false;
    return this.listConfig.sortFields.includes(field);
  }

  switchSortDirection(field: string): void {
    if (!this.fieldsSortDirection[field]) return;
    this.fieldsSortDirection[field] = this.fieldsSortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.listConfig.data.sort(this.getCompareFn(field, this.fieldsSortDirection[field]));
  }

  getCompareFn<T extends Record<string, any>>(field:string, sort: SortDirection): (a: T, b: T) => number {
    return ((a: T, b: T): number => {
      const aValue = a[field];
      const bValue = b[field];
      return ArraysHelper.compare(aValue, bValue, sort);
    });
  }

  constructor(private readonly objectKeysPipe: ObjectKeysPipe) {}
}