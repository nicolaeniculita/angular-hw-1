import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  private currentPage: number = 1;
  private pageSize: number = 15;

  private readonly pageSubject = new BehaviorSubject<PassengerPage>(
    this.buildPage([...this.allPassengers]),
  );
  public readonly page$: Observable<PassengerPage> = this.pageSubject.asObservable();

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
    this.currentPage = page;
    this.emitState();
  }

  public setPageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
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

    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > totalPages) this.currentPage = totalPages;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    const passengers = viewData.slice(startIndex, endIndex);

    const fromIndex = totalItems === 0 ? 0 : startIndex + 1;
    const toIndex = totalItems === 0 ? 0 : startIndex + passengers.length;

    return {
      passengers,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalItems,
      totalPages,
      fromIndex,
      toIndex,
    };
  }
}
