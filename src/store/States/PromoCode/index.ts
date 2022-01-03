import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchAllPromoCodesBody, FetchAllPromoCodesBodyTag } from "./query"

export const constants = {
  "FETCH_PROMO_CODES": "FETCH_PROMO_CODES"
}

export const stateName = "promocodes"

export const initialState = {
  promocodes: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_PROMO_CODES: {
      return {
        ...state, promocodes: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectPromoCodes = (state: any) => state.entities[stateName].promocodes

export const Actions = {
  fetchPromoCodes: (payload: any[]) => ({ type: constants.FETCH_PROMO_CODES, payload })
}

export const FetchAllPromoCodes = (_: any, callback = (err: any, data: any) => null) => {
  callback(null, [
    { _id: "sdvsdv", code: "sdvsdvsdv", user: "sdvsdvsdv", coin_amount: 20 },
    { _id: "sdvsdv", code: "23v23v2", user: "c2323", coin_amount: 30 },
    { _id: "sdvsdv", code: "sdvsdv12d23f23sdv", user: "23v23v23", coin_amount: 40 },
  ])
  // Axios.post(endPoints.baseURL, FetchAllPromoCodesBody())
  // .then(res => {
  //   callback(null, res.data.data[FetchAllPromoCodesBodyTag])
  // })
  // .catch(err => {
  //   console.log("Error", err)
  //   callback(err, null)
  // })
}