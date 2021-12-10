import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms:Array<any> = [];
  constructor(private backendService: BackendService, private router:Router) { }

  ngOnInit(): void {

    this.backendService.rooms().subscribe((res:any) => {
      this.rooms = res;
    })
  }

  goTo(id:any){
    this.router.navigate(['bet/'+ id]);

  }

}
