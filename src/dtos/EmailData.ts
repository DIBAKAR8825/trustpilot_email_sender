import { Customer } from '../domain/Customer';

export class EmailData {
  public readonly to: string;
  public readonly subject: string;
  public readonly text: string;

  /**
   * Constructs the email payload from a Customer domain object.
   * Formats the content for Trustpilot AFS extraction:
   * - "To" header includes full name for personalization
   * - Subject includes order ID (AFS uses this as a reference)
   * - Body is plain-text and structured for easy parsing
   */
  constructor(customer: Customer) {
    // Email recipient in "Name <email>" format
    this.to = `${customer.name} <${customer.email}>`;

    // Subject includes reference/order ID for Trustpilot tracking
    this.subject = `Your Purchase Experience - ORDER#${customer.orderId}`;

    // Plain text body (AFS parses this format reliably)
    this.text = `Email: ${customer.email}
                Name: ${customer.name}
                Reference: ${customer.orderId}`;
  }
}