import { Order } from "./Order";

export class OrderService {
  handle(order: Order, action: string) {
    switch (action) {
      case "confirm":
        order.status = "confirmed";
        console.log("Order confirmed");
        break;

      case "cancel":
        order.status = "cancelled";
        console.log("Order cancelled");
        break;

      case "ship":
        order.status = "shipped";
        console.log("Order shipped");
        break;

      case "refund":
        order.status = "refunded";
        console.log("Order refunded");
        break;

      default:
        throw new Error("Invalid action");
    }
  }
}
