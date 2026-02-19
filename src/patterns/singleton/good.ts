import { FakeDatabaseConnection } from "./problem";

export class DatabaseSingleton {
  private static instance: FakeDatabaseConnection | null = null;

  private constructor() {} // impede new externo

  public static getInstance(): FakeDatabaseConnection {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new FakeDatabaseConnection();
    }

    return DatabaseSingleton.instance;
  }
}
