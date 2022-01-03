export interface IAccountInput {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  role: string
  password: string
}

export interface IAccountEdit {
  _id: string,
  first_name: string
  last_name: string
  phone_number: string
  email: string
  role: string,
  is_active: boolean,
}

export interface IAccountSimple {
  _id: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  role: string
  is_active: boolean
  createdAt: Date
  updatedAt: Date
}

export const Role = [{
  role: "ADMIN",
}]

export const Status = [
  {
    name: "ACTIVE",
    value: true,
  },
  {
    name: "DEACTIVATE",
    value: false,
  }
]

// export interface IPriceDoc {
//   _id: string,
//   name: string,
//   frequency: number
//   priceAmount: number
//   description: IDescription
//   image: string[]
//   category: [ICategorySimple]
//   updatedAt: Date,
//   createdAt: Date,
// }

// export interface IDescription {
//   title: string
//   body: string
// }
