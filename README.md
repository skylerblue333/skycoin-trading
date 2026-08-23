# Skycoin Trading

Trading and market-data component for the SKYCOIN4444 ecosystem.

## Current implementation

- TypeScript market-quote domain primitive
- Bid/ask validation
- Symbol normalization
- Mid-price calculation
- Automated Vitest coverage for valid and invalid quotes

## Ecosystem role

**Wallet / Finance / Marketplace → Trading & Market Data**

This repository supplies reusable market-domain logic for the canonical SKYCOIN4444 finance/marketplace boundary. It is intentionally not a complete exchange or broker and does not claim to execute live trades.

## Truthful status

- Quote domain: **implemented**
- Basic tests: **implemented**
- Canonical finance integration: **pending**
- Live market-data provider: **not integrated/verified**
- Order execution: **not claimed**
- Production deployment: **not verified**
- Revenue: **not claimed**

The previous package metadata described the repository as production-grade while using placeholder test/lint commands and a build command that suppressed TypeScript failures. Those commands are not evidence of production readiness. fileciteturn253file0

## Consolidation and open-source policy

Preserve useful existing work and compare it with the canonical wallet, finance, marketplace, payment, and protocol implementations. Merge the strongest verified market capabilities into the canonical finance boundary instead of maintaining duplicate trading systems.

When a genuine gap requires substantial exchange, market-data, order-book, or infrastructure functionality, evaluate mature public open-source projects first. Adopt only compatible, maintained components; preserve required licenses/attribution and isolate third-party dependencies behind stable adapters.

## Commercial path

Potential monetization paths include market-data subscriptions, exchange/platform fees, premium trading features, and marketplace transaction fees. None are represented as active revenue until backed by real customers, transactions, or production telemetry.

## Production requirements

Before live trading or financial production use, add provider adapters, persistent market data, order lifecycle/state management, authentication and authorization, rate limits, risk controls, idempotency, audit logs, observability, security review, integration tests, and controlled end-to-end deployment verification.

## License

MIT, subject to the checked-in license and applicable third-party dependency licenses.
