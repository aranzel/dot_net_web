import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(
    private service: RestaurantService
  ) { }

  ngOnInit() {
    this.restaurants = this.service.getRestaurants();
  }

}