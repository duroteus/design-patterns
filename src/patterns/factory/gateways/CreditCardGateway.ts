import { PaymentGateway } from "./PaymentGateway";

export class CreditCardGateway implements PaymentGateway {
  pay(amount: number): void {
    console.log("Validating card data...");
    console.log("Contacting card network...");
    console.log(`Payment of $${amount} approved (Credit Card)`);
  }
}
