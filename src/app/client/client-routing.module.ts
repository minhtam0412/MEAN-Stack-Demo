import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "../profile/profile.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'profile', component: ProfileComponent},
    ]
  },
  {
    path: 'board', component: HomeComponent, loadChildren: () =>
      import('../client/board/board.module').then(value => {
        return value.BoardModule
      })
  }
  ,
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
