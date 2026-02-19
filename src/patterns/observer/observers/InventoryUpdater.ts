import { OrderObserver } from "./OrderObserver";
import { Order } from "../order";

export class InventoryUpdater implements OrderObserver {
  update(order: Order): void {
    console.log("Updating inventory...");
  }
}
