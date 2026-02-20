import { NotificationService } from "./NotificationService";
import { ExternalEmailService } from "./ExternalEmailService";

export class EmailServiceAdapter implements NotificationService {
  constructor(private external: ExternalEmailService) {}

  send(message: string): void {
    this.external.dispatchEmail({ content: message });
  }
}
