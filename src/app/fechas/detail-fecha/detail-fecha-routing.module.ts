import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailFechaPage } from './detail-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailFechaPageRoutingModule {}
