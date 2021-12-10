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

  getInfos(id:any):Observable<any>{
    return this.http.get(this.apiGatewayUrl + "infos?id=" + id);
  }

  placement(selection: string, userName:any, id:any){
    return this.http.post(this.apiGatewayUrl + "placement?id=" + id, {
      "selection": selection,
      "player": userName,
      "bet": 1
    });
  }

  rooms(){
    return this.http.get(this.apiGatewayUrl + "rooms");
  }
}
