import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentPromoCodesTable from './RecentPromoCodesTable';
import cryptoOrders from "./data"
import { Actions, selectPromoCodes, FetchAllPromoCodes } from "src/store/States/PromoCode/"
import { connect } from "react-redux"
import { IPromoCodeJSX } from "src/models/promo_code_model";

function RecentPromoCodes(props: any) {
  useEffect(() => {
    FetchAllPromoCodes({}, ((err, data) => {
      if (err) throw err
      console.log("ll", data)
      props.fetchPromoCodes(data)
    }))
  }, [])

  const resolvePromoCodes = (): any[] => {
    return props.promo_codes.map((company: IPromoCodeJSX) => ({
      ...cryptoOrders[0],
      ...company
    }))
  }

  return (
    <Card>
      <RecentPromoCodesTable promo_codes={resolvePromoCodes()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  promo_codes: selectPromoCodes(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchPromoCodes: (payload: any) => dispatch(Actions.fetchPromoCodes(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentPromoCodes);
