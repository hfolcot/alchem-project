
import { EventSeverity } from "../_enums/EventSeverity.enum";
import { EventType } from "../_enums/EventType.enum";

export interface IEvent {
    id: number;
    eventType: EventType;
    timestamp: string;
    database: string;
    severity: EventSeverity
}
