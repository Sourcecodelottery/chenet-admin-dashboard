import { CryptoOrderStatus } from "./crypto_order";

export interface IConnectionJSX {
  _id: string
  company: string
  broker: string


  id: string;
  status: CryptoOrderStatus;
  title: string;
  ageLimit: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}