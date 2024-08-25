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

  it('should have correct styles applied to header, footer, and content', () => {
    const header = fixture.debugElement.query(By.css('header.app-header')).nativeElement as HTMLElement;
    const footer = fixture.debugElement.query(By.css('footer.app-footer')).nativeElement as HTMLElement;
    const content = fixture.debugElement.query(By.css('main.content')).nativeElement as HTMLElement;

    expect(getComputedStyle(header).backgroundColor).toBe('rgb(120, 120, 213)');

    expect(getComputedStyle(footer).backgroundColor).toBe('rgb(120, 120, 213)');

    expect(getComputedStyle(content).marginTop).toBe('80px');
    expect(getComputedStyle(content).marginBottom).toBe('80px');
    expect(getComputedStyle(content).flex).toBe('1 1 0%');
  });

  it('should include a router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
});
