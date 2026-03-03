import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
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

import { SidebarComponent } from './feature/navigation/components/sidebar/sidebar.component';
import { StatisticsOverviewComponent } from './feature/statistics/pages/statistics-overview/statistics-overview.component';
import { CustomStatisticComponent } from './feature/statistics/components/custom-statistic/custom-statistic.component';

const routes: Routes = [
  { path: 'table', component: PassengerTableComponent },
  { path: 'passengers/:id', component: PassengerDetailsComponent },
  { path: 'statistics', component: StatisticsOverviewComponent },
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: '**', redirectTo: 'table' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PassengerTableComponent,
    PassengerRowComponent,
    SurvivedPipe,
    SexPipe,
    CityPipe,
    PassengerNameHeaderComponent,
    PassengerDetailsComponent,
    PassengerNamePipe,
    PaginationComponent,
    StatisticsOverviewComponent,
    CustomStatisticComponent,

  ],
  imports: [BrowserModule, CommonModule, RouterModule.forRoot(routes)],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
