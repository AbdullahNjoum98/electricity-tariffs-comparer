import { DisposableDirective } from './disposable.directive';

describe('DisposableDirective', () => {
  let directive: DisposableDirective;
  
  beforeEach(() => {
    directive = new DisposableDirective();
  });

  it('should trigger destroyed$ when ngOnDestroy is called', () => {
    const spy = spyOn(directive['destroyed$'], 'next');
    
    directive.ngOnDestroy();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should complete destroyed$ when ngOnDestroy is called', () => {
    const spy = spyOn(directive['destroyed$'], 'complete');
    
    directive.ngOnDestroy();
    
    expect(spy).toHaveBeenCalled();
  });
});

