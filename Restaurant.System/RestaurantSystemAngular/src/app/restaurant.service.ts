import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Restaurant } from './models/restaurant';
import { Dish } from './models/dish';

const API_URL = 'http://localhost:7317';

@Injectable()
export class RestaurantService {
    private readonly httpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    constructor(
        private http: HttpClient
    ) { }

    private createBody(entity: object) {
        return new HttpParams().set('entity', JSON.stringify(entity));
    }

    //Restaurant
    getRestaurant() {
        return this.http.get(API_URL + '/api/Restaurant');
    }

    getRestaurantByName(name: string) {
        if (name != undefined && name != '')
            return this.http.get(API_URL + '/api/Restaurant/SearchByName/?name=' + name);
        else 
            return this.getRestaurant();
    }

    getRestaurantById(id: number) {
        return this.http.get(API_URL + '/api/Restaurant/' + id);
    }

    createRestaurant(restaurant: Restaurant) {
        const body = this.createBody(restaurant);
        return this.http.post(API_URL + '/api/Restaurant', body,
            { headers: this.httpHeaders });
    }

    editRestaurant(id: number, restaurant: Restaurant) {
        const body = this.createBody(restaurant);
        body.set('id', id.toString());
        return this.http.post(API_URL + '/api/Restaurant/Update/?id=' + id, body,
            { headers: this.httpHeaders });
    }

    deleteRestaurant(id: number) {
        return this.http.get(API_URL + '/api/Restaurant/?entityId=' + id);
    }

    //Dish
    getDish() {
        return this.http.get(API_URL + '/api/Dish/List');
    }

    getDishBy(restaurant: string, dish: string) {
        if ((restaurant != undefined && restaurant != '')
            || (dish != undefined && dish != ''))
            return this.http.get(API_URL + '/api/Dish/SearchBy/?restaurant=' + restaurant + '&dish=' + dish);
        else 
            return this.getDish();
    }

    getDishById(id: number) {
        return this.http.get(API_URL + '/api/Dish/' + id);
    }

    createDish(dish: Dish) {
        const body = this.createBody(dish);
        return this.http.post(API_URL + '/api/Dish', body,
            { headers: this.httpHeaders });
    }

    editDish(id: number, dish: Dish) {
        const body = this.createBody(dish);
        
        return this.http.post(API_URL + '/api/Dish/Update/?id=' + id, body,
            { headers: this.httpHeaders });
    }

    deleteDish(id: number) {
        return this.http.get(API_URL + '/api/Dish/?entityId=' + id);
    }
}