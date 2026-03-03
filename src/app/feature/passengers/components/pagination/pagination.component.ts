import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PassengerPage } from '../../../../shared/models/passenger-pagination.model';
import { PassengersService } from '../../services/passengers.service';
import { PaginationUi } from '../../services/passengers.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false,
})
export class PaginationComponent {

  private readonly passengersService = inject(PassengersService);

  public readonly page$: Observable<PassengerPage> = this.passengersService.page$;
  public readonly paginationUi$: Observable<PaginationUi> = this.passengersService.paginationUi$;

  public readonly canGoPrev$: Observable<boolean> = this.passengersService.canGoPrev$;
  public readonly canGoNext$: Observable<boolean> = this.passengersService.canGoNext$;

  public goToPage(pageNumber: number): void {
    this.passengersService.setPage(pageNumber);
  }

  public prev(): void {
    this.passengersService.previousPage();
  }

  public next(): void {
    this.passengersService.nextPage();
  }

  public first(): void {
    this.passengersService.firstPage();
  }

  public last(): void {
    this.passengersService.lastPage();
  }

}
