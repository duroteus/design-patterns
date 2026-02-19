# Observer Pattern

## Intent

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.

In simple terms:

> One object publishes an event, and multiple other objects react to it without the publisher knowing who they are.

---

## The Problem

Consider an order processing system.

When an order is created, multiple side effects must occur:

- send confirmation email
- update inventory
- generate invoice
- add loyalty points
- notify external systems

A naive implementation places all responsibilities inside `OrderService`:

```
createOrder()
├─ sendEmail()
├─ updateInventory()
├─ generateInvoice()
└─ addLoyaltyPoints()
```

This works initially but creates serious architectural issues.

---

## Issues with the Naive Approach

### 1) High Coupling

`OrderService` becomes dependent on many unrelated components.

### 2) Single Responsibility Violation

The service is responsible for both:

- creating orders
- managing system reactions

### 3) Poor Extensibility

Adding a new reaction requires modifying `OrderService`.

### 4) Risk of Regression

Every change in a side effect risks breaking order creation.

---

## Solution: Observer Pattern

Instead of executing all reactions directly, the service **publishes an event**.

Interested components subscribe to that event and react independently.

The service no longer performs actions.  
It only announces that something happened.

---

## Participants

### Subject (Publisher)

`OrderService` acts as the subject.

It maintains a list of observers and notifies them when an order is created.

### Observer (Subscriber)

Any object implementing:

```ts
interface OrderObserver {
  update(order: Order): void;
}
```

can react to the event.

Examples:

- EmailNotifier
- InventoryUpdater
- LoyaltyPoints

---

### How It Works

**1.** Observers subscribe to the service.<br>
**2.** An order is created.<br>
**3.** The service notifies all observers.<br>
**4.** Each observer reacts independetly.<br>

Execution flow:

```ts
OrderService.create(order)
        ↓
notify()
        ↓
EmailNotifier.update(order)
InventoryUpdater.update(order)
LoyaltyPoints.update(order)
```

The service does not know what observers do.

---

### Benefits

#### Decoupling

The order service does not depend on notification, inventory, or loyalty systems.

#### Extensibility

New behaviors can be added without modifying existing code.

#### Testability

Observers can be tested independetly.

#### Maintainability

Side effects are isolated into separate components.

---

### Relationship with Event-Driver Archtecture

This project implements an **in-memory event dispatcher.**

In real systems, the same concepts is implemented using message brokers:

- Kafka
- RabbitMQ
- AWS SNS/SQS
- Google Pub/Sub

Conceptually:

```
Observer Pattern → local event notification
Message Broker → distributed event notification
```

The difference is infrastructure, not design.

---

### When to Use

Use Observer when:

- one action triggers multiple side effects
- you want to avoid coupling between components
- new reactions may be added in the future

Common real-world examples:

- order processing
- audit logging
- sending notifications
- cache invalidation
- analytics tracking

### When NOT to Use

Do not use Observer when:

- only one dependent action exists
- execution order must be strictly controlled
- strong transactional guarantees are required

---

## Conclusion

The Observer pattern decouples the producer of an event from its consumers.

It allows systems to grow by adding new reactions without modifying the original service.

The same architectural idea scales from a simple in-memory implementation to full event-driven distributed systems.
