import { UserRepository } from "./UserRepository";
import { User } from "./User";

export class SqlUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    console.log("SELECT * FROM users WHERE id =", id);

    // simulation of result
    return new User(id, "John Doe", "john@email.com");
  }

  async save(user: User): Promise<void> {
    console.log("INSERT INTO users ...", user);
  }
}
