import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchBrokersBody, FetchBrokerTag, FetchOneUserBrokerByIDBody, FetchOneUserBrokerByIDBodyTag, FetchPreferenceCountBody, FetchPreferenceCountBodyTag } from "./query"

export const constants = {
  "FETCH_BROKERS": "FETCH_BROKERS"
}

export const stateName = "brokers"

export const initialState = {
  brokers: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_BROKERS: {
      return {
        ...state, brokers: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectBrokers = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchBrokers: (payload: any[]) => ({ type: constants.FETCH_BROKERS, payload })
}

export const FetchBrokers = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchBrokersBody())
  .then(res => {
    callback(null, res.data.data[FetchBrokerTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const FetchOneUserBrokerByID = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchOneUserBrokerByIDBody(_id))
  .then(res => {
    callback(null, res.data.data[FetchOneUserBrokerByIDBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const FetchPreferenceCount = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchPreferenceCountBody(_id))
  .then(res => {
    callback(null, res.data.data[FetchPreferenceCountBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}