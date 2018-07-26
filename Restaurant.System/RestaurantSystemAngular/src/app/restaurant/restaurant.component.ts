import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  searchName: string;
  restaurants: Array<Restaurant> = [];

  constructor(
    private service: RestaurantService
  ) { }

  ngOnInit() {
    this.service.getRestaurant().subscribe((data: Array<Restaurant>) => {
      this.restaurants = data;
    });
  }

  search() {
    this.service.getRestaurantByName(this.searchName).subscribe((data: Array<Restaurant>) => {
      this.restaurants = data;
    });
  }
}