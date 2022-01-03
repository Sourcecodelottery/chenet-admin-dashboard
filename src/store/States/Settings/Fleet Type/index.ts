import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { AddFleetTypeBody, AddFleetTypeBodyTag, FetchFleetTypesBody, FetchFleetTypesBodyTag, RemoveFleetTypeBody, RemoveFleetTypeBodyTag } from "./query"

export const constants = {
  "FETCH_FLEET_TYPES": "FETCH_FLEET_TYPES"
}

export const stateName = "fleet_types"

export const initialState = {
  fleet_types: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_FLEET_TYPES: {
      return {
        ...state, fleet_types: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectFleetTypes = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchFleetTypes: (payload: any[]) => ({ type: constants.FETCH_FLEET_TYPES, payload })
}

export const FetchFleetTypes = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchFleetTypesBody())
  .then(res => {
    callback(null, res.data.data[FetchFleetTypesBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const AddFleetType = (name: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, AddFleetTypeBody(name))
  .then(res => {
    callback(null, res.data.data[AddFleetTypeBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const RemoveFleetType = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, RemoveFleetTypeBody(_id))
  .then(res => {
    callback(null, res.data.data[RemoveFleetTypeBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}