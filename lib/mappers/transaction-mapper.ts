export interface Transaction {
  id: string;
  status: string | null;
  transaction_type: string;
  transaction_hash: string;
  fees: Fee[];
  wallet: string;
  account: string;
  misc: {
    origin_id: string;
    origin_type: string;
    incomplete: string[];
  };
  fiat_calculated_at: number;
  initiated_at: number;
  confirmed_at: number | null;
  resource_type: string;
  parts: TransactionPart[];
}

interface Fee {
  id: string;
  type: string | null;
  ticker: string;
  provider_ticker: string;
  amount: string;
  asset_is_verified: boolean | null;
  fiat_ticker: string;
  fiat_value: string;
  fiat_asset_is_verified: boolean | null;
  resource_type: string;
  misc: {};
}

interface TransactionPart {
  id: string;
  direction: string;
  to_address: string;
  from_address: string;
  ticker: string;
  provider_ticker: string;
  ticker_address: string;
  amount: string;
  asset_is_verified: boolean | null;
  fiat_ticker: string;
  fiat_value: string;
  fiat_asset_is_verified: boolean | null;
  other_parties: string[];
  misc: {
    origin_id: string;
    origin_type: string;
    incomplete: string[];
  };
}

export interface TransactionToMap {
  id: string;
  transactionType: string;
  transactionHash: string;
  initiatedAt: string;
  direction: string;
  ticker: string;
  providerTicker: string;
  tickerAddress: string;
  amount: string | null;
  fiatValue: string | null;
  fiatTicker: string;
  toAddress: string | null;
  fromAddress: string | null;
  otherParties: string[];
  feeTicker: string;
  feeProviderTicker: string;
  feeAmount: string;
  feeFiatValue: string | null;
  feeFiatTicker: string | null;
  [key: string]: any;
}

export const transactionToMap = (trans: Transaction): TransactionToMap => {
  const transaction: TransactionToMap = {
    id: trans.id,
    transactionType: trans.transaction_type,
    transactionHash: trans.transaction_hash,
    initiatedAt: new Date(trans.initiated_at),
    direction:
      trans.parts && trans.parts.length > 0 ? trans.parts[0].direction : "N/A",
    ticker:
      trans.parts && trans.parts.length > 0 ? trans.parts[0].ticker : "N/A",
    providerTicker:
      trans.parts && trans.parts.length > 0
        ? trans.parts[0].provider_ticker
        : "N/A",
    tickerAddress:
      trans.parts && trans.parts.length > 0
        ? trans.parts[0].ticker_address
        : "N/A",
    amount:
      trans.parts && trans.parts.length > 0 ? trans.parts[0].amount : null,
    fiatValue:
      trans.parts && trans.parts.length > 0 ? trans.parts[0].fiat_value : "N/A",
    fiatTicker:
      trans.parts && trans.parts.length > 0
        ? trans.parts[0].fiat_ticker
        : "N/A",
    toAddress:
      trans.parts && trans.parts.length > 0 ? trans.parts[0].to_address : "N/A",
    fromAddress:
      trans.parts && trans.parts.length > 0
        ? trans.parts[0].from_address
        : "N/A",
    otherParties:
      trans.parts && trans.parts.length > 0 ? trans.parts[0].other_parties : [],
    feeTicker:
      trans.fees && trans.fees.length > 0 ? trans.fees[0].ticker : "N/A",
    feeProviderTicker:
      trans.fees && trans.fees.length > 0
        ? trans.fees[0].provider_ticker
        : "N/A",
    feeAmount:
      trans.fees && trans.fees.length > 0 ? trans.fees[0].amount : "N/A",
    feeFiatValue:
      trans.fees && trans.fees.length > 0 ? trans.fees[0].fiat_value : "N/A",
    feeFiatTicker:
      trans.fees && trans.fees.length > 0 ? trans.fees[0].fiat_ticker : "N/A",
  };

  return transaction;
};
