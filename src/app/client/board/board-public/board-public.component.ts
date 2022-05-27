import {Component, OnInit} from '@angular/core';
import {EventData} from "../../../_shared/event.class";
import {UserService} from "../../../_service/user.service";
import {EventBusService} from "../../../_shared/event-bus.service";

@Component({
  selector: 'app-board-public',
  templateUrl: './board-public.component.html',
  styleUrls: ['./board-public.component.css']
})
export class BoardPublicComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: ((data) => {
        this.content = data;
      }),
      error: err => {
        this.content = err.error.message || err.error || err.message;
      }
    });
  }

}
