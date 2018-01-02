import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenweathermapProvider } from '../../providers/openweathermap/openweathermap';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	validZIPcode = true;
	notValidZIPcode = false;
	zipCode : any;
	errorMessage: string;

	constructor(
		public navCtrl: NavController,
		public openweathermap: OpenweathermapProvider,
		public storage: Storage
	) {

	}

	//Runs after the page has finished leaving
	ionViewDidLeave(){
		this.zipCode = "";
		this.validZIPcode = true;
	}

	//Live validation if zipCode value is greater than five digits
	validateZIPcode(zipCode) {
		if(zipCode.length >= 5) {
			this.validZIPcode = false;
		} else {
			this.validZIPcode = true;
			this.notValidZIPcode = false;
		}
	}

	//If user press enter from keyboard in a browser
	eventHandler(keyCode){
		if(keyCode == 13){
			this.getWeatherReport();
		}
	}

	//Intiate service call to OpenWeatherMap
	getWeatherReport() {
		if(!this.validZIPcode) {
			this.storage.set("zipCode", this.zipCode);
			this.openweathermap.getReport(this.zipCode)
				.subscribe(
					success => {
						this.storage.set("zipWeatherData", success)
						this.navCtrl.push('DetailPage');
					},
					error =>  {
						this.errorMessage = error.message;
						this.validZIPcode = true;
						this.notValidZIPcode = true;
						this.storage.remove("zipCode");
					}
				)
		}
	}

}
