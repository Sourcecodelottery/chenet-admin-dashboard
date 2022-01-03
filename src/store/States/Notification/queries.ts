import { IBasicID } from "../Common/types"
import { INotificationInput } from "./notification.types";

// create a notification
export const AddNotificationBodyTag = "createNotification"

export const AddNotificationBody = (input: INotificationInput) => ({
  query: `mutation {
    createNotification(input: {
      content: {
        title: "${input.content.title}"
        description: "${input.content.description}"
        images: [${input.content.images.map(item => `"${item}"`)}]
      }
      targeted_users: [${input.targeted_users.map(item => `"${item}"`)}]
    }) {
      ...on ValidationError {
        error_path
      }
      ...on INotificationSimple {
        _id
        content { title description }
        targeted_users
        images
      }
    }
  }`
})

export const createNotificationTag = "createNotification"

export const createNotificationBody = ({ content, targeted_users }: INotificationInput) => ({
  query: `mutation {
    createNotification(input:{content:{ title:"${content.title}", description: "${content.description}"}, targeted_users:[${targeted_users}]}) {
      __typename
      ... on INotificationSimple{
      _id content {title description images} targeted_users sender createdAt updatedAt   
       }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
});

// fetch all notifications
export const fetchNotificationsDocTag = "fetchNotificationsDoc";

export const fetchNotificationsDoc = () => ({
  query: `{
    fetchNotificationsDoc{
          _id price  minimum_user priority type maximum_user_purchase_amount banned_reason users ActiveUsersCount updatedAt createdAt
    }
  }`
});

// // edit notification
// export const editGroupTag = "editGroup";

// export const editGroupBody = ({ _id, price, priority, minimum_user, maximum_user_purchase_amount, type }: IGroupEdit) => ({
//   query: `mutation {
//     editGroup(input:{_id: "${_id}", price: "${price}", priority: "${priority}", minimum_user:  ${minimum_user}, maximum_user_purchase_amount: "${maximum_user_purchase_amount}", type: ${type}}) {
//       __typename
//       ... on IGroupSimple{
//           _id price  minimum_user priority type maximum_user_purchase_amount banned_reason users ActiveUsersCount updatedAt createdAt
//       }
//       ... on ValidationError {
//         error_path errors {
//           error_code error_message
//         }
//       }
//       ... on ValidationErrors {
//         validation_errors {
//           error_path errors {
//             error_message error_code
//           }
//         }
//       }
//     }
//   }`
// });

//remove notification
export const removeNotificationTag = "removeNotificationByID";

export const removeNotificationBody = ({ _id }: IBasicID) => ({
  query: `mutation {
    removeNotificationByID(_id: "${_id}") {
      __typename
      ... on INotificationSimple{
      _id content {title description images} targeted_users sender createdAt updatedAt   
       }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
})

//fetch group
export const fetchGroupByIDTag = "fetchOneGroupByID";

export const fetchGroupByIDBody = ({ _id }: IBasicID) => ({
  query: `{
    fetchOneGroupByID(_id: "${_id}") {
      __typename
      ... on IGroupSimple{
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

export const FetchNotificationsDocBody = () => ({
  query: `{
    fetchNotificationsDoc{
      _id content {title description images} targeted_users sender{first_name last_name _id phone_number email role is_active} createdAt updatedAt   
    }
  }`
});