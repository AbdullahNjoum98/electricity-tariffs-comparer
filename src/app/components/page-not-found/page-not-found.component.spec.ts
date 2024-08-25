import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent, RouterTestingModule, GenericButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct HTML structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.error-container')).toBeTruthy();
    expect(compiled.querySelector('header h1')!.textContent).toContain('404');
    expect(compiled.querySelector('header h2')!.textContent).toContain('Page Not Found');
    expect(compiled.querySelector('main p')!.textContent).toContain('Sorry, the page you are looking for does not exist.');
  });

  it('should navigate to home on goHome', () => {
    spyOn(router, 'navigate');
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
