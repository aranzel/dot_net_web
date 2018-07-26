import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../models/dish';

@Component({
  selector: 'rsApp-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.css']
})
export class ListDishComponent implements OnInit {
  @Input() dishes: Dish[] = [];

  constructor() { }

  ngOnInit() {
  }

}
