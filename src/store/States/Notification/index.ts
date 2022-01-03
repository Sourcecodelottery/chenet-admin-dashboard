import Axios from "axios";
import endPoints from "src/constants/endPoints"


export const stateName = "notifications_data";

const initialState = {
  notifications: [],
}

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.FETCH_NOTIFICATIONS: {
      return { ...state, notifications: action.payload }
    }
    default: return state
  }
}

export const selectNotifications = (state: any) => state.entities[stateName].notifications

export const Actions = {
  SetNotifications(payload: any) {
    return { type: constants.FETCH_NOTIFICATIONS, payload }
  },
}

export const constants = {
  "FETCH_NOTIFICATIONS": "FETCH_NOTIFICATIONS",
}



