# LABP-Stack

Personal technical portfolio exploring how voice and real-time communications can connect with small automation and applied-AI components.

This repository documents working prototypes, design studies, and a roadmap. It is not presented as a production platform or as evidence that every diagrammed component has been deployed.

> Voice and communications are the foundation. Automation and applied AI are the areas being developed through hands-on prototypes.

## Professional context

I am a **Technical Infrastructure & Communications Leader** with practical strength in voice platforms, Asterisk, SIP, and real-time communications. LABP-Stack is where I document that experience and build toward deeper capability in automation and applied AI.

The repository contains personal work only. It does not represent an employer, client environment, commercial service offering, or production customer deployment.

## What is implemented

| Component | Evidence in the public repositories | Status |
| --- | --- | --- |
| Portfolio site | Static HTML/CSS/JavaScript in `docs/index.html`, published with GitHub Pages | Working static site |
| Intent API | Small Node.js/Express API in [`Fredobapa/labp-backend`](https://github.com/Fredobapa/labp-backend); keyword rules for `PRICING` and `GREETING`, JSON responses, request IDs, and console logs | Prototype; deployment currently unavailable |
| Browser-to-API demo | The portfolio sends text to `/analyze` and renders the returned intent and response | Implemented, but unavailable while the backend is offline |
| Voice AI Gateway | Flow and component documentation only | Design study |
| RAG Knowledge Assistant | Concept README only; no ingestion, retrieval, vector store, or generation code | Planned |
| AWS deployment | Reference notes only; no deployed AWS resources or Infrastructure as Code in this repository | Design study |
| Automation / n8n | No workflow or integration artifact committed | Planned |

Status labels describe only what can be verified in the public repositories.

## Current prototype

```text
Browser (GitHub Pages)
        |
        | POST /analyze { text }
        v
Node.js / Express API
        |
        +-- keyword matching: price -> PRICING
        +-- keyword matching: hello or hi -> GREETING
        +-- otherwise -> UNKNOWN
        |
        +-- JSON response + request ID
        +-- structured request log to stdout
```

The current classifier is deterministic keyword matching. It does not call an LLM or other AI service.

## Repository map

- [`docs/index.html`](docs/index.html) - GitHub Pages portfolio and browser demo
- [`docs/architectures/`](docs/architectures/) - current-state and target-state design notes
- [`docs/decisions/`](docs/decisions/) - early decision records for the prototype
- [`docs/aws/aws-blueprint-v1.md`](docs/aws/aws-blueprint-v1.md) - unimplemented AWS design study
- [`projects/voice-ai-gateway`](projects/voice-ai-gateway) - planned voice gateway scope
- [`projects/rag-knowledge-base/`](projects/rag-knowledge-base/) - planned RAG scope
- [`Fredobapa/labp-backend`](https://github.com/Fredobapa/labp-backend) - executable API prototype

## Run the API locally

```bash
git clone https://github.com/Fredobapa/labp-backend.git
cd labp-backend
npm install
npm start
```

```bash
curl http://localhost:3000/

curl -X POST http://localhost:3000/analyze \
  -H 'Content-Type: application/json' \
  -d '{"text":"I want to know the price"}'
```

## Design direction

The target direction is a modular communications lab in which a voice channel can feed a decision layer and then invoke an automation. Target diagrams are hypotheses to be implemented and tested; they are not descriptions of the current deployment.

```text
SIP / WebRTC input
        -> speech-to-text
        -> intent or routing decision
        -> explicit business rule
        -> automation or communications action
        -> text or voice response
```

## Roadmap

### Next

- [ ] Add a backend README with API contract, limitations, and local setup
- [ ] Remove committed `node_modules` from the backend and add `.gitignore`
- [ ] Add automated tests for health, validation, `PRICING`, `GREETING`, and `UNKNOWN`
- [ ] Restore or replace the hosted demo; show backend availability in the UI
- [ ] Align the documented intent map with the intents implemented in code

### After the baseline is reliable

- [ ] Build one end-to-end voice input prototype and publish reproducible setup steps
- [ ] Add one exportable automation workflow with sample input and output
- [ ] Implement a minimal RAG experiment with a small public dataset and evaluation examples
- [ ] Convert the AWS design study into deployable Infrastructure as Code only if it is actually tested
- [ ] Add metrics, authentication, rate limiting, and deployment documentation before using any production-readiness language

## Evidence standard

New capabilities should be listed as implemented only when this repository includes the relevant code or configuration, reproducible instructions, and a verification method. Concepts remain labeled **planned** or **design study** until then.

## Author

**Luis Alfredo Báez Páez**<br>
Technical Infrastructure & Communications Leader<br>
Voice / RTC foundation · developing Automation & Applied AI

## License

See [LICENSE](LICENSE).
