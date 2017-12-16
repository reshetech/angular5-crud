import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ListingsService implements OnInit {

	listings = [];

	carModel = {model:'', price:'', unique_id:''};

	constructor(private http:Http){}

	store(carModel:{model:string, price:number, image: any}){
		carModel.unique_id = this.generateId();
		return this.http.post("http://localhost/store.php", carModel);
	}

	update(carModel:{model:string, price:number, image: any}, uniqueId: string){
		carModel.unique_id = uniqueId;

		console.log(carModel);

		return this.http.post("http://localhost/update.php", carModel);
	}

	getAll(){
		return this.http.get("http://localhost/get.php");
	}

	getById(id: string){
		return this.http.post("http://localhost/getById.php", {unique_id: id});
	}

	delete(id: string){
		return this.http.post("http://localhost/delete.php", {unique_id: id});
	}

	private generateId(){
		let str = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

		for (var i = 0; i < 6; i++){
			str += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return str;
	}
}
