# Strategy Pattern

## Intent

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

The pattern allows an object to change its behavior at runtime without modifying its code.

In simple terms:

> The object that uses the algorithm should not implement the algorithm.

---

## The Problem

Consider an e-commerce system responsible for calculating order totals after discounts.

Business rules evolve over time:

- regular customers: no discount
- premium customers: 10% discount
- Black Friday: 30% discount
- coupons: variable value
- bulk purchase: quantity-based discount

A common implementation is a single service containing multiple conditional rules:

```ts
if (order.isBlackFriday) ...
if (order.coupon) ...
if (order.customerType === "premium") ...
if (order.quantity > 10) ...
```

Initially, this works. <br>
However, as rules grow, the service becomes complex and fragile.

---

## Issues with Conditional Logic

#### 1) Violation of the Open/Closed Principle

Every new discount rule requires modifying existing code.

This increases the risk of regressions.

---

#### 2) Rule Interference

The order of conditions becomes significant:

Black Friday vs Coupon vs Premium

Changing one rule may silently alter another rule's behavior.

---

#### 3) Low Testability

Testing individual rules becomes difficult because all rules are coupled inside one class.

---

#### 4) Business Logic Leaks to the Application Layer

Controllers (or routes) often start deciding which rule to apply:

```ts
if (user.isPremium) {
  calculator = new DiscountCalculator(new PremiumDiscount());
}
```

Now the application layer contains business policy decisions.

---

## Solution: Strategy Pattern

Instead of embedding all algorithms in one class, each discount rule becomes its own class implementing a common interface.

```ts
interface DiscountStrategy {
  apply(order: Order): number;
}
```

Each algorithm is now isolated and independent.

---

### Concrete Strategies

Examples:

- `NoDiscount`
- `PremiumDiscount`
- `BlackFridayDiscount`

Example:

```ts
class PremiumDiscount implements DiscountStrategy {
  apply(order: Order): number {
    return order.total * 0.9;
  }
}
```

Each class contains only its own rule.

---

### The Context

The context is the object that uses the algorithm:

```ts
class DiscountCalculator {
  constructor(private strategy: DiscountStrategy) {}

  calculate(order: Order): number {
    return this.strategy.apply(order);
  }
}
```

The calculator does not know **how** the discount works. <br>
It only knows **that a discount strategy exists**.

---

### The Remaining Problem

If the caller must manually select the strategy:

```ts
new DiscountCalculator(new PremiumDiscount());
```

then the business rule still lives outside the domain.

We removed conditionals from the service, but moved them into the controller.

---

### Strategy + Factory Method

To prevent business rules from leaking into the application layer, we introduce a factory responsible for selecting the strategy.

```ts
class DiscountStrategyFactory {
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
```

Now the calculator delegates strategy selection:

```ts
class DiscountCalculator {
  calculate(order: Order): number {
    const strategy = DiscountStrategyFactory.create(order);
    return strategy.apply(order);
  }
}
```

The caller simply does:

```ts
calculator.calculate(order);
```

No rule knowledge is required.

---

### Archtectural Result

We now have a layered responsibility:

```scss
Application Layer (controller)
        ↓
Domain Service (calculator)
        ↓
Factory (policy selection)
        ↓
Strategy (policy execution)
```

Business decisions remain inside the domain.

---

### Benefits

#### 1) Isolation of Algorithms

Each rule is independent and self-contained.

#### 2) High Testability

Each strategy can be unit tested separately

#### 3) Open/Closed Principle

New discount rules can be added without modifying existing code.

#### 4) No Conditional Explosion

Large `if/switch` blocks disappear from business services.

#### 5) Proper Layering

Controllers no longer contain business rules.

---

### When to Use

Use Strategy when:

- multiple algorithms perform the same role
- behavior must change at runtime
- you have large conditional blocks based on type, flags or configuration
- business rules change frequently

Commom real-world examples:

- shipping cost calculation
- authentication methods (OAuth, API Key, Basic Auth)
- sorting or ranking algorithms
- tax calculation
- compression algorithms
- pricing policies

### When NOT to Use

Do not use Strategy when:

- there is only one behavior
- algorithms are trivial
- behavior is unlikely to change

Otherwise, the added abstraction becomes unnecessary complexity.

---

### Relationship with Factory Method

Factory Method and Strategy are commonly used together.

Factory Method:

> decides which algorithm should be used.

Strategy:

> executes the selected algorithm.

Factory centralizes business policy selection. <br>
Strategy encapsulates business policy execution.

---

## Conclusion

The Strategy pattern removes business rules from core services by encapsulating behavior into interchangeable objects.

When combined with a Factory, it also prevents business logic from leaking into controllers.

The main value is architectural:

> The system can evolve business policies safely without modifying existing services or application entry points.
