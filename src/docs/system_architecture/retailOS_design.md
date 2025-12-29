# RetailOS – Complete System Design

---

## System Architecture

```mermaid
graph TD
POS[POS App]
ECOM[Web Store]
ADMIN[Ecom Admin]
SUPER[Super Admin]
API[RetailOS API Gateway]
AUTH[Auth & RBAC]
CORE[Core Services]
DB[(MongoDB)]
REDIS[(Redis)]
AI[AI Engine]

POS --> API
ECOM --> API
ADMIN --> API
SUPER --> API

API --> AUTH --> CORE

CORE --> DB
CORE --> REDIS
CORE --> AI


```
