export const FetchCombinationUsersBody = () => ({
  query: `{
    fetchUserCombinations {
    _id
    email
    phone_number
    profile_picture
    role
    first_name
    last_name
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

export const FetchCombinationUsersTag = "fetchUserCombinations"