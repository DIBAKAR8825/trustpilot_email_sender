/**
 * Represents a customer who placed an order.
 * This is a Value Object in the domain layer.
 */
export class Customer {
  /** The full name of the customer */
  public readonly name: string;

  /** The email address of the customer */
  public readonly email: string;

  /** The unique order ID related to the customer's purchase */
  public readonly orderId: string;

  /**
   * Creates a new Customer instance.
   * Validates that all required fields are provided.
   *
   * @param name - Full name of the customer
   * @param email - Email address of the customer
   * @param orderId - Associated order ID for the purchase
   * @throws Will throw an error if any parameter is missing
   */
  constructor(name: string, email: string, orderId: string) {
    if (!name || !email || !orderId) {
      throw new Error('Customer requires name, email, and orderId');
    }

    this.name = name;
    this.email = email;
    this.orderId = orderId;
  }
}
