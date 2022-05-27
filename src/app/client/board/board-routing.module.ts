import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardUserComponent} from "./board-user/board-user.component";
import {BoardAdminComponent} from "./board-admin/board-admin.component";
import {BoardModeratorComponent} from "./board-moderator/board-moderator.component";

const routes: Routes = [
  {path: 'user', component: BoardUserComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'mod', component: BoardModeratorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule {
}
