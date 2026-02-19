import { FakeDatabaseConnection } from "./problem";

export class UserService {
  private db = new FakeDatabaseConnection();

  getUser(id: number) {
    this.db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

export class OrderService {
  private db = new FakeDatabaseConnection();

  getOrder(id: number) {
    this.db.query(`SELECT * FROM orders WHERE id = ${id}`);
  }
}
