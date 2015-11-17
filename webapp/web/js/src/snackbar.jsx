import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {Alert} from 'react-bootstrap';

import {dismissMsg} from './actions';

class Snackbar extends React.Component {
    constructor(props) {
        super(props);
    }
    onDismiss() {
        this.props.dispatch(dismissMsg());
    }
    render () {
        const {msg, msgStyle, dismissed} = this.props;
        const onDismiss = this.onDismiss.bind(this);
        
        if ( dismissed === true || dismissed === undefined ) {
            return (<div></div>)
        } else {
            return (
                <div style={ {position: "fixed", right: 50, top: 50} }>
                    <Alert bsStyle={msgStyle} onDismiss={onDismiss}>
                        {msg}
                    </Alert>
                </div>
            )
        }
    }
}

export default  connect((state) => state.snackbar)(Snackbar);
