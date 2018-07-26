import { Injectable } from '@angular/core';
import { Restaurant } from './models/restaurant';

@Injectable()
export class RestaurantService {
    getRestaurants(): Restaurant[] {
        let restaurants: Restaurant[] = [];

        let restaurant1 = new Restaurant();
        restaurant1.Id = 1;
        restaurant1.Name = 'r1 tia';
        restaurants.push(restaurant1);
        let restaurant2 = new Restaurant();
        restaurant2.Id = 2;
        restaurant2.Name = 'esquina';
        restaurants.push(restaurant2);

        return restaurants;
    }
}