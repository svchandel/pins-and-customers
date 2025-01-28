import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }


  getRegionsAndCountries(){
    return this.http.get<any>('https://api.first.org/data/v1/countries')
  }
}
