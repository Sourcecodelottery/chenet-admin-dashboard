import Axios from "axios";
import endPoints from "src/constants/endPoints"


export const stateName = "newses_data";

const initialState = {
  newses: [],
}

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.FETCH_NEWSES: {
      return { ...state, newses: action.payload }
    }
    default: return state
  }
}

export const selectNewses = (state: any) => state.entities[stateName].newses

export const Actions = {
  SetNewses(payload: any) {
    return { type: constants.FETCH_NEWSES, payload }
  },
}

export const constants = {
  "FETCH_NEWSES": "FETCH_NEWSES",
}



