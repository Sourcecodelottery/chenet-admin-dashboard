import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { fetchGroupByIDTag, fetchGroupByIDBody, FetchNotificationsDocBody, removeNotificationBody, removeNotificationTag, createNotificationBody, createNotificationTag, AddNotificationBody, AddNotificationBodyTag } from "./queries"
import { IBasicID } from "../Common/types"
import { INotificationInput } from "./notification.types";

// create notification
export const createNotification = (input: INotificationInput, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, AddNotificationBody(input))
    .then(res => {
      callback(null, res.data.data[AddNotificationBodyTag])
    })
    .catch(err => console.log("Error", err))
}

// export const createNotification = async (input: INotificationInput, callback = (err: any, data: any) => null) => {
//   // format data for sending data.
//   console.log('lol', input.content.images)
//   input.targeted_users = input.targeted_users.map(value => `"${value}"`);
//   for (let i = 0; i < input.content.images.length; ++i) {
//     formData.append('image', input.content.images[i]);
//   }
//   formData.append('description', input.content.description)
//   formData.append('title', input.content.title)
//   formData.append('targeted_users', input.targeted_users.toLocaleString())
//   // send data to server.
//   try {
//     const response = await Axios.post(`${endPoints.url}notifications`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     callback(null, response.data)
//   } catch (error) {
//     console.log(error);
//     callback(error, null)
//   }
// }
// // edit notification
// export const editGroup = (({ _id, price, priority, minimum_user, maximum_user_purchase_amount, type }: IGroupEdit, callback = (err: any, data: any) => null) => {
//   Axios.post(endPoints.baseURL, editGroupBody({ _id, price, priority, minimum_user, maximum_user_purchase_amount, type } as IGroupEdit))
//     .then(res => {
//       console.log(res.data.data)
//       callback(null, res.data.data[editGroupTag])
//     })
//     .catch(err => console.log("Error", err))
// })

// remove notification
export const removeOneNotification = (({ _id }: IBasicID, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, removeNotificationBody({ _id }))
    .then(res => {
      callback(null, res.data.data[removeNotificationTag])
    })
    .catch(err => console.log("Error", err))
});

// fetch notification by Id
export const fectchGroupByID = (({ _id }: IBasicID, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, fetchGroupByIDBody({ _id }))
    .then(res => {
      callback(null, res.data.data[fetchGroupByIDTag])
    })
    .catch(err => console.log("Error", err))
});

export const FetchNotificationDocTag = "fetchNotificationsDoc"

export const FetchNotificationsDoc = (callback = (err: any, data: any, headers) => null) => {
  Axios.post(endPoints.baseURL, FetchNotificationsDocBody())
    .then((res: { data: { data: { [x: string]: any; }; }; }) => {
      console.log(res.data.data);
      callback(null, res.data.data[FetchNotificationDocTag], res)
    })
    .catch(err => console.log("Error", err))
};