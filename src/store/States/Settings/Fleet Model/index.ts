import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { AddFleetModelBody, AddFleetModelBodyTag, FetchFleetModelsBody, FetchFleetModelsBodyTag, RemoveFleetModelBody, RemoveFleetModelBodyTag } from "./query"

export const constants = {
  "FETCH_FLEET_MODELS": "FETCH_FLEET_MODELS"
}

export const stateName = "fleet_models"

export const initialState = {
  fleet_models: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_FLEET_MODELS: {
      return {
        ...state, fleet_models: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectFleetModels = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchFleetModels: (payload: any[]) => ({ type: constants.FETCH_FLEET_MODELS, payload })
}

export const FetchFleetModels = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchFleetModelsBody())
  .then(res => {
    callback(null, res.data.data[FetchFleetModelsBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const AddFleetModel = ({ available_types, fleet_brand, name }: { name: string, fleet_brand: string, available_types: string[] }, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, AddFleetModelBody({ available_types, fleet_brand, name }))
  .then(res => {
    callback(null, res.data.data[AddFleetModelBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const RemoveFleetModel = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, RemoveFleetModelBody(_id))
  .then(res => {
    callback(null, res.data.data[RemoveFleetModelBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}