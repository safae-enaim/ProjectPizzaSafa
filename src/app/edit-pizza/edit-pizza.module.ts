import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditPizzaPageRoutingModule } from "./edit-pizza-routing.module";

import { EditPizzaPage } from "./edit-pizza.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPizzaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditPizzaPage],
})
export class EditPizzaPageModule {}
