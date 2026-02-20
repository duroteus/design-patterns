# Dependency Injection

## Intent

Dependency Injection (DI) is a design technique where an object receives the dependencies it needs instead of creating them itself.

Rather than instantiating collaborators internally, dependencies are provided from the outside.

In simple terms:

> Objects should not construct what they use.

---

## The Problem

A common implementation tightly couples services to concrete implementations:

```ts
class UserService {
  private logger = new ConsoleLogger();

  createUser(name: string) {
    this.logger.log("Creating user: " + name);
  }
}
```

This seems simple but creates architectural issues.

---

### Issues with Hard-Coded Dependencies

#### Tight Coupling

`UserService` is now permanently bound to `ConsoleLogger`.

#### No Replaceability

Switching to a different logger requires modifying the service.

#### Hard Testing

Unit tests cannot isolate behavior without mocking internal construction

#### Infrastructure Leakage

High-level logic depends on low-level implementation details

---

### Solution: Dependency Injection

Instead of creating dependencies internally, the service receives them.

Define a contract:

```ts
interface Logger {
  log(message: string): void;
}
```

Service depends only on the abstraction:

```ts
class UserService {
  constructor(private logger: Logger) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
  }
}
```

Now the service does not know which logger is used.

---

### The Composition Root

A single place in application is responsible for creating and wiring objects.

```ts
const logger = new ConsoleLogger();
const userService = new UserService(logger);
```

This location is called the **composition root**.

Important rule:

> Object creation belongs in one place, not everywhere.

---

### What DI Achieves

Before:

```
UserService → ConsoleLogger
```

After:

```
UserService → Logger → Concrete Implementation
```

High-level modules no longer depend on low-level modules. <br>
Both depend on abstractions.

This is the **Dependency Inversion Principle (SOLID)**.

---

### Benefits

#### Replaceability

Implementations can be swapped without changing the service.

#### Testability

Fake implementations can be injected in tests.

#### Configurability

Different environments can use different implementations.

#### Separation of Concerns

Business logic is isolated from infrastructure.

---

### Example Replacement

Production:

```ts
new UserService(new ConsoleLogger());
```

Testing:

```ts
new UserService(new FakeLogger());
```

The service code remains unchanged.

---

### Dependency Injection vs DI Container

DI does not require a framework

Frameworks such as NestJS, Angular, and Spring provide **DI containers** that automate object wiring.

The pattern itself is simply:

> passing dependencies through constructor (or parameters).

Manual DI is often sufficient for small and medium systems.

---

### Constructor Injection

The most common and recommended form:

```ts
constructor(private logger: Logger) {}
```

Avoid internal instantiation:

```ts
private logger = new ConsoleLogger(); // anti-pattern
```

---

### When To Use

Use Dependency Injection when:

- classes depend on external services
- you want testable business logic
- implementations may vary
- architecture matters

### When NOT to Use

Avoid excessive abstraction when:

- the project is trivial
- the dependency will never change
- the added indirection harms readability

---

## Conclusion

Dependency Injection separates object behavior from object creation.

It enables flexible, testable, and maintainable architecture by ensuring:

> components depend on contracts, not implementations.
