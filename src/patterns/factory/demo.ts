import { DefaultPaymentGatewayFactory } from "./gateways/DefaultPaymentGatewayFactory";
import { PaymentService } from "./good";

export function runFactoryGoodExample() {
  const factory = new DefaultPaymentGatewayFactory();
  const service = new PaymentService(factory);

  service.process("credit_card", 100);
  console.log("------");
  service.process("digital_wallet", 50);
}
