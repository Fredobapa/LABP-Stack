"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { triageRequest, validateRequest } = require("../src/triage");

const completeRequest = {
  requestId: "CR-2026-001",
  title: "Update voice routing policy",
  ownerGroup: "communications-platform",
  risk: "medium",
  changeWindow: "2026-08-25T22:00:00Z",
  hasImplementationPlan: true,
  hasRollbackPlan: true
};

test("rejects incomplete requests", () => {
  const result = validateRequest({ requestId: "CR-EMPTY" });
  assert.equal(result.valid, false);
  assert.match(result.errors[0], /title/);
});

test("prepares a complete managed request for committee", () => {
  const result = triageRequest(completeRequest);
  assert.equal(result.status, "READY_FOR_COMMITTEE");
  assert.equal(result.route, "MANAGED_SUMMARY");
  assert.equal(result.humanApprovalRequired, true);
  assert.match(result.summary, /CR-2026-001/);
});

test("routes high-risk managed requests to detailed review", () => {
  const result = triageRequest({ ...completeRequest, risk: "high" });
  assert.equal(result.route, "MANAGED_DETAILED_REVIEW");
  assert.match(result.reasons.join(" "), /High-risk/);
});

test("never automatically approves requests from another group", () => {
  const result = triageRequest({ ...completeRequest, ownerGroup: "workplace-services" });
  assert.equal(result.route, "EXTERNAL_FAST_TRACK_REVIEW");
  assert.equal(result.humanApprovalRequired, true);
  assert.match(result.reasons[0], /no automatic approval/);
});

test("routes missing rollback plans to detailed review", () => {
  const result = triageRequest({ ...completeRequest, hasRollbackPlan: false });
  assert.equal(result.route, "MANAGED_DETAILED_REVIEW");
  assert.match(result.reasons.join(" "), /Rollback plan/);
});
