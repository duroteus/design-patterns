import { OrderCommand } from "./OrderCommand";
import { Order } from "../Order";

export class CancelOrderCommand implements OrderCommand {
  execute(order: Order): void {
    order.status = "cancelled";
    console.log("Order cancelled");
  }
}
