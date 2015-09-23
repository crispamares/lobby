import React from 'react';
import _ from 'lodash';
import { Router, Route, Link, IndexRoute } from 'react-router';
import remote from 'remote';
let fs = remote.require('fs');
import path from 'path';
import falcor from "falcor";

import {fillModelFromSchema} from "./storage";
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

var dataSource = new falcor.Model({cache: {}}).asDataSource();

var model = new falcor.Model({source: dataSource});

window.model = dataSource;

class App extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const Loader = React.createClass({
  readTable (filePath) {
    let destination = path.join("/tmp", path.basename(filePath));
    try {
      if (fs.lstatSync(destination).isFile) fs.unlinkSync(destination);
    }
    catch(e) {}
    fs.symlinkSync( filePath, destination);


    rpc.call("IOSrv.read_csv", ["userTable", destination]).then(
      table => { return rpc.call("TableSrv.schema", [table]) }
    ).then( schema => {
      fillModelFromSchema(dataSource, schema).then((d) => {console.log("setted", d)}, (e) => {console.error(e)});
      console.log("SCHEMA", schema); // setState(SCHEMA) or
      this.props.history.pushState(this.props.history.state, "/editor");
    })
    .otherwise( error => { console.error("puteeeeeeee", error); });
  },

  render () {
    return (
      <FileDropper onFileDrop={this.readTable}></FileDropper>
    )
  }
})

const Editor = React.createClass({
  getInitialState() {
    return { attributes : {} };
  },
  componentDidMount() {
    model.get('index.name')
    .subscribe( (data) => { console.log(data); this.setState({attributes: data}) });
  },
  render() {
    return (
      <pre>
        {
          JSON.stringify(this.state.attributes, null, 4)
          // _.map(_.values(this.state.attributes), (attr, i) => { return (<li key={i}> {attr.name} </li>); } )
          }
      </pre>
    );
  }
})

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Loader}/>
      <Route path="editor" component={Editor}/>
    </Route>
  </Router>
), document.getElementById('content'));
