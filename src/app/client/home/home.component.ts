import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../_shared/event-bus.service";
import {Subscription} from "rxjs";
import {TokenStorageService} from "../../_service/token-storage.service";
import {Router} from "@angular/router";
import {EventData} from "../../_shared/event.class";
import {UserService} from "../../_service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private roles: any[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  user: any;
  content: string = '';

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService,
              private router: Router, private storageService: TokenStorageService) {
    this.user = this.storageService.userValue;
  }

  ngOnInit(): void {
    console.log('HomeComponent -> ngOnInit')
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.map(x => x.name).includes('admin');
      this.showModeratorBoard = this.roles.map(x => x.name).includes('moderator');
      this.username = user.userName;
    }
  }

  logout(isNotIncludeReturnUrl: boolean): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.roles = [];
    this.showAdminBoard = false;
    this.showModeratorBoard = false;

    //redirect to home when current page is login
    if (window.location.href.includes('login')) {
      this.router.navigate(['/']);
    } else {
      if (isNotIncludeReturnUrl) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
      }
    }
  }

  openProfileInNewTab() {
    window.open('/home/profile', '_blank');
  }
}
