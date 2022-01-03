import { IAddress, Gender, Bank } from "src/constants/interfaces";

export interface IDriverInput {
  first_name: string
  last_name: string
  phone_number: string
  password: string
  email: string
  truck_available?: boolean
  middle_name?: string
  address?: IAddress
  gender?: Gender
  birth_date?: string
  license_number?: string
  fleet_brand?: string
  fleet_model?: string
  fleet_body_color?: string
  fleet_type?: string
  fleet_plate_number?: string
  vehicle_photos?: string[]
  bank?: Bank
  bank_account?: string
  wallet_amount?: number
  profile_picture?: string
}