import { OrderObserver } from "./OrderObserver";
import { Order } from "../order";

export class EmailNotifier implements OrderObserver {
  update(order: Order): void {
    console.log(`Sending confirmation email to ${order.customerEmail}`);
  }
}
