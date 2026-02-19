import { Order } from "./problem";
import { DiscountStrategyFactory } from "./strategies/DiscountStrategyFactory";

export class DiscountCalculator {
  calculate(order: Order): number {
    return DiscountStrategyFactory.create(order).apply(order);
  }
}
