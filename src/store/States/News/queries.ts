import { IBasicID } from "../Common/types"
import { INewsInput } from "./news.types";

// create a news
export const createNewsTag = "createNews"


export const createNewsBody = ({ content, targetingOptions }: INewsInput) => ({
  query: `mutation {
    createNews(input:{content:{ title:"${content.title}", description: "${content.description}"}, targetingOptions:{min_age: ${targetingOptions.min_age},max_age: ${targetingOptions.max_age}, sex: [${targetingOptions.sex}], location: "${targetingOptions.location}",  isForAll: ${targetingOptions.isForAll}}}) {
      __typename
      ... on INewsSimple{
      _id content {title description } targetingOptions{min_age max_age sex location  isForAll } sender createdAt updatedAt   
       }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
});

// fetch all newses
export const fetchNewsesDocTag = "fetchNewsesDoc";

export const fetchNewsesDoc = () => ({
  query: `{
    fetchNewsesDoc{
          _id price  minimum_user priority type maximum_user_purchase_amount banned_reason users ActiveUsersCount updatedAt createdAt
    }
  }`
});

// // edit news
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

//remove news
export const removeNewsTag = "removeNewsByID";

export const removeNewsBody = ({ _id }: IBasicID) => ({
  query: `mutation {
    removeNewsByID(_id: "${_id}") {
      __typename
      ... on INewsSimple{
      _id content {title description } targetingOptions{ min_age max_age sex location isForAll } sender createdAt updatedAt   
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

export const FetchNewsesDocBody = () => ({
  query: `{
    fetchNewsesDoc{
             _id content {title description } targetingOptions{min_age max_age sex location  isForAll } sender{first_name last_name _id phone_number email role is_active}  createdAt updatedAt   
    }
  }`
});