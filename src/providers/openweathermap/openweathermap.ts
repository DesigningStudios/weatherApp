import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Storage } from '@ionic/storage';

@Injectable()
export class OpenweathermapProvider {

	apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=00000,us&units=imperial&appid=8402279588968208331beea507d748b9';

	constructor(
		public http: Http,
		public storage: Storage
	) {
		
	}

	//Fetch latest zipCode value from localStorage and create valid url
	getZIPcodeStorage() {
		this.storage.get('zipCode').then((val) => {
			return this.apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='+val+',us&units=imperial&appid=8402279588968208331beea507d748b9';
		});
	}

	//Service call to OpenWeatherMap API
	getReport(val) {
		return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip='+val+',us&units=imperial&appid=8402279588968208331beea507d748b9')
						.map(this.handleSuccess)
						.catch(this.handleError);
	}

	//Success callBack function
	tempdata: any;
	private handleSuccess(res: Response) {
		let body = res.json();
		this.tempdata = body;
		return body || { };
	}

	//Failure callBack function
	private handleError (error: Response | any) {
		return Observable.throw(error.json());
	}

}
