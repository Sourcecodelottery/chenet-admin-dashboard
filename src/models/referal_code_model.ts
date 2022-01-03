import { ReferalStatus } from "src/constants/interfaces";

export interface IReferalJSX {
  _id: string
  user_from: string
  user_to: string
  coin_amount: number
  token: string
  status: ReferalStatus


  id: string;
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