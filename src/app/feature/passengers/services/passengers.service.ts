import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { PassengerData } from '../../../shared/models/titanic-data.model';
import { TITANIC_PASSENGERS } from '../../../shared/titanic-data';
import { PassengerPage } from '../../../shared/models/passenger-pagination.model';
import { NameSort } from './name-sort.type';

@Injectable({
  providedIn: 'root',
})
export class PassengersService {
  private readonly allPassengers: PassengerData[] = TITANIC_PASSENGERS;

  private readonly sortStateSubject = new BehaviorSubject<NameSort>('NONE');
  public readonly sortState$: Observable<NameSort> = this.sortStateSubject.asObservable();

  private readonly tableDataSubject = new BehaviorSubject<PassengerData[]>([]);
  public readonly tableData$: Observable<PassengerData[]> = this.tableDataSubject.asObservable();

  private readonly currentPageSubject = new BehaviorSubject<number>(1);
  public readonly currentPage$: Observable<number> = this.currentPageSubject.asObservable();

  private pageSize: number = 15;

  private readonly pageSubject = new BehaviorSubject<PassengerPage>(
    this.buildPage([...this.allPassengers]),
  );
  public readonly page$: Observable<PassengerPage> = this.pageSubject.asObservable();

  public readonly paginationUi$: Observable<PaginationUi> = this.page$.pipe(
    map((page) => this.buildPaginationUi(page.currentPage, page.totalPages, 5)),
  );

  public readonly isFirstPage$: Observable<boolean> = this.page$.pipe(
    map((page) => page.currentPage === 1),
  );

  public readonly isLastPage$: Observable<boolean> = this.page$.pipe(
    map((page) => page.currentPage === page.totalPages),
  );

 
  public readonly canGoPrev$: Observable<boolean> = this.page$.pipe(
    map((page) => page.currentPage > 1),
  );

  public readonly canGoNext$: Observable<boolean> = this.page$.pipe(
    map((page) => page.currentPage < page.totalPages),
  );

  constructor() {
    this.emitState();
  }

  public toggleNameSort(): void {
    const current = this.sortStateSubject.value;
    const next: NameSort = current === 'NONE' ? 'ASC' : current === 'ASC' ? 'DESC' : 'NONE';

    this.sortStateSubject.next(next);
    this.emitState();
  }

  public getPassengerById(id: number): PassengerData | undefined {
    return this.allPassengers.find((p) => p.passengerId === id);
  }

  public setPage(page: number): void {
    this.currentPageSubject.next(page);
    this.emitState();
  }

  public nextPage(): void {
    const current = this.currentPageSubject.value;
    const totalPages = this.pageSubject.value.totalPages;
    if (current >= totalPages) {
      return;
    }

    this.currentPageSubject.next(current + 1);
    this.emitState();
  }

  public previousPage(): void {
    const current = this.currentPageSubject.value;
    if (current <= 1) {
      return;
    }

    this.currentPageSubject.next(current - 1);
    this.emitState();
  }

  public firstPage(): void {
    if (this.currentPageSubject.value === 1) {
      return;
    }

    this.currentPageSubject.next(1);
    this.emitState();
  }

  public lastPage(): void {
    const last = this.pageSubject.value.totalPages;
    if (this.currentPageSubject.value === last) {
      return;
    }

    this.currentPageSubject.next(last);
    this.emitState();
  }

  public setPageSize(size: number): void {
    this.pageSize = size;
    this.currentPageSubject.next(1);
    this.emitState();
  }

  private emitState(): void {
    const viewData = this.getViewData();
    this.tableDataSubject.next(viewData);
    this.pageSubject.next(this.buildPage(viewData));
  }

  private getViewData(): PassengerData[] {
    const state = this.sortStateSubject.value;

    if (state === 'NONE') {
      return [...this.allPassengers];
    }

    const copy = [...this.allPassengers];
    copy.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return state === 'ASC' ? cmp : -cmp;
    });

    return copy;
  }

  private buildPage(viewData: PassengerData[]): PassengerPage {
    const totalItems = viewData.length;
    const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / this.pageSize);

    const currentPage = this.currentPageSubject.value;
    const clampedPage = Math.min(Math.max(currentPage, 1), totalPages);
    if (clampedPage !== currentPage) {
      this.currentPageSubject.next(clampedPage);
    }

    const startIndex = (clampedPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    const passengers = viewData.slice(startIndex, endIndex);

    const fromIndex = totalItems === 0 ? 0 : startIndex + 1;
    const toIndex = totalItems === 0 ? 0 : startIndex + passengers.length;

    return {
      passengers,
      currentPage: clampedPage,
      pageSize: this.pageSize,
      totalItems,
      totalPages,
      fromIndex,
      toIndex,
    };
  }

  private buildPaginationUi(
    currentPage: number,
    totalPages: number,
    windowSize: number,
  ): PaginationUi {
    const safeWindowSize = Math.max(1, windowSize);
    const half = Math.floor(safeWindowSize / 2);

    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(safeWindowSize, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - safeWindowSize + 1);
    }

    const pages: number[] = [];
    for (let p = start; p <= end; p++) {
      pages.push(p);
    }

    const showFirstPage = start > 1;
    const showLastPage = end < totalPages;
    const showLeftEllipsis = start > 2;
    const showRightEllipsis = end < totalPages - 1;

    return {
      pages,
      showFirstPage,
      showLastPage,
      showLeftEllipsis,
      showRightEllipsis,
      firstPage: 1,
      lastPage: totalPages,
    };
  }
}

export type PaginationUi = {
  pages: number[];
  showFirstPage: boolean;
  showLastPage: boolean;
  showLeftEllipsis: boolean;
  showRightEllipsis: boolean;
  firstPage: number;
  lastPage: number;
};
