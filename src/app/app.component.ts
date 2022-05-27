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

  eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService,
              private router: Router, private storageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout(true);
    });
  }

  logout(isNotIncludeReturnUrl: boolean): void {
    this.tokenStorageService.signOut();

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
}
