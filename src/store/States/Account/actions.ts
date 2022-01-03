import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { createAccountBody, createAccountTag, editAccountTag, removeAccountTag, editAccountBody, removeAccountBody, fetchAccountByIDTag, fetchAccountByIDBody } from "./queries"
import { IAccountInput, IAccountEdit } from "./account.types"
import { IBasicID } from "../Common/types"


// create account
export const createAccount = ({ first_name, last_name, phone_number, email, role, password }: IAccountInput, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, createAccountBody({ first_name, last_name, phone_number, email, role, password }))
    .then(res => {
      if (res.data.data[createAccountTag].error) {
        callback(res.data.data[createAccountTag].error, null)
      } else {
        callback(null, res.data.data[createAccountTag])
      }
    })
    .catch(err => console.log("Error", err))
}

// // fetch all Accounts
// export const fetchAllPricesDoc = ((callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, fetchPricesDoc())
//     .then(res => {
//       console.log(res.data.data[fetchPricesDocTag])
//       callback(null, res.data.data[fetchPricesDocTag])
//     })
//     .catch(err => console.log("Error", err))
// })

// edit account
export const editAccount = (({ _id, first_name, role, last_name, email, phone_number, is_active }: IAccountEdit, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, editAccountBody({ _id, first_name, role, last_name, email, phone_number, is_active } as IAccountEdit))
    .then(res => {
      console.log(res.data.data)
      callback(null, res.data.data[editAccountTag])
    })
    .catch(err => console.log("Error", err))
})

// remove account
export const removeOneAccount = (({ _id }: IBasicID, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, removeAccountBody({ _id }))
    .then(res => {
      callback(null, res.data.data[removeAccountTag])
    })
    .catch(err => console.log("Error", err))
});

// fetch account by Id
export const fectchAccountByID = (({ _id }: IBasicID, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, fetchAccountByIDBody({ _id }))
    .then(res => {
      callback(null, res.data.data[fetchAccountByIDTag])
    })
    .catch(err => console.log("Error", err))
});