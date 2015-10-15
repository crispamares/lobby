import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import remote from 'remote';
let fs = remote.require('fs');
import path from 'path';

import Context from 'context';
import FileDropper from './fileDropper';
import {fillFromSchema, initCards} from './actions';

const config = remote.getGlobal('configuration');

class Loader extends React.Component {
    constructor(props) {
        super(props);

        let argv = remote.process.argv.slice(2);
        if (argv.length !== 0) {
            this.readTable(argv[0]);
        }
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

        rpc.call("IOSrv.read_csv", ["mainTable", destination]).then(
            table => { return rpc.call("TableSrv.schema", [table]) }
        ).then( schema => {
            dispatch(fillFromSchema(schema));
            dispatch(initCards(schema.attributes));
            console.log("SCHEMA", schema); // setState(SCHEMA) or
            history.pushState(history.state, "/editor");
        })
        .otherwise( error => { console.error("Error while reading the file:", error); });
    }
    render () {
        return (
            <FileDropper onFileDrop={this.readTable}></FileDropper>
        )
    }
}

export default  connect((state) => state)(Loader);
