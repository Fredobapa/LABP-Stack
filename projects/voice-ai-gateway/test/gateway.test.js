import assert from "node:assert/strict";
import test from "node:test";
import { processVoiceEvent } from "../src/gateway.js";

test("routes a support transcript to the support queue", () => {
  const result = processVoiceEvent({
    type: "voice.transcript",
    callId: "call-1",
    transcript: "I need help with a problem",
  });

  assert.equal(result.classification.intent, "support");
  assert.deepEqual(result.decision, { action: "route_to_queue", target: "support" });
});

test("starts the appointment workflow", () => {
  const result = processVoiceEvent({
    type: "voice.transcript",
    transcript: "I want to schedule an appointment",
  });

  assert.equal(result.classification.intent, "appointment");
  assert.deepEqual(result.decision, { action: "start_workflow", target: "appointment" });
});

test("requests clarification when no rule matches", () => {
  const result = processVoiceEvent({ type: "voice.transcript", transcript: "Good morning" });
  assert.equal(result.classification.intent, "unknown");
  assert.equal(result.decision.action, "request_clarification");
});

test("rejects events that are not transcripts", () => {
  assert.throws(() => processVoiceEvent({ type: "call.started" }), /voice\.transcript/);
});
