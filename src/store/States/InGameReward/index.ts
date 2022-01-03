import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchAllInGameRewardsBody, FetchAllInGameRewardsBodyTag } from "./query"

export const constants = {
  "FETCH_IN_GAME_REWARDS": "FETCH_IN_GAME_REWARDS"
}

export const stateName = "in_game_rewards"

export const initialState = {
  in_game_rewards: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_IN_GAME_REWARDS: {
      return {
        ...state, in_game_rewards: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectInGameRewards = (state: any) => state.entities[stateName].in_game_rewards

export const Actions = {
  fetchInGameRewards: (payload: any[]) => ({ type: constants.FETCH_IN_GAME_REWARDS, payload })
}

export const FetchAllInGameRewards = (_: any, callback = (err: any, data: any) => null) => {
  callback(null, [
    { _id: "sdvsdv", work: "sdvsdvsdv", user: "sdvsdvsdv", coin_amount: 20 },
    { _id: "sdvsdv", work: "sdvsdvsddfv ", user: "sdvvsdvsdvsdvsdvsdv", coin_amount: 20 },
    { _id: "sdvsdv", work: "sdvsdv sdvsdvsd", user: "sdvsdvsdvsdv", coin_amount: 20 },
  ])
  // Axios.post(endPoints.baseURL, FetchAllInGameRewardsBody())
  // .then(res => {
  //   callback(null, res.data.data[FetchAllInGameRewardsBodyTag])
  // })
  // .catch(err => {
  //   console.log("Error", err)
  //   callback(err, null)
  // })
}