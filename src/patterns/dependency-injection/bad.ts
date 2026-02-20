import { ConsoleLogger } from "./infra/ConsoleLogger";

export class UserService {
  private logger = new ConsoleLogger();

  createUser(name: string) {
    this.logger.log("Creating user: " + name);
  }
}
