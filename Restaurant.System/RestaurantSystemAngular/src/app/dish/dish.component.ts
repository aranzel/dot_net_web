import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/dish';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  dishes: Array<Dish> = [];

  constructor(
    private service: RestaurantService
  ) { }

  ngOnInit() {
    this.service.getRestaurant().subscribe((data: Array<Dish>) => {
      this.dishes = data;
    });
  }

}
