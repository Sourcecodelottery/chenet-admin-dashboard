export const FetchBrokersBody = () => ({
  query: `{
    fetchUserBrokers {
      _id
      email
      role
      phone_number
      first_name
      last_name
      profile_picture
      address {
          sub_city
          city
          kebele
      }
      preferred_companies
      preferred_drivers
      blocked_companies
      blocked_drivers
      createdAt
      updatedAt
    }
 }`
})

export const FetchBrokerTag = "fetchUserBrokers"

export const FetchOneUserBrokerByIDBodyTag = "fetchOneUserBrokerByID"
export const FetchOneUserBrokerByIDBody = (_id: string) => ({
  query: `{
    fetchOneUserBrokerByID(_id: "${_id}") {
      _id
      email
      role
      phone_number
      first_name
      middle_name
      profile_picture
      last_name
      service_id
      address {
        sub_city
        city
        kebele
      }
      preferred_companies
      preferred_drivers {
        _id first_name middle_name profile_picture
      }
      blocked_companies
      blocked_drivers
      createdAt
      updatedAt
    }
  }`
})

export const FetchPreferenceCountBodyTag = "fetchBrokerPreferenceCount"
export const FetchPreferenceCountBody = (_id: string) => ({
  query: `{
    fetchBrokerPreferenceCount(_id: "${_id}") {
      ...on Count {
        amount
      }
    }
}`
})