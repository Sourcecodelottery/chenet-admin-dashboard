import { IAddress, Status, DayName, Gender, Bank } from "src/constants/interfaces"
import { CryptoOrderStatus } from "./crypto_order";
import { Role } from "src/constants/roles"

export interface IDriverJSX {
  createdAt: string
  _id: string
  first_name: string
  last_name: string
  address: IAddress
  profile_picture: string
  preferred_companies: string[]
  blocked_companies: string[]
  preferred_brokers: string[]
  blocked_brokers: string[]
  preferred_works: string[]
  truck_available: boolean
  work_load: IWorkLoad[]
  work_status: Status
  work_list: string[]
  available_work_time: IAvailableWorkTime[]
  preference_count: number
  email: string
  phone_number: string
  role: Role

  gender: Gender
  birth_date: string
  license_number: string
  fleet_brand: string
  fleet_model: string
  fleet_body_color: string
  fleet_type: string
  fleet_plate_number: string
  vehicle_photos: string[]
  bank: Bank
  bank_account: string
  wallet_amount: number
  
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

export interface IWorkLoad {
  date: DayName,
  hours: number,
}

export interface IAvailableWorkTime {
  day: DayName,
  start_at: Date,
  ended_at: Date,
}

export type IDriverInput = {
  first_name: string
  last_name: string
  truck_available: boolean
  middle_name?: string
  address: IAddress
  gender: Gender
  birth_date: string
  license_number: string
  fleet_brand?: string
  fleet_model?: string
  fleet_body_color?: string
  fleet_type?: string
  fleet_plate_number: string
  vehicle_photos?: string[]
  bank: Bank
  bank_account: string
  wallet_amount?: number
  profile_picture?: string
}