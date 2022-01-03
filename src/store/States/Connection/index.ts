import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchAllConnectionsBody, FetchAllConnectionsBodyTag, FetchBrokerConnectionsBody, FetchBrokerConnectionsBodyTag, FetchConnectionCompaniesBody, FetchConnectionCompaniesBodyTag } from "./query"

export const constants = {
  "FETCH_CONNECTIONS": "FETCH_CONNECTIONS"
}

export const stateName = "connections"

export const initialState = {
  connections: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_CONNECTIONS: {
      return {
        ...state, connections: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectConnections = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchConnections: (payload: any[]) => ({ type: constants.FETCH_CONNECTIONS, payload })
}

export const FetchBrokerConnections = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchBrokerConnectionsBody(_id))
  .then(res => {
    callback(null, res.data.data[FetchBrokerConnectionsBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const FetchConnectionCompanies = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchConnectionCompaniesBody(_id))
  .then(res => {
    callback(null, res.data.data[FetchConnectionCompaniesBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const FetchAllConnections = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchAllConnectionsBody())
  .then(res => {
    callback(null, res.data.data[FetchAllConnectionsBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}