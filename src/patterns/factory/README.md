# Factory Method Pattern

## Intent

The Factory Method pattern defines an interface for creating an object, but lets subclasses or specialized creators decide which concrete class to instantiate.

Its primary goal is **not object creation itself**, but the removal of conditional construction logic from business logic.

In other words:

> Business logic should not decide which concrete implementation it depends on.

---

## The Problem

Consider a payment processing service.

Initially, the system supports only two payment methods:

- Credit Card
- Digital Wallet

A straightforward implementation often looks like this:

```ts
if (type === "credit_card") {
  // handle credit card
}

if (type === "digital_wallet") {
  // handle wallet
}
```

This works at first.

However, as the system evolves, new payment providers are added:

- PayPal
- Stripe
- Apple Pay
- Google Pay
- Regional gateways

The service responsible for processing payments grows continuously.

### Consequences

The PaymentService becomes:

- tightly coupled to concrete implementations
- large and difficult to maintain
- hard to test
- risky to modify

Most importantly, it violates the **Open/Closed Principle**:

> Software entities should be open for extension, but closed for modification.

Every new payment type requires editing existing code.

---

### Anti-Pattern (Conditional Construction)

In the naive implementation, the service both:

**1.** decides which payment method to use <br>
**2.** executes the payment logic

This mixes responsabilities:

- business orchestration
- object creation
- provider-specific behavior

This is a form of **control coupling**.

---

### Solution: Factory Method

We introduce an abstraction:

```ts
interface PaymentGateway {
  pay(amount: number): void;
}
```

Concrete implementations encapsulate provider-specific behavior:

- `CreditCardGateway`
- `DigitalWalleyGateway`

This service now depends only on the abstraction.

However, we still need a way to obtain the correct implementation.
This responsability is moved to a **factory**.

---

### The Factory

The factory centralizes object creation:

```ts
abstract class PaymentGatewayFactory {
  abstract createGateway(type: PaymentType): PaymentGateway;
}
```

A concrete factory implements the creation logic:

```ts
class DefaultPaymentGatewayFactory extends PaymentGatewayFactory {
  createGateway(type: PaymentType): PaymentGateway {
    if (type === "credit_card") {
      return new CreditCardGateway();
    }

    if (type === "digital_wallet") {
      return new DigitalWalletGateway();
    }

    throw new Error("Unsupported payment type");
  }
}
```

The conditional logic still exists, but now it lives in the correct place: <br>
**the constrctuion layer, not the business layer.**

---

### Refactored Service

The `PaymentService` no longer instantiates concrete classes:

```ts
class PaymentService {
    constrcutor(private factory: PaymentGatewayFactory) {}

    process(type: PaymentType, amount: number) {
        const gateway = this.factory.createGateway(type);
        gateway.pay(amount);
    }
}
```

Now the service:

- depends only on an interface
- is closed for modification
- is open for extension

---

### Benefits

#### 1) Separation of Concerns

The service orchestrates behavior
The factory handles creation

#### 2) Reduced Coupling

The service does not know about specific payment providers.

#### 3) Extensibility

Adding new provider does not require modifying `PaymentService`.

#### 4) Testability

You can inject a mock factory or mock gateway in unit tests.

#### 5) Compliance with Open/Closed Principle

New behavior is added through new classes, not modifications.

---

### Adding a New Payment Provider

To add `AppleGateway`, you only:

**1.** Create a new class implementing `PaymentGateway`. <br>
**2.** Update the factory.

The `PaymentService` remains unchanged.

This significantly reduces regression risk.

---

### When to Use

Use Factory Method when:

- object creation depends on a type, configuration, or runtime parameter
- you have repeated if/switch statements creating objects
- the service should not know concrete implementations
- new implementations are expected to be added over time

Commom real-worl examples:

- payment providers
- notification providers (email, SMS, push)
- file parsers (CSV, JSON, XML)
- database drivers
- cloud storage providers (S3, GCS, Azure Blob)

---

### When NOT to Use

Do not use Factory Method when:

- only one concrete implementation will ever exist
- object creation is trivial
- there is no variation in behavior

Otherwise, it adds unnecessary indirection.

---

### Relationship with Dependency Injection

Factory Method and Dependecy Injection are complementary.

Factory Method:

> decides which object to create

Dependecy Injection:

> decides who provides the factory

In many frameworks, a DI container internally uses factories.

---

### Conclusion

The Factory Method pattern moves object creation out of business logic and into a dedicated construction layer.

It does not simplify behavior immediately. <br>
Instead, it simplifies **future change**.

The main value of the pattern is architectural:

> The system can grow in features whithout increasing modification risk in core services.
