import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './feature/passengers/components/header/header.component';
import { PassengerTableComponent } from './feature/passengers/components/passenger-table/passenger-table.component';
import { PassengerRowComponent } from './feature/passengers/components/passenger-row/passenger-row.component';
import { SurvivedPipe } from './shared/pipes/survived.pipe';
import { SexPipe } from './shared/pipes/sex.pipe';
import { CityPipe } from './shared/pipes/city.pipe';
import { PassengerNameHeaderComponent } from './feature/passengers/components/passenger-name-header/passenger-name-header.component';
import { PassengerDetailsComponent } from './feature/passengers/pages/passenger-details/passenger-details.component';
import { PassengerNamePipe } from './shared/pipes/passenger-name.pipe';
import { PaginationComponent } from './feature/passengers/components/pagination/pagination.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PassengerTableComponent,
    PassengerRowComponent,
    SurvivedPipe,
    SexPipe,
    CityPipe,
    PassengerNameHeaderComponent,
    PassengerDetailsComponent,
    PassengerNamePipe,
    PaginationComponent

  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
