import { OrderService } from "./good";
import { EmailNotifier } from "./observers/EmailNotifier";
import { InventoryUpdater } from "./observers/InventoryUpdater";
import { LoyaltyPoints } from "./observers/LoyaltyPoints";

export function runObserverGoodExample() {
  const service = new OrderService();

  service.subscribe(new EmailNotifier());
  service.subscribe(new InventoryUpdater());
  service.subscribe(new LoyaltyPoints());

  service.create({
    id: "123",
    customerEmail: "customer@email.com",
    total: 200,
  });
}
