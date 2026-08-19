# Change Request Operations Automation

Credential-free n8n workflow and tested JavaScript simulation for validating, classifying, routing, and recording fictional infrastructure change requests.

**Status:** implemented public simulation. It is not connected to Gmail, Drive, a database, an employer, or a production change-management system.

## Why this project exists

Technical leaders often receive repeated change requests that must be checked, grouped, summarized, and prepared for review. This project demonstrates how that administrative flow can be made more consistent while preserving human approval.

The public implementation was inspired by lessons learned while building a private operational workflow. It was redesigned from scratch with synthetic data and a narrower safety boundary; no private workflow, company data, credentials, or internal procedure is included.

## Demonstrated flow

```text
Synthetic request batch
        |
        v
Required-field and risk validation
        |
        v
Ownership and readiness decision
        |
        +-- complete managed request -> prepare committee summary
        +-- high-risk/incomplete     -> open detailed review
        +-- another operating group -> request fast-track human review
        +-- invalid request         -> record retryable validation error
        |
        v
Structured audit result
```

All routes require a human decision. The workflow does not approve or execute changes.

## Evidence

- Importable n8n workflow: [`workflow/change-request-operations-demo.json`](workflow/change-request-operations-demo.json)
- Four fictional requests: [`samples/input.json`](samples/input.json)
- Expected route summary: [`samples/expected-output.json`](samples/expected-output.json)
- Equivalent Node.js decision logic: [`src/triage.js`](src/triage.js)
- Five automated tests: [`test/triage.test.js`](test/triage.test.js)
- Explicit publication boundary: [`SECURITY.md`](SECURITY.md)

## Run without n8n

Requires Node.js 20 or newer and has no third-party dependencies.

```bash
cd projects/change-request-automation
npm test
npm run demo
```

## Import into n8n

1. Create a new workflow in a personal test instance.
2. Import `workflow/change-request-operations-demo.json`.
3. Run `01 Manual Demo Trigger`.
4. Inspect the four branch outputs.

No credential setup is required. The included workflow is inactive after import and uses only synthetic data.

## What this does not claim

- No production deployment is published.
- No Gmail, Drive, PostgreSQL, ticketing, or change platform is connected.
- No confidential request document is parsed or stored.
- No AI model performs the classification; the public rules are deterministic.
- No automatic approval or infrastructure execution occurs.
- The demo does not establish production-grade reliability, security, or compliance.

## Authorship and AI assistance

Designed, configured, tested, and documented by **Luis Alfredo Báez Páez**, with AI assistance during development and technical refinement. The operational problem selection, workflow requirements, validation decisions, testing, and acceptance remain human-led.

## Next responsible steps

- Add a local n8n execution capture as reproducible visual evidence.
- Add an explicit error workflow for infrastructure-level failures, not only input validation.
- Add a human-approval interface backed by a non-production test datastore.
- Evaluate idempotency and retry behavior before introducing any external integration.
