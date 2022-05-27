import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../_service/token-storage.service";
import {EventBusService} from "../../../_shared/event-bus.service";
import {EventData} from "../../../_shared/event.class";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
  }

  toogleMenu() {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', String(document.body.classList.contains('sb-sidenav-toggled')));
    }
  }

  logOut() {
    this.eventBusService.emit(new EventData('logout', true));
  }
}
