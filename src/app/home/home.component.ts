import {Component, OnInit} from '@angular/core';
import {UserService} from '../_service/user.service';
import {EventData} from "../_shared/event.class";
import {EventBusService} from "../_shared/event-bus.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: ((data) => {
        this.content = data;
      }),
      error: err => {
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      }
    });
  }
}
