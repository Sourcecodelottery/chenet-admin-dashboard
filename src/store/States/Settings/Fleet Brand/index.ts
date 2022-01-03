import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { AddFleetBrandBody, AddFleetBrandBodyTag, FetchFleetBrandsBody, FetchFleetBrandsBodyTag, RemoveFleetBrandBody, RemoveFleetBrandBodyTag } from "./query"

export const constants = {
  "FETCH_FLEET_BRANDS": "FETCH_FLEET_BRANDS"
}

export const stateName = "fleet_brands"

export const initialState = {
  fleet_brands: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_FLEET_BRANDS: {
      return {
        ...state, fleet_brands: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectFleetBrands = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchFleetBrands: (payload: any[]) => ({ type: constants.FETCH_FLEET_BRANDS, payload })
}

export const FetchFleetBrands = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchFleetBrandsBody())
  .then(res => {
    callback(null, res.data.data[FetchFleetBrandsBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const AddFleetBrand = (name: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, AddFleetBrandBody(name))
  .then(res => {
    callback(null, res.data.data[AddFleetBrandBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}

export const RemoveFleetBrand = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, RemoveFleetBrandBody(_id))
  .then(res => {
    callback(null, res.data.data[RemoveFleetBrandBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}