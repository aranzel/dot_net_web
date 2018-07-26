import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuRootComponent } from './menu-root/menu-root.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { ListRestaurantComponent } from './list-restaurant/list-restaurant.component';

import { RestaurantService } from './restaurant.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurant/create', component: EditRestaurantComponent },
  { path: 'restaurant/edit/:id', component: EditRestaurantComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuRootComponent,
    RestaurantComponent,
    EditRestaurantComponent,
    ListRestaurantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
