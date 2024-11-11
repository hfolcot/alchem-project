import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { IEvent } from '../_models/event';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly baseUrl: string = "http://localhost:5000/api";
  private readonly hubsUrl: string = "http://localhost:5000/hubs";
  private hubConnection?: HubConnection;
  private readonly http = inject<HttpClient>(HttpClient);

  private events = signal<IEvent[]>([]);
  events$ = this.events.asReadonly();

  constructor() { }

  createHubConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubsUrl + '/dbevents')
    .withAutomaticReconnect()
    .build();

    this.hubConnection.start().catch(error => console.warn(error));

    this.getHistoricEvents();

    this.subscribeToFutureEvents();
  }

  endHubConnection(): void {
    if(this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop();
    }
  }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.baseUrl}/dbevents`).pipe(map(
      events => {
        return this.sortedEvents(events);
      }
    ));
  }

  private sortedEvents(events: IEvent[]): IEvent[] {
    events.sort((e1, e2) => {
      if(e1.timestamp > e2.timestamp) {
        return -1;
      }
      if(e2.timestamp > e1.timestamp) {
        return 1;
      }
      return 0;
    });

    return events;
  }

  private getHistoricEvents(): void {
    if(!this.hubConnection) {
      return;
    }

    this.hubConnection.on("ReceiveAllDbEvents", events => {
      this.events.set(this.sortedEvents(events));
    })
  }

  private subscribeToFutureEvents(): void {
    if(!this.hubConnection) {
      return;
    }

    this.hubConnection.on("ReceiveDbEvent", event => {
      this.events.update(events => {
        return this.sortedEvents([
          ...events,
          event
        ])
      })
    })
  }
}
