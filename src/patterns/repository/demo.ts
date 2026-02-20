import { UserService } from "./UserService";
import { InMemoryUserRepository } from "./InMemoryUserRepository";
import { SqlUserRepository } from "./SqlUserRepository";

export async function runRepositoryExample() {
  const repo = new SqlUserRepository();
  const service = new UserService(repo);

  await service.register("1", "Alice", "alice@email.com");

  const user = await service.getUser("1");

  console.log(user);
}
