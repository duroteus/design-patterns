import { InMemoryOrderRepository } from "./InMemoryOrderRepository";
import { CreateOrderUseCase } from "./CreateOrderUseCase";
import { ExecuteOrderActionUseCase } from "./ExecuteOrderActionUseCase";
import { OrderProcessor } from "./good";

export async function runCommandExample() {
  const repository = new InMemoryOrderRepository();
  const processor = new OrderProcessor();

  const createOrder = new CreateOrderUseCase(repository);
  const executeAction = new ExecuteOrderActionUseCase(repository, processor);

  // ----- request 1 -----
  console.log("\n--- POST /orders ---");
  await createOrder.execute("1");

  // ----- request 2 -----
  console.log("\n--- POST /orders/1/actions { action: 'confirm' } ---");
  await executeAction.execute("1", "confirm");

  // ----- request 3 -----
  console.log("\n--- POST /orders/1/actions { action: 'ship' } ---");
  await executeAction.execute("1", "ship");
}
