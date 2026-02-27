import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PassengerTableComponent } from './feature/passengers/components/passenger-table/passenger-table.component';
import { PassengerDetailsComponent } from './feature/passengers/pages/passenger-details/passenger-details.component';

const routes: Routes = [
  { path: '', component: PassengerTableComponent },
  { path: 'passengers/:id', component: PassengerDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
