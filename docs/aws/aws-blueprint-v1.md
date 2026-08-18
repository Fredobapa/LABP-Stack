# AWS deployment design study

**Status: unimplemented design study**

No AWS resources, Terraform, CloudFormation, CDK project, deployment pipeline, or verification evidence for this design are included in the public repositories. The current Node.js/Express API prototype is deployed separately on Railway; that deployment is evidence of the API demo, not of this AWS design.

## Learning objective

Explore how the small `/analyze` prototype could be deployed on AWS after it has tests, a documented API contract, and basic operational controls.

## Option A: serverless experiment

```text
User -> API Gateway -> Lambda -> intent rules -> response
                              -> CloudWatch logs
```

Questions to validate:

- What changes are required to adapt the Express handler?
- What are the observed cold-start and request latency characteristics?
- How are logs correlated without exposing sensitive request data?
- What authentication and rate-limiting controls are appropriate?

## Option B: container experiment

```text
User -> load balancer -> containerized API -> response
                                        -> logs and metrics
```

Questions to validate:

- Can the API be packaged reproducibly as a container?
- What health check and graceful-shutdown behavior is required?
- What is the smallest sensible network and IAM boundary?
- How should cost and operational overhead be measured?

## Voice / RTC expansion

Asterisk, SBC, SIP/RTP handling, recording storage, redundancy, and disaster recovery are outside the implemented scope. They should be documented as deployed architecture only after a reproducible lab or sanitized implementation artifact exists.

## Completion criteria

This design can move from **design study** to **prototype** when the repository contains:

- deployable Infrastructure as Code;
- automated API tests;
- deployment and teardown instructions;
- a cost note;
- security assumptions;
- observed logs or metrics from a test deployment.
