import { Dispatch } from "react"
import { TrackActions, TrackActionTypes } from "../../types/track";
import axios from 'axios';


export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackActions>) => {
        try {
            const {data} =  await axios.get('http://localhost:5000/tracks');
            dispatch({type:TrackActionTypes.FETCH_TRACKS,payload:data})
        } catch (error) {
            dispatch({type:TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: error.message + ' (Tracks fetching error !)'});
        }
    }
}