import { Component, inject } from '@angular/core';

import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-passenger-table',
  templateUrl: './passenger-table.component.html',
  styleUrls: ['./passenger-table.component.scss'],
  standalone: false,
})
export class PassengerTableComponent {
  public readonly passengersService = inject(PassengersService);
  public readonly page$ = this.passengersService.page$;
  public readonly sortState$ = this.passengersService.sortState$;
}
