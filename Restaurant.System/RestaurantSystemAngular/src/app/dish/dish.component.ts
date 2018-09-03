import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/dish';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  searchRestaurant: string = '';
  searchDish: string = '';
  dishes: Array<Dish> = [];

  constructor(
    private service: RestaurantService
  ) { }

  ngOnInit() {
    this.service.getDish().subscribe((data: Array<Dish>) => {
      this.dishes = data;
    });
  }

  search() {
    this.service.getDishBy(this.searchRestaurant, this.searchDish).subscribe((data: Array<Dish>) => {
      this.dishes = data;
    });
  }
  
}
