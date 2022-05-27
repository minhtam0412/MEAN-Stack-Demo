import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../_service/user.service';
import {EventBusService} from "../../../_shared/event-bus.service";
import {EventData} from "../../../_shared/event.class";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: ((data) => {
        this.content = data;
      }),
      error: err => {
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', true));
      }
    });
  }
}
