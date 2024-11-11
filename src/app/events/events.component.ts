import { Component, effect, inject, signal } from '@angular/core';
import { EventService } from './_services/event.service';
import { DatePipe } from '@angular/common';
import { EventType } from './_enums/EventType.enum';
import { EventSeverity } from './_enums/EventSeverity.enum';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  private readonly eventService = inject<EventService>(EventService);
  events = this.eventService.events$;

  lastUpdated = signal<Date>(new Date());
  lastUpdatedEffect = effect(() => {
    this.lastUpdated.set(new Date());
  }, {
    allowSignalWrites: true
  })

  EventType = EventType;
  EventSeverity = EventSeverity;

  ngOnInit(): void {
    this.eventService.createHubConnection();
  }
  
  ngOnDestroy(): void {
     this.eventService.endHubConnection();
  }

}
