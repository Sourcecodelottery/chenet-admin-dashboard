import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchCompaniesBody, FetchCompanyTag } from "./query"

export const constants = {
  "FETCH_COMPANIES": "FETCH_COMPANIES"
}

export const stateName = "companies"

export const initialState = {
  brokers: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_COMPANIES: {
      return {
        ...state, brokers: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectCompanies = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchCompanies: (payload: any[]) => ({ type: constants.FETCH_COMPANIES, payload })
}

export const FetchCompanies = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchCompaniesBody())
  .then(res => {
    callback(null, res.data.data[FetchCompanyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}