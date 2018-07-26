import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'rsApp-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.css']
})
export class ListRestaurantComponent implements OnInit {
  @Input() restaurants: Restaurant[] = [];

  constructor(
    //@Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    
  }

}
