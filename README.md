# Backend Design Patterns (Node.js & TypeScript)

A practical study of software design patterns implemented in Node.js and TypeScript, focused on real backend scenarios and architectural reasoning rather than academic definitions.

This repository demonstrates how design patterns emerge from real problems such as coupling, conditional complexity, and infrastructure leakage.

Each pattern includes:

- a realistic problem
- a naive implementation
- a refactored solution
- a runnable example
- architectural explanation

The goal is to show **when and why** a pattern should be used — not just how.

---

## How to Run

Clone the repository:

```bash
git clone <your-repo-url>
cd <repo>
npm install
```

Then run any pattern demo:

```bash
npm run dev
```

Each pattern contains its own `demo.ts`.

---

## Patterns Index

### Creational

| Pattern                                          | Purpose                    |
| ------------------------------------------------ | -------------------------- |
| [Singleton](src/patterns/singleton/README.md)    | Control resource lifecycle |
| [Factory Method](src/patterns/factory/README.md) | Delegate object creation   |

---

### Behavioral

| Pattern                                     | Purpose                      |
| ------------------------------------------- | ---------------------------- |
| [Strategy](src/patterns/strategy/README.md) | Encapsulate business rules   |
| [Observer](src/patterns/observer/README.md) | Event-driven reactions       |
| [Command](src/patterns/command/README.md)   | Represent actions as objects |

---

### Structural

| Pattern                                                             | Purpose                    |
| ------------------------------------------------------------------- | -------------------------- |
| [Decorator](src/patterns/decorator/README.md)                       | Add behavior dynamically   |
| [Adapter](src/patterns/adapter/README.md)                           | Integrate external systems |
| [Repository](src/patterns/repository/README.md)                     | Abstract persistence       |
| [Dependency Injection](src/patterns/dependency-injection/README.md) | Invert dependencies        |

---

## Architectural Focus

The examples emphasize:

- Open/Closed Principle
- Dependency Inversion
- Separation of Concerns
- Domain isolation from infrastructure

The repository intentionally avoids frameworks to make the design decisions explicit.

---

## Why No Frameworks?

Frameworks often hide architectural decisions behind abstractions.

This project implements the patterns manually to make the underlying design visible and understandable.

After understanding these patterns, frameworks like NestJS, Spring, or .NET become easier to reason about.

---

## Intended Audience

This repository is useful for:

- backend engineers preparing for technical interviews
- developers learning clean architecture concepts
- engineers transitioning from framework usage to design thinking

---

## Important Note

The implementations are intentionally simple and in-memory.

In production systems these same ideas typically scale into:

- message queues
- distributed systems
- dependency injection containers
- database adapters

The focus here is conceptual clarity, not infrastructure complexity.
