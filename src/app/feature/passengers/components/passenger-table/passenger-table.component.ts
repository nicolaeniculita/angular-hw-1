import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PassengerData } from '../../../../shared/models/titanic-data.model';
import { PassengersService } from '../../services/passengers.service';
import { NameSort } from '../../services/name-sort.type';
import { PassengerPage } from '../../../../shared/models/passenger-pagination.model';

@Component({
  selector: 'app-passenger-table',
  // imports: [],
  templateUrl: './passenger-table.component.html',
  styleUrl: './passenger-table.component.scss',
  standalone: false,
})
export class PassengerTableComponent implements OnInit, OnDestroy {
  public sortState: NameSort = 'NONE';

  public page!: PassengerPage;

  private sortSub?: Subscription;
  private pageSub?: Subscription;

  constructor(public readonly passengersService: PassengersService) {}

  public onNameHeaderClick(): void {
    this.passengersService.toggleNameSort();
  }

  public ngOnInit(): void {
    this.pageSub = this.passengersService.page$.subscribe((page) => {
      this.page = page;
    });

    this.sortSub = this.passengersService.sortState$.subscribe((state) => {
      this.sortState = state;
    });
  }

  public ngOnDestroy(): void {
    this.pageSub?.unsubscribe();
    this.sortSub?.unsubscribe();
  }
}
