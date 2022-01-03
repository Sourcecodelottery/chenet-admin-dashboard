import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { createMessageBody, createMessageTag, fetchMessagesDocBoby, fetchMessagesDocTag, removeMessage, removeMessageTag } from "./queries"
import { IMessageInput } from "./message.types"
import { IBasicID } from "../Common/types"

// create message
export const createMessage = ({ content, targetingOptions, phoneNumbers }: IMessageInput, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, createMessageBody({ content, targetingOptions, phoneNumbers }))
    .then(res => {
      console.log(res.data.data)
      callback(null, res.data.data[createMessageTag])
    })
    .catch(err => console.log("Error", err))
}

// fetch all messages
export const fetchAllMessages = ((callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, fetchMessagesDocBoby(), { withCredentials: true, headers: { 'set-cookie': "nodejs_session:=s%3AoA40MGang3BcyfVmbjSaInsRuipyllmx.solrMZ%2B74Y4RcaXDytauk0tlNcr2R7p6uAxrvBU%2BvZ4" } })
    .then(res => {
      console.log(res.data.data)
      callback(null, res.data.data[fetchMessagesDocTag])
    })
    .catch(err => console.log("Error", err))
})

// remove message
export const removeOneMessage = (({ _id }: IBasicID, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, removeMessage({ _id }))
    .then(res => {
      console.log(res.data.data[removeMessageTag])
      callback(null, res.data.data[removeMessageTag])
    })
    .catch(err => console.log("Error", err))
})