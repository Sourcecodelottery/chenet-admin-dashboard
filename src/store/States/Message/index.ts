// import StateArrayModel from "../../../wrappers/StateModels/StateArrayModelGQL"
// import { ICategorySimple } from "./category.types"
// import { IBasicID } from "../Common/types"
// import { removeCategory } from "./queries"

// export { createCategoryBody } from "./queries"

// const Category = new StateArrayModel({ stateName: "categories_data" })

// Category.setInitialState()

// Category.setFetchBody("fetchCategories")
// Category.setAddBody("postCategory")
// Category.setEditBody("editCategory")
// Category.setDeleteBody("removeCategory")

// Category.createSlice()

// export const {
//   selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
// } = Category.getSelectors()

// export const {
//   stateName, reducer
// } = Category.getEntity()

// export const {
//   Fetch, Add, Remove, Edit
// } = Category.getAPIHandles()

// export const selectCategories = (state: any): ICategorySimple[] => {
//   const base: ICategorySimple[] = []
//   const result = selectData(state)
//   return [...base, ...result]
// };

// export const FetchCategories = () => ({
//   query: `{
//     fetchCategories{
//       _id name updatedAt createdAt
//     }
//   }`
// })

import Axios from "axios";
import endPoints from "src/constants/endPoints"


export const stateName = "categories_data";

const initialState = {
  categories: [],
  isChanged: 0,
}

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case constants.SET_CHANGE:
      console.log("data base error")
      return { ...state, isChanged: state.isChanged + 1 }

    default: return state
  }
}

export const selectCategories = (state: any) => state.entities[stateName].categories;
export const selectIsChanged = (state: any) => state.entities[stateName].isChanged;

export const Actions = {
  SetCategories(payload: any) {
    return { type: constants.SET_CATEGORIES, payload }
  },
  SetChange() {
    return { type: constants.SET_CHANGE };
  },

}

export const constants = {
  "SET_CATEGORIES": "SET_CATEGORIES",
  "SET_CHANGE": "SET_CHANGE",
}



