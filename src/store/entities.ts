import { combineReducers } from "redux"
import { reducer as UserReducer, stateName as user } from "./States/Auth"
import { reducer as NotificationReducer, stateName as notification } from "./States/Notification";
import { reducer as NewsReducer, stateName as news } from "./States/News";
import { AuthReducer, stateName as auth } from "./States/Auth/reducer";
import { reducer as SurveyReducer, stateName as survey } from './States/Survey/'
import { reducer as BrokerReducer, stateName as broker } from './States/Broker/'
import { reducer as DriverReducer, stateName as driver } from './States/Driver/'
import { reducer as CombinationUserReducer, stateName as combination_user } from './States/CombinationUser/'
import { reducer as CompanyReducer, stateName as company } from './States/Company/'
import { reducer as ReviewReducer, stateName as review } from './States/Review/'
import { reducer as ConnectionReducer, stateName as connection } from './States/Connection/'

export default combineReducers({
  [user]: UserReducer,
  [broker]: BrokerReducer,
  [auth]: AuthReducer,
  [survey]: SurveyReducer,
  [news]: NewsReducer,
  [notification]: NotificationReducer,
  [driver]: DriverReducer,
  [combination_user]: CombinationUserReducer,
  [company]: CompanyReducer,
  [review]: ReviewReducer,
  [connection]: ConnectionReducer
});