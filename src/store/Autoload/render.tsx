import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Fetch as _FetchUsers, FetchUsers } from "../States/Auth/"

const Loader = (props: any) => {
  // useEffect(() => {
  //   props.FetchUsers()
  // }, [props])

  return (
    <>
    </>
  )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: any) => ({
  // FetchUsers: () => dispatch(_FetchUsers(FetchUsers()))
})

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
