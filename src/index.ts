import { Customer } from './domain/Customer';
import { EmailData } from './dtos/EmailData';
import { EmailService } from './services/EmailService';

// Load customer data from JSON file (assumes it's in root of src/)
const customerJson = require('./customer.json');

/**
 * Main application entry point.
 * Loads customer data, formats the email, and sends it via SMTP.
 */
(async () => {
  try {
    // Instantiate domain entity
    const customer = new Customer(customerJson.name, customerJson.email, customerJson.orderId);

    // Create DTO from customer
    const emailData = new EmailData(customer);

    // Initialize email service
    const emailService = new EmailService();

    // Control flag: Set to false to skip sending during dev/test
    const send_email = true;

    if (send_email) {
      // Send the email
      await emailService.send(emailData);
    } else {
      console.log('send_email is false; no email sent.');
    }

  } catch (err: any) {
    // Handle application-level errors
    console.error('Application error:', err.message);
    process.exit(1);
  }
})();
