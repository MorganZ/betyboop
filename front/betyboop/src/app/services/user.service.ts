import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name: BehaviorSubject<any>;
  apiGatewayUrl: string;
  money: BehaviorSubject<any>;

  constructor(private http: HttpClient) { 
    this.name = new BehaviorSubject(localStorage.getItem("name"));
    this.money = new BehaviorSubject(0);
    this.apiGatewayUrl = 	"https://g3ch63poae.execute-api.eu-west-1.amazonaws.com/"
  }
  setName(name:string){
    localStorage.setItem("name", name);
    this.name.next(name);
    this.http.post(this.apiGatewayUrl + "/users", {"username": name}).subscribe(res => {
      console.log('created');
      this.getUser();
    });
  }

  getUser(){
     this.http.get(this.apiGatewayUrl + "users?username="+this.name.value).subscribe((res:any) => {
       this.money.next(res.wallet);
     });
  }
}
