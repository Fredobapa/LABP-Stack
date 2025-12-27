# Decision 0003 — Decision Logic

## Purpose
Define how the system reacts to each detected intent.

## Decision Flow
1. Receive detected intent with confidence score
2. Validate confidence threshold
3. Execute corresponding action
4. Generate response

## Intent Handling Rules

### PRICING
Action:
- Return pricing information

Fallback:
- If pricing data is unavailable, return a generic pricing message.

---

### AVAILABILITY
Action:
- Return availability or schedule information

Fallback:
- If availability is unknown, ask user to specify a date or time.

---

### SUPPORT
Action:
- Route to support logic or escalation

Fallback:
- Ask the user to describe the issue.

---

### GENERAL_INFO
Action:
- Provide general service information

Fallback:
- Ask clarifying question.

---

### UNKNOWN
Action:
- Ask the user to clarify their request

Response example:
"I'm not sure I understood. Could you please rephrase?"

## Notes
This logic is intentionally simple and deterministic to ensure predictable behavior.
