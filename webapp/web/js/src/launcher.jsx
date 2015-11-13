import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import _ from "lodash";
import remote from 'remote';
import {Button, ListGroup} from 'react-bootstrap';
import path from 'path';

import TestedListItem from './testedListItem';
import {renameColumns, createNewTable, writeTable,
     configIndyva} from './actions';

const config = remote.getGlobal('configuration');

class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this._renameColumns(props)
        //TODO: .then((x) => {this._renameCategoricalValues(props);})
        .then(() => {return this._createFinalTable(props);})
        .then(() => {return this._writeFinalTable(props)})
        .then(() => {return this._configIndyva(props)});
    }
    _renameColumns(props) {
        let namesMap = {};
        _.mapValues(props.attributes.present.attrsByName,
            (x) => { if (x.name !== x.label) namesMap[x.name] = x.label });
        return props.dispatch(renameColumns(props.table.tableName, namesMap));
    }
    _createFinalTable(props) {
        const name = config.indyvaTableName;
        const sourceTable = props.table.tableName;
        const attributes = props.attributes.present.attrsByName;
        const schema = {
            dataset_type: "TABLE",
            index: props.attributes.present.index,
            attributes: _.chain(attributes)
                .mapKeys((attr, name) => attr.label)
                .mapValues((attr) => _.omit(attr, ["label", "name"]))
                .value(),
            order: _.map(props.attributes.present.order, (attr) => attributes[attr].label)
        };
        return props.dispatch(createNewTable(config.indyvaTableName, sourceTable, schema));
    }
    _writeFinalTable(props) {
        let filePath = path.join(config.destinationPath, config.indyvaTableName + '.csv');
        return props.dispatch(writeTable(config.indyvaTableName, filePath));
    }
    _configIndyva(props) {
        return props.dispatch(configIndyva(config.indyvaTableName));
    }
    render () {
        let renamingState = this.props.table.renamingState;
        let categoricalValuesState = "waiting";
        let finalTableState = this.props.table.writingTableState;
        let indyvaState = this.props.table.configuringIndyvaState;

        const ready = (
            this.props.table.renamingState === "success" &&
            this.props.table.creatingNewTableState === "success" &&
            this.props.table.writingTableState === "success" &&
            this.props.table.configuringIndyvaState === "success"
        );
        return (
            <div className="launcher col-sm-6 col-sm-offset-3">
                <ListGroup>
                    <TestedListItem testingState={renamingState}> Rename Columns </TestedListItem>
                    <TestedListItem testingState={categoricalValuesState}> Modify Categorical Values </TestedListItem>
                    <TestedListItem testingState={finalTableState}> Prepare Final Table </TestedListItem>
                    <TestedListItem testingState={indyvaState}> Prepare the Analysis Tools </TestedListItem>
                </ListGroup>
                <Button bsStyle="primary" block disabled={!ready}
                    onClick={() => { if (ready) {window.location = config.afterLobbyAppUrl} }}>
                    Launch
                 </Button>
            </div>
        )
    }
}

export default  connect((state) => state)(Launcher);
