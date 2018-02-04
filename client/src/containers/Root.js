import configureStore from "../configureStore";
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Map from "../components/Map";
import QueryInput from "../components/QueryInput";

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Map/>
                    <QueryInput/>
                </div>
            </Provider>
        )
    }
}