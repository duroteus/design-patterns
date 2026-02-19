import { PaymentType } from "./payment.types";
import { PaymentGatewayFactory } from "./gateways/PaymentGatewayFactory";

export class PaymentService {
  constructor(private factory: PaymentGatewayFactory) {}

  process(type: PaymentType, amount: number) {
    const gateway = this.factory.createGateway(type);
    gateway.pay(amount);
  }
}
