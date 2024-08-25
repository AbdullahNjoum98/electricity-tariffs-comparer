import { Component } from '@angular/core';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterModule, GenericButtonComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  goHome(): void {
    this.router.navigate(['/']);
  }
  
  constructor(private readonly router: Router) {}
}
