import { Order } from "./Order";
import { OrderCommand } from "./commands/OrderCommand";

export class OrderProcessor {
  process(order: Order, command: OrderCommand) {
    command.execute(order);
  }
}
