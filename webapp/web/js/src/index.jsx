import React from 'react';
import _ from 'lodash';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Loader from './loader';

// ----------------------------------------------------------
//  Setup indyva's conection
// ----------------------------------------------------------

import Context from 'context';
var context = new Context('localhost', 'ws', 19000);
context.install();
var session = 's'+String(Math.round((Math.random()*100000)));
context.openSession(session);

window.onbeforeunload = function() {return "The session will be lost";};
window.onunload = function() {context.closeSession();};

var rpc = context.rpc;
var hub = context.hub;


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

class About extends React.Component {
  render() {
    return (
      <div>Lobby. Created by Juan Morales. Cajal Blue Brain.</div>
    );
  }
}

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Loader}/>
      <Route path="about" component={About}/>
    </Route>
  </Router>
), document.getElementById('content'));
