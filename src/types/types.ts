import { RehydrateAction } from 'redux-persist'
import { RootState } from '../rootReducer'

export interface RehydrateAppAction extends RehydrateAction {
	payload?: RootState
}
