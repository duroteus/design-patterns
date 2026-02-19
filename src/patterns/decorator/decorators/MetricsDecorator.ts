import { UserRepository } from "../UserRepository";

export class MetricsDecorator implements UserRepository {
  constructor(private repository: UserRepository) {}

  getUser(id: string): string {
    console.log("Measuring performance...");
    const start = performance.now();
    const result = this.repository.getUser(id);
    const end = performance.now();
    console.log(`User fetched in ${(end - start).toFixed(3)}ms`);
    return result;
  }
}
