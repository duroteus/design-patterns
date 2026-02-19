import { buildUserRepository } from "./good";

export function runDecoratorExample() {
  const repo = buildUserRepository();

  console.log(repo.getUser("1"));
  console.log("------");
  console.log(repo.getUser("1"));
}
