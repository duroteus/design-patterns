import { DiscountService } from "./bad";
import { DiscountCalculator } from "./good";

export function runStrategyBadExample() {
  const service = new DiscountService();

  console.log(
    "Regular:",
    service.calculate({
      customerType: "regular",
      total: 100,
    }),
  );

  console.log(
    "Premium:",
    service.calculate({
      customerType: "premium",
      total: 100,
    }),
  );

  console.log(
    "Black Friday:",
    service.calculate({
      customerType: "regular",
      total: 100,
      isBlackFriday: true,
    }),
  );
}

export function runStrategyGoodExample() {
  const calculator = new DiscountCalculator();
  console.log(
    "Regular:",
    calculator.calculate({ customerType: "regular", total: 100 }),
  );

  console.log(
    "Premium:",
    calculator.calculate({ customerType: "premium", total: 100 }),
  );

  console.log(
    "Black Friday:",
    calculator.calculate({
      customerType: "regular",
      total: 100,
      isBlackFriday: true,
    }),
  );
}
