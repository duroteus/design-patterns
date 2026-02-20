# Repository Pattern

## Intent

The Repository pattern provides an abstraction over data persistence, allowing the domain to work with objects as if they were stored in memory collections.

Instead of the domain querying a database directly, it communicates with a repository that is responsible for retrieving and storing entities.

In simple terms:

> The domain should ask for entities, not for database operations.

---

## The Problem

A common backend implementation directly accesses the database inside services:

```ts
class UserService {
  async getUser(id: string) {
    return db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}
```

This approach works initially, but creates long-term architectural issues.

---

### Issues with Direct Database Access

#### Coupling to Infrastructure

The service becomes dependent on:

- SQL
- table structure
- connection details
- database driver

#### Fragile Code

Changing the database (PostgreSQL → MongoDB) requires rewriting business logic.

#### Hard Testing

Unit tests require a real database or complex mocks.

#### Leaking Persistence Concepts

Business logic starts to think in terms of rows, columns, and queries instead of domain concepts.

---

### Solution: Repository Pattern

We introduce a domain-oriented contract:

```ts
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

The service now depends only on the repository:

```ts
class UserService {
  constructor(private repository: UserRepository) {}

  async getUser(id: string) {
    return this.repository.findById(id);
  }
}
```

The service no longer knows anything about SQL or database drivers.

---

### Key Idea

A repository behaves like a collection of domain entities:

```ts
userRepository.findById("123");
```

Conceptually equivalent to:

```ts
usersInMemory.get("123");
```

The domain interacts with the repository as if the data were in memory.

Persistence becomes an implementation detail.

---

### Implementations

#### In-Memory Repository

Used for testing

```ts
class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async findById(id: string) {
    return this.users.get(id) ?? null;
  }

  async save(user: User) {
    this.users.set(user.id, user);
  }
}
```

#### Database Repository

Used in production:

```ts
class SqlUserRepository implements UserRepository {
  async findById(id: string) {
    // database query here
  }

  async save(user: User) {
    // database persistence
  }
}
```

---

### Repository vs DAO

This distinction is critical.

#### DAO (Data Access Object)

- database-oriented
- exposes queries
- speaks persistence language

Example:

```ts
selectUserByEmail(email);
insertUserRow(data);
```

#### Repository

- domain-oriented
- exposes domain operations
- speaks business language

Example:

```ts
findUserByEmail(email);
save(user);
```

The repository represents a collection of domain entities, not database rows.

---

### Relationship with ORMs

ORMs help mapping objects to databases, but they do not automatically solve domain coupling

Using ORM directly:

```ts
prisma.user.findUnique(...)
```

still exposes persistence concerns to the domain layer.

A proper architecture uses the ORM inside a repository implementation:

```ts
class PrismaUserRepository implements UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
```

Here:

- Repository = domain abstraction (port)
- ORM = infrastructure tool

---

### Repository and Adapter

In layered architecture:

```
Domain → Repository Interface → Repository Implementation → ORM → Database
```

The repository implementation acts as an **Adapter** between the domain model and the persistence mechanism.

The domain defines what it needs. <br>
The infrastructure adapts to it.

---

### Benefits

#### Decoupling

The domain does not depend on database technology.

#### Testability

Business logic can be tested using in-memory repositories.

#### Replaceability

The database can be replaced without rewriting domain services.

#### Stability

Schema or driver changes remain isolated in infrastructure.

---

### When To Use

Use Repository when:

- business logic is non-trivial
- the system has a domain layer
- testability is important
- persistence technology may change

Commom real-world scenarios:

- domain-driven design
- clean architecture
- applications with rich business rules

### When NOT to Use:

Avoid Repository when:

- the application is simples CRUD
- there is no real domain layer
- ORM usage is already minimal and stable

In these cases, a repository may become unnecessary boilerplate.

---

## Conclusion

The Repository pattern separates business logic from persistence.

It is not a wrapper around a database. <br>
It is a domain collection abstraction

Its purpose:

> The domain model should not know how data is stored — only how to obtain and persist entities.
