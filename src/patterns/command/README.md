# Command Pattern

## Intent

The Command pattern encapsulates a request as an object, allowing the system to parameterize, queue, log, and execute actions independently from the caller.

Instead of invoking behavior directly, the system creates an object representing an intention and sends it to a handler.

In simple terms:

> A command represents "something the system should do".

---

## The Problem

Consider an order management system.

Orders already exist in the database and can receive actions:

- confirm
- cancel
- ship
- refund

A common implementation is:

```ts
orderService.handle(order, action);
```

Internally:

```ts
switch(action) {
    case "confirm":
        order.status = "confirmed";
        break;
    case "cancel":
        order.status = "cancelled";
        break;
    ...
}
```

This works initially but quickly becomes problematic.

---

### Issues with the Naive Approach

#### Conditional Explosion

Each new action increases the size of the switch statement.

#### Open/Closed Violation

Adding a new action requires modifying existing code.

#### Low Testability

Actions cannot be tested independently.

#### Coupling

Controllers and services must understand how each action behaves.

#### No Execution Control

It becomes impossible to:

- queue actions
- retry actions
- log actions
- audit history

---

### Key Observation

There are two different concepts:

| Concept     | Meaning                                    |
| ----------- | ------------------------------------------ |
| Order state | current data (e.g. `pending`)              |
| Action      | intention to change state (e.g. `confirm`) |

The system must interpret an external intention and apply it to an existing entity.

---

### Solution: Command Pattern

Instead of passing a string action, we create an object representing the action.

Command interface:

```ts
interface OrderCommand {
  execute(order: Order): void;
}
```

Concrete commands:

- `ConfirmOrderCommand`
- `CancelOrderCommand`
- `ShipOrderCommand`

Example:

```ts
class ConfirmOrderCommand implements OrderCommand {
  execute(order: Order): void {
    order.status = "confirmed";
  }
}
```

Now behavior lives inside the command.

---

### Command Execution Flow

```
External request → Command → Domain entity
```

Example:

```ts
const command = new ConfirmOrderCommand();
processor.process(order, command);
```

The processor does not know what the command does.

---

### Using a Factory

External inputs (HTTP, queue messages, webhooks) provide strings:

```json
{ "action": "confirm" }
```

We translate the input into a command:

```ts
const command = OrderCommandFactory.create(action);
```

The factory isolates mapping logic.

---

### Complete Flow (Simulated Backend)

**1.** Create order

```json
// POST /orders
Order(id=1, status=pending)
```

**2.** Execute action

```json
// POST /orders/1/actions
{ "action": "confirm" }
```

Execution:

```
Load order → Create command → Execute command → Save order
```

---

### Architectural Structure

```
Controller / Queue
        ↓
Use Case
        ↓
CommandFactory
        ↓
Command
        ↓
Domain Entity
        ↓
Repository
```

The domain never interprets strings.

The application never implements business behavior.

---

### Benefits

#### Open/Closed Principle

New actions require new command classes only.

#### Decoupling

Callers do not know how actions are implemented.

#### Testability

Each command can be unit tested independently.

#### Queue Compatibility

Commands can be serialized and executed later.

#### Auditing

Commands represent business intentions and can be logged.

#### Retry Capability

A failed command can be re-executed safely.

---

### Command vs Strategy

They look similar but serve different purposes.

#### Strategy

- chooses an algorithm
- same opreation, different implementations

#### Command

- represents an intention
- different operations on the same entity

Example:

| Pattern  | Example                 |
| -------- | ----------------------- |
| Strategy | Calculate shipping cost |
| Command  | Cancel an order         |

---

### Real-World Usage

The Command pattern is the foundation of:

- job queues (BullMQ, SQS workers)
- CQRS command handlers
- background jobs
- webhook processors
- admin actions

Typical worker:

```ts
const command = OrderCommandFactory.create(message.type);
command.execute(order);
```

---

### When to Use

Use Command when:

- external inputs request actions
- operations must be logged or queued
- behavior must be extendable
- actions should be independent units

### When NOT to Use

Avoid Command when:

- there is only one simple action
- no need for extensibility or decoupling
- the action is purely internal

Otherwise it adds unnecessary complexity.

---

## Conclusion

The Command pattern turns actions into first-class objects.

It separates the request for an anction from the execution of the action.

Its real value:

> The system handles intentions instead of conditional logic.
