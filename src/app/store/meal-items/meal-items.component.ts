import { Component, Input } from '@angular/core';
import { IMeal } from '../../shared/models/meal';


@Component({
  selector: 'app-meal-items',
  templateUrl: './meal-items.component.html',
  styleUrls: ['./meal-items.component.scss']
})
export class MealItemsComponent {
  @Input() meal?: IMeal;

  constructor(){}
}
