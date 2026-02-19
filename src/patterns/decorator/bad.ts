export class UserRepositoryWithEverything {
  private cache = new Map<string, string>();

  getUser(id: string): string {
    console.log("Logging access...");

    if (this.cache.has(id)) {
      console.log("Returning cached user");
      return this.cache.get(id)!;
    }

    console.log("Fetching user from database...");
    const user = `User-${id}`;

    this.cache.set(id, user);

    console.log("User fetched successfully");

    return user;
  }
}
