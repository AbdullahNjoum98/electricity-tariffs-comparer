import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { TariffsListComponent } from './components/tariffs-list/tariffs-list.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet, TariffsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render content section', () => {
    const content = fixture.debugElement.query(By.css('main.content'));

    expect(content).toBeTruthy();
  });

  it('should have correct styles applied to content', () => {
    const content = fixture.debugElement.query(By.css('main.content')).nativeElement as HTMLElement;


    expect(getComputedStyle(content).height).toBe('64px');
    expect(getComputedStyle(content).backgroundColor).toBe('rgb(255, 255, 255)');
    expect(getComputedStyle(content).padding).toBe('32px');
  });

  it('should include a router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
});
