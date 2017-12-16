import { Component, OnInit } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { FlashMessagesService } from 'angular2-flash-messages';

import { CarModel } from '../../models/car-model';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
	title = 'Add a car model';

	carModel = new CarModel('', 0, {});
	image    = '';

	constructor(private ls: ListingsService, private flashMessagesService: FlashMessagesService){}

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

	submitted = false;

	onSubmit(){
		this.submitted = true;

		this.ls.store(this.carModel)
			.subscribe(
			(response) => {
				//console.log(response);
				this.carModel.image = '';
				this.flashMessagesService.show('You have sussessfully added the new model!', { cssClass: 'alert-success', timeout: 2000 });
			},
			(error)    => console.log(error)
		);
	}
}
