import { PaymentType } from "../payment.types";
import { PaymentGateway } from "./PaymentGateway";

export abstract class PaymentGatewayFactory {
  abstract createGateway(type: PaymentType): PaymentGateway;
}
