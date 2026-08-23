import { describe, expect, it } from 'vitest';
import { createQuote, midPrice } from '../src/market/quote';

describe('market quotes', () => {
  it('normalizes symbols and calculates a midpoint', () => {
    const quote = createQuote({ symbol: 'sky4', bid: 10, ask: 12 });
    expect(quote.symbol).toBe('SKY4');
    expect(midPrice(quote)).toBe(11);
  });

  it('rejects an inverted spread', () => {
    expect(() => createQuote({ symbol: 'SKY4', bid: 12, ask: 10 })).toThrow();
  });

  it('rejects invalid prices', () => {
    expect(() => createQuote({ symbol: 'SKY4', bid: -1, ask: 2 })).toThrow();
    expect(() => createQuote({ symbol: 'SKY4', bid: 1, ask: Number.NaN })).toThrow();
  });
});
