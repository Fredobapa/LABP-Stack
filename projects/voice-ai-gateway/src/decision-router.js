const routes = {
  support: { action: "route_to_queue", target: "support" },
  sales: { action: "route_to_queue", target: "sales" },
  appointment: { action: "start_workflow", target: "appointment" },
  unknown: { action: "request_clarification", target: null },
};

export function decideRoute(intent) {
  return routes[intent] ?? routes.unknown;
}
