import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentDriversTable from './RecentDriversTable';
import cryptoOrders from "./data"
import { FetchDrivers, Actions, selectDrivers } from "src/store/States/Driver/"
import { connect } from "react-redux"
import { IDriverJSX } from "src/models/driver_model";

function RecentDrivers(props: any) {
  useEffect(() => {
    FetchDrivers({}, ((err, data) => {
      if (err) throw err
      props.fetchDrivers(data)
    }))
  }, [])

  const resolveDrivers = (): any[] => {
    return props.drivers.map((broker: IDriverJSX) => ({
      ...cryptoOrders[0],
      ...broker
    }))
  }

  return (
    <Card>
      <RecentDriversTable drivers={resolveDrivers()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  drivers: selectDrivers(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchDrivers: (payload: any) => dispatch(Actions.fetchDrivers(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentDrivers);
