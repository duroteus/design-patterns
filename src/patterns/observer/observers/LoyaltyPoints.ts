import { OrderObserver } from "./OrderObserver";
import { Order } from "../order";

export class LoyaltyPoints implements OrderObserver {
  update(order: Order): void {
    console.log("Adding loyalty points...");
  }
}
