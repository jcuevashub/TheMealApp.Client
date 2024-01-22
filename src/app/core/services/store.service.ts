import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeal } from '../../shared/models/meal';
import { ICategory } from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5011/v1/';

  getMealById(id:string){
    return this.http.get<IMeal>(this.baseUrl + `catalog/get-meal-detail/id?Id=${id}`);
  }

  getInitialMeals(){
    return this.http.get<IMeal[]>(this.baseUrl+'catalog/get-meals');
  }

  searchByCategory(category: string){
    return this.http.get<IMeal[]>(this.baseUrl +  `catalog/search-by-category/category?Category=${category}`);
  }

  searchByName(name: string){
    return this.http.get<IMeal[]>(this.baseUrl +  `catalog/search-by-name/name?Name=${name}`);
  }

  getCategories(){
    return this.http.get<ICategory[]>(this.baseUrl+'catalog/get-categories');
  }
}
