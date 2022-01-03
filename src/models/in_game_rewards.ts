import { CryptoOrderStatus } from "./crypto_order";

export interface InGameRewardJSX {
  _id: string
  user: string
  coin_amount: number
  work: string

  id: string;
  title: string;
  ageLimit: number;
  orderID: string;
  status: CryptoOrderStatus;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}