# Adapter Pattern

## Intent

The Adapter pattern allows two incompatible interfaces to work together.

It converts the interface of a class into another interface that the application expects.

In simple terms:

> The system keeps its own contract, and the adapter translates external components to it.

---

## The Problem

An application often depends on external systems:

- email providers
- payment gateways
- storage services
- third-party APIs
- legacy libraries

Your system expects a specific interface:

```ts
interface NotificationService {
  send(message: string): void;
}
```

However, an external provider exposes a different API:

```ts
dispatchEmail({ content: string });
```

There interfaces are incompatible.

A naive solution is to call the external SDK directly from the service layer.

---

### Issues with the Naive Approach

#### Tight Coupling

Business logic becomes dependent on a specific provider.

#### Fragile Code

Switching providers requires changes across multiple files.

#### Hard Testing

Unit tests require mocking a third-party SDK.

#### Infrastructure Leakage

Technical details (payload shape, parameters, protocols) spread into the domain layer.

---

### Solution: Adapter Pattern

We introduce an adapter that implements the interface expected by the system but internally delegates to the external service.

```ts
class EmailServiceAdapter implements NotificationService {
    contructor(private external: ExternalEmailService) {}

    send(message: string): void {
        this.external.dispatchEmail({content: message})
    }
}
```

The application communicates only with `NotificationService`.

The adapter handles translation.

---

### How It Works

```
Application → Interface → Adapter → External Provider
```

The domain never depends on the provider directly.

---

### Benefits

#### Decoupling

The domain layer does not depend on third-party libraries.

#### Replacebility

Providers can be swapped without affecting business logic.

#### Testability

Tests mock the interface, not the SDK.

#### Stability

External API changes are isolated to a single file.

---

### Provider Change

If a new provider appears:

```ts
sendMail(text: string, priority: number)
```

We do **not** change the domain interface.

We create a new adapter:

```ts
class NewEmailServiceAdapter implements NotificationService {
    contructor(private external: NewEmailProvider) {}

    send(message: string) {
        const priority = 1; //infrastructure decision
        this.external.sendMail(message, priority)
    }
}
```

Only the adapter changes.

---

### When the Interface Should Change

If the application itself introduces a new business rule:

> "critical notifications must be treated differently"

then the domain interface evolves:

```ts
send(message: string, level: "normal" | "critical")
```

The adapter translates the semantic rule to provider-specific parameters.

Important distinction:

- Provider requirement → Adapter change
- Business requirement → Interface change

---

### When To Use

Use Adapter when:

- integrating thid-party services
- consuming legacy systems
- working with incompatible libraries
- protecting the domain from infrastructure details

Common real-world examples:

- payment gateway
- cloud storage
- email providers
- database drivers
- REST/GraphQL clients

---

### Relationship with Architecture

The adapter pattern is a building block of:

- Hexagonal Architecture
- Ports and Adapters
- Clean Architecture
- Anti-Corruption Layer (DDD)

In these architectures:

```
Port  → interface defined by the domain
Adapter → implementation for an external system
```

---

### When NOT to Use

Do not use Adapter when:

- you fully control both sides of the interface
- no translation is required
- there is no external dependency

Otherwise, it adds unnecessary indirection.

---

## Conclusion

The Adapter pattern isolates the domain model from external systems.

It does not prevent change. <br>
It localizes change.

Its core purpose:

> External systems should adapt to your application - not the opposite.
