import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentCombinationUsersTable from './RecentCombinationUsersTable';
import cryptoOrders from "./data"
import { FetchCombinationUsers, Actions, selectCombinationUsers } from "src/store/States/CombinationUser/"
import { connect } from "react-redux"
import { ICombinationUserJSX } from "src/models/combination_user_model";
import ViewIcon from "@mui/icons-material/RemoveRedEyeOutlined"

function RecentCombinationUsers(props: any) {
  useEffect(() => {
    FetchCombinationUsers({}, ((err, data) => {
      if (err) throw err
      props.fetchCombinationUsers(data)
    }))
  }, [])

  const resolveCombinationUsers = (): any[] => {
    return props.combination_users.map((combination_user: ICombinationUserJSX) => ({
      ...cryptoOrders[0],
      ...combination_user
    }))
  }

  return (
    <Card>
      <RecentCombinationUsersTable combination_users={resolveCombinationUsers()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  combination_users: selectCombinationUsers(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchCombinationUsers: (payload: any) => dispatch(Actions.fetchCombinationUsers(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentCombinationUsers);
