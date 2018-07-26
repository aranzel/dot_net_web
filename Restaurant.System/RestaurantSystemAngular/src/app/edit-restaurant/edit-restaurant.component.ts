import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rsApp-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  urlId: number = -1;
  restaurant: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.restaurant = new Restaurant();
    this.restaurant.Id = -1;
    this.restaurant.Name = "";
  }
  initialEdit(id: number) {
    this.service.getRestaurantById(id).subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
  }
  
  save() {
    this.service.create(this.restaurant).subscribe((response) => {
      console.log(response);
      //this.router.navigate(['/restaurant']);
    });
  }


}