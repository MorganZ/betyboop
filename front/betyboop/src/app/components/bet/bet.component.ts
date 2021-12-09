import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AwesomeQR } from 'awesome-qr';
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
  qr:any = null;
  link: any;
  constructor(private backendService: BackendService, private userService: UserService, private route:ActivatedRoute, public dialog: MatDialog) { }

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

  openDialog(){
    new AwesomeQR({
  
      text: window.location.href,
  
      size: 240,
  
      // logoImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkCAYAAAA8AQ3AAAAFT0lEQVR42u3dPc4VNxSA4bsEiiwgEhsgO2AHsAKUBVCkp6GmoqWjo6WiTpOeggUkQQiBEIIIIRBCIHcoEtL3zfXPOcePpbe943vGfmd87LFP/5x++QYAGTgJAgDCAgDCAkBYAEBYAEBYAAgLAAgLAAgLAGEBAGEBAGEBICwAICwAICwAhAUAhAUAhAWAsACM4GdFbAgLCC8q4iIsDO544jBGVmJLWBjQ6cRjjKzEl7DQucOJCWFtI6wVRaeRHJ7RRnu3d8LaUFYaQf97JAaERVikJSmcuJ1+fPyEsAiLuORXcsfkaPn67j1hERZpkVUOYUm6L+bltevfopYdG8Xrm7fEaoJgtMmkwopcvF2J1ci4iDFhkRZhpRkmf3j4SHwJi7AIK1deTxskLNKScO/Gq+s3psTlx/Li199IKpqwshSy8nYlLoRFWDqmuKC+sGZLkbAIS0wIa1oHiSqsi84S6ZjH6trWlBFWnW9ETzs90aMIK4I8Mw6pV9UjwoLRaGmYLYWVpeH1uEHRRJBFWBHq0/Ma7TtA7Y+wwuZnIsogw6RFpHr1/O2KD6aZyy9OhoPxrje6ntGFFa1uq4eDR9pg29Km4kw6YRV5g5nxxlBRpBepY7b8VeXlPyczhHnfDGa+MVST6Koh3A5tsKSwMkik6gaEuwv0MnXNkr/K1P4Ia/HygYglQ/4qQ9wyCCtT+9tOWL226qgsqxGdpnc9jk7vZ5Bq5P205LA23rQvQ4k6HKw8fJ6Vv9pNVoRVXFZRhZXlXkdPuO8kqqXCyi6r3v9h9WcUMxtqlLhlXzCaKY6EtfgJke2aVT5A7/FgyXYGYYU4EtbCV9mVr9C7C+to3L78/e+0+kZ+W+vV/rbbrWHXoeDRAzAjDgmrbO+TLeGeMY6phfXf/Qdp81fnlHb24kqp7/K1QaUzCCvEMb2wMs2oZVzsOiupX1lWURPuu8uKsC5xY8/5+j2iqDIIq8qWyKuFZYvkDY/0ivjWtkombVh/0d9/fuUqYR0on/78y9sVYcUQVpQZz8i7B6zsFG0f+Gj5K7JaIKxMSxAiNbpRDdJwcHydj6YSCGtDYfW60ef+RjRRRRdWO2W5irAiPTAJK8mZd6uEFVVU0YVV6QxCwiKs6detJKkMC0Z3F5bhIGGlFNbIe3F09q66sHrfK8JKKqxsieWVwtp9P335K8JKK6z24eouwnIACGERVnJhRTgSvoqksgjr7R93JNwl3Qnr6LXbquMqoprdAVbmLavs0JAxjoS1eM+qFaIaJbd2tHiGe9GjrVXYoSHCA38rYc1qtJ+fPhsmlhWiyrz+qkfc2kxmj+tlzl+tEH8bkkcdYoYXVpQlBTOENWsY2ft/jOxsM2MXWVhvfr89PI4/E1UkaRHWpKfcj6V9XNt+r32CsiL31SM+7+7emx63cydCsibcs8WRsIoJa3XCfna9RkxaRBHCzEmNDH0kvbDO2Q8p4o2o0GCyyGBmPSMn3CPG8ej5BOGFVUlWVZ5yu8u+Z45y9qTGRfJMs8qHh48IK0PnJ638wvp/fXt22NH3MlK57OEqhLWo0xNWrSH16uHgZYdYu+aythdW5v+WLY8VOW4Z8leV2l9IYVWW1cr/GPn+RG8bo4dwR3NMmdpfW9JScpawsqhW/c/odc8YtywJ94rtj7AWBjtr3avm00YOUSMeulFZVFsI69y9tFb/75n1rzZErbBDQ7Y4ljyXcCcyTBMfrfPINTgzd5OoTJt5rBZHwgJgAz8AICwAhAUAhAUAhAWAsACAsACAsAAQFgAQFgAQFgDCAgDCAgDCAkBYAEBYAEBYACrxHWw6SYX31MMYAAAAAElFTkSuQmCC"
  
    }).draw().then((dataURL) => {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '95%',
        data: {"qr" : dataURL},
      });
  
      dialogRef.afterClosed().subscribe(result => {
    
      });
    } );
    
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



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

