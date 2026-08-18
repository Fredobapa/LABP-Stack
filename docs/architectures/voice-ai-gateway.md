# Voice AI Gateway — Architecture

**Status: design study; no voice gateway code is currently committed.**

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
Target capability: classify transcribed text into a predefined intent with a confidence score. The current backend only performs keyword matching and does not return confidence.

### 4. Decision Logic
Target capability: apply business rules based on detected intent. Not implemented beyond static responses in the API prototype.

### 5. Response Generation
Target capability: generate a textual response and optionally convert it into voice. Voice generation is not implemented.

### 6. Output
Target capability: return the final response as text or audio. The current prototype returns JSON text only.

## Notes
This architecture is intentionally modular to allow independent evolution of each component.
