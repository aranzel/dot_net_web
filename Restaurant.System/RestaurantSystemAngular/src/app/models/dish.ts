import { Restaurant } from './restaurant';

export class Dish {
    Id: number;
    Name: string;
    Value: Float32Array;
    RestaurantId: number;
    Restaurant: Restaurant;
}