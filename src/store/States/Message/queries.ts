import { IMessageInput } from "./message.types";
import { IBasicID } from "../Common/types"


// create a message
export const createMessageTag = "createMessage"


export const createMessageBody = ({ content, targetingOptions, phoneNumbers }: IMessageInput) => ({
  query: `mutation {
    createMessage(input:{content: {title:"${content.title}", description:"${content.description}"},targetingOptions: {age:"${targetingOptions.age}", sex:"${targetingOptions.sex}",location:"${targetingOptions.location}"},phoneNumbers: ["${phoneNumbers}"],}) {
      __typename
      ... on IMessageSimple{
          _id content{title description} targetingOptions{age sex location} sender channel_type phoneNumbers updatedAt createdAt
       }
      ... on ValidationErrors {
        validation_errors {
          error_path errors {
            error_message error_code
          }
        }
      }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
});

// fetch all messages
export const fetchMessagesDocTag = "fetchMessagesDoc";

export const fetchMessagesDocBoby = () => ({
  query: `{
    fetchMessagesDoc{
          _id content{title description} targetingOptions{age sex location} sender{first_name last_name _id phone_number email role is_active} channel_type phoneNumbers updatedAt createdAt
    }
  }`
});

//remove message
export const removeMessageTag = "removeMessageByID";

export const removeMessage = ({ _id }: IBasicID) => ({
  query: `mutation {
    removeMessageByID(_id: "${_id}") {
      __typename
      ... on IMessageSimple{
          _id content{title description} targetingOptions{age sex location} sender channel_type phoneNumbers updatedAt createdAt
       }
      ... on ValidationErrors {
        validation_errors {
          error_path errors {
            error_message error_code
          }
        }
      }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
});