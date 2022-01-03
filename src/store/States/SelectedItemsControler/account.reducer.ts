
export const initState = {
  accountIDs: [],
};

// const AuthReducer = (state = initState, action: IAction) => {
//   switch (action.type) {
//     case ActionType.PUSH_ID:
//       return {
//         ...state, accountIDs: action.payload.accountIDs,
//       }
//   }
//   return state;
// }
// export interface ISelectCategories {
//   categoriesID: []
// }
// export const selectCategoriesID = (state: any): ISelectCategories => ({
//   categoriesID: state.entities.selectedCategoriesID.categoriesID,
// })

// export const SelectedCategoriesID = (id: any, state: any): IAction => ({
//   type: ActionType.PUSH_ID,
//   payload: { categoriesID: [...state.entities.selectedCategoriesID.categoriesID, id] }
// })


// const stateName = "accountSelectedIds";

// export { AuthReducer, stateName };


// export interface IAction {
//   type: string,
//   payload:IPayload,
// }

// export interface IPayload {
//   categoriesID: string[]
// }

// export enum ActionType {
//   "PUSH_ID" = "PUSH_ID",
// }