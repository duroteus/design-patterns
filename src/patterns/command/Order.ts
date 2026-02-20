export class Order {
  constructor(
    public id: string,
    public status:
      | "pending"
      | "confirmed"
      | "cancelled"
      | "shipped"
      | "refunded",
  ) {}
}
