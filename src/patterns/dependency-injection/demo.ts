import { buildApplication } from "./good";

export function runDIExample() {
  const { userService } = buildApplication();

  userService.createUser("Alice");
}
