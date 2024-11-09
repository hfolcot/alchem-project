import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { EventType } from '../_enums/EventType.enum';
import { EventSeverity } from '../_enums/EventSeverity.enum';
import { IEvent } from '../_models/event';

const DUMMY_EVENTS: IEvent[] = [
  {
    id: 0,
    eventType: EventType.DiskIOSpike,
    timestamp: new Date().toISOString(),
    database: "DB_Prod_02",
    severity: EventSeverity.High
  },
  {
    id: 1,
    eventType: EventType.DiskIOSpike,
    timestamp: new Date().toISOString(),
    database: "DB_Prod_02",
    severity: EventSeverity.Medium
  },
  {
    id: 2,
    eventType: EventType.DiskIOSpike,
    timestamp: new Date().toISOString(),
    database: "DB_Prod_02",
    severity: EventSeverity.Critical
  }
]

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly http = inject<HttpClient>(HttpClient);

  constructor() { }

  getEvents(): Observable<IEvent[]> {
    
    return of(DUMMY_EVENTS);
    return this.http.get<IEvent[]>(`/api/events`);
  }
}
