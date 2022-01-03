export const FetchAllInGameRewardsBodyTag = "fetchInGameRewards"
export const FetchAllInGameRewardsBody = () => ({
  query: `{
    fetchInGameRewards {
      _id
      coin_amount
      work
    }
  }`
})