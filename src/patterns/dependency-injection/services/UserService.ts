import { Logger } from "../ports/Logger";

export class UserService {
  constructor(private logger: Logger) {}

  createUser(name: string) {
    this.logger.log("Creating user: " + name);
  }
}
