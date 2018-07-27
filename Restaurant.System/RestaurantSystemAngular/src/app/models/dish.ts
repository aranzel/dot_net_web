import { Restaurant } from './restaurant';

export class Dish {
    Id: number;
    Name: string;
    Value: number;
    RestaurantId: number;
    Restaurant: Restaurant;
}