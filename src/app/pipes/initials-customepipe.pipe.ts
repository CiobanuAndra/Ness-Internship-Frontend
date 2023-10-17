import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialsCustomepipe'
})
export class InitialsCustomepipePipe implements PipeTransform {
  transformedValue: string | undefined;
  transform(value: string): any {
    this.transformedValue= value.split(' ').map((word: string)=>word.charAt(0)).join('').toUpperCase();
    return this.transformedValue;
  }
}
