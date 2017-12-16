import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

	item = {id:'', unique_id:'', model:'', price:'', image:''};
	id   = '';
	imageUrl = '';

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private ls: ListingsService) { }

	ngOnInit() {
		// We need to subscribe in case someone changes the id manually or reloads the page
		this.activatedRoute
			.params
			.subscribe(params => {

				this.id = params['id'] || '';

				this.ls.getById(this.id)
					.subscribe(
					(response: Response) => {
						let data  = response.json();
						if(data !== null){
							this.item = data;
						} else {
							console.log("No data returned from the backend");
						}
					},
					(error)    => console.log(error)
				);
			}
	}


	onDelete(){
		if(!confirm("Are you sure you want to delete the contennt?")) return;

		this.ls.delete(this.id)
			.subscribe(
			(response: Response) => {
				this.router.navigate(['/listings']
			},
			(error)    => console.log(error)
		);
	}

}
