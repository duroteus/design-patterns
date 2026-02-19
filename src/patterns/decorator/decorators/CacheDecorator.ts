import { UserRepository } from "../UserRepository";

export class CacheDecorator implements UserRepository {
  private cache = new Map<string, string>();

  constructor(private repository: UserRepository) {}

  getUser(id: string): string {
    if (this.cache.has(id)) {
      console.log("Returning cached user");
      return this.cache.get(id)!;
    }

    const user = this.repository.getUser(id);
    this.cache.set(id, user);

    return user;
  }
}
