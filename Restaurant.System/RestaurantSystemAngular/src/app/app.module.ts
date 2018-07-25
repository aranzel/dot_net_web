import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { ListRestaurantComponent } from './list-restaurant/list-restaurant.component';
import { MenuRootComponent } from './menu-root/menu-root.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'restaurant', component: ListRestaurantComponent },
  { path: 'restaurant/:id', component: EditRestaurantComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    EditRestaurantComponent,
    ListRestaurantComponent,
    MenuRootComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
