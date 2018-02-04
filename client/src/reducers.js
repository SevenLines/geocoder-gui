import {combineReducers} from 'redux'
import {RECEIVE_GEOCODED_QUERY, SET_QUERY} from "./actions";

function currentQuery(state='Иркутск Байкальская 256', action) {
    switch(action.type) {
        case SET_QUERY:
            return action.query;
        default:
            return state
    }
}


function address(state = {}, action) {
    switch (action.type) {
        case SET_QUERY:
            return Object.assign({}, state, {
                processed: false,
            });
        case RECEIVE_GEOCODED_QUERY:
            return Object.assign({}, state, {
                lat: action.lat,
                lon: action.lon,
                processed: true,
                receivedAt: action.receivedAt
            });
        default:
            return state
    }
}

function geocodedQueries(state = {}, action) {
    switch (action.type) {
        case SET_QUERY:
        case RECEIVE_GEOCODED_QUERY:
            return Object.assign({}, state, {
                [action.query]: address(state[action.query], action)
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    currentQuery,
    geocodedQueries
});

export default rootReducer;