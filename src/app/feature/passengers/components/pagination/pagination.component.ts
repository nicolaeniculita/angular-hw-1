import { Component, Input } from '@angular/core';
import { PassengerPage } from '../../../../shared/models/passenger-pagination.model';
import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false,
})
export class PaginationComponent {
  @Input() public page!: PassengerPage;

  public constructor(private readonly passengersService: PassengersService) {}

  public goToPage(pageNumber: number): void {
    this.passengersService.setPage(pageNumber);
  }

  public prev(): void {
    if (this.page.currentPage <= 1) {
      return;
    }
    this.goToPage(this.page.currentPage - 1);
  }

  public next(): void {
    if (this.page.currentPage >= this.page.totalPages) {
      return;
    }
    this.goToPage(this.page.currentPage + 1);
  }

  public first(): void {
    if (this.page.currentPage === 1) {
      return;
    }
    this.passengersService.setPage(1);
  }

  public last(): void {
    if (this.page.currentPage === this.page.totalPages) {
      return;
    }
    this.passengersService.setPage(this.page.totalPages);
  }

  public getWindowPages(): number[] {
    const totalPages: number = this.page.totalPages;
    const current: number = this.page.currentPage;

    const windowSize: number = 5;
    const half: number = Math.floor(windowSize / 2);

    let start: number = current - half;
    let end: number = current + half;

    if (start < 1) {
      start = 1;
      end = Math.min(windowSize, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - windowSize + 1);
    }

    const pages: number[] = [];
    for (let p = start; p <= end; p++) {
      pages.push(p);
    }

    return pages;
  }

  public isFirstPage(): boolean {
    return this.page.currentPage === 1;
  }

  public isLastPage(): boolean {
    return this.page.currentPage === this.page.totalPages;
  }
}
