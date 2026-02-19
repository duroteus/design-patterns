import { UserService, OrderService } from "./services";

export function runBadExample() {
  const userService = new UserService();
  const orderService = new OrderService();

  userService.getUser(1);
  orderService.getOrder(10);
}
