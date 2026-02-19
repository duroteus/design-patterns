# Decorator Pattern

## Intent

The Decorator pattern allows behavior to be added to an individual object dynamically without modifying its original implementation.

Instead of changing a class or using inheritance, the object is wrapped by other objects that implement the same interface and extend its behavior.

In simple terms:

> Keep the original behavior, but attach additional responsibilities around it.

---

## The Problem

Consider a repository responsible for retrieving users from a database:

```ts
getUser(id);
```

Over time, new requirements appear:

- logging access
- caching results
- measuring execution time
- retrying failures

A naive implementation puts everything inside the repository:

```ts
class UserRepository {
  getUser(id: string) {
    log();
    checkCache();
    queryDatabase();
    saveCache();
    measureTime();
  }
}
```

This creates a growing list of responsabilities inside a single class.

---

Issues with the Naive Approach

#### 1) Single Responsibility Violation

The repository is no longer responsible only for data access.

#### 2) Rigid Design

Removing or changing a behavior requires editing the class.

#### 3) Poor Reusability

You cannot reuse logging or caching independently.

#### 4) Inheritance Explosion

A commom attempt is subclassing:

```
CachedUserRepository
LoggedUserRepository
CachedAndLoggedUserRepository
LoggedAndCachedWithMetricsUserRepository
```

This quickly becomes unmanageable.

---

### Solution: Decorator Pattern

Instead of modifying the repository, we wrap it with other objects implementing the same interface.

Base contract:

```ts
interface UserRepository {
  getUser(id: string): string;
}
```

Concrete implementation:

```ts
class DatabaseUserRepository implements UserRepository {
  getUser(id: string): string {
    console.log("Fetching user from database...");
    return `User-${id}`;
  }
}
```

---

### The Decorator

A decorator implements the same interface and holds a reference to another `UserRepository`.

```ts
class LoggingDecorator implements UserRepository {
  constructor(private repository: UserRepository) {}

  getUser(id: string): string {
    console.log("Logging access...");
    const result = this.repository.getUser(id);
    console.log("User fetched sucessfully");
    return result;
  }
}
```

The original repository remains unchanged

---

### Stacking Decorators

Multiple decorators can be combined:

```ts
const repo = new LoggingDecorator(
  new CacheDecorator(new DatabaseUserRepository()),
);
```

Execution flow:

```
LoggingDecorator
    ↓
CacheDecorator
    ↓
DatabaseUserRepository
```

Each layer adds behavior before or after the call.

---

### Benefits

#### Composition over Inheritance

Behavior is extended through object composition, not subclassing.

#### Open/Closed Principle

New behaviors can be added without modifying existing code.

#### Reusability

Decorators can be combined in different configurations.

#### Testability

Each decorator can be tested independently.

#### Runtime Flexibility

Behavior can be added or removed dynamically.

---

### When to Use

Use decorators when:

- you need to add cross-cutting behavior
- the base class should remain unchanged
- multiple optional features exist
- inheritance would create many subclasses

Common real-world examples:

- caching
- logging
- retry mechanisms
- authorization checks
- performance metrics
- tracing/instrumentation

### When NOT to Use

Do not use Decorator when:

- behavior never changes
- only one variation exists
- the added abstraction adds more complexity than value

---

### Relationship with Middleware and Interceptors

The Decorator pattern is conceptually similar to middleware pipelines and interceptors.

Examples:

- Express middleware
- NestJS interceptors
- Axios interceptors
- OpenTelemetry instrumentation

These systems wrap a core operation and add behavior before and after execution.

The difference

```
Decorator → wraps an object
Middleware → wraps a request flow
```

---

### Architectural Role

Decorators are typically applied at the infrastructure boundary, not inside business rules.

Examples:

- caching repositories
- logging external API clients
- retrying network calls

They enhance capabilities without affecting domain logic.

---

## Conclusion

The Decorator pattern enables systems to evolve by layering behavior around existing components.

It avoids subclass proliferation and keeps core components simple and focused.

Its key principle:

> Extend behavior without modifying existing code.
