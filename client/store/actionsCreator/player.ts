import { PlayerActions, PlayerActionTypes } from "../../types/player";
import { ITrack } from "../../types/track";



export const playTrack = () : PlayerActions => {
    return {type:PlayerActionTypes.PLAY}
}

export const pauseTrack = () : PlayerActions => {
    return {type:PlayerActionTypes.PAUSE}
}

export const setActiveTrack = (payload:ITrack) : PlayerActions => {
    return {type:PlayerActionTypes.SET_ACTIVE, payload}
}

export const setCurrentTime = (payload:number) : PlayerActions => {
    return {type:PlayerActionTypes.SET_CURRENT_TIME,payload}
}

export const setDuration = (payload:number) : PlayerActions => {
    return {type:PlayerActionTypes.SET_DURATION,payload}
}

export const setVolume = (payload:number) : PlayerActions => {
    return {type:PlayerActionTypes.SET_VOLUME,payload}
}