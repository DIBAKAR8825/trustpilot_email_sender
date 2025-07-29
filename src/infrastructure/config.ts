import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * List of required environment variables for proper operation.
 */
const requiredEnvVars = [
  'TRUSTPILOT_AFS_EMAIL',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'SENDER_NAME',
  'SENDER_EMAIL'
];

/**
 * Validate all required environment variables are present.
 * Terminates the process with an error if any are missing.
 */
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1); // Fail-fast approach
  }
}

/**
 * Exports strongly-typed configuration object sourced from environment variables.
 */
export const config = {
  /** SMTP server hostname (e.g., smtp.sendgrid.net) */
  smtpHost: process.env.SMTP_HOST!,

  /** SMTP server port (e.g., 587) */
  smtpPort: parseInt(process.env.SMTP_PORT!, 10),

  /** SMTP username for authentication */
  smtpUser: process.env.SMTP_USER!,

  /** SMTP password or token */
  smtpPassword: process.env.SMTP_PASSWORD!,

  /** Display name used in "From" header of sent emails */
  senderName: process.env.SENDER_NAME!,

  /** Email address used in "From" header */
  senderEmail: process.env.SENDER_EMAIL!,

  /** Trustpilot AFS BCC address for feedback automation */
  afsEmail: process.env.TRUSTPILOT_AFS_EMAIL!
};
