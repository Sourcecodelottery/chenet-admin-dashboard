import { ErrorType } from "../../../constants/interfaces"

export interface ILoginInput {
  email: string
  password: string
}

export interface IUserInput {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  role: string
  password: string
}

export interface IUserEdit {
  _id: string
  name?: string
  email?: string
  phoneNumber?: string
  password?: string
}

export interface IUserDoc extends IUserInput {
  _id: string
  error: ErrorType
}




////////////////////////////////////////////////////////////////////
// prices
////////////////////////////////////////////////////////////////////
export interface IPriceInput {
  name: string,
}

export interface IPriceEdit extends IPriceInput {
  _id: string,
}

export interface IPriceSimple {
  _id: string,
  name: string,
  updatedAt: Date,
  createdAt: Date,
}