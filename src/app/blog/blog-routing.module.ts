import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {ProfileComponent} from "../profile/profile.component";
import {BoardUserComponent} from "../board-user/board-user.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'user', component: BoardUserComponent},
    ]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
