export const FetchCompaniesBody = () => ({
  query: `{
    fetchUserCompanies {
    _id
    email
    profile_picture
    role
    name
    address {
      sub_city
      city
      kebele
    }
    preferred_brokers
    blocked_brokers
    createdAt
    updatedAt
  }
}`
})

export const FetchCompanyTag = "fetchUserCompanies"