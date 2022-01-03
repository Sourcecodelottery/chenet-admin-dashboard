export const FetchAllPromoCodesBodyTag = "fetchPromoCodes"
export const FetchAllPromoCodesBody = () => ({
  query: `{
    fetchPromoCodes {
      _id
      coin_amount
      code
    }
  }`
})