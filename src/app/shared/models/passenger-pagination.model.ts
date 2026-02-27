import { PassengerData } from './titanic-data.model';

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export interface PassengerPage {
  passengers: PassengerData[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  fromIndex: number;
  toIndex: number;
}
