import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from './models/restaurant';

const API_URL = 'http://localhost:7317';

@Injectable()
export class RestaurantService {

    constructor(
        private http: HttpClient
    ) { }

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
    create(restaurant: Restaurant) {
        return this.http.post(API_URL + '/api/Restaurant', { "Id": restaurant.Id, "Name": restaurant.Name },
            { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
    }
    edit(id: number, restaurant: Restaurant) {
        return this.http.put(API_URL + '/api/Restaurant/' + id, JSON.stringify(restaurant),
            { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
    }
    delete(id: number) {
        return this.http.delete(API_URL + '/api/Restaurant/' + id);
    }
}