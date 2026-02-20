import { Order } from "../Order";

export interface OrderCommand {
  execute(order: Order): void;
}
