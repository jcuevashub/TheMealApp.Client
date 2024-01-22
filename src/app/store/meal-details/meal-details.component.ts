import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { StoreService } from '../store.service';
import { IMeal } from '../../shared/models/meal';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {
  meal?: IMeal;
  quantity = 1;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    ){}

  ngOnInit(): void {
    this.loadmeal();
  }

  loadmeal(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.storeService.getMealById(id).subscribe({
        next:(response) =>{
          this.meal = response;
          this.bcService.set('@mealDetails', response.name);
          }, error:(error)=>console.log(error)
      });
    }
  }


  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
  }

}
