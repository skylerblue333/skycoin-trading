# Changelog

## 1.2.0 - Engineering beta

- Added strict symbol and timestamp validation.
- Added midpoint, spread, and spread-basis-point helpers.
- Added an in-memory latest quote book with stale-update rejection and age checks.
- Added a real package entrypoint and declaration output.
- Expanded quote/book tests and dependency-audit CI.
- Fixed TypeScript build scope so tests are not emitted outside `rootDir`.
- Removed the misleading HTTP-service Dockerfile from this library-only product.
- Documented provider, financial, and security boundaries.
