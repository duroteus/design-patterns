import { EmailServiceAdapter } from "./good";
import { ExternalEmailService } from "./ExternalEmailService";

export function runAdapterExample() {
  const external = new ExternalEmailService();
  const notifier = new EmailServiceAdapter(external);

  notifier.send("Hello from Adapter Pattern!");
}
