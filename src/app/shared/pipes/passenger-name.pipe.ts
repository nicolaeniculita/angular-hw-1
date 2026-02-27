import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passengerName',
  standalone: false,
})
export class PassengerNamePipe implements PipeTransform {
  public transform(value: string | null): string {
    if (value === null) {
      return '';
    }

    const trimmedValue: string = value.trim();
    if (trimmedValue.length === 0) {
      return '';
    }

    const parts: string[] = trimmedValue.split(',');
    if (parts.length < 2) {

      return trimmedValue;
    }

    const lastName: string = parts[0].trim();
    const rest: string = parts.slice(1).join(',').trim();

    if (rest.length === 0) {
      return lastName;
    }

    return `${rest} ${lastName}`.replace(/\s+/g, ' ').trim();
  }
}