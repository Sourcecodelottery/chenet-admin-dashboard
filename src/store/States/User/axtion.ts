import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { fetchUsersBody, fetchUsersSimpleTag } from "./query"

// fetch users
export const fetchAllUsersSimple = (callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, fetchUsersBody())
    .then(res => {
      console.log("data", res.data.data[fetchUsersSimpleTag])
      callback(null, res.data.data[fetchUsersSimpleTag])
    })
    .catch(err => console.log("Error", err))
}