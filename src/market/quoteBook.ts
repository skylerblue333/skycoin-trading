import { createQuote, type MarketQuote } from './quote';

export class QuoteBook {
  private readonly latest = new Map<string, MarketQuote>();

  ingest(input: { symbol: string; bid: number; ask: number; timestamp?: string }): MarketQuote {
    const quote = createQuote(input);
    const previous = this.latest.get(quote.symbol);
    if (previous && Date.parse(quote.timestamp) < Date.parse(previous.timestamp)) {
      throw new Error(`stale quote for ${quote.symbol}`);
    }
    this.latest.set(quote.symbol, quote);
    return { ...quote };
  }

  get(symbol: string): MarketQuote | undefined {
    const quote = this.latest.get(symbol.trim().toUpperCase());
    return quote ? { ...quote } : undefined;
  }

  list(): MarketQuote[] {
    return [...this.latest.values()].map((quote) => ({ ...quote })).sort((a, b) => a.symbol.localeCompare(b.symbol));
  }

  isStale(symbol: string, maxAgeMs: number, now = Date.now()): boolean {
    if (!Number.isFinite(maxAgeMs) || maxAgeMs < 0) throw new Error('maxAgeMs must be a finite non-negative number');
    const quote = this.latest.get(symbol.trim().toUpperCase());
    return !quote || now - Date.parse(quote.timestamp) > maxAgeMs;
  }
}
