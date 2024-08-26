import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: object): string[] {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.keys(value);
    }
    console.warn('The provided object\'s keys can\'t be extracted:', value);
    return [];
  }
}
