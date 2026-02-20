import { Logger } from "../ports/Logger";

export class FileLogger implements Logger {
  log(message: string): void {
    console.log("[file] writing to file:", message);
  }
}
