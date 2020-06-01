import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../providers/pizza-service/pizza-service';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';
import {RouterModule} from '@angular/router';
import { DetailsPage } from './details.page';
import { HttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule
    RouterModule.forChild([
          {
            path: '',
            component: LoginPage
          }
        ])
  ],
  declarations: [DetailsPage],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

      providers: [PizzaService,HttpClient]

})
export class DetailsPageModule {}
