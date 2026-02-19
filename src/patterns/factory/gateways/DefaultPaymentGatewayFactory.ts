import { PaymentGatewayFactory } from "./PaymentGatewayFactory";
import { PaymentType } from "../payment.types";
import { PaymentGateway } from "./PaymentGateway";
import { CreditCardGateway } from "./CreditCardGateway";
import { DigitalWalletGateway } from "./DigitalWalletGateway";

export class DefaultPaymentGatewayFactory extends PaymentGatewayFactory {
  createGateway(type: PaymentType): PaymentGateway {
    if (type === "credit_card") {
      return new CreditCardGateway();
    }

    if (type === "digital_wallet") {
      return new DigitalWalletGateway();
    }

    throw new Error("Unsupported payment type");
  }
}
