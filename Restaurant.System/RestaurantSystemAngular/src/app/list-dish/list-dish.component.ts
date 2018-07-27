import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from '../models/dish';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.css']
})
export class ListDishComponent implements OnInit {
  @Input() dishes: Dish[] = [];

  constructor(
    private service: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  delete(id) {
    this.service.deleteDish(id).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/dish']);
    });
  }
}
