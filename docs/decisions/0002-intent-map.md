# Decision 0002 — Intent Map Definition

## Purpose
Define the initial set of user intents handled by the Voice AI Gateway.

## Defined Intents

### PRICING
User is asking about prices, costs, or plans.

Examples:
- "How much does it cost?"
- "What are your prices?"

Action:
- Provide pricing information or route to pricing logic.

---

### AVAILABILITY
User is asking about availability, schedules, or opening hours.

Examples:
- "Are you open today?"
- "What time do you close?"

Action:
- Provide availability or schedule information.

---

### SUPPORT
User is requesting help or reporting an issue.

Examples:
- "I need help"
- "Something is not working"

Action:
- Route to support logic or escalation.

---

### GENERAL_INFO
User is asking for general information.

Examples:
- "Tell me about your services"
- "What do you do?"

Action:
- Provide general information.

---

### UNKNOWN
Intent cannot be confidently classified.

Action:
- Ask a clarification question or provide fallback response.

## Notes
The intent list is expected to evolve as new use cases are identified.
