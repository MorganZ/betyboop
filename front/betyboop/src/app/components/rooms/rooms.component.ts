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
    this.backendService.getInfos("61b31d840db3caea8ef65784").subscribe(res => {
      this.rooms.push({
        "name": res.titleRoom,
        "id": "61b31d840db3caea8ef65784"
      });
    });

    this.backendService.getInfos("61b20b897e1efe4b874ee26a").subscribe(res => {
      this.rooms.push({
        "name": res.titleRoom,
        "id": "61b20b897e1efe4b874ee26a"
      });
    })
  }

  goTo(id:any){
    this.router.navigate(['bet/'+ id]);

  }

}
