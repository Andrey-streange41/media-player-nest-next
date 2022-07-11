import * as  PlayerActionsCreator from '../actionsCreator/player';
import * as TrackActionsCreator from '../actionsCreator/track'

export default {
    ...PlayerActionsCreator,
    ...TrackActionsCreator
}