import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name:string = ""
  constructor(private userService:UserService, private router : Router) { }

  ngOnInit(): void {
    this.userService.name.subscribe(nameS => {
      if(nameS){
        this.router.navigate(['bet']);
      }
    })
  }

  setName(name: string){
    this.userService.setName(name);
  }

}
