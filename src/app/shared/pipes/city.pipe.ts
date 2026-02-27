import { Pipe, PipeTransform } from '@angular/core';

type EmbarkedCode = 'S' | 'C' | 'Q';

@Pipe({
  name: 'city',
  standalone: false,
})
export class CityPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const code = (value ?? '').toUpperCase() as EmbarkedCode;

    switch (code) {
      case 'S':
        return 'Southhampton';
      case 'C':
        return 'Cherbourg';
      case 'Q':
        return 'Queenstown';
      default:
        return '';
    }
  }
}