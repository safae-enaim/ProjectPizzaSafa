import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../providers/pizza-service/pizza-service';
import { HttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdministrationPageRoutingModule } from './administration-routing.module';

import { AdministrationPage } from './administration.page';

@NgModule({
  imports: [
  RouterModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrationPageRoutingModule
  ],
  declarations: [AdministrationPage],

      providers: [PizzaService,HttpClient]

})
export class AdministrationPageModule {}
