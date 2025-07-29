import nodemailer from 'nodemailer';
import { config } from '../infrastructure/config';
import { EmailData } from '../dtos/EmailData';

/**
 * Service responsible for composing and sending emails
 * using SMTP via Nodemailer.
 */
export class EmailService {
  /** Nodemailer transporter instance configured with SMTP credentials */
  private readonly transporter;

  constructor() {
    // Initialize the transporter with SMTP config
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: false, // Use TLS if available (STARTTLS)
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword
      }
    });
  }

  /**
   * Sends an email using Trustpilot-compliant formatting.
   * BCCs the AFS email address so Trustpilot can capture review data.
   *
   * @param email - The email data formatted with customer name, email, and order reference
   * @throws Will throw an error if sending fails
   */
  async send(email: EmailData): Promise<void> {
    const mailOptions = {
      from: `"${config.senderName}" <${config.senderEmail}>`, // e.g., "My Store <noreply@store.com>"
      to: email.to, // e.g., "Customer Name <email@domain.com>"
      bcc: config.afsEmail, // Trustpilot AFS BCC email
      subject: email.subject,
      text: email.text // Plain text format for AFS parsing
    };

    // Log email content for debugging purposes
    console.log('\n Sending the following to Trustpilot AFS:');
    console.log(email.text);
    console.log('\nUsing AFS BCC:', config.afsEmail);

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(' Email sent successfully:', info.response);
    } catch (error: any) {
      console.error(' Failed to send email:', error.message);
      throw error;
    }
  }
}
