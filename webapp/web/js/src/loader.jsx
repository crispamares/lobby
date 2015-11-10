import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import remote from 'remote';
let fs = remote.require('fs');
import path from 'path';

import Context from 'context';
import FileDropper from './fileDropper';
import {fillFromSchema, initCards, loadTable} from './actions';

const config = remote.getGlobal('configuration');

class Loader extends React.Component {
    constructor(props) {
        super(props);
        let argv = remote.process.argv.slice(2);
        if (argv.length !== 0) {
            this.readTable(argv[0]);
        }
        console.log(this.props);
    }
    readTable (filePath) {
        let {dispatch, history} = this.props;
        let rpc = Context.instance().rpc;
        let destination = path.join(config.destinationPath, path.basename(filePath));

        try {
            if (fs.lstatSync(destination).isFile) fs.unlinkSync(destination);
        }
        catch(e) {}
        fs.symlinkSync( filePath, destination);

        dispatch(loadTable("mainTable", destination))
        .then(() => {history.pushState(history.state, "/editor");} );
    }
    render () {
        return (
            <FileDropper onFileDrop={(filePath) => {this.readTable(filePath);} }>
                <span> Drop here a CSV file </span>
            </FileDropper>
        )
    }
}

export default  connect((state) => state)(Loader);
