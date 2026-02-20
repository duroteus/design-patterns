import { OrderCommand } from "./OrderCommand";
import { ConfirmOrderCommand } from "./ConfirmOrderCommand";
import { CancelOrderCommand } from "./CancelOrderCommand";
import { ShipOrderCommand } from "./ShipOrderCommand";

export class OrderCommandFactory {
  static create(action: string): OrderCommand {
    switch (action) {
      case "confirm":
        return new ConfirmOrderCommand();

      case "cancel":
        return new CancelOrderCommand();

      case "ship":
        return new ShipOrderCommand();

      default:
        throw new Error("Unknown action");
    }
  }
}
