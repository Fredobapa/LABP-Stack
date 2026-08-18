# LABP-Stack architecture: current state and target direction

## Purpose

This document separates the prototype that exists in the public repositories from components that are still design ideas.

## Current state

```text
User types text in a static GitHub Pages site
                    |
                    | HTTPS POST /analyze
                    v
        Node.js / Express API prototype
                    |
                    +-- deterministic keyword rules
                    +-- JSON response
                    +-- request ID and console log
```

Implemented boundaries:

- Text input only; there is no audio ingestion or speech-to-text implementation.
- `PRICING` and `GREETING` are matched with simple substring checks; other input returns `UNKNOWN`.
- There is no OpenAI or other model integration.
- There is no n8n workflow, Asterisk integration, SBC configuration, persistence, or AWS deployment artifact.
- The previously documented Railway endpoint is currently unavailable.

## Target direction (not implemented)

```text
Voice or text channel
        -> transcription when needed
        -> decision layer
        -> explicit routing or automation rule
        -> communications or business-system action
        -> response
```

Possible future modules include Asterisk/RTC integration, speech-to-text, an evaluated intent classifier, an exportable automation workflow, and a small retrieval experiment. Each module remains roadmap scope until code, configuration, reproducible instructions, and verification evidence are committed.

## Design priorities

- Make current and target state unmistakable.
- Prefer small reproducible integrations over broad platform claims.
- Keep voice and real-time communications as the technical foundation.
- Treat automation and applied AI as demonstrated learning areas.
- Add security, reliability, and operational claims only with supporting implementation and tests.

## Author

Luis Alfredo Báez Páez<br>
Technical Infrastructure & Communications Leader<br>
Voice / RTC foundation · developing Automation & Applied AI
