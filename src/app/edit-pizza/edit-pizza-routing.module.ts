import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPizzaPage } from './edit-pizza.page';

const routes: Routes = [
  {
    path: '',
    component: EditPizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPizzaPageRoutingModule {}
