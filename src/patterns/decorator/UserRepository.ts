export interface UserRepository {
  getUser(id: string): string;
}

export class DatabaseUserRepository implements UserRepository {
  getUser(id: string): string {
    console.log("Fetching user from database...");
    return `User-${id}`;
  }
}
