import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TariffItemModel } from '../../models/tariff-item.model';
import { TariffsDataService } from '../../services/tariffs-data.service';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { ItemsListComponent } from '../../shared/components/items-list/items-list.component';
import { ItemListConfiguration } from '../../shared/models/item-list-configuration.model';
import { ObjectKeysPipe } from '../../shared/pipes/object-keys.pipe';
import { TariffsListComponent } from './tariffs-list.component';

const mockData = [{ price: 100 } as TariffItemModel];

describe('TariffsListComponent', () => {
  let component: TariffsListComponent;
  let fixture: ComponentFixture<TariffsListComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDataService: jasmine.SpyObj<TariffsDataService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDataService = jasmine.createSpyObj('TariffsDataService', ['getAll']);
    
    // Configure TestBed
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        TariffsListComponent
      ],
      providers: [
        { provide: TariffsDataService, useValue: mockDataService },
        ObjectKeysPipe,
        { provide: Router, useValue: mockRouter },
        ItemsListComponent,
        GenericButtonComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffsListComponent);
    component = fixture.componentInstance;
    mockDataService.getAll.and.returnValue(of(mockData));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update listConfig with received data', () => {
    component.updateListConfig(mockData);
    expect(component.listConfig).toBeDefined();
    expect(component.listConfig.data).toEqual(mockData);
    expect(component.listConfig.headers.size).toBeGreaterThan(0);
  });

  it('should add item to selectedItems when getActionCallback is called with "Add"', () => {
    const item = { price: 100 } as TariffItemModel;
    component.getActionCallback('Add', item);
    expect(component.selectedItems.has(item)).toBeTrue();
  });

  it('should delete item from selectedItems when getActionCallback is called with "Delete"', () => {
    const item = { price: 100 } as TariffItemModel;
    component.selectedItems.add(item);
    component.getActionCallback('Delete', item);
    expect(component.selectedItems.has(item)).toBeFalse();
  });

  it('should clear selectedItems when resetClick is called', () => {
    component.selectedItems.add({ price: 100 } as TariffItemModel);
    fixture.detectChanges();
    component.resetClick();
    expect(component.selectedItems.size).toBe(0);
  });

  it('should navigate to /compare with correct state when compareClick is called', () => {
    component.selectedItems.add({ price: 100 } as TariffItemModel);
    component.listConfig = { 
      title: 'Test', 
      data: Array.from(component.selectedItems), 
      headers: new Set(['Header1']), 
      sortFields: [], 
      actions: [] 
    } as ItemListConfiguration<TariffItemModel>;
    fixture.detectChanges();
    component.compareClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/compare'], {
      state: {
        data: Array.from(component.selectedItems),
        headers: Array.from(component.listConfig.headers),
      }
    });
  });

  it('should disable Compare button when no items are selected', () => {
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.directive(GenericButtonComponent));
    const compareButton = buttons.find(button => button.attributes['action'] === 'Compare!');
    expect(compareButton!.componentInstance.disabled).toBeTrue();
  });

  it('should enable Compare button when items are selected', () => {
    component.selectedItems.add({ price: 100 } as TariffItemModel);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.directive(GenericButtonComponent));
    const compareButton = buttons.find(button => button.attributes['action'] === 'Compare!');
    expect(compareButton!.componentInstance.disabled).toBeFalse();
  });
});
