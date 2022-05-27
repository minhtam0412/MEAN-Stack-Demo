import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BoardRoutingModule} from './board-routing.module';
import {BoardPublicComponent} from './board-public/board-public.component';


@NgModule({
  declarations: [
    BoardPublicComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule {
}
