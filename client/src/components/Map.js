import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet'
import {connect} from "react-redux";
import _ from 'lodash';
import Noty from 'noty';

require('noty/lib/noty.css');
require('noty/lib/themes/mint.css');


class Map extends React.Component {
    componentDidMount() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this), {
            minZoom: 2,
            maxZoom: 20,
            layers: [
                L.tileLayer(
                    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
            ],
            attributionControl: false,
        });

        this.marker = L.marker([0, 0]);
        map.on('click', this.onMapClick);
        map.fitWorld();
    }

    componentWillUnmount() {
        this.map.off('click', this.onMapClick);
        this.map = null;
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isNil(nextProps.lon)) {
            this.marker.setLatLng([nextProps.lat, nextProps.lon]);
            this.map.setView([nextProps.lat, nextProps.lon]);
            this.marker.addTo(this.map);
        } else {
            this.marker.remove();
        }
    }

    render() {
        const style = {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
        return (
            <div className='map' style={style}></div>
        );
    }
}

const mapStateToProps = (state) => {
    let data = state.geocodedQueries[state.currentQuery];
    return {
        lat: data ? data.lat : null,
        lon: data ? data.lon : null,
    }
};

Map = connect(
    mapStateToProps
)(Map);

export default Map;