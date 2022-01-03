import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentCompaniesTable from './RecentCompaniesTable';
import cryptoOrders from "./data"
import { FetchCompanies, Actions, selectCompanies } from "src/store/States/Company/"
import { connect } from "react-redux"
import { ICompanyJSX } from "src/models/company_model";
import ViewIcon from "@mui/icons-material/RemoveRedEyeOutlined"

function RecentCompanies(props: any) {
  useEffect(() => {
    FetchCompanies({}, ((err, data) => {
      if (err) throw err
      props.fetchCompanies(data)
    }))
  }, [])

  const resolveCompanies = (): any[] => {
    return props.companys.map((company: ICompanyJSX) => ({
      ...cryptoOrders[0],
      ...company
    }))
  }

  return (
    <Card>
      <RecentCompaniesTable companys={resolveCompanies()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  companys: selectCompanies(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchCompanies: (payload: any) => dispatch(Actions.fetchCompanies(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentCompanies);
