import { DatabaseSingleton } from "./good";

export class UserService {
  private db = DatabaseSingleton.getInstance();

  getUser(id: number) {
    this.db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

export class OrderService {
  private db = DatabaseSingleton.getInstance();

  getOrder(id: number) {
    this.db.query(`SELECT * FROM orders WHERE id = ${id}`);
  }
}
