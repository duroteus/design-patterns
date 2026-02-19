import { db } from "./moduleSingleton";

// this way seems to be a good practice, but it's not
// because we are not using the Singleton pattern, we are using the module cache
// so we are not controlling the instance of the database

export class UserService {
  getUser(id: number) {
    db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

export class OrderService {
  getOrder(id: number) {
    db.query(`SELECT * FROM orders WHERE id = ${id}`);
  }
}
