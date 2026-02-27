import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassengersService } from '../../services/passengers.service';
import { PassengerData } from '../../../../shared/models/titanic-data.model';

@Component({
  selector: 'app-passenger-details',
  // imports: [],
  templateUrl: './passenger-details.component.html',
  styleUrl: './passenger-details.component.scss',
  standalone: false,
})
export class PassengerDetailsComponent implements OnInit {
  public passenger?: PassengerData;

constructor(
  private readonly route: ActivatedRoute,
  private readonly passengersService: PassengersService
) {}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.passenger = this.passengersService.getPassengerById(id);
}
}
