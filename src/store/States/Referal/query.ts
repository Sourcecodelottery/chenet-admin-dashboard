export const FetchAllReferalsBodyTag = "fetchReferals"
export const FetchAllReferalsBody = () => ({
  query: `{
    fetchReferals {
      _id
      user_from
      user_to
      token
      coin_amount
      status
    }
  }`
})