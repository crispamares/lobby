import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import remote from 'remote';
let fs = remote.require('fs');
import path from 'path';

import FileDropper from './fileDropper';
import DatasetList from './datasetList';

import {loadTable, configIndyva} from './actions';

const config = remote.getGlobal('configuration');

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
            if (fs.lstatSync(destination).isFile) fs.unlinkSync(destination);
        }
        catch(e) {}
        fs.symlinkSync( filePath, destination);

        dispatch(loadTable("mainTable", destination))
        .then(() => {history.pushState(history.state, "/editor");} );
    }
    readTableFromDestination (dataset) {
        let {dispatch, history} = this.props;
        let destination = path.join(config.destinationPath, dataset + ".csv");

        dispatch(loadTable("mainTable", destination))
        .then(() => {history.pushState(history.state, "/editor");} );

    }
    render () {
        const datasets = this.listAvailableDatasets(config.destinationPath);
        const onLaunchClick = this._launchIndyva.bind(this, this.props.dispatch);
        const onEditClick = this.readTableFromDestination.bind(this);
        return (
            <div>
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
