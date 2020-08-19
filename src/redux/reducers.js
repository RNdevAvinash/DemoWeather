import { combineReducers } from 'redux'
import { FETCH_WEATHER_REQ, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from './actionTypes'


const initialWeatherState = {
    loading: true,
    weather: null,
    error: ''
}


//Reducers

// Get Weather Report 
export const getWeatherReducer = (state = initialWeatherState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_REQ: return {
            ...state,
            loading: true
        }
        case FETCH_WEATHER_SUCCESS: return {
            ...state,
            loading: false,
            weather: [action.payload],
            error: ''
        }
        case FETCH_WEATHER_FAILURE: return {
            ...state,
            loading: false,
            weather: null,
            error: action.error
        }
        default: return state
    }
}


const rootReducer = combineReducers({
    AllWeather: getWeatherReducer
})
export default rootReducer