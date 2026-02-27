import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'survived',
  standalone: false,
})
export class SurvivedPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === 1) return 'survived';
    if (value === 0) return 'deceased';
    return '';
  }
}
