import { Order } from "../order";

export interface OrderObserver {
  update(order: Order): void;
}
