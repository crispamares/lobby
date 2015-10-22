import React from 'react';
import _ from 'lodash';
import { Router, Route, Link, IndexRoute } from 'react-router';
import remote from 'remote';

import Editor from './editor';
import Loader from './loader';
import Launcher from './launcher';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import editorReducer from './reducers';

const config = remote.getGlobal('configuration');

// ----------------------------------------------------------
//  Setup indyva's conection
// ----------------------------------------------------------
import Context from 'context';
let context = new Context(config.indyvaServer, config.indyvaPath, config.indyvaPort);
context.install();
let session = 's'+String(Math.round((Math.random()*100000)));
context.openSession(session);

let rpc = context.rpc;
let hub = context.hub;

// ----------------------------------------------------------
//  Create the store
// ----------------------------------------------------------
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(editorReducer, {table: {tableName: 'mainTable'}});
window.store = store;

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        { this.props.children }
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


React.render((
    <Provider store={store}>
        {() =>
            <Router>
                <Route path="/" component={App}>
                    <IndexRoute component={Loader}/>
                    <Route path="editor" component={Editor}/>
                    <Route path="launch" component={Launcher}/>
                </Route>
            </Router>
        }
    </Provider>
), document.getElementById('content'));
