export interface NotificationService {
  send(message: string): void;
}

export class ConsoleNotificationService implements NotificationService {
  send(message: string): void {
    console.log("Sending notification:", message);
  }
}
