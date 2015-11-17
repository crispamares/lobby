import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import remote from 'remote';
let fs = remote.require('fs');
import path from 'path';

import {Navbar} from 'react-bootstrap';

import FileDropper from './fileDropper';
import DatasetList from './datasetList';

import {loadTable, configIndyva} from './actions';

const config = remote.getGlobal('configuration');
window.path = path;

class Loader extends React.Component {
    constructor(props) {
        super(props);
        let argv = remote.process.argv.slice(2);
        if (argv.length !== 0) {
            this.readTable(argv[0]);
        }
    }
    listAvailableDatasets (dirPath) {
        const files = fs.readdirSync(dirPath);
        let schemas = _.filter(files, (fileName) => _.endsWith(fileName, "_schema.json"));
        let datasets = [];
        schemas.forEach( (schema) => {
            if (files.indexOf(schema.replace("_schema.json", ".csv")) > -1) {
                datasets.push(schema.replace("_schema.json", ""));
            }
        })
        console.log("Available datasets:", datasets);
        return datasets;
    }
    _launchIndyva (dispatch, dataset) {
        dispatch(configIndyva(dataset))
        .then(() => {window.location = config.afterLobbyAppUrl});
    }
    readTable (filePath) {
        let {dispatch, history} = this.props;
        let destination = path.join(config.destinationPath, path.basename(filePath));

        try {
            if (fs.lstatSync(destination).isFile) {fs.unlinkSync(destination)};
        }
        catch(e) {}
        fs.symlinkSync( filePath, destination);

        dispatch(loadTable("mainTable", destination))
        .then(() => {
            fs.unlinkSync(destination);
            if (this.props.table.loadingTableState === "error") return;
            history.pushState(history.state, "/editor");
        });
    }
    readTableFromDestination (dataset) {
        const {dispatch, history} = this.props;
        const filePath = path.join(config.destinationPath, dataset + ".csv");
        let schemaPath = filePath.replace(".csv", "_schema.json");
        schemaPath = (fs.lstatSync(schemaPath).isFile) ? schemaPath : null;

        dispatch(loadTable("mainTable", filePath, schemaPath))
        .then(() => {
            if (this.props.table.loadingTableState === "error") return;
            history.pushState(history.state, "/editor");
        } );

    }
    render () {
        const datasets = this.listAvailableDatasets(config.destinationPath);
        const onLaunchClick = this._launchIndyva.bind(this, this.props.dispatch);
        const onEditClick = this.readTableFromDestination.bind(this);
        return (
            <div>
                <Navbar brand="Lobby" fixedTop></Navbar>
                <DatasetList datasets={datasets}
                    onLaunchClick={onLaunchClick}
                    onEditClick={onEditClick}/>
                <FileDropper onFileDrop={(filePath) => {this.readTable(filePath);} }>
                    <span> Drop here a CSV file </span>
                </FileDropper>
            </div>
        )
    }
}

export default  connect((state) => state)(Loader);
