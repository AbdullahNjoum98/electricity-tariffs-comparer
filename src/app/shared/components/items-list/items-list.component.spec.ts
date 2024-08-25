import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ObjectKeysPipe } from '../../pipes/object-keys.pipe';
import { GenericButtonComponent } from '../generic-button/generic-button.component';
import { ItemsListComponent } from './items-list.component';
import { ArraysHelper } from '../../utils/arrays-helper';
import { SortDirection } from '../../models/sort-direction';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent<any>;
  let fixture: ComponentFixture<ItemsListComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, GenericButtonComponent, ItemsListComponent],
      providers: [ObjectKeysPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization and Data Validation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should throw an error if "id" is not in headers', () => {
      component.listConfig = {
        title: 'title',
        headers: new Set(['name', 'age']),
        data: [{ id: 1, name: 'John', age: 30 }],
        sortFields: [],
        actions: [],
      };
      expect(() => component.ngOnInit()).toThrowError('"id" must be presented in passed headers array');
    });

    it('should throw an error if the number of headers does not match the data columns', () => {
      component.listConfig = {
        title: 'title',
        headers: new Set(['id', 'name']),
        data: [{ id: 1, name: 'John', age: 30 }],
        sortFields: [],
        actions: [],
      };
      expect(() => component.ngOnInit()).toThrowError('Count of headers must be equal to count of data columns');
    });

    it('should correctly initialize keys and sort data in desc order on init', () => {
      component.listConfig = {
        title: 'title',
        headers: new Set(['id', 'name', 'age']),
        data: [{ id: 1, name: 'John', age: 30 }, { id: 2, name: 'Jane', age: 25 }],
        sortFields: ['age'],
        actions: [],
      };
      component.ngOnInit();
      expect(component.keys).toEqual(['id', 'name', 'age']);
      expect(component.fieldsSortDirection['age']).toBe('desc');
      expect(component.listConfig.data[0].age).toBe(30);
    });
  });

  describe('Sorting Functionality', () => {
    beforeEach(() => {
      component.listConfig = {
        title: 'title',
        headers: new Set(['id', 'name', 'age']),
        data: [{ id: 1, name: 'John', age: 30 }, { id: 2, name: 'Jane', age: 25 }],
        sortFields: ['age'],
        actions: [],
      };
      component.ngOnInit();
    });

    it('should return true if a field is sortable', () => {
      expect(component.isFieldSortable('age')).toBeTrue();
      expect(component.isFieldSortable('name')).toBeFalse();
    });

    it('should switch sort direction correctly', () => {
      component.switchSortDirection('age');
      expect(component.fieldsSortDirection['age']).toBe('asc');
      expect(component.listConfig.data[0].age).toBe(25);
    });

    it('should sort data in ascending and descending order', () => {
      component.switchSortDirection('age');
      expect(component.listConfig.data[0].age).toBe(25);
      component.switchSortDirection('age');
      expect(component.listConfig.data[0].age).toBe(30);
    });
  });

  describe('UI Interaction', () => {
    beforeEach(() => {
      component.listConfig = {
        title: 'title',
        headers: new Set(['id', 'name', 'age']),
        data: [{ id: 1, name: 'John', age: 30 }, { id: 2, name: 'Jane', age: 25 }],
        sortFields: ['age'],
        actions: [
          { action: 'Add', callback: jasmine.createSpy('addSpy') },
          { action: 'Delete', callback: jasmine.createSpy('deleteSpy') },
        ],
      };
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should display the correct title', () => {
      const title = fixture.nativeElement.querySelector('header');
      expect(title.textContent).toBe('title');
    });

    it('should display the correct headers and actions', () => {
      const headers = fixture.nativeElement.querySelectorAll('thead th');
      expect(headers.length).toBe(5);
      expect(headers[0].textContent).toContain('No');
      expect(headers[1].textContent).toContain('Name');
      expect(headers[2].textContent).toContain('Age');
      expect(headers[3].textContent).toContain('Add');
      expect(headers[4].textContent).toContain('Delete');
    });

    it('should display the correct data rows', () => {
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(2);

      const firstRowCells = rows[0].querySelectorAll('td');
      expect(firstRowCells[1].textContent).toContain('John');
      expect(firstRowCells[2].textContent).toContain('30');
    });
  });

  describe('getCompareFn method', () => {
    it('should return a comparison function from getCompareFn', () => {
      const field = 'name';
      const sortDirection: SortDirection = 'asc';
      const compareFn = component.getCompareFn(field, sortDirection);
  
      expect(typeof compareFn).toBe('function');
    });
  
    it('should call compare with correct arguments for asc direction', () => {
      const field = 'name';
      const sortDirection: SortDirection = 'asc';
      const compareFn = component.getCompareFn(field, sortDirection);
  
      const spyCompare = spyOn(ArraysHelper, 'compare');
      const itemA = { [field]: 'Apple' };
      const itemB = { [field]: 'Banana' };
  
      compareFn(itemA, itemB);
  
      expect(spyCompare).toHaveBeenCalledWith(itemA[field], itemB[field], sortDirection);
    });
  
    it('should call compare with correct arguments for desc direction', () => {
      const field = 'age';
      const sortDirection: SortDirection = 'desc';
      const compareFn = component.getCompareFn(field, sortDirection);
  
      const spyCompare = spyOn(ArraysHelper, 'compare');
      const itemA = { [field]: 30 };
      const itemB = { [field]: 25 };
  
      compareFn(itemA, itemB);
  
      expect(spyCompare).toHaveBeenCalledWith(itemA[field], itemB[field], sortDirection);
    });
  });
});
