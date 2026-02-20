import { OrderCommand } from "./OrderCommand";
import { Order } from "../Order";

export class ConfirmOrderCommand implements OrderCommand {
  execute(order: Order): void {
    order.status = "confirmed";
    console.log("Order confirmed");
  }
}
