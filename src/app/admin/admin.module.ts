import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {HeaderComponent} from "../components/main/header/header.component";
import {FooterComponent} from "../components/main/footer/footer.component";
import {MenuComponent} from "../components/main/menu/menu.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
  ]
})
export class AdminModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
