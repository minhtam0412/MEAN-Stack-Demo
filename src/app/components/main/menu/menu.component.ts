import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../_service/token-storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: any;

  constructor(private storageService: TokenStorageService) {
    this.user = this.storageService.userValue;
  }

  ngOnInit(): void {
  }

  closeMenu() {
    document.body.classList.toggle('sb-sidenav-toggled');
  }
}
