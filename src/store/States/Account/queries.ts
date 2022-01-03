import { IBasicID } from "../Common/types"
import { IAccountInput, IAccountEdit } from "./account.types";

// create a account
export const createAccountTag = "createAccount"


export const createAccountBody = ({ first_name, last_name, phone_number, email, role, password }: IAccountInput) => ({
  query: `mutation {
    createAccount(input:{first_name: "${first_name}", last_name: "${last_name}", phone_number:  "${phone_number}", email: "${email}", role: ${role}, password: "${password}"}) {
      __typename
      ... on IAccountSimple{
          _id first_name  last_name phone_number is_active email role updatedAt createdAt
       }
      ... on ValidationErrors {
        validation_errors {
          error_path errors {
            error_message error_code
          }
        }
      }
    }
  }`
});

// // fetch all accounts
// export const fetchPricesDocTag = "fetchPricesDoc";

// export const fetchPricesDoc = () => ({
//   query: `{
//     fetchPricesDoc{
//       _id first_name  last_name phone_number email role updatedAt createdAt
//     }
//   }`
// });

// edit account
export const editAccountTag = "editAccount";

export const editAccountBody = ({ _id, first_name, role, last_name, email, phone_number, is_active }: IAccountEdit) => ({
  query: `mutation {
    editAccount(input:{_id: "${_id}", first_name: "${first_name}", role: ${role},email: "${email}", last_name: "${last_name}", is_active: ${is_active}, phone_number:  "${phone_number}"}) {
      __typename
      ... on IAccountSimple{
          _id first_name  last_name phone_number is_active email role updatedAt createdAt
      }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
      ... on ValidationErrors {
        validation_errors {
          error_path errors {
            error_message error_code
          }
        }
      }
    }
  }`
});

//remove account
export const removeAccountTag = "removeAccountByID";

export const removeAccountBody = ({ _id }: IBasicID) => ({
  query: `mutation {
    removeAccountByID(_id: "${_id}") {
      __typename
      ... on IAccountSimple{
          _id first_name is_active  last_name phone_number email role updatedAt createdAt
       }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
})

//fetch account
export const fetchAccountByIDTag = "fetchOneAccountByID";

export const fetchAccountByIDBody = ({ _id }: IBasicID) => ({
  query: `{
    fetchOneAccountByID(_id: "${_id}") {
      __typename
      ... on IAccountSimple{
          _id first_name  last_name phone_number email role is_active updatedAt createdAt
       }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
})