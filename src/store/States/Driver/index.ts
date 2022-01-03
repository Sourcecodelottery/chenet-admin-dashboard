import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchDriversBody, FetchDriverTag, AddDriverBody, AddDriverTag, FetchBrokerFollowersBody, FetchBrokerFollowersBodyTag } from "./query"
import { IDriverInput } from "./driver.types"

export const constants = {
  "FETCH_DRIVERS": "FETCH_DRIVERS"
}

export const stateName = "drivers"

export const initialState = {
  brokers: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_DRIVERS: {
      return {
        ...state, brokers: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectDrivers = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchDrivers: (payload: any[]) => ({ type: constants.FETCH_DRIVERS, payload })
}

export const FetchDrivers = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchDriversBody())
  .then(res => {
    callback(null, res.data.data[FetchDriverTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const AddDriver = (input: IDriverInput, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, AddDriverBody(input))
  .then(res => {
    callback(null, res.data.data[AddDriverTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const FetchBrokerFollowers = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchBrokerFollowersBody(_id))
  .then(res => {
    callback(null, res.data.data[FetchBrokerFollowersBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}