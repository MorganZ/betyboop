import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isLoading = false;
  id= null;
  constructor(private backendService: BackendService, private userService: UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userService.name.subscribe(nameS => {
      this.userName = nameS;
    });

    this.subInfos$ = timer(0, 1000)
    .pipe(
      switchMap(() =>
        this.backendService.getInfos(this.id)
      )
    )
    .subscribe(res => {
      if(res.winSelection){
        this.isSetled = true;
        this.selectionWin = res.winSelection;
        this.playerList = res.placements;
      
        if(res.placements.find((x:any) => x.player == this.userName)){   
          this.playerBet = res.placements.find((x:any) => x.player == this.userName);
          this.playerBet['win'] = this.playerBet.selection == res.winSelection ? true : false;
          var index = res.placements.findIndex((x:any) => x.player  == this.userName);
          if (index > -1) {
            this.playerList.splice(index, 1);
          }     
        }

        this.playerList.forEach(player => {
          if(player.selection == res.winSelection){
            player['win'] = true;
          }else{
            player['win'] = false;
          }
        });
        
      }else{
        this.playerList = res.placements;
      
        if(res.placements.find((x:any) => x.player == this.userName)){   
          this.playerBet = res.placements.find((x:any) => x.player == this.userName);
          var index = res.placements.findIndex((x:any) => x.player  == this.userName);
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

  sendSelection(selection: string){
    this.isLoading = true;
    this.backendService.placement(selection, this.userName, this.id).subscribe(res => {
      this.playerBet = {
        "player": this.userName,
        "selection": selection,
        "bet": 1
      }
      this.isLoading = false;
    }, err => {
      this.isLoading = false;

    })
  }

  getParticipantCount(){
    if(this.playerBet){
      return this.playerList.length + 1;
    }else{
      return this.playerList.length;
    }
  }
 
}
