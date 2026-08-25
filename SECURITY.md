# Security Policy

This repository is a market-quote validation library, not a trading or execution system.

Report vulnerabilities privately through GitHub security reporting where available.

External market data must be treated as untrusted. Callers are responsible for authenticating providers, validating provenance, applying rate limits/retries, persisting data safely, and deciding whether a quote is suitable for downstream financial use. This library validates shape, spread ordering, timestamp ordering, and basic staleness only; it does not establish price correctness.

Do not place API keys, exchange credentials, signing keys, customer data, or other secrets in this package or its tests.
