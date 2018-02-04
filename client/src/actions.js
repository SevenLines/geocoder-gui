import axios from 'axios';
import _ from 'lodash';

export const SET_QUERY = 'SET_QUERY';
export const setQuery = (query) => {
    return {
        type: SET_QUERY,
        query
    }
};


export const RECEIVE_GEOCODED_QUERY = 'GET_GEOCODED_QUERY';
export const receiveGeocodedQuery = (query, lat, lon) => {
    return {
        type: RECEIVE_GEOCODED_QUERY,
        query,
        lat,
        lon,
        receivedAt: Date.now()
    }
};

const geocodeQueryInner = _.debounce((dispatch, query) => {
    axios.get('/geocode/', {
        params: {
            query
        }
    }).then(response => {
        dispatch(receiveGeocodedQuery(query, response.data.lat, response.data.lon))
    })
}, 500);


export function geocodeQuery(query) {
    return function (dispatch) {
        dispatch(setQuery(query));

        return geocodeQueryInner(dispatch, query);
    }
}