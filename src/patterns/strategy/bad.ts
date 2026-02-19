import { Order } from "./problem";

// All new rules:
//  - require editing the class
//  - changes existing behavior
//  - breaks old tests
//  - creates dependency between rules

// Worse:
// The rules start to interfere with each other
// The rules start to interfere with each other
// (order of ifs passes to import).
// This becomes an "improvised rule engine".

export class DiscountService {
  calculate(order: Order): number {
    // black friday has priority
    if (order.isBlackFriday) {
      return order.total * 0.7;
    }

    // coupon
    if (order.coupon) {
      return order.total - order.coupon;
    }

    // premium customer
    if (order.customerType === "premium") {
      return order.total * 0.9;
    }

    // wholesale
    if (order.quantity && order.quantity > 10) {
      return order.total * 0.85;
    }

    // default
    return order.total;
  }
}
