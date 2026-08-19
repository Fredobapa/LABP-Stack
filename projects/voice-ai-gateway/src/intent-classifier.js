const intentRules = [
  { intent: "support", keywords: ["support", "incident", "problem", "help"] },
  { intent: "sales", keywords: ["sales", "quote", "pricing", "buy"] },
  { intent: "appointment", keywords: ["appointment", "schedule", "booking"] },
];

export function classifyIntent(text) {
  const normalized = String(text ?? "").trim().toLowerCase();

  if (!normalized) {
    return { intent: "unknown", matchedKeyword: null };
  }

  for (const rule of intentRules) {
    const matchedKeyword = rule.keywords.find((keyword) => normalized.includes(keyword));
    if (matchedKeyword) {
      return { intent: rule.intent, matchedKeyword };
    }
  }

  return { intent: "unknown", matchedKeyword: null };
}
