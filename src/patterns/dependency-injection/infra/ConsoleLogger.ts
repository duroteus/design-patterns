import { Logger } from "../ports/Logger";

export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log("[console]", message);
  }
}
