# Skycoin Trading

Trading and market-data component for the SKYCOIN4444 ecosystem.

## Current repository evidence

- Public TypeScript repository on `main`.
- 27 tracked files were observed in the current audit snapshot.
- `package.json`, Docker configuration, Docker Compose configuration, and GitHub Actions configuration are present.
- No test file was identified by the current filename-based audit.

## Ecosystem role

**Wallet / Finance / Marketplace → Trading & Market Data**

This repository is a candidate source for trading, market-data, and finance capabilities that can be consolidated into the canonical SKYCOIN4444 platform.

## Truthful status

- Implementation: **present**
- Canonical integration: **pending comparison with other trading/finance implementations**
- Automated tests: **not established by the current repository evidence**
- Production deployment: **not verified**
- Live trading: **not claimed**

The existing `package.json` contains placeholder success commands and a build command that suppresses TypeScript failures. Those scripts are **not treated as proof that the build, tests, or linting pass** and should be replaced with real validation before production promotion.

## Consolidation approach

Preserve the existing implementation and configuration first. Compare it against `skycoin4444-finance`, payment, wallet, exchange, and market-data repositories. Promote only the strongest verified implementation into the canonical finance boundary. Do not duplicate a capability that already exists elsewhere.

If a missing capability requires mature open-source infrastructure, evaluate established public projects and their licenses before adapting anything. Keep third-party attribution and licensing intact.

## Production requirements

Before this component is called production-ready, establish real automated tests, strict TypeScript/build validation, authenticated API boundaries, persistent data handling, market-data source behavior, risk controls, observability, and end-to-end verification in a controlled environment.

## License

MIT, subject to the repository's checked-in license and any third-party dependencies used during future consolidation.
