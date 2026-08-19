import { classifyIntent } from "./intent-classifier.js";
import { decideRoute } from "./decision-router.js";

export function processVoiceEvent(event) {
  if (!event || event.type !== "voice.transcript") {
    throw new TypeError("Expected a voice.transcript event");
  }

  const classification = classifyIntent(event.transcript);
  const decision = decideRoute(classification.intent);

  return {
    callId: event.callId ?? null,
    transcript: String(event.transcript ?? ""),
    classification,
    decision,
  };
}
