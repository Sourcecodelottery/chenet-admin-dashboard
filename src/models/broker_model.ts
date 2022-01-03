import { IAddress } from "src/constants/interfaces"
import { CryptoOrderStatus } from "./crypto_order";
import { Role } from "src/constants/roles"

export interface IBrokerJSX {
  _id: string
  first_name: string
  last_name: string
  address: IAddress
  profile_picture: string
  role: Role
  preferred_companies: string[]
  preferred_drivers: string[]
  blocked_companies: string[]
  blocked_drivers: string[]
  service_id: string
  phone_number: string
  email: string
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