import { FETCH_WEATHER_REQ, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from './actionTypes'
import api from '../service'


//get all Weather Actions
export const fetchWeatherRequest = () => {
    return {
        type: FETCH_WEATHER_REQ
    }
}

export const fetchWeatherSuccess = (Weather) => {
    return {
        type: FETCH_WEATHER_SUCCESS,
        payload: Weather
    }
}

export const fetchWeatherFailure = (error) => {
    return {
        type: FETCH_WEATHER_FAILURE,
        payload: error
    }
}


export const fetchAllWeather = (endpoint) => {
    return (dispatch) => {
        dispatch(fetchWeatherRequest)
        api.get(endpoint).then(res => {

            if (res.status == 200) {
                const Weather = res.data
                console.log('response=>  ' + JSON.stringify(res))
                dispatch(fetchWeatherSuccess(Weather))
            } else {
                const err = error.message
                dispatch(fetchWeatherFailure(err))
            }
        }).catch(error => {
            const err = error.message
            dispatch(fetchWeatherFailure(err))
        })
    }
}
