import React, { PropTypes } from 'react'
import remote from 'remote';
import {Button, ListGroup} from 'react-bootstrap';

import TestedListItem from './testedListItem';

const config = remote.getGlobal('configuration');

class Launcher extends React.Component {
    render () {
        let dataTableState = "success";
        let schemaState = "waiting";
        let indyvaState = "error";
        return (
            <div className="launcher col-sm-6 col-sm-offset-3">
                <ListGroup>
                    <TestedListItem testingState={dataTableState}> Create the Data Table </TestedListItem>
                    <TestedListItem testingState={schemaState}> Save the Schema modifications </TestedListItem>
                    <TestedListItem testingState={indyvaState}> Prepare the Analysis Tools </TestedListItem>
                </ListGroup>
                <Button bsStyle="primary" block
                    onClick={() => {window.location = config.afterLobbyAppUrl}}>
                    Launch
                 </Button>
            </div>
        )
    }
}

export default Launcher;
