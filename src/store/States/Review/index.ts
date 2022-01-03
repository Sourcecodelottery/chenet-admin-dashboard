import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchMyReviewsBody, FetchMyReviewsBodyTag } from "./query"

export const constants = {
  "FETCH_REVIEWS": "FETCH_REVIEWS"
}

export const stateName = "reviews"

export const initialState = {
  reviews: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_REVIEWS: {
      return {
        ...state, reviews: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectReviews = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchReviews: (payload: any[]) => ({ type: constants.FETCH_REVIEWS, payload })
}

export const FetchMyReviews = (_id: string, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchMyReviewsBody(_id))
  .then(res => {
    callback(null, res.data.data[FetchMyReviewsBodyTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}