# Public-demo safety boundary

This project is a synthetic, credential-free demonstration.

## Deliberately excluded

- Employer, client, employee, and supplier names
- Real email addresses, domains, message bodies, and attachments
- OAuth, database, and storage credential references
- Folder, label, workflow, account, and database identifiers
- Internal approval rules, committee procedures, and database schemas
- Automatic approval of operational changes

The included identifiers and dates are fictional. The workflow must not be connected to a real operational environment without an independent security, access-control, data-protection, and change-governance review.

## Human control

Every successful route sets `humanApprovalRequired` to `true`. The demo prepares or requests a review; it never approves or executes an infrastructure change.
