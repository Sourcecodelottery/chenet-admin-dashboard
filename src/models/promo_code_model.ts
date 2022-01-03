import { CryptoOrderStatus } from "./crypto_order";

export interface IPromoCodeJSX {
  _id: string
  user: string
  coin_amount: number
  code: string


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