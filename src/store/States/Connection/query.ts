export const FetchBrokerConnectionsBodyTag = "fetchBrokerConnections"
export const FetchBrokerConnectionsBody = (_id: string) => ({
  query: `{
    fetchBrokerConnections(_id: "${_id}") {
    _id
    company
    broker
    createdAt
    updatedAt
  }
}`
})

export const FetchConnectionCompaniesBodyTag = "fetchConnectionCompanies"
export const FetchConnectionCompaniesBody = (_id: string) => ({
  query: `{
    fetchConnectionCompanies(_id: "${_id}") {
    _id
    name
    profile_picture
  }
}`
})

export const FetchAllConnectionsBodyTag = "fetchConnections"
export const FetchAllConnectionsBody = () => ({
  query: `{
    fetchConnections {
      _id
      broker
      company
    }
  }`
})