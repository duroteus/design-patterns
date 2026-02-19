import { Order } from "./order";
import { OrderObserver } from "./observers/OrderObserver";

export class OrderService {
  private observers: OrderObserver[] = [];

  subscribe(observer: OrderObserver) {
    this.observers.push(observer);
  }

  private notify(order: Order) {
    for (const observer of this.observers) {
      observer.update(order);
    }
  }

  create(order: Order) {
    console.log(`Order ${order.id} created`);
    this.notify(order);
  }
}
