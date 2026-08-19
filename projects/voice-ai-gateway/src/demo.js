import { processVoiceEvent } from "./gateway.js";

const event = {
  type: "voice.transcript",
  callId: "demo-call-001",
  transcript: "I need help with an incident",
};

console.log(JSON.stringify(processVoiceEvent(event), null, 2));
