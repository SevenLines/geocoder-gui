import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();


export default function configureRestore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}