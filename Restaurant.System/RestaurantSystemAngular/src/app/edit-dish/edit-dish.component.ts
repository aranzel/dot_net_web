import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Dish } from '../models/dish';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  urlId: number = -1;
  dish: Dish;
  value: string;
  restaurants: Array<Restaurant> = [];

  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getRestaurant().subscribe((data: Array<Restaurant>) => {
      this.restaurants = data;
    });
    this.urlId = this.getUrlId();
    if (this.urlId == -1) {
      this.initialCreate();
    } else {
      this.initialEdit(this.urlId);
    }
  }

  getUrlId() {
    if (this.route.snapshot.params['id'] == null)
      return -1;
    else 
      return this.route.snapshot.params['id'];
  }
  
  initialCreate() {
    this.dish = new Dish();
    this.dish.Id = -1;
    this.dish.Name = "";
    this.dish.Value = -1;
    this.value = '';
    this.dish.Restaurant = new Restaurant();
    this.dish.Restaurant.Id = -1;
    this.dish.Restaurant.Name = "";
  }
  
  initialEdit(id: number) {
    this.service.getDishById(id).subscribe((data: Dish) => {
      this.dish = data;
      this.value = this.dish.Value.toString();
    });
  }

  save() {
    let dishTemp: Dish = new Dish();
    dishTemp.Id = this.dish.Id;
    dishTemp.Name = this.dish.Name;
    dishTemp.Value = parseFloat(this.value);
    dishTemp.RestaurantId = this.dish.RestaurantId;
    
    if (this.urlId == -1) {
      this.service.createDish(dishTemp).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/dish']);
      });
    } else {
      this.service.editDish(this.urlId, dishTemp).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/dish']);
      });
    }
  }
}
