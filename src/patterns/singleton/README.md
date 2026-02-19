## Singleton Pattern

### Problem

In backend systems it is common for multiple services to access the same infrastructure resource: a database, Redis cache, message broker, external API, etc.

In this directory we simulate a database:

- opening a connection is expensive
- each instance represents a new connection
- multiple simultaneous connections degrade or even crash the service

**Naive implementation:**
Each service creates its own connection.

**Consequence:**
the number of connections grows proportionally to the number of created objects.

This violates an important distributed-systems principle:

> Infrastructure resources must not be instantiated by their consumers.

---

### First attempt: Module Cache (Pseudo-Singleton)

Node.js keeps a cache of loaded modules.

When we do:

```ts
export const db = new FakeDatabaseConnection();
```

every import receives the same instance.

However, this works **only inside the same process**.

---

### Limitation

In production, Node applications rarely run as a single process:

- cluster
- PM2
- replicated containers
- workers
- serverless

Each process has its own memory heap.

Therefore we actually get:

```bash
process A -> connection 1
process B -> connection 2
process C -> connection 3
```

In other words, module caching creates a:

**singleton per process, not per application.**

Additionally, the connection lifecycle becomes implicit and uncontrollable.

---

### Solution: Explicit Singleton

We create a class responsible for:

- controlling creation
- preventing multiple instances
- initializing on demand (lazy initialization)

```ts
class DatabaseSingleton {
  private static instance: FakeDatabaseConnection | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new FakeDatabaseConnection();
    }
    return this.instance;
  }
}
```

Now all consumers depend on an explicit access point.

---

### Benefits

- a single connection per process
- lazy initialization
- lifecycle control
- ability to add:
  - automatic reconnection
  - pooling
  - metrics
  - circuit breaker
  - health checks

---

### When to use

Use a Singleton when there is:

- an expensive-to-create resource
- a shared resource
- lifecycle management requirements

**Real examples:**

- database connections
- Redis clients
- messaging clients (RabbitMQ / Kafka)
- external SDK clients (Stripe, AWS SDK wrappers)

---

### When NOT to use

- business logic
- domain services
- data repositories

In these cases the correct approach is **Dependency Injection**.

---

### Important Note (Node.js)

The Singleton does not solve multiple processes.

If the application runs with 4 workers, there will still be 4 connections.

The role of the Singleton is to prevent multiple connections **inside the same process**.
Global control must be handled by the database itself (connection pooling / connection limits).

---

### Conclusion

The goal of the Singleton is not “to guarantee only one instance in the entire system”, but:

**To centralize and control access to a shared resource within a given execution context.**

In Node.js, relying solely on module caching is an implementation detail, not an architectural contract.
