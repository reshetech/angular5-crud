import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { ListingsService } from './services/listings.service';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';


const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'listings', component: ListingsComponent},
	{path: 'listing/:id', component: ListingComponent},
	{path: 'add-listing', component: AddListingComponent},
	{path: 'edit-listing/:id', component: EditListingComponent}
];

@NgModule({
  declarations: [
	AppComponent,
	HomeComponent,
	ListingsComponent,
	NavbarComponent,
	ListingComponent,
	AddListingComponent,
	EditListingComponent
  ],
  imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	FlashMessagesModule.forRoot(),
	RouterModule.forRoot(appRoutes)
  ],
	providers: [ListingsService],
	bootstrap: [AppComponent]
})
export class AppModule { }
