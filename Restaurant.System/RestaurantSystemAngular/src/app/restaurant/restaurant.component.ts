import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  urlId: number = -1;
  searchName: string;
  restaurants: Array<Restaurant> = [];

  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService
  ) { }

  ngOnInit() {
    this.urlId = this.getUrlId();
    if (this.urlId > 0)
      delete(this.urlId)

    this.service.getRestaurant().subscribe((data: Array<Restaurant>) => {
      this.restaurants = data;
    });
  }
  getUrlId() {
    if (this.route.snapshot.params['id'] == null)
      return -1;
    else 
      return this.route.snapshot.params['id'];
  }
  search() {
    this.service.getRestaurantByName(this.searchName).subscribe((data: Array<Restaurant>) => {
      this.restaurants = data;
    });
  }
  delete(id) {
    this.service.delete(id).subscribe((response) => {
      console.log(response);
    });
  }
}