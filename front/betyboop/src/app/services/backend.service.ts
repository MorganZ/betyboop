import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as data from './info.json';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiGatewayUrl: string;

  constructor(private http: HttpClient) { 
    this.apiGatewayUrl = 	"https://g3ch63poae.execute-api.eu-west-1.amazonaws.com/"
  }

  getInfos(){
    return of(data);
    // return this.http.get(this.apiGatewayUrl + "infos");
  }

  placement(){
    return this.http.post(this.apiGatewayUrl + "placement", {});
  }
}
