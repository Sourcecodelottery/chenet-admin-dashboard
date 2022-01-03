import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentReferalsTable from './RecentReferalsTable';
import cryptoOrders from "./data"
import { Actions, selectReferals, FetchAllReferals } from "src/store/States/Referal/"
import { connect } from "react-redux"
import { IReferalJSX } from "src/models/referal_code_model";

function RecentReferals(props: any) {
  useEffect(() => {
    FetchAllReferals({}, ((err, data) => {
      if (err) throw err
      props.fetchReferals(data)
    }))
  }, [])

  const resolveReferals = (): any[] => {
    return props.referals.map((company: IReferalJSX) => ({
      ...cryptoOrders[0],
      ...company
    }))
  }

  return (
    <Card>
      <RecentReferalsTable referals={resolveReferals()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  referals: selectReferals(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchReferals: (payload: any) => dispatch(Actions.fetchReferals(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentReferals);
