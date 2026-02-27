import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex',
  standalone: false,
})
export class SexPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '-';
    if (value === 'male') return 'Male';
    if (value === 'female') return 'Female';
    return value;
  }
}
