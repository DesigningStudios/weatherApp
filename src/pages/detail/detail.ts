import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-detail',
	templateUrl: 'detail.html',
})
export class DetailPage {
	
	countriesStorage : any = {};
	sunriseTime : any;
	sunsetTime : any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage
	) {

	}

	//Runs before the page has loaded
	ionViewCanEnter(){
		this.countriesStorage = {
			"name": "",
			"weather":[
				{  
					"main": "",
					"description": "",
				}
			],
			"main": {
				"humidity": null,
				"temp": null,
				"pressure": null
			},
			"clouds":{  
				"all": null
			}
		};
	}

	//Runs after the page has loaded
	ionViewDidLoad() {
		this.storage.get('zipWeatherData').then((val) => {
			this.countriesStorage = val;

			let sunriseTimeUTC = this.countriesStorage.sys.sunrise;
			let sunriseDate = new Date(sunriseTimeUTC * 1000);
			this.sunriseTime = sunriseDate.toLocaleTimeString();

			let sunsetTimeUTC = this.countriesStorage.sys.sunset;
			let sunsetDate = new Date(sunsetTimeUTC * 1000);
			this.sunsetTime = sunsetDate.toLocaleTimeString();
		});
	}

}
