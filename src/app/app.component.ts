import {Component, OnDestroy} from '@angular/core';
import {TokenStorageService} from './_service/token-storage.service';
import {EventBusService} from "./_shared/event-bus.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  private roles: any[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  eventBusSub?: Subscription;
  user: any;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService,
              private router: Router, private storageService: TokenStorageService) {
    this.user = this.storageService.userValue;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.map(x => x.name).includes('admin');
      this.showModeratorBoard = this.roles.map(x => x.name).includes('moderator');
      this.username = user.userName;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout(true);
    });
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

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  openNewTab() {
    window.open('/profile', '_blank');
  }
}
