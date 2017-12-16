import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
	listings = [];

	constructor(private ls: ListingsService) { }

	ngOnInit() {
		this.getListings();
	}

	getListings(){
		this.ls.getAll()
			.subscribe(
			(response: Response) => {
				let data  = response.json();
				console.log(data)
				this.listings = data;
			},
			(error)    => console.log(error)
		);
	}
}
