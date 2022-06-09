import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../_service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: any;

  constructor(private storageService: TokenStorageService, private router: Router) {
    this.user = this.storageService.userValue;
  }

  ngOnInit(): void {
  }

  closeMenu() {
    document.body.classList.toggle('sb-sidenav-toggled');
  }

  navigateToClientApp() {
    if (confirm('Bạn có chắc muốn điều hướng sang Client App?')) {
      this.router.navigateByUrl('/');
    }
  }
}
