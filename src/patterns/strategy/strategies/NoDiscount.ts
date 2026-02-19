import { DiscountStrategy } from "./DiscountStrategy";
import { Order } from "../problem";

export class NoDiscount implements DiscountStrategy {
  apply(order: Order): number {
    return order.total;
  }
}
