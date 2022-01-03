import { IAddress } from "src/constants/interfaces"
import { CryptoOrderStatus } from "./crypto_order";
import { Role } from "src/constants/roles"

export interface ICompanyJSX {
  _id: string
  name: string
  address: IAddress
  profile_picture: string
  preferred_brokers: string[]
  blocked_brokers: string[]
  service_id: string
  phone_number: string
  email: string
  role: Role
  createdAt: string
  
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