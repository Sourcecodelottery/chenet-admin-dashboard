import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentConnectionsTable from './RecentConnectionsTable';
import cryptoOrders from "./data"
import { Actions, selectConnections, FetchAllConnections } from "src/store/States/Connection/"
import { connect } from "react-redux"
import { IConnectionJSX } from "src/models/connection_model";
import ViewIcon from "@mui/icons-material/RemoveRedEyeOutlined"

function RecentConnections(props: any) {
  useEffect(() => {
    FetchAllConnections({}, ((err, data) => {
      if (err) throw err
      props.fetchConnections(data)
    }))
  }, [])

  const resolveConnections = (): any[] => {
    return props.companys.map((company: IConnectionJSX) => ({
      ...cryptoOrders[0],
      ...company
    }))
  }

  return (
    <Card>
      <RecentConnectionsTable companys={resolveConnections()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  companys: selectConnections(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchConnections: (payload: any) => dispatch(Actions.fetchConnections(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentConnections);
