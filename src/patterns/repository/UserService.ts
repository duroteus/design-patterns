import { UserRepository } from "./UserRepository";
import { User } from "./User";

export class UserService {
  constructor(private repository: UserRepository) {}

  async register(id: string, name: string, email: string) {
    const user = new User(id, name, email);
    await this.repository.save(user);
  }

  async getUser(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }
}
