import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  standalone: true
})
export class DisposableDirective implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
