import { OrderCommand } from "./OrderCommand";
import { Order } from "../Order";

export class ShipOrderCommand implements OrderCommand {
  execute(order: Order): void {
    order.status = "shipped";
    console.log("Order shipped");
  }
}
