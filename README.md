# SKYCOIN4444 Market Quotes

A focused TypeScript library for validating bid/ask quotes and maintaining the latest in-memory quote per symbol. It is a market-data primitive only: it does **not** connect to exchanges, execute orders, custody assets, generate trading signals, or provide investment advice.

## Implemented behavior

- normalized market symbols with bounded syntax
- finite non-negative bid/ask validation
- rejection of inverted spreads
- ISO-compatible timestamp validation/normalization
- midpoint, absolute spread, and spread-basis-point helpers
- latest-quote storage per symbol
- rejection of timestamp-regressing updates
- deterministic symbol ordering
- stale/missing quote detection
- strict TypeScript build and Vitest coverage

## Example

```ts
import { QuoteBook, midPrice } from "@skycoin4444/market-quotes";

const book = new QuoteBook();
const quote = book.ingest({
  symbol: "sky4/usd",
  bid: 10,
  ask: 10.5,
  timestamp: "2026-08-24T12:00:00Z",
});

console.log(midPrice(quote));
console.log(book.isStale("SKY4/USD", 30_000));
```

## Verification

```bash
pnpm install --no-frozen-lockfile
pnpm lint
pnpm test
pnpm build
pnpm audit --prod --audit-level high
```

CI runs those gates on `main`, product branches, and pull requests.

## Architecture and integration

This package should sit behind market-data provider adapters. Provider networking, authentication, retries, rate limits, durable time-series storage, order books, execution, portfolio state, and risk management belong in separate components. SKYCOIN4444 finance/marketplace applications can consume this library through its exported quote contract rather than copying its source.

## Status

**Classification:** ENGINEERING LAB / beta library.

The quote-domain implementation and automated checks can be verified independently. Live provider accuracy, production persistence, exchange connectivity, financial controls, and production deployment are not implemented or claimed.

## Security and financial boundary

Treat external quote feeds as untrusted input. This library validates basic shape and ordering but does not authenticate a data source or establish price correctness. Never use it alone as the basis for executing trades or valuing assets in a production financial system.

## License

MIT, subject to the checked-in license and applicable third-party licenses.
