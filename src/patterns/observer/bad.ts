import { Order } from "./order";

export class OrderService {
  create(order: Order) {
    console.log(`Order ${order.id} created`);

    this.sendEmail(order);
    this.updateInventory(order);
    this.generateInvoice(order);
    this.addLoyaltyPoints(order);
  }

  private sendEmail(order: Order) {
    console.log(`Sending confirmation email to ${order.customerEmail}`);
  }

  private updateInventory(order: Order) {
    console.log("Updating inventory...");
  }

  private generateInvoice(order: Order) {
    console.log("Generating invoice...");
  }

  private addLoyaltyPoints(order: Order) {
    console.log("Adding loyalty points...");
  }
}
