import { PaymentType } from "./payment.types";

export class PaymentService {
  process(type: PaymentType, amount: number) {
    if (type === "credit_card") {
      console.log("Validating card data...");
      console.log("Contacting card network...");
      console.log(`Payment of $${amount} approved (Credit Card)`);
      return;
    }

    if (type === "digital_wallet") {
      console.log("Redirecting to wallet provider...");
      console.log("Waiting for authorization...");
      console.log(`Payment of $${amount} approved (Digital Wallet)`);
      return;
    }

    throw new Error("Unsupported payment type");
  }
}
