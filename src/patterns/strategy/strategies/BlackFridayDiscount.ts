import { DiscountStrategy } from "./DiscountStrategy";
import { Order } from "../problem";

export class BlackFridayDiscount implements DiscountStrategy {
  apply(order: Order): number {
    return order.total * 0.7;
  }
}
