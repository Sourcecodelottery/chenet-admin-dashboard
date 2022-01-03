import { useEffect } from "react"
import { Card } from '@mui/material';
import RecentInGameRewardsTable from './RecentInGameRewardTable';
import cryptoOrders from "./data"
import { Actions, selectInGameRewards, FetchAllInGameRewards } from "src/store/States/InGameReward/"
import { connect } from "react-redux"
import { InGameRewardJSX } from "src/models/in_game_rewards";

function RecentInGameRewards(props: any) { 
  useEffect(() => {
    FetchAllInGameRewards({}, ((err, data) => {
      if (err) throw err
      props.fetchInGameRewards(data)
    }))
  }, [])

  const resolveInGameRewards = (): any[] => {
    return props.in_game_rewards.map((in_game_reward: InGameRewardJSX) => ({
      ...cryptoOrders[0],
      ...in_game_reward
    }))
  }

  return (
    <Card>
      <RecentInGameRewardsTable in_game_rewards={resolveInGameRewards()} />
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  in_game_rewards: selectInGameRewards(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchInGameRewards: (payload: any) => dispatch(Actions.fetchInGameRewards(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentInGameRewards);
