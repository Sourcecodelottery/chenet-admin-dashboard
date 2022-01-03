import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { fetchGroupByIDTag, fetchGroupByIDBody, FetchNewsesDocBody, removeNewsBody, removeNewsTag, createNewsBody, createNewsTag } from "./queries"
import { IBasicID } from "../Common/types"
import { INewsInput } from "./news.types"


// create news
export const createNews = ({ content, targetingOptions }: INewsInput, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, createNewsBody({ content, targetingOptions }))
    .then(res => {
      console.log(res.data.data[createNewsTag])
      callback(null, res.data.data[createNewsTag])
    })
    .catch(err => console.log("Error", err))
}

// // edit news
// export const editGroup = (({ _id, price, priority, minimum_user, maximum_user_purchase_amount, type }: IGroupEdit, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, editGroupBody({ _id, price, priority, minimum_user, maximum_user_purchase_amount, type } as IGroupEdit))
//     .then(res => {
//       console.log(res.data.data)
//       callback(null, res.data.data[editGroupTag])
//     })
//     .catch(err => console.log("Error", err))
// })

// remove news
export const removeOneNews = (({ _id }: IBasicID, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, removeNewsBody({ _id }))
    .then(res => {
      callback(null, res.data.data[removeNewsTag])
    })
    .catch(err => console.log("Error", err))
});

// fetch news by Id
export const fectchGroupByID = (({ _id }: IBasicID, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, fetchGroupByIDBody({ _id }))
    .then(res => {
      callback(null, res.data.data[fetchGroupByIDTag])
    })
    .catch(err => console.log("Error", err))
});

export const FetchNewsDocTag = "fetchNewsesDoc"

export const FetchNewsesDoc = (callback = (err: any, data: any, headers) => null) => {
  Axios.post(endPoints.baseURL, FetchNewsesDocBody())
    .then((res: { data: { data: { [x: string]: any; }; }; }) => {
      console.log(res.data.data);
      callback(null, res.data.data[FetchNewsDocTag], res)
    })
    .catch(err => console.log("Error", err))
};