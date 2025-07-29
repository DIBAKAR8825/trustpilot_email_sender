# Trustpilot Email Sender (TypeScript)

This project automates sending post-purchase emails to Trustpilot's Automatic Feedback Service (AFS) using structured email content. It's written in **TypeScript**, and follows **Domain-Driven Design (DDD)** principles for clean modularity and testability.

---

## Project Structure

```
project-root/
│
├── src/
│   ├── domain/           # Business entities (e.g., Customer)
│   ├── dtos/             # Data transfer objects
│   ├── services/         # Infrastructure logic (email sending)
│   ├── infrastructure/   # Environment config and setup
│   ├── customer.json     # JSON file with customer data
│   └── index.ts          # Entry point
├── .env
├── package.json
├── tsconfig.json
├── README.md
```

---

## Features

- Trustpilot AFS-compliant plain-text emails
- DDD structure: clear separation of domain, infrastructure, and service logic
- Loads customer data from JSON
- Full TypeScript typing and strict mode
- Simple `.env` configuration

---

## Prerequisites

- Node.js (v16+ recommended)
- SMTP credentials for a real mail server (e.g. SendGrid, Mailgun, Gmail with App Password)
- Valid Trustpilot AFS BCC email address (usually `afs-integration@trustpilot.com`)

---

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-org/trustpilot-email-sender.git
cd trustpilot-email-sender
```

### 2. Install dependencies

```bash
npm install
```

---

## Configuration

### 1. Create `.env` file in root:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password
SENDER_NAME=Your Company
SENDER_EMAIL=no-reply@yourcompany.com
TRUSTPILOT_AFS_EMAIL=afs-integration@trustpilot.com
```

> Never commit this file to version control.

---

### 2. Add Customer JSON

Create a `customer.json` file in `src/`:

```json
{
  "name": "Dibakar",
  "email": "dibakar.chakraborty15@gmail.com",
  "orderId": "ORD00765"
}
```

---

## Business Logic

- **Domain Layer (`Customer.ts`)**: Defines customer entity and validates required fields.
- **DTO Layer (`EmailData.ts`)**: Transforms a customer into Trustpilot-compatible email format.
- **Service Layer (`EmailService.ts`)**: Handles email construction and sending using Nodemailer.
- **Infrastructure Layer (`config.ts`)**: Validates and loads environment variables securely.
- **Application Layer (`index.ts`)**: Reads customer data, constructs and sends the email.

---

## Build and Run

### 1. Development Mode (live TypeScript execution)

```bash
npm run dev
```

> Uses `ts-node` to run directly from `.ts` files without compiling.

---

### 2. Production Build

```bash
npm run build     # Compiles TS -> JS into /dist
npm start         # Runs compiled code from dist/index.js
```

---

## Scripts

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts"
}
```

> Optional: Use `ts-node-dev` for live-reloading in dev mode.

---

## Testing (Optional)

You can extend this project with `jest` for unit testing individual layers (e.g., `EmailData` or `Customer`).

---

## Notes

- Emails are sent in plain-text format with the following structure:

  ```
  Email: dibakar.chakraborty15@gmail.com
  Name: Dibakar
  Reference: ORD00007
  ```

- Trustpilot AFS extracts recipient, name, and order ID automatically from structured content and headers.
- Only **BCCs** the AFS email to ensure privacy.

---

## License

MIT License. Use it freely in your commercial or personal projects.

---

## Questions or Help?

Feel free to open an issue or contact [dibakar.chakraborty15@gmail.com] or [https://www.linkedin.com/in/dibakar-chakraborty/].