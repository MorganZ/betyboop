import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetComponent } from './components/bet/bet.component';
import { LoginComponent } from './components/login/login.component';
import { RoomsComponent } from './components/rooms/rooms.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'bet/:id', component: BetComponent, data: { animation: 'isRight' } },
  { path: 'rooms', component: RoomsComponent, data: { animation: 'isRight' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
