import { InMemoryOrderRepository } from "./InMemoryOrderRepository";
import { OrderCommandFactory } from "./commands/OrderCommandFactory";
import { OrderProcessor } from "./good";

export class ExecuteOrderActionUseCase {
  constructor(
    private repository: InMemoryOrderRepository,
    private processor: OrderProcessor,
  ) {}

  async execute(orderId: string, action: string) {
    const order = await this.repository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const command = OrderCommandFactory.create(action);

    this.processor.process(order, command);

    await this.repository.save(order);

    console.log("Order new status:", order.status);
  }
}
