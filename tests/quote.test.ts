import { describe, expect, it } from 'vitest';
import { createQuote, midPrice, spread, spreadBps } from '../src/market/quote';
import { QuoteBook } from '../src/market/quoteBook';

describe('market quotes', () => {
  it('normalizes symbols and calculates midpoint/spread metrics', () => {
    const quote = createQuote({ symbol: 'sky4/usd', bid: 10, ask: 12, timestamp: '2026-08-24T00:00:00Z' });
    expect(quote.symbol).toBe('SKY4/USD');
    expect(quote.timestamp).toBe('2026-08-24T00:00:00.000Z');
    expect(midPrice(quote)).toBe(11);
    expect(spread(quote)).toBe(2);
    expect(spreadBps(quote)).toBeCloseTo(1818.1818, 3);
  });

  it('rejects inverted, invalid, and malformed quotes', () => {
    expect(() => createQuote({ symbol: 'SKY4', bid: 12, ask: 10 })).toThrow(/ask/);
    expect(() => createQuote({ symbol: 'SKY4', bid: -1, ask: 2 })).toThrow(/bid/);
    expect(() => createQuote({ symbol: 'SKY4', bid: 1, ask: Number.NaN })).toThrow(/ask/);
    expect(() => createQuote({ symbol: 'bad symbol', bid: 1, ask: 2 })).toThrow(/symbol/);
    expect(() => createQuote({ symbol: 'SKY4', bid: 1, ask: 2, timestamp: 'not-a-date' })).toThrow(/timestamp/);
  });

  it('handles zero midpoint without non-finite spread bps', () => {
    const quote = createQuote({ symbol: 'ZERO', bid: 0, ask: 0 });
    expect(spreadBps(quote)).toBe(0);
  });
});

describe('QuoteBook', () => {
  it('stores the latest quote per symbol and returns deterministic order', () => {
    const book = new QuoteBook();
    book.ingest({ symbol: 'bbb', bid: 2, ask: 3, timestamp: '2026-08-24T00:00:00Z' });
    book.ingest({ symbol: 'aaa', bid: 1, ask: 2, timestamp: '2026-08-24T00:00:01Z' });
    expect(book.list().map((quote) => quote.symbol)).toEqual(['AAA', 'BBB']);
    expect(book.get('aaa')?.bid).toBe(1);
  });

  it('rejects stale updates and detects quote age', () => {
    const book = new QuoteBook();
    book.ingest({ symbol: 'SKY4', bid: 10, ask: 11, timestamp: '2026-08-24T00:00:10Z' });
    expect(() => book.ingest({ symbol: 'SKY4', bid: 9, ask: 10, timestamp: '2026-08-24T00:00:09Z' })).toThrow(/stale/);
    expect(book.isStale('SKY4', 5_000, Date.parse('2026-08-24T00:00:14Z'))).toBe(false);
    expect(book.isStale('SKY4', 5_000, Date.parse('2026-08-24T00:00:16Z'))).toBe(true);
    expect(book.isStale('MISSING', 5_000)).toBe(true);
  });
});
