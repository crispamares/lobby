import React from 'react';
import _ from 'lodash';
import { Router, Route, Link, IndexRoute } from 'react-router';
import remote from 'remote';
let fs = remote.require('fs');
import path from 'path';

import {fillModelFromSchema} from "./storage";
import Editor from './editor';
import FileDropper from './fileDropper';

// ----------------------------------------------------------
//  Setup indyva's conection
// ----------------------------------------------------------

import Context from 'context';
var context = new Context('localhost', 'ws', 19000);
context.install();
var session = 's'+String(Math.round((Math.random()*100000)));
context.openSession(session);

var rpc = context.rpc;
var hub = context.hub;

let model = {};

class App extends React.Component {
  componentWillMount() {
    let argv = remote.process.argv.slice(2);
    if (argv.length !== 0) {
      Loader.readTable(model, this.props.history, argv[0]);
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            {React.cloneElement(this.props.children, {model: model })}
          </div>
        </div>

        <footer className="footer">
          <div className="container">
            <p className="text-muted">
              <Link to='/'>Lobby.</Link> <span>Created by Juan Morales. Cajal Blue Brain.</span>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

class Loader extends React.Component {
  static readTable (model, history, filePath) {
    let destination = path.join("/tmp", path.basename(filePath));
    try {
      if (fs.lstatSync(destination).isFile) fs.unlinkSync(destination);
    }
    catch(e) {}
    fs.symlinkSync( filePath, destination);

    rpc.call("IOSrv.read_csv", ["userTable", destination]).then(
      table => { return rpc.call("TableSrv.schema", [table]) }
    ).then( schema => {
      fillModelFromSchema(model, schema)
      console.log("SCHEMA", schema, "model: ", model); // setState(SCHEMA) or
      history.pushState(history.state, "/editor");
    })
    .otherwise( error => { console.error("puteeeeeeee", error); });
  }
  render () {
    return (
      <FileDropper onFileDrop={Loader.readTable.bind(this, this.props.model, this.props.history)}></FileDropper>
    )
  }
}


React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Loader}/>
      <Route path="editor" component={Editor}/>
    </Route>
  </Router>
), document.getElementById('content'));
