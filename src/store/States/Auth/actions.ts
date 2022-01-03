import Axios from "axios"
import endPoints from "../../../constants/endPoints"
import {
  LoginBody, SignUpBody, LoginTag, SignOutTag, ILoginInput,
  IUserDoc, SignOutBody
} from "./Queries"
import { CookieJar } from "tough-cookie"
import { wrapper } from "axios-cookiejar-support"

export type { IUserDoc }

const jar = new CookieJar()
export const client = wrapper(Axios.create({
  jar, withCredentials: true, maxRedirects: 0, headers: {
    "Access-Control-Allow-Credentials": true
  },
  validateStatus: function (status) {
    console.log("stat", status)
    return status <= 302; // Reject only if the status code is greater than 302
  },
}))

export const LoginUser = async ({ email, password }: ILoginInput, callback = (err: any, data: any, headers) => null) => {
  try {
    const response: any = await client.post(endPoints.baseURL, LoginBody({ email, password }))
    console.log("kk", response.data.data[LoginTag])
    callback(null, response.data.data[LoginTag], response)
  } catch (error) { console.log("err", error) }
}

export const _LoginUser = ({ email, password }: ILoginInput, callback = (err: any, data: any, headers) => null) => {
  fetch(endPoints.baseURL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': "true",
      'crossDomain': "http://localhost:3000"
    },
    credentials: "same-origin",
    method: "POST",
    body: JSON.stringify(LoginBody({ email, password }))
  })
    .then(res => {
      for (var pair of res.headers.entries()) { // accessing the entries
        if (pair[0] == 'set-session') { // key I'm looking for in this instance
          console.log("working")
        }
      }
      return res.json()
    })
    .then(response => {
      console.log("response", response)
      if (response.data.data[LoginTag].error) {
        callback(response.data.data[LoginTag].error, null, null)
      } else {
        console.log(response)
        callback(null, response.data.data[LoginTag], response)
      }
    })
}

export const signOut = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, SignOutBody())
    .then(res => {
      console.log(res)
      callback(null, res.data.data[SignOutTag])
    })
    .catch(err => console.log("Error", err))

}

// export const SignUpUser = (input: IUserInput, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, SignUpBody(input))
//     .then(res => {
//       if (res.data.data[SignUpTag].error) {
//         callback(res.data.data[SignUpTag].error, null)
//       } else {
//         callback(null, res.data.data[SignUpTag])
//       }
//     })
//     .catch(err => console.log("Error", err))
// }


// export const ActivateUserDetail = (_id: string, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, ActivateUserDetailBody(_id))
//     .then(res => {
//       if (res.data.data[EditTag].error) {
//         callback(res.data.data[EditTag].error, null)
//       } else {
//         callback(null, res.data.data[EditTag])
//       }
//     })
//     .catch(err => console.log("Error", err))
// }

// export const EditUser = (input: IUserEdit, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, EditUserBody(input))
//     .then(res => {
//       if (res.data.data[EditTag].error) {
//         callback(res.data.data[EditTag].error, null)
//       } else {
//         callback(null, res.data.data[EditTag])
//       }
//     })
//     .catch(err => console.log("Error", err))
// }

// export const FetchUserCount = (_: any, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, FetchUserCountBody())
//     .then(res => {
//       console.log()
//       callback(res.data.data[fetchCategoriesTag].error, null);
//     })
//     .catch(err => console.log("Error", err))
// }

// interface ISendText {
//   phoneNumber: string
// }

// interface IVerify extends ISendText {
//   code: string
// }

// export interface TextResponse {
//   message: string;
//   error: object;
// }

// export const SendText = ({ phoneNumber }: ISendText, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, SendTextBody(phoneNumber))
//     .then(res => {
//       if (res.data.data[SendTextTag].error) {
//         callback(res.data.data[SendTextTag].error, null)
//       } else {
//         callback(null, res.data.data[SendTextTag])
//       }
//     })
//     .catch(err => console.log("Error", err))
// }

// export const Verify = ({ phoneNumber, code }: IVerify, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, VerifyBody(phoneNumber, code))
//     .then(res => {
//       if (res.data.data[VerifyTag].error) {
//         callback(res.data.data[VerifyTag].error, null)
//       } else {
//         callback(null, res.data.data[VerifyTag])
//       }
//     })
//     .catch(err => console.log("Error", err))
// }


