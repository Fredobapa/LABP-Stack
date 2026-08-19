# Voice AI Gateway — Architecture

**Status: decision-layer simulator implemented; live voice and ARI integration are not committed.**

## Overview
This document describes the high-level architecture of the Voice AI Gateway system.

## High-level flow
Voice Input → Speech-to-Text → Intent Detection → Decision Logic → Response Generation → Output

## Components

### 1. Voice Input
Target capability: accept audio input from files, browser recordings, or external systems. Not implemented.

### 2. Speech-to-Text (ASR)
Target capability: transform raw audio into text for downstream processing. Not implemented.

### 3. Intent Detection
Implemented in the public simulator with deterministic keyword rules. It does not use a model or return a confidence score.

### 4. Decision Logic
Implemented in the public simulator for queue routing, workflow initiation, and clarification decisions. It does not execute PBX actions.

### 5. Response Generation
Target capability: generate a textual response and optionally convert it into voice. Voice generation is not implemented.

### 6. Output
The simulator returns a structured JSON decision. Audio output is not implemented.

## Notes
This architecture is intentionally modular to allow independent evolution of each component. See the [runnable simulator](../../projects/voice-ai-gateway/README.md).
