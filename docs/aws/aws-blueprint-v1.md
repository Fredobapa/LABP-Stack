# AWS Blueprint v1 — LABP-Stack (VoIP · AI · Automation)

This document describes the AWS-oriented deployment blueprint for LABP-Stack.
Goal: always-on, low-latency services with production observability.

---

## 1) Current Production (Today)

- Frontend: GitHub Pages (static HTML)
- Backend API: Railway (Node.js / Express)
- Endpoint: https://labp-backend-production.up.railway.app

This is the current working baseline.

---

## 2) AWS Target Architecture (v1)

### 2.1 MVP (Fast, low-cost)
**Use when:** you want AWS credibility and “always-on” with minimal complexity.

- Route 53 (optional custom domain)
- API Gateway (HTTP API)
- AWS Lambda (Node.js) — hosts `/analyze`
- CloudWatch Logs — request logs + errors
- (Optional) DynamoDB — store intent events / history

**Flow**
User → API Gateway → Lambda → (Intent logic) → Response → CloudWatch Logs

Pros:
- Fully managed, scales automatically
- No server management
- Native logs/metrics

Cons:
- Cold starts possible (usually acceptable for text API)

---

### 2.2 Production (Recommended)
**Use when:** you need predictable latency and expansion to VoIP/real-time workloads.

- VPC (private subnets for services)
- ECS Fargate (or EC2) running Node.js API (container)
- ALB (HTTP/HTTPS)
- ACM (TLS certificates)
- CloudWatch Logs + Metrics + Alarms
- Route 53 (DNS)
- S3 (artifacts, diagrams, optional storage)
- (Optional) ElastiCache/Redis for sessions
- (Optional) RDS/Postgres for persistence

**Flow**
User → Route53 → ALB (HTTPS) → ECS Service (Node API) → Logs/Metrics → CloudWatch

Pros:
- Stable performance, no cold starts
- Easy to evolve into multi-service platform
- Aligns with VoIP + AI gateway expansion

Cons:
- More components than MVP

---

## 3) VoIP Expansion Path (AWS-Oriented)

LABP-Stack is VoIP-first. Production voice workloads typically add:

- Asterisk (EC2) inside VPC
- SIP security controls (SBC / Kamailio / Oracle SBC)
- RTP media handling (NAT, SG rules, media anchoring)
- Call recordings: S3 + Lifecycle (Glacier)
- Observability: CloudWatch + dashboards/alarms

**Voice Flow (High-level)**
PSTN/Carrier → SBC → Asterisk → (ARI/HTTP) → LABP API → (AI/Automation)

---

## 4) Observability (Mandatory in AWS version)

Minimum:
- CloudWatch Logs for API requests/errors
- CloudWatch Metrics for latency, 4xx/5xx
- CloudWatch Alarms (availability / error rate)

Optional:
- X-Ray tracing (request path)
- Dashboards for SLO (p95 latency, error rate)

---

## 5) Deployment Notes

- Prefer Infrastructure as Code (Terraform / CloudFormation / CDK)
- Prefer CI/CD (GitHub Actions) to deploy to AWS
- Keep config in environment variables / Parameter Store / Secrets Manager

---

## 6) Versioning

- v1 MVP: API Gateway + Lambda
- v1 Prod: ALB + ECS (Fargate) + CloudWatch + Route53

