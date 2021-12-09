import { Component, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {
  subInfos$: Subscription = new Subscription;
  playerList: any[] = [];
  sel1 = "Naples";
  sel2 = "Nul";
  sel3 = "Leicester";
  userName = null;
  playerBet:any = null;
  isSetled = false;
  selectionWin: string = "";
  constructor(private backendService: BackendService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.name.subscribe(nameS => {
      this.userName = nameS;
    });

    this.subInfos$ = timer(0, 1000)
    .pipe(
      switchMap(() =>
        this.backendService.getInfos()
      )
    )
    .subscribe(res => {
      if(res.winSelection != ""){
        this.isSetled = true;
        this.selectionWin = res.winSelection;
        
      }else{
        this.playerList = res.placements;
      
        if(res.placements.find(x => x.player == this.userName)){   
          this.playerBet = res.placements.find(x => x.player == this.userName);
          var index = res.placements.findIndex(x => x.player  == this.userName);
          if (index > -1) {
            this.playerList.splice(index, 1);
          }     
        }
      }
     
    });
  }

  getSelectionCount(selection:String){
    var count = 0;
    if(this.playerList.length > 0){
       this.playerList.forEach(l => {
        if(l.selection == selection){
          count++;
        }
      })
    }
    return count;
  }



 
}
