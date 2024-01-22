import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';

const routes:Routes = [
  {path:'', component: StoreComponent},
  {path:':id', component: MealDetailsComponent, data:{breadcrumb:{alias:'mealDetails'}}}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class StoreRoutingModule { }
