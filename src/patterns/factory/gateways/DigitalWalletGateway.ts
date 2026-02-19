import { PaymentGateway } from "./PaymentGateway";

export class DigitalWalletGateway implements PaymentGateway {
  pay(amount: number): void {
    console.log("Redirecting to wallet provider...");
    console.log("Waiting for authorization...");
    console.log(`Payment of $${amount} approved (Digital Wallet)`);
  }
}
