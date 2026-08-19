"use strict";

const REQUIRED_FIELDS = ["requestId", "title", "ownerGroup", "risk", "changeWindow", "hasImplementationPlan", "hasRollbackPlan"];
const VALID_RISKS = new Set(["low", "medium", "high"]);

function validateRequest(request) {
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = request[field];
    return value === undefined || value === null || value === "";
  });

  if (missingFields.length) {
    return { valid: false, errors: [`Missing required fields: ${missingFields.join(", ")}`] };
  }

  if (!VALID_RISKS.has(request.risk)) {
    return { valid: false, errors: ["Risk must be low, medium, or high"] };
  }

  return { valid: true, errors: [] };
}

function triageRequest(request, managedGroup = "communications-platform") {
  const checkedAt = "DEMO_TIMESTAMP";
  const validation = validateRequest(request);

  if (!validation.valid) {
    return {
      requestId: request.requestId || "UNASSIGNED",
      status: "VALIDATION_ERROR",
      route: "ERROR_QUEUE",
      humanApprovalRequired: true,
      reasons: validation.errors,
      checkedAt
    };
  }

  const isManagedRequest = request.ownerGroup === managedGroup;
  const completePlan = request.hasImplementationPlan && request.hasRollbackPlan;

  if (!isManagedRequest) {
    return {
      requestId: request.requestId,
      status: "REVIEW_REQUIRED",
      route: "EXTERNAL_FAST_TRACK_REVIEW",
      humanApprovalRequired: true,
      reasons: ["Request belongs to another operating group; no automatic approval is issued"],
      checkedAt
    };
  }

  if (!completePlan || request.risk === "high") {
    const reasons = [];
    if (!request.hasImplementationPlan) reasons.push("Implementation plan is missing");
    if (!request.hasRollbackPlan) reasons.push("Rollback plan is missing");
    if (request.risk === "high") reasons.push("High-risk change requires explicit review");

    return {
      requestId: request.requestId,
      status: "REVIEW_REQUIRED",
      route: "MANAGED_DETAILED_REVIEW",
      humanApprovalRequired: true,
      reasons,
      checkedAt
    };
  }

  return {
    requestId: request.requestId,
    status: "READY_FOR_COMMITTEE",
    route: "MANAGED_SUMMARY",
    humanApprovalRequired: true,
    summary: `${request.requestId}: ${request.title} | risk=${request.risk} | window=${request.changeWindow}`,
    reasons: ["Required plans are present; prepared for human committee review"],
    checkedAt
  };
}

function processBatch(requests, managedGroup) {
  return requests.map((request) => triageRequest(request, managedGroup));
}

module.exports = { REQUIRED_FIELDS, processBatch, triageRequest, validateRequest };
