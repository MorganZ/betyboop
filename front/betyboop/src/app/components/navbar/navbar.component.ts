import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name: string | null | undefined;
  money: any;

  constructor(private userService:UserService, private router : Router) { }
  ngOnInit(): void {
    this.userService.name.subscribe(nameS => {
      this.name = nameS;
     
      if(!this.name){
        this.router.navigate(['login']);
      }
    });

    this.userService.money.subscribe(money => {
      console.log(money);
      this.money = money;
    })
  }

}
