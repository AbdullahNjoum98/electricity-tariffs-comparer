import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffsCompareComponent } from './tariffs-compare.component';
import { ItemsListComponent } from '../../shared/components/items-list/items-list.component';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('TariffsCompareComponent', () => {
  let component: TariffsCompareComponent;
  let fixture: ComponentFixture<TariffsCompareComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffsCompareComponent, RouterModule.forRoot([]), ItemsListComponent, GenericButtonComponent],
      providers: [
        { provide: Location, useValue: { back: jasmine.createSpy('back') } },
        { provide: Router, useValue: { getCurrentNavigation: () => ({ extras: { state: { data: [], headers: new Set() } } }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TariffsCompareComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize listConfig correctly on ngOnInit', () => {
    component.ngOnInit();
    expect(component.listConfig).toEqual({
      title: 'Electricity Tariffs Comparison',
      data: [],
      headers: new Set<string>()
    });
  });

  it('should call location.back on backClick', () => {
    component.backClick();
    expect(location.back).toHaveBeenCalled();
  });

  it('should render ItemsListComponent with correct inputs', () => {
    const itemsListComponent = fixture.debugElement.query(By.directive(ItemsListComponent));
    expect(itemsListComponent).toBeTruthy();
    expect(itemsListComponent.componentInstance.listConfig).toEqual({
      title: 'Electricity Tariffs Comparison',
      data: [],
      headers: new Set<string>()
    });
  });

  it('should render GenericButtonComponent with correct attributes', () => {
    const genericButton = fixture.debugElement.query(By.directive(GenericButtonComponent));
    expect(genericButton).toBeTruthy();
    const buttonComponent = genericButton.componentInstance as GenericButtonComponent;
    expect(buttonComponent.action).toBe('Back');
    expect(buttonComponent.size).toBe('large');
    expect(buttonComponent.type).toBe('secondary');
  });
});
