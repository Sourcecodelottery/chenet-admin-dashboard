import StateArrayModel from "../../../wrappers/StateModels/StateArrayModelGQL"
import { IAccountSimple } from "./account.types"

export { createAccountBody as createAccountBody } from "./queries"

const Account = new StateArrayModel({ stateName: "accounts_data" })

Account.setInitialState()

Account.setFetchBody("fetchAccounts")
Account.setAddBody("postAccount")
Account.setEditBody("editAccount")
Account.setDeleteBody("removeAccount")

Account.createSlice()

export const {
  selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = Account.getSelectors()

export const {
  stateName, reducer
} = Account.getEntity()

export const {
  Fetch, Add, Remove, Edit
} = Account.getAPIHandles()

export const selectAccounts = (state: any): IAccountSimple[] => {
  const base: IAccountSimple[] = []
  const result = selectData(state)
  return [...base, ...result]
};

export const FetchAccounts = () => ({
  query: `{
    fetchAccounts{
      _id first_name  last_name phone_number is_active email role updatedAt createdAt
    }
  }`
})

