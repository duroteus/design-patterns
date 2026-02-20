import { Order } from "./Order";
import { InMemoryOrderRepository } from "./InMemoryOrderRepository";

export class CreateOrderUseCase {
  constructor(private repository: InMemoryOrderRepository) {}

  async execute(id: string) {
    const order = new Order(id, "pending");

    await this.repository.save(order);

    console.log("Order created with status:", order.status);
  }
}
