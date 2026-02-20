import { UserService } from "./services/UserService";
import { ConsoleLogger } from "./infra/ConsoleLogger";
import { FileLogger } from "./infra/FileLogger";

export function buildApplication() {
  const logger = new ConsoleLogger();
  //   const logger = new FileLogger();
  const userService = new UserService(logger);
  return { userService };
}
