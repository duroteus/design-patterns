import { UserRepository } from "../UserRepository";

export class LoggingDecorator implements UserRepository {
  constructor(private repository: UserRepository) {}

  getUser(id: string): string {
    console.log("Logging access...");
    const result = this.repository.getUser(id);
    console.log("User fetched successfully");
    return result;
  }
}
