# Voice AI Gateway Simulator

[![Voice AI Gateway](https://github.com/Fredobapa/LABP-Stack/actions/workflows/voice-ai-gateway.yml/badge.svg)](https://github.com/Fredobapa/LABP-Stack/actions/workflows/voice-ai-gateway.yml)

**Status: public simulator implemented; live Asterisk/ARI integration is not included.**

This small Node.js project demonstrates the decision layer of an intent-based voice routing flow. It accepts a simulated transcript event, classifies it with explicit keyword rules, and returns a routing decision.

## What is implemented

- A `voice.transcript` event contract.
- Deterministic intent classification for support, sales, and appointments.
- Queue, workflow, and clarification decisions.
- A local HTTP API with health and event endpoints.
- Automated tests using the Node.js test runner.
- A CLI demo with no external services or credentials.

## What is not implemented

- A live ARI connection.
- SIP registration or trunk configuration.
- Audio streaming, speech-to-text, text-to-speech, or an LLM call.
- Production authentication, persistence, observability, or high availability.

These boundaries are deliberate: the public repository contains no PBX configuration, phone numbers, credentials, customer data, or private deployment code.

## Run locally

Requires Node.js 20 or newer.

```bash
npm test
npm run demo
npm start
```

Example request:

```bash
curl -s http://127.0.0.1:3000/v1/events \
  -H 'content-type: application/json' \
  -d '{"type":"voice.transcript","callId":"demo-1","transcript":"I need support"}'
```

## Intended integration boundary

```text
SIP caller -> Asterisk -> ARI adapter -> this decision layer -> approved PBX action
```

An ARI adapter is a future component. It must translate Asterisk events into the public event contract and validate any resulting action before it reaches the PBX.
