# Voice AI Gateway — End-to-End Flow

## Scenario 1 — Pricing request

### User input
Voice message:
"I want to know the price"

---

### Step 1 — Speech-to-Text
Output:
"I want to know the price"

---

### Step 2 — Intent Detection
Detected intent:
PRICING  
Confidence: High

---

### Step 3 — Decision Logic
Rule applied:
If intent == PRICING → return pricing information

---

### Step 4 — Response Generation
Text response:
"Our pricing starts from $X depending on your needs."

---

### Step 5 — Output
Response delivered as:
- Text
- Optional voice response

---

## Scenario 2 — Unknown request

### User input
"I'm not sure what I need"

---

### Intent Detection
Detected intent:
UNKNOWN

---

### Decision Logic
Rule applied:
Ask clarification

---

### Response
"I'm not sure I understood. Could you please clarify your request?"
