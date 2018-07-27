import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'rsApp-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.css']
})
export class ListRestaurantComponent implements OnInit {
  @Input() restaurants: Restaurant[] = [];

  constructor(
    private service: RestaurantService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  delete(id) {
    this.service.deleteRestaurant(id).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/restaurant']);
    });
  }
}
