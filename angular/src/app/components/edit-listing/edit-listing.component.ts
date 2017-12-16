import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { FlashMessagesService } from 'angular2-flash-messages';

import { CarModel } from '../../models/car-model';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
	title = 'Edit a car model';

	carModel     = new CarModel('', 0, {});
	image        = '';
	imageDisplay = '';
	uniqueId     = '';

	constructor(private activatedRoute: ActivatedRoute, private ls: ListingsService, private flashMessagesService: FlashMessagesService) { }

	fileChange(event) {
		let reader = new FileReader();
		if(event.target.files && event.target.files.length > 0) {
			let file = event.target.files[0];
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.carModel.image = {
					filename: file.name,
					filetype: file.type,
					value: reader.result.split(',')[1]
				}
			};
		}
	}

	ngOnInit() {
		this.activatedRoute
			.params
			.subscribe(params => {
				this.id = params['id'] || '';
				this.ls.getById(this.id)
					.subscribe(
					(response: Response) => {
						let data  = response.json();
						if(data !== null){
							this.carModel.model = data.model;
							this.carModel.price = data.price;

							this.image          = '';
							this.imageDisplay   = data.image;

							this.uniqueId       = data.unique_id;
						} else {
							console.log("No data returned from the backend");
						}
					},
					(error)    => console.log(error)
				);
		}
	}


	submitted = false;

	onSubmit(){
			this.submitted = true;

			this.ls.update(this.carModel, this.uniqueId)
				.subscribe(
				(response) => {
					//console.log(response);
					this.carModel.image = '';
					this.flashMessagesService.show('You have sussessfully updated the new model!', { cssClass: 'alert-success', timeout: 2000 });
				},
				(error)    => console.log(error)
			);
		}

}
