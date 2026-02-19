import { Order } from "../problem";
import { DiscountStrategy } from "./DiscountStrategy";
import { BlackFridayDiscount } from "./BlackFridayDiscount";
import { PremiumDiscount } from "./PremiumDiscount";
import { NoDiscount } from "./NoDiscount";

export class DiscountStrategyFactory {
  static create(order: Order): DiscountStrategy {
    if (order.isBlackFriday) {
      return new BlackFridayDiscount();
    }

    if (order.customerType === "premium") {
      return new PremiumDiscount();
    }

    return new NoDiscount();
  }
}
