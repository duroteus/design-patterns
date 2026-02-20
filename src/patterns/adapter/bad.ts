import { ExternalEmailService } from "./ExternalEmailService";

export class NotificationManager {
  private external = new ExternalEmailService();

  notify(message: string) {
    this.external.dispatchEmail({ content: message });
  }
}
