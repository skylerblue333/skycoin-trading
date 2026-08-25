export interface MarketQuote {
  symbol: string;
  bid: number;
  ask: number;
  timestamp: string;
}

const SYMBOL_PATTERN = /^[A-Z0-9][A-Z0-9._/-]{0,31}$/;

export function createQuote(input: { symbol: string; bid: number; ask: number; timestamp?: string }): MarketQuote {
  const symbol = input.symbol.trim().toUpperCase();
  if (!SYMBOL_PATTERN.test(symbol)) throw new Error('symbol must be 1-32 market identifier characters');
  if (!Number.isFinite(input.bid) || input.bid < 0) throw new Error('bid must be a finite non-negative number');
  if (!Number.isFinite(input.ask) || input.ask < 0) throw new Error('ask must be a finite non-negative number');
  if (input.ask < input.bid) throw new Error('ask cannot be below bid');

  const timestamp = input.timestamp ?? new Date().toISOString();
  const parsedTimestamp = Date.parse(timestamp);
  if (!Number.isFinite(parsedTimestamp)) throw new Error('timestamp must be an ISO-8601-compatible date');

  return { symbol, bid: input.bid, ask: input.ask, timestamp: new Date(parsedTimestamp).toISOString() };
}

export function midPrice(quote: MarketQuote): number {
  return (quote.bid + quote.ask) / 2;
}

export function spread(quote: MarketQuote): number {
  return quote.ask - quote.bid;
}

export function spreadBps(quote: MarketQuote): number {
  const midpoint = midPrice(quote);
  return midpoint === 0 ? 0 : (spread(quote) / midpoint) * 10_000;
}
