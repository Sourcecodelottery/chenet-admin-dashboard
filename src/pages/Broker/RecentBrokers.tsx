import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentBrokersTable from './RecentBrokersTable';
import cryptoOrders from "./data"
import { FetchBrokers, Actions, selectBrokers } from "src/store/States/Broker/"
import { connect } from "react-redux"
import { IBrokerJSX } from "src/models/broker_model";
import ViewIcon from "@mui/icons-material/RemoveRedEyeOutlined"

function RecentBrokers(props: any) {
  useEffect(() => {
    FetchBrokers({}, ((err, data) => {
      if (err) throw err
      props.fetchBrokers(data)
    }))
  }, [])

  const resolveBrokers = (): any[] => {
    return props.brokers.map((broker: IBrokerJSX) => ({
      ...cryptoOrders[0],
      ...broker
    }))
  }

  return (
    <Card>
      <RecentBrokersTable brokers={resolveBrokers()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  brokers: selectBrokers(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchBrokers: (payload: any) => dispatch(Actions.fetchBrokers(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentBrokers);
