import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealItemsComponent } from './meal-items/meal-items.component';


@NgModule({
  declarations: [
    StoreComponent,
    MealItemsComponent,
    MealDetailsComponent
  ],
  imports: [
    CommonModule,
    // SharedModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
