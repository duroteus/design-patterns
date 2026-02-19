import { CustomerType } from "./types";

export interface Order {
  customerType: CustomerType;
  total: number;
  coupon?: number;
  isBlackFriday?: boolean;
  quantity?: number;
}
