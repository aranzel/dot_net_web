import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'rsApp-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  restaurant: Restaurant;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id == null) {
      this.restaurant = new Restaurant();
      this.restaurant.Id = -1;
      this.restaurant.Name = "";
    } else {
      this.restaurant = new Restaurant();
      this.restaurant.Id = id;
      this.restaurant.Name = "deu certo";
    }
  }

  save() {
    alert("o/");
  }

}
