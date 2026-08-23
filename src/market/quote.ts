export interface MarketQuote {
  symbol: string;
  bid: number;
  ask: number;
  timestamp: string;
}

export function createQuote(input: { symbol: string; bid: number; ask: number; timestamp?: string }): MarketQuote {
  if (!input.symbol.trim()) throw new Error('symbol is required');
  if (!Number.isFinite(input.bid) || input.bid < 0) throw new Error('bid must be non-negative');
  if (!Number.isFinite(input.ask) || input.ask < 0) throw new Error('ask must be non-negative');
  if (input.ask < input.bid) throw new Error('ask cannot be below bid');

  return {
    symbol: input.symbol.trim().toUpperCase(),
    bid: input.bid,
    ask: input.ask,
    timestamp: input.timestamp ?? new Date().toISOString(),
  };
}

export function midPrice(quote: MarketQuote): number {
  return (quote.bid + quote.ask) / 2;
}
