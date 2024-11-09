import { Component, computed, inject } from '@angular/core';
import { EventService } from './_services/event.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EventType } from './_enums/EventType.enum';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  private readonly eventService = inject<EventService>(EventService);
  events = this.eventService.getEvents();

  EventType = EventType;

}
