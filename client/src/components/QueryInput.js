import React from 'react';
import {connect} from 'react-redux';
import {geocodeQuery} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        query: state.currentQuery
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onInput: (event) => {
            dispatch(geocodeQuery(event.target.value))
        }
    }
};

class QueryInput extends React.Component {
    render () {
        let input;
        let styles = {
            position: "absolute",
            width: '50%',
            left: '50%',
            top: '1em',
            transform: "translate(-50%, 0)",
            zIndex: 1000
        };

        return (
            <input style={styles} type="text" value={this.props.query} onChange={this.props.onInput}/>
        )
    }
}


QueryInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(QueryInput);

export default QueryInput;