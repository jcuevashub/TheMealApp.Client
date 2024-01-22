import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StoreParams } from '../shared/models/storeParams';
import { ICategory } from '../shared/models/category';
import { StoreService } from '../core/services/store.service';
import { IMeal } from '../shared/models/meal';
import { SignalRService } from '../core/services/signalr.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  meals: IMeal[] = [];
  categories: ICategory[] = [];
  storeParams = new StoreParams();
  totalCount = 0;

  constructor(private storeService: StoreService,public signalRService: SignalRService){
    this.signalRService.startConnection();
    this.signalRService.addReceiveMessageListener();
  }

  ngOnInit(): void {
    this.getIntialMeals();
    this.getCategories();
  }

  getIntialMeals(){
    this.storeService.getInitialMeals().subscribe({
      next: response =>{
        this.meals = response;
        this.totalCount = response.length;
      },
      error: error =>console.log(error)
    });
  }

  getCategories(){
    this.storeService.getCategories().subscribe({
      next: response =>{
        this.categories = [...response]
      },
      error: error =>console.log(error)
    });
  }

  onCategorySelected(name: string){
   this.onReset()
    this.storeParams.name = name;
    this.storeService.searchByCategory(name).subscribe({
      next: response =>{
        this.meals = response;
        this.totalCount = response.length;
      },
      error: error =>console.log(error)
    });
  }


  onPageChanged(event:any){
    this.storeParams.pageNumber = event.page;
  }

  onSearch(){
    this.storeService.searchByName(this.searchTerm?.nativeElement.value).subscribe({
      next: response => {
        console.log(response)
        this.meals = response;
        this.totalCount = response.length;
      },
      error: error =>console.log(error)
    });
  }

  onReset(){
    if(this.searchTerm){
      this.searchTerm.nativeElement.value = '';
      this.storeParams = new StoreParams();
      this.getIntialMeals();
    }
  }

}
