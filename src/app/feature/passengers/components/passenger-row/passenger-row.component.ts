import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerData } from '../../../../shared/models/titanic-data.model';

@Component({
  selector: '[app-passenger-row]',
  templateUrl: './passenger-row.component.html',
  styleUrls: ['./passenger-row.component.scss'],
  standalone: false,
  host: {
    '(click)': 'onRowClick()',
  },
})
export class PassengerRowComponent {
  @Input() public passenger!: PassengerData;

  constructor(private readonly router: Router) {}

  public onRowClick(): void {
    this.router.navigate(['/passengers', this.passenger.passengerId]);
  }
}