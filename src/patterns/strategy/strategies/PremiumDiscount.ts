import { DiscountStrategy } from "./DiscountStrategy";
import { Order } from "../problem";

export class PremiumDiscount implements DiscountStrategy {
  apply(order: Order): number {
    return order.total * 0.9;
  }
}
