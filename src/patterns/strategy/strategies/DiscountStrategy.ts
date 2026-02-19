import { Order } from "../problem";

export interface DiscountStrategy {
  apply(order: Order): number;
}
