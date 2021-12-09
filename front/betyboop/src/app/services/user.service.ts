import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name: BehaviorSubject<any>;

  constructor() { 
    this.name = new BehaviorSubject(localStorage.getItem("name"))
  }
  setName(name:string){
    localStorage.setItem("name", name);
    this.name.next(name);
  }
}
