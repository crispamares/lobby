/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************!*\
  !*** ./index.jsx ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(/*! lodash */ 2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 3);
	
	var _remote = __webpack_require__(/*! remote */ 45);
	
	var _remote2 = _interopRequireDefault(_remote);
	
	var _editor = __webpack_require__(/*! ./editor */ 46);
	
	var _editor2 = _interopRequireDefault(_editor);
	
	var _loader = __webpack_require__(/*! ./loader */ 346);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	var _launcher = __webpack_require__(/*! ./launcher */ 349);
	
	var _launcher2 = _interopRequireDefault(_launcher);
	
	var _redux = __webpack_require__(/*! redux */ 307);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 351);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 299);
	
	var _reducers = __webpack_require__(/*! ./reducers */ 352);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	// ----------------------------------------------------------
	//  Setup indyva's conection
	// ----------------------------------------------------------
	
	var _context = __webpack_require__(/*! context */ 320);
	
	var _context2 = _interopRequireDefault(_context);
	
	var config = _remote2['default'].getGlobal('configuration');
	var context = new _context2['default'](config.indyvaServer, config.indyvaPath, config.indyvaPort);
	context.install();
	var session = 's' + String(Math.round(Math.random() * 100000));
	context.openSession(session);
	
	var rpc = context.rpc;
	var hub = context.hub;
	
	// ----------------------------------------------------------
	//  Create the store
	// ----------------------------------------------------------
	var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2['default'])(_redux.createStore);
	var store = createStoreWithMiddleware(_reducers2['default'], { table: { tableName: 'mainTable' } });
	window.store = store;
	
	var App = (function (_React$Component) {
	    _inherits(App, _React$Component);
	
	    function App() {
	        _classCallCheck(this, App);
	
	        _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            return _react2['default'].createElement(
	                'div',
	                null,
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'row' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'col-sm-12' },
	                        this.props.children
	                    )
	                ),
	                _react2['default'].createElement(
	                    'footer',
	                    { className: 'footer' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'container' },
	                        _react2['default'].createElement(
	                            'p',
	                            { className: 'text-muted' },
	                            _react2['default'].createElement(
	                                _reactRouter.Link,
	                                { to: '/' },
	                                'Lobby.'
	                            ),
	                            ' ',
	                            _react2['default'].createElement(
	                                'span',
	                                null,
	                                'Created by Juan Morales. Cajal Blue Brain.'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return App;
	})(_react2['default'].Component);
	
	_react2['default'].render(_react2['default'].createElement(
	    _reactRedux.Provider,
	    { store: store },
	    function () {
	        return _react2['default'].createElement(
	            _reactRouter.Router,
	            null,
	            _react2['default'].createElement(
	                _reactRouter.Route,
	                { path: '/', component: App },
	                _react2['default'].createElement(_reactRouter.IndexRoute, { component: _loader2['default'] }),
	                _react2['default'].createElement(_reactRouter.Route, { path: 'editor', component: _editor2['default'] }),
	                _react2['default'].createElement(_reactRouter.Route, { path: 'launch', component: _launcher2['default'] })
	            )
	        );
	    }
	), document.getElementById('content'));

/***/ },
/* 1 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/*!********************!*\
  !*** external "_" ***!
  \********************/
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 3 */
/*!**************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/index.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* components */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Router2 = __webpack_require__(/*! ./Router */ 4);
	
	var _Router3 = _interopRequireDefault(_Router2);
	
	exports.Router = _Router3['default'];
	
	var _Link2 = __webpack_require__(/*! ./Link */ 36);
	
	var _Link3 = _interopRequireDefault(_Link2);
	
	exports.Link = _Link3['default'];
	
	/* components (configuration) */
	
	var _IndexRoute2 = __webpack_require__(/*! ./IndexRoute */ 37);
	
	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);
	
	exports.IndexRoute = _IndexRoute3['default'];
	
	var _Redirect2 = __webpack_require__(/*! ./Redirect */ 38);
	
	var _Redirect3 = _interopRequireDefault(_Redirect2);
	
	exports.Redirect = _Redirect3['default'];
	
	var _Route2 = __webpack_require__(/*! ./Route */ 39);
	
	var _Route3 = _interopRequireDefault(_Route2);
	
	exports.Route = _Route3['default'];
	
	/* mixins */
	
	var _History2 = __webpack_require__(/*! ./History */ 40);
	
	var _History3 = _interopRequireDefault(_History2);
	
	exports.History = _History3['default'];
	
	var _Lifecycle2 = __webpack_require__(/*! ./Lifecycle */ 41);
	
	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);
	
	exports.Lifecycle = _Lifecycle3['default'];
	
	var _RouteContext2 = __webpack_require__(/*! ./RouteContext */ 42);
	
	var _RouteContext3 = _interopRequireDefault(_RouteContext2);
	
	exports.RouteContext = _RouteContext3['default'];
	
	/* utils */
	
	var _useRoutes2 = __webpack_require__(/*! ./useRoutes */ 23);
	
	var _useRoutes3 = _interopRequireDefault(_useRoutes2);
	
	exports.useRoutes = _useRoutes3['default'];
	
	var _RouteUtils = __webpack_require__(/*! ./RouteUtils */ 19);
	
	exports.createRoutes = _RouteUtils.createRoutes;
	
	var _RoutingContext2 = __webpack_require__(/*! ./RoutingContext */ 20);
	
	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);
	
	exports.RoutingContext = _RoutingContext3['default'];
	
	var _PropTypes2 = __webpack_require__(/*! ./PropTypes */ 35);
	
	var _PropTypes3 = _interopRequireDefault(_PropTypes2);
	
	exports.PropTypes = _PropTypes3['default'];
	
	var _match2 = __webpack_require__(/*! ./match */ 43);
	
	var _match3 = _interopRequireDefault(_match2);
	
	exports.match = _match3['default'];
	
	var _Router4 = _interopRequireDefault(_Router2);
	
	exports['default'] = _Router4['default'];

/***/ },
/* 4 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/Router.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _historyLibCreateHashHistory = __webpack_require__(/*! history/lib/createHashHistory */ 6);
	
	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
	
	var _RouteUtils = __webpack_require__(/*! ./RouteUtils */ 19);
	
	var _RoutingContext = __webpack_require__(/*! ./RoutingContext */ 20);
	
	var _RoutingContext2 = _interopRequireDefault(_RoutingContext);
	
	var _useRoutes = __webpack_require__(/*! ./useRoutes */ 23);
	
	var _useRoutes2 = _interopRequireDefault(_useRoutes);
	
	var _PropTypes = __webpack_require__(/*! ./PropTypes */ 35);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RoutingContext> with all the props
	 * it needs each time the URL changes.
	 */
	var Router = _react2['default'].createClass({
	  displayName: 'Router',
	
	  propTypes: {
	    history: object,
	    children: _PropTypes.routes,
	    routes: _PropTypes.routes, // alias for children
	    createElement: func,
	    onError: func,
	    onUpdate: func,
	    parseQueryString: func,
	    stringifyQuery: func
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	
	  componentWillMount: function componentWillMount() {
	    var _this = this;
	
	    var _props = this.props;
	    var history = _props.history;
	    var children = _props.children;
	    var routes = _props.routes;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;
	
	    var createHistory = history ? function () {
	      return history;
	    } : _historyLibCreateHashHistory2['default'];
	
	    this.history = _useRoutes2['default'](createHistory)({
	      routes: _RouteUtils.createRoutes(routes || children),
	      parseQueryString: parseQueryString,
	      stringifyQuery: stringifyQuery
	    });
	
	    this._unlisten = this.history.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    _warning2['default'](nextProps.history === this.props.history, "The `history` provided to <Router/> has changed, it will be ignored.");
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var createElement = this.props.createElement;
	
	    if (location == null) return null; // Async match
	
	    return _react2['default'].createElement(_RoutingContext2['default'], {
	      history: this.history,
	      createElement: createElement,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components
	    });
	  }
	
	});
	
	exports['default'] = Router;
	module.exports = exports['default'];

/***/ },
/* 5 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/warning/warning.js ***!
  \**********************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var __DEV__ = process.env.NODE_ENV !== 'production';
	
	var warning = function() {};
	
	if (__DEV__) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 6 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/createHashHistory.js ***!
  \************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(/*! ./Actions */ 8);
	
	var _ExecutionEnvironment = __webpack_require__(/*! ./ExecutionEnvironment */ 9);
	
	var _DOMUtils = __webpack_require__(/*! ./DOMUtils */ 10);
	
	var _DOMStateStorage = __webpack_require__(/*! ./DOMStateStorage */ 11);
	
	var _createDOMHistory = __webpack_require__(/*! ./createDOMHistory */ 12);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	var _createLocation = __webpack_require__(/*! ./createLocation */ 18);
	
	var _createLocation2 = _interopRequireDefault(_createLocation);
	
	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}
	
	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();
	
	  if (isAbsolutePath(path)) return true;
	
	  _DOMUtils.replaceHashPath('/' + path);
	
	  return false;
	}
	
	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}
	
	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}
	
	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}
	
	var DefaultQueryKey = '_k';
	
	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'Hash history needs a DOM');
	
	  var queryKey = options.queryKey;
	
	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
	
	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();
	
	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);
	
	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    }
	
	    return _createLocation2['default'](path, state, undefined, key);
	  }
	
	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.
	
	      transitionTo(getCurrentLocation());
	    }
	
	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    var path = pathname + search;
	
	    if (queryKey) path = addQueryStringValueToPath(path, queryKey, key);
	
	    if (path === _DOMUtils.getHashPath()) {
	      _warning2['default'](false, 'You cannot %s the same path using hash history', action);
	    } else {
	      if (queryKey) {
	        _DOMStateStorage.saveState(key, state);
	      } else {
	        // Drop key and state.
	        location.key = location.state = null;
	      }
	
	      if (action === _Actions.PUSH) {
	        window.location.hash = path;
	      } else {
	        // REPLACE
	        _DOMUtils.replaceHashPath(path);
	      }
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopHashChangeListener = undefined;
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function pushState(state, path) {
	    _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped');
	
	    history.pushState(state, path);
	  }
	
	  function replaceState(state, path) {
	    _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped');
	
	    history.replaceState(state, path);
	  }
	
	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
	
	  function go(n) {
	    _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
	
	    history.go(n);
	  }
	
	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }
	
	  return _extends({}, history, {
	    listen: listen,
	    pushState: pushState,
	    replaceState: replaceState,
	    go: go,
	    createHref: createHref
	  });
	}
	
	exports['default'] = createHashHistory;
	module.exports = exports['default'];

/***/ },
/* 7 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/invariant/invariant.js ***!
  \**************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var __DEV__ = process.env.NODE_ENV !== 'production';
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (__DEV__) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 8 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/Actions.js ***!
  \**************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';
	
	exports.__esModule = true;
	var PUSH = 'PUSH';
	
	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';
	
	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';
	
	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 9 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/ExecutionEnvironment.js ***!
  \***************************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 10 */
/*!***************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/DOMUtils.js ***!
  \***************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
	
	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}
	
	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}
	
	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}
	
	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}
	
	function getWindowPath() {
	  return window.location.pathname + window.location.search;
	}
	
	function go(n) {
	  if (n) window.history.go(n);
	}
	
	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	
	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 11 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/DOMStateStorage.js ***!
  \**********************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;
	var KeyPrefix = '@@History/';
	
	function createKey(key) {
	  return KeyPrefix + key;
	}
	
	function saveState(key, state) {
	  window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	}
	
	function readState(key) {
	  var json = window.sessionStorage.getItem(createKey(key));
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return null;
	}

/***/ },
/* 12 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/createDOMHistory.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(/*! ./ExecutionEnvironment */ 9);
	
	var _DOMUtils = __webpack_require__(/*! ./DOMUtils */ 10);
	
	var _createHistory = __webpack_require__(/*! ./createHistory */ 13);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));
	
	  function listen(listener) {
	    _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'DOM history needs a DOM');
	
	    return history.listen(listener);
	  }
	
	  return _extends({}, history, {
	    listen: listen
	  });
	}
	
	exports['default'] = createDOMHistory;
	module.exports = exports['default'];

/***/ },
/* 13 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/createHistory.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _deepEqual = __webpack_require__(/*! deep-equal */ 14);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _AsyncUtils = __webpack_require__(/*! ./AsyncUtils */ 17);
	
	var _Actions = __webpack_require__(/*! ./Actions */ 8);
	
	var _createLocation = __webpack_require__(/*! ./createLocation */ 18);
	
	var _createLocation2 = _interopRequireDefault(_createLocation);
	
	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}
	
	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}
	
	var DefaultKeyLength = 6;
	
	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;
	
	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;
	
	  var transitionHooks = [];
	  var changeListeners = [];
	  var location = undefined;
	
	  var allKeys = [];
	
	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }
	
	  function updateLocation(newLocation) {
	    var current = getCurrent();
	
	    location = newLocation;
	
	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }
	
	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }
	
	  function addChangeListener(listener) {
	    changeListeners.push(listener);
	  }
	
	  function removeChangeListener(listener) {
	    changeListeners = changeListeners.filter(function (item) {
	      return item !== listener;
	    });
	  }
	
	  function listen(listener) {
	    addChangeListener(listener);
	
	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }
	
	    return function () {
	      removeChangeListener(listener);
	    };
	  }
	
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }
	
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }
	
	  function runTransitionHook(hook, location, callback) {
	    var result = hook(location, callback);
	
	    if (hook.length < 2) {
	      // Assume the hook runs synchronously and automatically
	      // call the callback with the return value.
	      callback(result);
	    } else {
	      _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument call the callback instead');
	    }
	  }
	
	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      runTransitionHook(transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }
	
	  var pendingLocation = undefined;
	
	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.
	
	    _invariant2['default'](pendingLocation == null, 'transitionTo: Another transition is already in progress');
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      pendingLocation = null;
	
	      if (ok) {
	        finishTransition(nextLocation);
	        updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }
	
	  function pushState(state, path) {
	    transitionTo(_createLocation2['default'](path, state, _Actions.PUSH, createKey()));
	  }
	
	  function replaceState(state, path) {
	    transitionTo(_createLocation2['default'](path, state, _Actions.REPLACE, createKey()));
	  }
	
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }
	
	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }
	
	  function goBack() {
	    go(-1);
	  }
	
	  function goForward() {
	    go(1);
	  }
	
	  function createKey() {
	    return createRandomKey(keyLength);
	  }
	
	  function createPath(path) {
	    return path;
	  }
	
	  function createHref(path) {
	    return createPath(path);
	  }
	
	  return {
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook,
	    transitionTo: transitionTo,
	    pushState: pushState,
	    replaceState: replaceState,
	    setState: setState,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref
	  };
	}
	
	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 14 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/~/deep-equal/index.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(/*! ./lib/keys.js */ 15);
	var isArguments = __webpack_require__(/*! ./lib/is_arguments.js */ 16);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 15 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/~/deep-equal/lib/keys.js ***!
  \************************************************************************************************/
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 16 */
/*!********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/~/deep-equal/lib/is_arguments.js ***!
  \********************************************************************************************************/
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 17 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/AsyncUtils.js ***!
  \*****************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;
	
	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) return;
	
	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }
	
	  next();
	}

/***/ },
/* 18 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/createLocation.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _Actions = __webpack_require__(/*! ./Actions */ 8);
	
	function extractPath(string) {
	  var match = string.match(/https?:\/\/[^\/]*/);
	
	  if (match == null) return string;
	
	  _warning2['default'](false, 'Location path must be pathname + query string only, not a fully qualified URL like "%s"', string);
	
	  return string.substring(match[0].length);
	}
	
	function createLocation() {
	  var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	  var action = arguments.length <= 2 || arguments[2] === undefined ? _Actions.POP : arguments[2];
	  var key = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	  path = extractPath(path);
	
	  var pathname = path;
	  var search = '';
	  var hash = '';
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}
	
	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 19 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/RouteUtils.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function isValidChild(object) {
	  return object == null || _react2['default'].isValidElement(object);
	}
	
	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}
	
	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';
	
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);
	
	      if (error instanceof Error) _warning2['default'](false, error.message);
	    }
	  }
	}
	
	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}
	
	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);
	
	  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);
	
	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);
	
	    if (childRoutes.length) route.childRoutes = childRoutes;
	
	    delete route.children;
	  }
	
	  return route;
	}
	
	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router';
	 *   
	 *   var routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   );
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];
	
	  _react2['default'].Children.forEach(children, function (element) {
	    if (_react2['default'].isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);
	
	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });
	
	  return routes;
	}
	
	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (!Array.isArray(routes)) {
	    routes = [routes];
	  }
	
	  return routes;
	}

/***/ },
/* 20 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/RoutingContext.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _getRouteParams = __webpack_require__(/*! ./getRouteParams */ 21);
	
	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <RoutingContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */
	var RoutingContext = _react2['default'].createClass({
	  displayName: 'RoutingContext',
	
	  propTypes: {
	    history: object.isRequired,
	    createElement: func.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2['default'].createElement
	    };
	  },
	
	  childContextTypes: {
	    history: object.isRequired,
	    location: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    return {
	      history: this.props.history,
	      location: this.props.location
	    };
	  },
	
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var _props = this.props;
	    var history = _props.history;
	    var location = _props.location;
	    var routes = _props.routes;
	    var params = _props.params;
	    var components = _props.components;
	
	    var element = null;
	
	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.
	
	        var route = routes[index];
	        var routeParams = _getRouteParams2['default'](route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };
	
	        if (element) props.children = element;
	
	        if (typeof components === 'object') {
	          var elements = {};
	
	          for (var key in components) if (components.hasOwnProperty(key)) elements[key] = _this.createElement(components[key], props);
	
	          return elements;
	        }
	
	        return _this.createElement(components, props);
	      }, element);
	    }
	
	    _invariant2['default'](element === null || element === false || _react2['default'].isValidElement(element), 'The root route must render a single element');
	
	    return element;
	  }
	
	});
	
	exports['default'] = RoutingContext;
	module.exports = exports['default'];

/***/ },
/* 21 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/getRouteParams.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(/*! ./PatternUtils */ 22);
	
	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};
	
	  if (!route.path) return routeParams;
	
	  var paramNames = _PatternUtils.getParamNames(route.path);
	
	  for (var p in params) if (params.hasOwnProperty(p) && paramNames.indexOf(p) !== -1) routeParams[p] = params[p];
	
	  return routeParams;
	}
	
	exports['default'] = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 22 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/PatternUtils.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	
	function escapeSource(string) {
	  return escapeRegExp(string).replace(/\/+/g, '/+');
	}
	
	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];
	
	  var match,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
	    }
	
	    if (match[1]) {
	      regexpSource += '([^/?#]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '*') {
	      regexpSource += '([\\s\\S]*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }
	
	    tokens.push(match[0]);
	
	    lastIndex = matcher.lastIndex;
	  }
	
	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
	  }
	
	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}
	
	var CompiledPatternsCache = {};
	
	function compilePattern(pattern) {
	  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);
	
	  return CompiledPatternsCache[pattern];
	}
	
	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 *
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	
	function matchPattern(pattern, pathname) {
	  var _compilePattern2 = compilePattern(pattern);
	
	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;
	
	  regexpSource += '/*'; // Ignore trailing slashes
	
	  var captureRemaining = tokens[tokens.length - 1] !== '*';
	
	  if (captureRemaining) regexpSource += '([\\s\\S]*?)';
	
	  var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));
	
	  var remainingPathname, paramValues;
	  if (match != null) {
	    paramValues = Array.prototype.slice.call(match, 1).map(function (v) {
	      return v != null ? decodeURIComponent(v.replace(/\+/g, '%20')) : v;
	    });
	
	    if (captureRemaining) {
	      remainingPathname = paramValues.pop();
	    } else {
	      remainingPathname = pathname.replace(match[0], '');
	    }
	  } else {
	    remainingPathname = paramValues = null;
	  }
	
	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: paramValues
	  };
	}
	
	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}
	
	function getParams(pattern, pathname) {
	  var _matchPattern = matchPattern(pattern, pathname);
	
	  var paramNames = _matchPattern.paramNames;
	  var paramValues = _matchPattern.paramValues;
	
	  if (paramValues != null) {
	    return paramNames.reduce(function (memo, paramName, index) {
	      memo[paramName] = paramValues[index];
	      return memo;
	    }, {});
	  }
	
	  return null;
	}
	
	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	
	function formatPattern(pattern, params) {
	  params = params || {};
	
	  var _compilePattern3 = compilePattern(pattern);
	
	  var tokens = _compilePattern3.tokens;
	
	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;
	
	  var token, paramName, paramValue;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];
	
	    if (token === '*') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
	
	      _invariant2['default'](paramValue != null || parenCount > 0, 'Missing splat #%s for path "%s"', splatIndex, pattern);
	
	      if (paramValue != null) pathname += encodeURI(paramValue).replace(/%20/g, '+');
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];
	
	      _invariant2['default'](paramValue != null || parenCount > 0, 'Missing "%s" parameter for path "%s"', paramName, pattern);
	
	      if (paramValue != null) pathname += encodeURIComponent(paramValue).replace(/%20/g, '+');
	    } else {
	      pathname += token;
	    }
	  }
	
	  return pathname.replace(/\/+/g, '/');
	}

/***/ },
/* 23 */
/*!******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/useRoutes.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _historyLibActions = __webpack_require__(/*! history/lib/Actions */ 8);
	
	var _historyLibUseQueries = __webpack_require__(/*! history/lib/useQueries */ 24);
	
	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
	
	var _historyLibCreateLocation = __webpack_require__(/*! history/lib/createLocation */ 18);
	
	var _historyLibCreateLocation2 = _interopRequireDefault(_historyLibCreateLocation);
	
	var _computeChangedRoutes2 = __webpack_require__(/*! ./computeChangedRoutes */ 29);
	
	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
	
	var _TransitionUtils = __webpack_require__(/*! ./TransitionUtils */ 30);
	
	var _isActive2 = __webpack_require__(/*! ./isActive */ 32);
	
	var _isActive3 = _interopRequireDefault(_isActive2);
	
	var _getComponents = __webpack_require__(/*! ./getComponents */ 33);
	
	var _getComponents2 = _interopRequireDefault(_getComponents);
	
	var _matchRoutes = __webpack_require__(/*! ./matchRoutes */ 34);
	
	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
	
	function hasAnyProperties(object) {
	  for (var p in object) if (object.hasOwnProperty(p)) return true;
	
	  return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * - isActive(pathname, query)
	 * - registerRouteHook(route, (location) => {})
	 * - unregisterRouteHook(route, (location) => {})
	 * - match(location, (error, nextState, nextLocation) => {})
	 * - listen((error, nextState) => {})
	 */
	function useRoutes(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var routes = options.routes;
	
	    var historyOptions = _objectWithoutProperties(options, ['routes']);
	
	    var history = _historyLibUseQueries2['default'](createHistory)(historyOptions);
	    var state = {};
	
	    function isActive(pathname, query) {
	      var indexOnly = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	      return _isActive3['default'](pathname, query, indexOnly, state.location, state.routes, state.params);
	    }
	
	    var partialNextState = undefined;
	
	    function match(location, callback) {
	      if (partialNextState && partialNextState.location === location) {
	        // Continue from where we left off.
	        finishMatch(partialNextState, callback);
	      } else {
	        _matchRoutes2['default'](routes, location, function (error, nextState) {
	          if (error) {
	            callback(error, null, null);
	          } else if (nextState) {
	            finishMatch(_extends({}, nextState, { location: location }), function (err, nextLocation, nextState) {
	              if (nextState) state = nextState;
	              callback(err, nextLocation, nextState);
	            });
	          } else {
	            callback(null, null, null);
	          }
	        });
	      }
	    }
	
	    function createLocationFromRedirectInfo(_ref) {
	      var pathname = _ref.pathname;
	      var query = _ref.query;
	      var state = _ref.state;
	
	      return _historyLibCreateLocation2['default'](history.createPath(pathname, query), state, _historyLibActions.REPLACE, history.createKey());
	    }
	
	    function finishMatch(nextState, callback) {
	      var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);
	
	      var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	      var enterRoutes = _computeChangedRoutes.enterRoutes;
	
	      _TransitionUtils.runLeaveHooks(leaveRoutes);
	
	      _TransitionUtils.runEnterHooks(enterRoutes, nextState, function (error, redirectInfo) {
	        if (error) {
	          callback(error);
	        } else if (redirectInfo) {
	          callback(null, createLocationFromRedirectInfo(redirectInfo), null);
	        } else {
	          // TODO: Fetch components after state is updated.
	          _getComponents2['default'](nextState, function (error, components) {
	            if (error) {
	              callback(error);
	            } else {
	              callback(null, null, _extends({}, nextState, { components: components }));
	            }
	          });
	        }
	      });
	    }
	
	    var RouteHooks = {};
	
	    var RouteGuid = 1;
	
	    function getRouteID(route) {
	      return route.__id__ || (route.__id__ = RouteGuid++);
	    }
	
	    function getRouteHooksForRoutes(routes) {
	      return routes.reduce(function (hooks, route) {
	        hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	        return hooks;
	      }, []);
	    }
	
	    function transitionHook(location, callback) {
	      _matchRoutes2['default'](routes, location, function (error, nextState) {
	        if (nextState == null) {
	          // TODO: We didn't actually match anything, but hang
	          // onto error/nextState so we don't have to matchRoutes
	          // again in the listen callback.
	          callback();
	          return;
	        }
	
	        // Cache some state here so we don't have to
	        // matchRoutes() again in the listen callback.
	        partialNextState = _extends({}, nextState, { location: location });
	
	        var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, nextState).leaveRoutes);
	
	        var result = undefined;
	        for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	          // Passing the location arg here indicates to
	          // the user that this is a transition hook.
	          result = hooks[i](location);
	        }
	
	        callback(result);
	      });
	    }
	
	    function beforeUnloadHook() {
	      // Synchronously check to see if any route hooks want to
	      // prevent the current window/tab from closing.
	      if (state.routes) {
	        var hooks = getRouteHooksForRoutes(state.routes);
	
	        var message = undefined;
	        for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	          // Passing no args indicates to the user that this is a
	          // beforeunload hook. We don't know the next location.
	          message = hooks[i]();
	        }
	
	        return message;
	      }
	    }
	
	    function registerRouteHook(route, hook) {
	      // TODO: Warn if they register for a route that isn't currently
	      // active. They're probably doing something wrong, like re-creating
	      // route objects on every location change.
	      var routeID = getRouteID(route);
	      var hooks = RouteHooks[routeID];
	
	      if (hooks == null) {
	        var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
	
	        hooks = RouteHooks[routeID] = [hook];
	
	        if (thereWereNoRouteHooks) {
	          history.registerTransitionHook(transitionHook);
	
	          if (history.registerBeforeUnloadHook) history.registerBeforeUnloadHook(beforeUnloadHook);
	        }
	      } else if (hooks.indexOf(hook) === -1) {
	        hooks.push(hook);
	      }
	    }
	
	    function unregisterRouteHook(route, hook) {
	      var routeID = getRouteID(route);
	      var hooks = RouteHooks[routeID];
	
	      if (hooks != null) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (newHooks.length === 0) {
	          delete RouteHooks[routeID];
	
	          if (!hasAnyProperties(RouteHooks)) {
	            history.unregisterTransitionHook(transitionHook);
	
	            if (history.unregisterBeforeUnloadHook) history.unregisterBeforeUnloadHook(beforeUnloadHook);
	          }
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    }
	
	    /**
	     * This is the API for stateful environments. As the location changes,
	     * we update state and call the listener. Benefits of this API are:
	     *
	     * - We automatically manage state on the client
	     * - We automatically handle redirects on the client
	     * - We warn when the location doesn't match any routes
	     */
	    function listen(listener) {
	      return history.listen(function (location) {
	        if (state.location === location) {
	          listener(null, state);
	        } else {
	          match(location, function (error, nextLocation, nextState) {
	            if (error) {
	              listener(error);
	            } else if (nextState) {
	              listener(null, state); // match mutates state to nextState
	            } else if (nextLocation) {
	                history.transitionTo(nextLocation);
	              } else {
	                _warning2['default'](false, 'Location "%s" did not match any routes', location.pathname + location.search);
	              }
	          });
	        }
	      });
	    }
	
	    return _extends({}, history, {
	      isActive: isActive,
	      registerRouteHook: registerRouteHook,
	      unregisterRouteHook: unregisterRouteHook,
	      listen: listen,
	      match: match
	    });
	  };
	}
	
	exports['default'] = useRoutes;
	module.exports = exports['default'];

/***/ },
/* 24 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/useQueries.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _qs = __webpack_require__(/*! qs */ 25);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	function defaultStringifyQuery(query) {
	  return _qs2['default'].stringify(query, { arrayFormat: 'brackets' });
	}
	
	function defaultParseQueryString(queryString) {
	  return _qs2['default'].parse(queryString);
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);
	
	    var history = createHistory(historyOptions);
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        if (!location.query) location.query = parseQueryString(location.search.substring(1));
	
	        listener(location);
	      });
	    }
	
	    function pushState(state, pathname, query) {
	      return history.pushState(state, createPath(pathname, query));
	    }
	
	    function replaceState(state, pathname, query) {
	      return history.replaceState(state, createPath(pathname, query));
	    }
	
	    function createPath(pathname, query) {
	      var queryString = undefined;
	      if (query == null || (queryString = stringifyQuery(query)) === '') return pathname;
	
	      return history.createPath(pathname + (pathname.indexOf('?') === -1 ? '?' : '&') + queryString);
	    }
	
	    function createHref(pathname, query) {
	      return history.createHref(createPath(pathname, query));
	    }
	
	    return _extends({}, history, {
	      listen: listen,
	      pushState: pushState,
	      replaceState: replaceState,
	      createPath: createPath,
	      createHref: createHref
	    });
	  };
	}
	
	exports['default'] = useQueries;
	module.exports = exports['default'];

/***/ },
/* 25 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/~/qs/lib/index.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Stringify = __webpack_require__(/*! ./stringify */ 26);
	var Parse = __webpack_require__(/*! ./parse */ 28);
	
	
	// Declare internals
	
	var internals = {};
	
	
	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 26 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/~/qs/lib/stringify.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(/*! ./utils */ 27);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    arrayPrefixGenerators: {
	        brackets: function (prefix, key) {
	
	            return prefix + '[]';
	        },
	        indices: function (prefix, key) {
	
	            return prefix + '[' + key + ']';
	        },
	        repeat: function (prefix, key) {
	
	            return prefix;
	        }
	    },
	    strictNullHandling: false
	};
	
	
	internals.stringify = function (obj, prefix, generateArrayPrefix, strictNullHandling, filter) {
	
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    }
	    else if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        if (strictNullHandling) {
	            return Utils.encode(prefix);
	        }
	
	        obj = '';
	    }
	
	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {
	
	        return [Utils.encode(prefix) + '=' + Utils.encode(obj)];
	    }
	
	    var values = [];
	
	    if (typeof obj === 'undefined') {
	        return values;
	    }
	
	    var objKeys = Array.isArray(filter) ? filter : Object.keys(obj);
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	
	        if (Array.isArray(obj)) {
	            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, filter));
	        }
	        else {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix, strictNullHandling, filter));
	        }
	    }
	
	    return values;
	};
	
	
	module.exports = function (obj, options) {
	
	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	    var objKeys;
	    var filter;
	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    }
	    else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }
	
	    var keys = [];
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return '';
	    }
	
	    var arrayFormat;
	    if (options.arrayFormat in internals.arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    }
	    else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    }
	    else {
	        arrayFormat = 'indices';
	    }
	
	    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];
	
	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, filter));
	    }
	
	    return keys.join(delimiter);
	};


/***/ },
/* 27 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/~/qs/lib/utils.js ***!
  \*****************************************************************************************/
/***/ function(module, exports) {

	// Load modules
	
	
	// Declare internals
	
	var internals = {};
	internals.hexTable = new Array(256);
	for (var h = 0; h < 256; ++h) {
	    internals.hexTable[h] = '%' + ((h < 16 ? '0' : '') + h.toString(16)).toUpperCase();
	}
	
	
	exports.arrayToObject = function (source, options) {
	
	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {
	
	            obj[i] = source[i];
	        }
	    }
	
	    return obj;
	};
	
	
	exports.merge = function (target, source, options) {
	
	    if (!source) {
	        return target;
	    }
	
	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        }
	        else if (typeof target === 'object') {
	            target[source] = true;
	        }
	        else {
	            target = [target, source];
	        }
	
	        return target;
	    }
	
	    if (typeof target !== 'object') {
	        target = [target].concat(source);
	        return target;
	    }
	
	    if (Array.isArray(target) &&
	        !Array.isArray(source)) {
	
	        target = exports.arrayToObject(target, options);
	    }
	
	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];
	
	        if (!Object.prototype.hasOwnProperty.call(target, key)) {
	            target[key] = value;
	        }
	        else {
	            target[key] = exports.merge(target[key], value, options);
	        }
	    }
	
	    return target;
	};
	
	
	exports.decode = function (str) {
	
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};
	
	exports.encode = function (str) {
	
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }
	
	    if (typeof str !== 'string') {
	        str = '' + str;
	    }
	
	    var out = '';
	    for (var i = 0, il = str.length; i < il; ++i) {
	        var c = str.charCodeAt(i);
	
	        if (c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A)) { // A-Z
	
	            out += str[i];
	            continue;
	        }
	
	        if (c < 0x80) {
	            out += internals.hexTable[c];
	            continue;
	        }
	
	        if (c < 0x800) {
	            out += internals.hexTable[0xC0 | (c >> 6)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }
	
	        if (c < 0xD800 || c >= 0xE000) {
	            out += internals.hexTable[0xE0 | (c >> 12)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }
	
	        ++i;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));
	        out += internals.hexTable[0xF0 | (c >> 18)] + internals.hexTable[0x80 | ((c >> 12) & 0x3F)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	    }
	
	    return out;
	};
	
	exports.compact = function (obj, refs) {
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return obj;
	    }
	
	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }
	
	    refs.push(obj);
	
	    if (Array.isArray(obj)) {
	        var compacted = [];
	
	        for (var i = 0, il = obj.length; i < il; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }
	
	        return compacted;
	    }
	
	    var keys = Object.keys(obj);
	    for (i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }
	
	    return obj;
	};
	
	
	exports.isRegExp = function (obj) {
	
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	
	exports.isBuffer = function (obj) {
	
	    if (obj === null ||
	        typeof obj === 'undefined') {
	
	        return false;
	    }
	
	    return !!(obj.constructor &&
	              obj.constructor.isBuffer &&
	              obj.constructor.isBuffer(obj));
	};


/***/ },
/* 28 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/~/qs/lib/parse.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(/*! ./utils */ 27);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false
	};
	
	
	internals.parseValues = function (str, options) {
	
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
	
	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
	
	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';
	
	            if (options.strictNullHandling) {
	                obj[Utils.decode(part)] = null;
	            }
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));
	
	            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseObject = function (chain, val, options) {
	
	    if (!chain.length) {
	        return val;
	    }
	
	    var root = chain.shift();
	
	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        var indexString = '' + index;
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            indexString === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays &&
	             index <= options.arrayLimit)) {
	
	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseKeys = function (key, val, options) {
	
	    if (!key) {
	        return;
	    }
	
	    // Transform dot notation to bracket notation
	
	    if (options.allowDots) {
	        key = key.replace(/\.([^\.\[]+)/g, '[$1]');
	    }
	
	    // The regex chunks
	
	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;
	
	    // Get the parent
	
	    var segment = parent.exec(key);
	
	    // Stash the parent if it exists
	
	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1])) {
	
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	
	        keys.push(segment[1]);
	    }
	
	    // Loop through children appending to the array until we hit depth
	
	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	
	        ++i;
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }
	
	    // If there's a remainder, just add whatever is left
	
	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }
	
	    return internals.parseObject(keys, val, options);
	};
	
	
	module.exports = function (str, options) {
	
	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.allowDots = options.allowDots !== false;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : internals.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : internals.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	
	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {
	
	        return options.plainObjects ? Object.create(null) : {};
	    }
	
	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};
	
	    // Iterate over the keys and setup the new object
	
	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }
	
	    return Utils.compact(obj);
	};


/***/ },
/* 29 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/computeChangedRoutes.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(/*! ./PatternUtils */ 22);
	
	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;
	
	  var paramNames = _PatternUtils.getParamNames(route.path);
	
	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}
	
	/**
	 * Returns an object of { leaveRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;
	
	  var leaveRoutes, enterRoutes;
	  if (prevRoutes) {
	    leaveRoutes = prevRoutes.filter(function (route) {
	      return nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	    });
	
	    // onLeave hooks start at the leaf route.
	    leaveRoutes.reverse();
	
	    enterRoutes = nextRoutes.filter(function (route) {
	      return prevRoutes.indexOf(route) === -1 || leaveRoutes.indexOf(route) !== -1;
	    });
	  } else {
	    leaveRoutes = [];
	    enterRoutes = nextRoutes;
	  }
	
	  return {
	    leaveRoutes: leaveRoutes,
	    enterRoutes: enterRoutes
	  };
	}
	
	exports['default'] = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 30 */
/*!************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/TransitionUtils.js ***!
  \************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runLeaveHooks = runLeaveHooks;
	
	var _AsyncUtils = __webpack_require__(/*! ./AsyncUtils */ 31);
	
	function createEnterHook(hook, route) {
	  return function (a, b, callback) {
	    hook.apply(route, arguments);
	
	    if (hook.length < 3) {
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}
	
	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createEnterHook(route.onEnter, route));
	
	    return hooks;
	  }, []);
	}
	
	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replaceState, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replaceState short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	
	  if (!hooks.length) {
	    callback();
	    return;
	  }
	
	  var redirectInfo;
	  function replaceState(state, pathname, query) {
	    redirectInfo = { pathname: pathname, query: query, state: state };
	  }
	
	  _AsyncUtils.loopAsync(hooks.length, function (index, next, done) {
	    hooks[index](nextState, replaceState, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	          next();
	        }
	    });
	  }, callback);
	}
	
	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	
	function runLeaveHooks(routes) {
	  for (var i = 0, len = routes.length; i < len; ++i) if (routes[i].onLeave) routes[i].onLeave.call(routes[i]);
	}

/***/ },
/* 31 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/AsyncUtils.js ***!
  \*******************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;
	
	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) return;
	
	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }
	
	  next();
	}
	
	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];
	
	  if (length === 0) return callback(null, values);
	
	  var isDone = false;
	  var doneCount = 0;
	
	  function done(index, error, value) {
	    if (isDone) return;
	
	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;
	
	      isDone = ++doneCount === length;
	
	      if (isDone) callback(null, values);
	    }
	  }
	
	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 32 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/isActive.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(/*! ./PatternUtils */ 22);
	
	/**
	 * Returns true if a route and params that match the given
	 * pathname are currently active.
	 */
	function pathnameIsActive(pathname, activePathname, activeRoutes, activeParams) {
	  if (pathname === activePathname || activePathname.indexOf(pathname + '/') === 0) return true;
	
	  var route, pattern;
	  var basename = '';
	  for (var i = 0, len = activeRoutes.length; i < len; ++i) {
	    route = activeRoutes[i];
	    if (!route.path) return false;
	    pattern = route.path || '';
	
	    if (pattern.indexOf('/') !== 0) pattern = basename.replace(/\/*$/, '/') + pattern; // Relative paths build on the parent's path.
	
	    var _matchPattern = _PatternUtils.matchPattern(pattern, pathname);
	
	    var remainingPathname = _matchPattern.remainingPathname;
	    var paramNames = _matchPattern.paramNames;
	    var paramValues = _matchPattern.paramValues;
	
	    if (remainingPathname === '') {
	      return paramNames.every(function (paramName, index) {
	        return String(paramValues[index]) === String(activeParams[paramName]);
	      });
	    }
	
	    basename = pattern;
	  }
	
	  return false;
	}
	
	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;
	
	  if (query == null) return true;
	
	  for (var p in query) if (query.hasOwnProperty(p) && String(query[p]) !== String(activeQuery[p])) return false;
	
	  return true;
	}
	
	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(pathname, query, indexOnly, location, routes, params) {
	  if (location == null) return false;
	
	  if (indexOnly && (routes.length < 2 || routes[routes.length - 2].indexRoute !== routes[routes.length - 1])) return false;
	
	  return pathnameIsActive(pathname, location.pathname, routes, params) && queryIsActive(query, location.query);
	}
	
	exports['default'] = isActive;
	module.exports = exports['default'];

/***/ },
/* 33 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/getComponents.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(/*! ./AsyncUtils */ 31);
	
	function getComponentsForRoute(location, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	  } else if (route.getComponent) {
	    route.getComponent(location, callback);
	  } else if (route.getComponents) {
	    route.getComponents(location, callback);
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  _AsyncUtils.mapAsync(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState.location, route, callback);
	  }, callback);
	}
	
	exports['default'] = getComponents;
	module.exports = exports['default'];

/***/ },
/* 34 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/matchRoutes.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(/*! ./AsyncUtils */ 31);
	
	var _PatternUtils = __webpack_require__(/*! ./PatternUtils */ 22);
	
	var _RouteUtils = __webpack_require__(/*! ./RouteUtils */ 19);
	
	function getChildRoutes(route, location, callback) {
	  if (route.childRoutes) {
	    callback(null, route.childRoutes);
	  } else if (route.getChildRoutes) {
	    route.getChildRoutes(location, function (error, childRoutes) {
	      callback(error, !error && _RouteUtils.createRoutes(childRoutes));
	    });
	  } else {
	    callback();
	  }
	}
	
	function getIndexRoute(route, location, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    route.getIndexRoute(location, function (error, indexRoute) {
	      callback(error, !error && _RouteUtils.createRoutes(indexRoute)[0]);
	    });
	  } else {
	    callback();
	  }
	}
	
	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduceRight(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];
	
	    if (Array.isArray(params[paramName])) {
	      params[paramName].unshift(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [paramValue, params[paramName]];
	    } else {
	      params[paramName] = paramValue;
	    }
	
	    return params;
	  }, params);
	}
	
	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}
	
	function matchRouteDeep(basename, route, location, callback) {
	  var pattern = route.path || '';
	
	  if (pattern.indexOf('/') !== 0) pattern = basename.replace(/\/*$/, '/') + pattern; // Relative paths build on the parent's path.
	
	  var _matchPattern = _PatternUtils.matchPattern(pattern, location.pathname);
	
	  var remainingPathname = _matchPattern.remainingPathname;
	  var paramNames = _matchPattern.paramNames;
	  var paramValues = _matchPattern.paramValues;
	
	  var isExactMatch = remainingPathname === '';
	
	  if (isExactMatch && route.path) {
	    var match = {
	      routes: [route],
	      params: createParams(paramNames, paramValues)
	    };
	
	    getIndexRoute(route, location, function (error, indexRoute) {
	      if (error) {
	        callback(error);
	      } else {
	        if (indexRoute) match.routes.push(indexRoute);
	
	        callback(null, match);
	      }
	    });
	  } else if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    getChildRoutes(route, location, function (error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, pattern);
	      } else {
	        callback();
	      }
	    });
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback) {
	  var basename = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
	
	  _AsyncUtils.loopAsync(routes.length, function (index, next, done) {
	    matchRouteDeep(basename, routes[index], location, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	
	exports['default'] = matchRoutes;
	module.exports = exports['default'];

/***/ },
/* 35 */
/*!******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/PropTypes.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.falsy = falsy;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}
	
	var history = shape({
	  listen: func.isRequired,
	  pushState: func.isRequired,
	  replaceState: func.isRequired,
	  go: func.isRequired
	});
	
	exports.history = history;
	var location = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});
	
	exports.location = location;
	var component = oneOfType([func, string]);
	exports.component = component;
	var components = oneOfType([component, object]);
	exports.components = components;
	var route = oneOfType([object, element]);
	exports.route = route;
	var routes = oneOfType([route, arrayOf(route)]);
	
	exports.routes = routes;
	exports['default'] = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route
	};

/***/ },
/* 36 */
/*!*************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/Link.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	function isEmptyObject(object) {
	  for (var p in object) if (object.hasOwnProperty(p)) return false;
	
	  return true;
	}
	
	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets an "active" class name
	 * (or the value of its `activeClassName` prop).
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2['default'].createClass({
	  displayName: 'Link',
	
	  contextTypes: {
	    history: object
	  },
	
	  propTypes: {
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onClick: func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      className: '',
	      style: {}
	    };
	  },
	
	  handleClick: function handleClick(event) {
	    var allowTransition = true;
	    var clickResult;
	
	    if (this.props.onClick) clickResult = this.props.onClick(event);
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
	
	    if (clickResult === false || event.defaultPrevented === true) allowTransition = false;
	
	    event.preventDefault();
	
	    if (allowTransition) this.context.history.pushState(this.props.state, this.props.to, this.props.query);
	  },
	
	  componentWillMount: function componentWillMount() {
	    _warning2['default'](this.context.history, 'A <Link> should not be rendered outside the context of history; ' + 'some features including real hrefs, active styling, and navigation ' + 'will not function correctly');
	  },
	
	  render: function render() {
	    var history = this.context.history;
	    var _props = this.props;
	    var activeClassName = _props.activeClassName;
	    var activeStyle = _props.activeStyle;
	    var onlyActiveOnIndex = _props.onlyActiveOnIndex;
	    var to = _props.to;
	    var query = _props.query;
	    var state = _props.state;
	    var onClick = _props.onClick;
	
	    var props = _objectWithoutProperties(_props, ['activeClassName', 'activeStyle', 'onlyActiveOnIndex', 'to', 'query', 'state', 'onClick']);
	
	    props.onClick = this.handleClick;
	
	    // Ignore if rendered outside the context
	    // of history, simplifies unit testing.
	    if (history) {
	      props.href = history.createHref(to, query);
	
	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (history.isActive(to, query, onlyActiveOnIndex)) {
	          if (activeClassName) props.className += props.className === '' ? activeClassName : ' ' + activeClassName;
	
	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }
	
	    return _react2['default'].createElement('a', props);
	  }
	
	});
	
	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },
/* 37 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/IndexRoute.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _RouteUtils = __webpack_require__(/*! ./RouteUtils */ 19);
	
	var _PropTypes = __webpack_require__(/*! ./PropTypes */ 35);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var bool = _React$PropTypes.bool;
	var func = _React$PropTypes.func;
	
	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */
	var IndexRoute = _react2['default'].createClass({
	  displayName: 'IndexRoute',
	
	  statics: {
	
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      if (parentRoute) {
	        parentRoute.indexRoute = _RouteUtils.createRouteFromReactElement(element);
	      } else {
	        _warning2['default'](false, 'An <IndexRoute> does not make sense at the root of your route config');
	      }
	    }
	
	  },
	
	  propTypes: {
	    path: _PropTypes.falsy,
	    ignoreScrollBehavior: bool,
	    component: _PropTypes.component,
	    components: _PropTypes.components,
	    getComponents: func
	  },
	
	  render: function render() {
	    _invariant2['default'](false, '<IndexRoute> elements are for router configuration only and should not be rendered');
	  }
	
	});
	
	exports['default'] = IndexRoute;
	module.exports = exports['default'];

/***/ },
/* 38 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/Redirect.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(/*! ./RouteUtils */ 19);
	
	var _PatternUtils = __webpack_require__(/*! ./PatternUtils */ 22);
	
	var _PropTypes = __webpack_require__(/*! ./PropTypes */ 35);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Redirect> is used to declare another URL path a client should be sent
	 * to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration and are
	 * traversed in the same manner.
	 */
	var Redirect = _react2['default'].createClass({
	  displayName: 'Redirect',
	
	  statics: {
	
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = _RouteUtils.createRouteFromReactElement(element);
	
	      if (route.from) route.path = route.from;
	
	      // TODO: Handle relative pathnames, see #1658
	      _invariant2['default'](route.to.charAt(0) === '/', '<Redirect to> must be an absolute path. This should be fixed in the future');
	
	      route.onEnter = function (nextState, replaceState) {
	        var location = nextState.location;
	        var params = nextState.params;
	
	        var pathname = route.to ? _PatternUtils.formatPattern(route.to, params) : location.pathname;
	
	        replaceState(route.state || location.state, pathname, route.query || location.query);
	      };
	
	      return route;
	    }
	
	  },
	
	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _PropTypes.falsy,
	    children: _PropTypes.falsy
	  },
	
	  render: function render() {
	    _invariant2['default'](false, '<Redirect> elements are for router configuration only and should not be rendered');
	  }
	
	});
	
	exports['default'] = Redirect;
	module.exports = exports['default'];

/***/ },
/* 39 */
/*!**************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/Route.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(/*! warning */ 5);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(/*! ./RouteUtils */ 19);
	
	var _PropTypes = __webpack_require__(/*! ./PropTypes */ 35);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var bool = _React$PropTypes.bool;
	var func = _React$PropTypes.func;
	
	/**
	 * A <Route> is used to declare which components are rendered to the page when
	 * the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is requested,
	 * the tree is searched depth-first to find a route whose path matches the URL.
	 * When one is found, all routes in the tree that lead to it are considered
	 * "active" and their components are rendered into the DOM, nested in the same
	 * order as they are in the tree.
	 */
	var Route = _react2['default'].createClass({
	  displayName: 'Route',
	
	  statics: {
	
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = _RouteUtils.createRouteFromReactElement(element);
	
	      if (route.handler) {
	        _warning2['default'](false, '<Route handler> is deprecated, use <Route component> instead');
	
	        route.component = route.handler;
	        delete route.handler;
	      }
	
	      return route;
	    }
	
	  },
	
	  propTypes: {
	    path: string,
	    ignoreScrollBehavior: bool,
	    handler: // deprecated
	    _PropTypes.component, component: _PropTypes.component,
	    components: _PropTypes.components,
	    getComponents: func
	  },
	
	  render: function render() {
	    _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered');
	  }
	
	});
	
	exports['default'] = Route;
	module.exports = exports['default'];

/***/ },
/* 40 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/History.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PropTypes = __webpack_require__(/*! ./PropTypes */ 35);
	
	var History = {
	
	  contextTypes: { history: _PropTypes.history },
	
	  componentWillMount: function componentWillMount() {
	    this.history = this.context.history;
	  }
	
	};
	
	exports['default'] = History;
	module.exports = exports['default'];

/***/ },
/* 41 */
/*!******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/Lifecycle.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var object = _react2['default'].PropTypes.object;
	
	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method
	 * to a component that may be used to cancel a transition or prompt
	 * the user for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * routerWillLeave does not receive a location object during the beforeunload
	 * event in web browsers (assuming you're using the useBeforeUnload history
	 * enhancer). In this case, it is not possible for us to know the location
	 * we're transitioning to so routerWillLeave must return a prompt message to
	 * prevent the user from closing the tab.
	 */
	var Lifecycle = {
	
	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },
	
	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },
	
	  _getRoute: function _getRoute() {
	    var route = this.props.route || this.context.route;
	
	    _invariant2['default'](route, 'The Lifecycle mixin needs to be used either on 1) a <Route component> or ' + '2) a descendant of a <Route component> that uses the RouteContext mixin');
	
	    return route;
	  },
	
	  componentWillMount: function componentWillMount() {
	    _invariant2['default'](this.routerWillLeave, 'The Lifecycle mixin requires you to define a routerWillLeave method');
	
	    this.context.history.registerRouteHook(this._getRoute(), this.routerWillLeave);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this.context.history.unregisterRouteHook(this._getRoute(), this.routerWillLeave);
	  }
	
	};
	
	exports['default'] = Lifecycle;
	module.exports = exports['default'];

/***/ },
/* 42 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/RouteContext.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var object = _react2['default'].PropTypes.object;
	
	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	var RouteContext = {
	
	  propTypes: {
	    route: object.isRequired
	  },
	
	  childContextTypes: {
	    route: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  }
	
	};
	
	exports['default'] = RouteContext;
	module.exports = exports['default'];

/***/ },
/* 43 */
/*!**************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/lib/match.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = match;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _historyLibCreateMemoryHistory = __webpack_require__(/*! history/lib/createMemoryHistory */ 44);
	
	var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
	
	var _useRoutes = __webpack_require__(/*! ./useRoutes */ 23);
	
	var _useRoutes2 = _interopRequireDefault(_useRoutes);
	
	var _RouteUtils = __webpack_require__(/*! ./RouteUtils */ 19);
	
	function match(_ref, cb) {
	  var routes = _ref.routes;
	  var history = _ref.history;
	  var location = _ref.location;
	  var parseQueryString = _ref.parseQueryString;
	  var stringifyQuery = _ref.stringifyQuery;
	
	  var createHistory = history ? function () {
	    return history;
	  } : _historyLibCreateMemoryHistory2['default'];
	
	  var staticHistory = _useRoutes2['default'](createHistory)({
	    routes: _RouteUtils.createRoutes(routes),
	    parseQueryString: parseQueryString,
	    stringifyQuery: stringifyQuery
	  });
	
	  staticHistory.match(location, function (error, nextLocation, nextState) {
	    var renderProps = nextState ? _extends({}, nextState, { history: staticHistory }) : null;
	    cb(error, nextLocation, renderProps);
	  });
	}
	
	module.exports = exports['default'];

/***/ },
/* 44 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-router/~/history/lib/createMemoryHistory.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(/*! invariant */ 7);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(/*! ./Actions */ 8);
	
	var _createLocation = __webpack_require__(/*! ./createLocation */ 18);
	
	var _createLocation2 = _interopRequireDefault(_createLocation);
	
	var _createHistory = __webpack_require__(/*! ./createHistory */ 13);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}
	
	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    var key = history.createKey();
	
	    if (typeof entry === 'string') return { pathname: entry, key: key };
	
	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });
	
	    _invariant2['default'](false, 'Unable to create history entry from %s', entry);
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    _invariant2['default'](current >= 0 && current < entries.length, 'Current index must be >= 0 and < %s, was %s', entries.length, current);
	  }
	
	  var storage = createStorage(entries);
	
	  function saveState(key, state) {
	    storage[key] = state;
	  }
	
	  function readState(key) {
	    return storage[key];
	  }
	
	  function getCurrentLocation() {
	    var entry = entries[current];
	    var key = entry.key;
	    var pathname = entry.pathname;
	    var search = entry.search;
	
	    var path = pathname + (search || '');
	
	    var state = undefined;
	    if (key) {
	      state = readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	      entry.key = key;
	    }
	
	    return _createLocation2['default'](path, state, undefined, key);
	  }
	
	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }
	
	  function go(n) {
	    if (n) {
	      _invariant2['default'](canGo(n), 'Cannot go(%s) there is not enough history', n);
	
	      current += n;
	
	      var currentLocation = getCurrentLocation();
	
	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }
	
	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;
	
	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) {
	          entries.splice(current);
	        }
	
	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }
	
	  return history;
	}
	
	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];

/***/ },
/* 45 */
/*!*************************!*\
  !*** external "remote" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("remote");

/***/ },
/* 46 */
/*!********************!*\
  !*** ./editor.jsx ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(/*! lodash */ 2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _remote = __webpack_require__(/*! remote */ 45);
	
	var _remote2 = _interopRequireDefault(_remote);
	
	var _reactGridLayout = __webpack_require__(/*! react-grid-layout */ 47);
	
	var _reactGridLayout2 = _interopRequireDefault(_reactGridLayout);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 67);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 299);
	
	var _reduxUndo = __webpack_require__(/*! redux-undo */ 318);
	
	var _actions = __webpack_require__(/*! ./actions */ 319);
	
	var _card = __webpack_require__(/*! ./card */ 344);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _toolbar = __webpack_require__(/*! ./toolbar */ 345);
	
	var _toolbar2 = _interopRequireDefault(_toolbar);
	
	var hashCode = function hashCode(str) {
	    var hash = 0,
	        i,
	        chr,
	        len;
	    if (str.length == 0) return hash;
	    for (i = 0, len = str.length; i < len; i++) {
	        chr = str.charCodeAt(i);
	        hash = (hash << 5) - hash + chr;
	        hash |= 0; // Convert to 32bit integer
	    }
	    return hash;
	};
	
	var Editor = _react2['default'].createClass({
	    displayName: 'Editor',
	
	    orderFromLayout: function orderFromLayout(layout) {
	        return _lodash2['default'].chain(layout).map(function (l) {
	            return { y: l.y, attr: l.attr };
	        }).sortBy('y').pluck('attr').value();
	    },
	    render: function render() {
	        var _this = this;
	
	        var rowHeight = 45;
	        var expandedRows = 5;
	        var dispatch = this.props.dispatch;
	        var cards = this.props.cards.present;
	        var attributes = this.props.attributes.present.attrsByName;
	        var order = this.props.attributes.present.order;
	
	        // Compute the layout from state.order and state.expanded
	        var _lastY = 0;
	        var layout = _lodash2['default'].map(order, function (attrName, i) {
	            var height = cards[attrName].expanded ? expandedRows : 1;
	            _lastY += cards[attrName].expanded ? expandedRows : 1;
	            var result = { x: 0, y: _lastY, w: 1, h: height, i: "c" + hashCode(attrName), attr: attrName, handle: ".card-anchor" };
	            return result;
	        });
	
	        return _react2['default'].createElement(
	            'div',
	            { className: 'board' },
	            _react2['default'].createElement(_toolbar2['default'], {
	                onUndoClick: function () {
	                    return dispatch(_reduxUndo.ActionCreators.undo());
	                },
	                onRedoClick: function () {
	                    return dispatch(_reduxUndo.ActionCreators.redo());
	                },
	                startAnalysisEnabled: true,
	                onStartAnalysisClick: function () {
	                    _this.props.history.pushState(_this.props.history.state, "/launch");
	                }
	            }),
	            _react2['default'].createElement(
	                _reactGridLayout2['default'],
	                { className: 'layout',
	                    layout: layout,
	                    cols: 1,
	                    rowHeight: rowHeight,
	                    useCSSTransforms: true,
	                    isResizable: false,
	                    onLayoutChange: function (newLayout) {
	                        var newOrder = _this.orderFromLayout(newLayout);
	                        if (!_lodash2['default'].isEqual(order, newOrder)) {
	                            // Avoids infinite recursion
	                            dispatch((0, _actions.setOrder)(newOrder));
	                        }
	                    },
	                    onResizeStop: function (layout) {
	                        return dispatch((0, _actions.setOrder)(_this.orderFromLayout(layout)));
	                    }
	                },
	                order.map(function (attrName, i) {
	                    var attrType = attributes[attrName]["attribute_type"];
	                    var attrLabel = attributes[attrName]["label"];
	                    return _react2['default'].createElement(
	                        'div',
	                        { key: "c" + hashCode(attrName) },
	                        _react2['default'].createElement(_card2['default'], {
	                            attrLabel: attrLabel,
	                            attrType: attrType,
	                            order: i + 1,
	                            expanded: cards[attrName].expanded,
	                            onAttrLabelChanged: function (ev) {
	                                return dispatch((0, _actions.setAttrLabel)(attrName, ev.target.value));
	                            },
	                            onAttrTypeChanged: function (ev) {
	                                return dispatch((0, _actions.setAttrType)(attrName, ev.target.value));
	                            },
	                            onHeaderClick: function () {
	                                return dispatch((0, _actions.toggleCardExpansion)(attrName));
	                            } })
	                    );
	                })
	            )
	        );
	    }
	});
	
	exports['default'] = (0, _reactRedux.connect)(function (state) {
	    return state;
	})(Editor);
	module.exports = exports['default'];

/***/ },
/* 47 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/index.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./build/ReactGridLayout */ 48);
	module.exports.Responsive = __webpack_require__(/*! ./build/ResponsiveReactGridLayout */ 65);


/***/ },
/* 48 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/build/ReactGridLayout.js ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var React = __webpack_require__(/*! react */ 1);
	var GridItem = __webpack_require__(/*! ./GridItem */ 49);
	var utils = __webpack_require__(/*! ./utils */ 51);
	var PureDeepRenderMixin = __webpack_require__(/*! ./mixins/PureDeepRenderMixin */ 60);
	var WidthListeningMixin = __webpack_require__(/*! ./mixins/WidthListeningMixin */ 64);
	
	/**
	 * A reactive, fluid grid layout with draggable, resizable components.
	 */
	var ReactGridLayout = React.createClass({
	  displayName: 'ReactGridLayout',
	
	  mixins: [PureDeepRenderMixin, WidthListeningMixin],
	
	  propTypes: {
	    //
	    // Basic props
	    //
	
	    // If true, the container height swells and contracts to fit contents
	    autoSize: React.PropTypes.bool,
	    // # of cols.
	    cols: React.PropTypes.number,
	
	    // A selector that will not be draggable.
	    draggableCancel: React.PropTypes.string,
	    // A selector for the draggable handler
	    draggableHandle: React.PropTypes.string,
	
	    // If true, the layout will compact vertically
	    verticalCompact: React.PropTypes.bool,
	
	    // layout is an array of object with the format:
	    // {x: Number, y: Number, w: Number, h: Number}
	    layout: function layout(props, propName, componentName) {
	      var layout = props.layout;
	      // I hope you're setting the _grid property on the grid items
	      if (layout === undefined) return;
	      utils.validateLayout(layout, 'layout');
	    },
	
	    layouts: function layouts(props, propName, componentName) {
	      if (props.layouts) {
	        throw new Error("ReactGridLayout does not use `layouts`: Use ReactGridLayout.Responsive.");
	      }
	    },
	
	    // margin between items [x, y] in px
	    margin: React.PropTypes.array,
	    // Rows have a static height, but you can change this based on breakpoints if you like
	    rowHeight: React.PropTypes.number,
	
	    //
	    // Flags
	    //
	    isDraggable: React.PropTypes.bool,
	    isResizable: React.PropTypes.bool,
	    // Use CSS transforms instead of top/left
	    useCSSTransforms: React.PropTypes.bool,
	
	    //
	    // Callbacks
	    //
	
	    // Callback so you can save the layout.
	    // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
	    onLayoutChange: React.PropTypes.func,
	
	    // Calls when drag starts. Callback is of the signature (layout, oldItem, newItem, placeholder, e).
	    // All callbacks below have the same signature. 'start' and 'stop' callbacks omit the 'placeholder'.
	    onDragStart: React.PropTypes.func,
	    // Calls on each drag movement.
	    onDrag: React.PropTypes.func,
	    // Calls when drag is complete.
	    onDragStop: React.PropTypes.func,
	    //Calls when resize starts.
	    onResizeStart: React.PropTypes.func,
	    // Calls when resize movement happens.
	    onResize: React.PropTypes.func,
	    // Calls when resize is complete.
	    onResizeStop: React.PropTypes.func,
	
	    //
	    // Other validations
	    //
	
	    // Children must not have duplicate keys.
	    children: function children(props, propName, componentName) {
	      React.PropTypes.node.apply(this, arguments);
	      var children = props[propName];
	
	      // Check children keys for duplicates. Throw if found.
	      var keys = {};
	      React.Children.forEach(children, function (child, i, list) {
	        if (keys[child.key]) {
	          throw new Error("Duplicate child key found! This will cause problems in ReactGridLayout.");
	        }
	        keys[child.key] = true;
	      });
	    }
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      autoSize: true,
	      cols: 12,
	      rowHeight: 150,
	      layout: [],
	      margin: [10, 10],
	      isDraggable: true,
	      isResizable: true,
	      useCSSTransforms: true,
	      verticalCompact: true,
	      onLayoutChange: function onLayoutChange() {},
	      onDragStart: function onDragStart() {},
	      onDrag: function onDrag() {},
	      onDragStop: function onDragStop() {},
	      onResizeStart: function onResizeStart() {},
	      onResize: function onResize() {},
	      onResizeStop: function onResizeStop() {}
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      activeDrag: null,
	      isMounted: false,
	      layout: utils.synchronizeLayoutWithChildren(this.props.layout, this.props.children, this.props.cols, this.props.verticalCompact),
	      width: this.props.initialWidth
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    // Call back with layout on mount. This should be done after correcting the layout width
	    // to ensure we don't rerender with the wrong width.
	    this.props.onLayoutChange(this.state.layout);
	    this.setState({ isMounted: true });
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // This allows you to set the width manually if you like.
	    // Use manual width changes in combination with `listenToWindowResize: false`
	    if (nextProps.width !== this.props.width) this.onWidthChange(nextProps.width);
	
	    // If children change, regenerate the layout.
	    if (nextProps.children.length !== this.props.children.length) {
	      this.setState({
	        layout: utils.synchronizeLayoutWithChildren(this.state.layout, nextProps.children, nextProps.cols, this.props.verticalCompact)
	      });
	    }
	
	    // Allow parent to set layout directly.
	    if (nextProps.layout && JSON.stringify(nextProps.layout) !== JSON.stringify(this.state.layout)) {
	      this.setState({
	        layout: utils.synchronizeLayoutWithChildren(nextProps.layout, nextProps.children, nextProps.cols, this.props.verticalCompact)
	      });
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // Call back so we can store the layout
	    // Do it only when a resize/drag is not active, otherwise there are way too many callbacks
	    if (this.state.layout !== prevState.layout && !this.state.activeDrag) {
	      this.props.onLayoutChange(this.state.layout, this.state.layouts);
	    }
	  },
	
	  /**
	   * Calculates a pixel value for the container.
	   * @return {String} Container height in pixels.
	   */
	  containerHeight: function containerHeight() {
	    if (!this.props.autoSize) return;
	    return utils.bottom(this.state.layout) * this.props.rowHeight + this.props.margin[1] + 'px';
	  },
	
	  /**
	   * When the width changes, save it to state. This helps with left/width calculations.
	   */
	  onWidthChange: function onWidthChange(width) {
	    this.setState({ width: width });
	  },
	
	  /**
	   * When dragging starts
	   * @param {Number} i Index of the child
	   * @param {Number} x X position of the move
	   * @param {Number} y Y position of the move
	   * @param {Event} e The mousedown event
	   * @param {Element} element The current dragging DOM element
	   * @param {Object} position Drag information
	   */
	  onDragStart: function onDragStart(i, x, y, _ref) {
	    var e = _ref.e;
	    var element = _ref.element;
	    var position = _ref.position;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	
	    // No need to clone, `l` hasn't changed.
	    this.props.onDragStart(layout, l, l, null, e);
	  },
	  /**
	   * Each drag movement create a new dragelement and move the element to the dragged location
	   * @param {Number} i Index of the child
	   * @param {Number} x X position of the move
	   * @param {Number} y Y position of the move
	   * @param {Event} e The mousedown event
	   * @param {Element} element The current dragging DOM element
	   * @param {Object} position Drag information
	   */
	  onDrag: function onDrag(i, x, y, _ref2) {
	    var e = _ref2.e;
	    var element = _ref2.element;
	    var position = _ref2.position;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    // Clone layout item so we can pass it to the callback.
	    var oldL = utils.clone(l);
	
	    // Create placeholder (display only)
	    var placeholder = {
	      w: l.w, h: l.h, x: l.x, y: l.y, placeholder: true, i: i
	    };
	
	    // Move the element to the dragged location.
	    layout = utils.moveElement(layout, l, x, y, true /* isUserAction */);
	
	    this.props.onDrag(layout, oldL, l, placeholder, e);
	
	    this.setState({
	      layout: utils.compact(layout, this.props.verticalCompact),
	      activeDrag: placeholder
	    });
	  },
	
	  /**
	   * When dragging stops, figure out which position the element is closest to and update its x and y.
	   * @param  {Number} i Index of the child.
	   * @param {Number} i Index of the child
	   * @param {Number} x X position of the move
	   * @param {Number} y Y position of the move
	   * @param {Event} e The mousedown event
	   * @param {Element} element The current dragging DOM element
	   * @param {Object} position Drag information
	   */
	  onDragStop: function onDragStop(i, x, y, _ref3) {
	    var e = _ref3.e;
	    var element = _ref3.element;
	    var position = _ref3.position;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    var oldL = utils.clone(l);
	
	    // Move the element here
	    layout = utils.moveElement(layout, l, x, y, true /* isUserAction */);
	
	    this.props.onDragStop(layout, oldL, l, null, e);
	
	    // Set state
	    this.setState({ layout: utils.compact(layout, this.props.verticalCompact), activeDrag: null });
	  },
	
	  onResizeStart: function onResizeStart(i, w, h, _ref4) {
	    var e = _ref4.e;
	    var element = _ref4.element;
	    var size = _ref4.size;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	
	    // No need to clone, item hasn't changed
	    this.props.onResizeStart(layout, l, l, null, e);
	  },
	
	  onResize: function onResize(i, w, h, _ref5) {
	    var e = _ref5.e;
	    var element = _ref5.element;
	    var size = _ref5.size;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    var oldL = utils.clone(l);
	
	    // Set new width and height.
	    l.w = w;
	    l.h = h;
	
	    // Create placeholder element (display only)
	    var placeholder = {
	      w: w, h: h, x: l.x, y: l.y, placeholder: true, i: i
	    };
	
	    this.props.onResize(layout, oldL, l, placeholder, e);
	
	    // Re-compact the layout and set the drag placeholder.
	    this.setState({ layout: utils.compact(layout, this.props.verticalCompact), activeDrag: placeholder });
	  },
	
	  onResizeStop: function onResizeStop(i, x, y, _ref6) {
	    var e = _ref6.e;
	    var element = _ref6.element;
	    var size = _ref6.size;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    var oldL = utils.clone(l);
	
	    this.props.onResizeStop(layout, oldL, l, null, e);
	
	    this.setState({ activeDrag: null, layout: utils.compact(layout, this.props.verticalCompact) });
	  },
	
	  /**
	   * Create a placeholder object.
	   * @return {Element} Placeholder div.
	   */
	  placeholder: function placeholder() {
	    if (!this.state.activeDrag) return '';
	
	    // {...this.state.activeDrag} is pretty slow, actually
	    return React.createElement(
	      GridItem,
	      {
	        w: this.state.activeDrag.w,
	        h: this.state.activeDrag.h,
	        x: this.state.activeDrag.x,
	        y: this.state.activeDrag.y,
	        i: this.state.activeDrag.i,
	        isPlaceholder: true,
	        className: 'react-grid-placeholder',
	        containerWidth: this.state.width,
	        cols: this.props.cols,
	        margin: this.props.margin,
	        rowHeight: this.props.rowHeight,
	        isDraggable: false,
	        isResizable: false,
	        useCSSTransforms: this.props.useCSSTransforms
	      },
	      React.createElement('div', null)
	    );
	  },
	
	  /**
	   * Given a grid item, set its style attributes & surround in a <Draggable>.
	   * @param  {Element} child React element.
	   * @param  {Number}  i     Index of element.
	   * @return {Element}       Element wrapped in draggable and properly placed.
	   */
	  processGridItem: function processGridItem(child) {
	    var i = child.key;
	    var l = utils.getLayoutItem(this.state.layout, i);
	
	    // watchStart property tells Draggable to react to changes in the start param
	    // Must be turned off on the item we're dragging as the changes in `activeDrag` cause rerenders
	    var drag = this.state.activeDrag;
	    var moveOnStartChange = drag && drag.i === i ? false : true;
	
	    // Parse 'static'. Any properties defined directly on the grid item will take precedence.
	    var draggable, resizable;
	    if (l['static'] || this.props.isDraggable === false) draggable = false;
	    if (l['static'] || this.props.isResizable === false) resizable = false;
	
	    return React.createElement(
	      GridItem,
	      _extends({
	        containerWidth: this.state.width,
	        cols: this.props.cols,
	        margin: this.props.margin,
	        rowHeight: this.props.rowHeight,
	        moveOnStartChange: moveOnStartChange,
	        cancel: this.props.draggableCancel,
	        handle: this.props.draggableHandle,
	        onDragStop: this.onDragStop,
	        onDragStart: this.onDragStart,
	        onDrag: this.onDrag,
	        onResizeStart: this.onResizeStart,
	        onResize: this.onResize,
	        onResizeStop: this.onResizeStop,
	        isDraggable: draggable,
	        isResizable: resizable,
	        useCSSTransforms: this.props.useCSSTransforms && this.state.isMounted,
	        usePercentages: !this.state.isMounted
	      }, l),
	      child
	    );
	  },
	
	  render: function render() {
	    // Calculate classname
	    var _props = this.props;
	    var className = _props.className;
	
	    var props = _objectWithoutProperties(_props, ['className']);
	
	    className = 'react-grid-layout ' + (className || '');
	
	    return React.createElement(
	      'div',
	      _extends({}, props, { className: className, style: { height: this.containerHeight() } }),
	      React.Children.map(this.props.children, this.processGridItem),
	      this.placeholder()
	    );
	  }
	});
	
	module.exports = ReactGridLayout;

/***/ },
/* 49 */
/*!************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/build/GridItem.js ***!
  \************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(/*! react */ 1);
	var cloneWithProps = __webpack_require__(/*! react/lib/cloneWithProps */ 50);
	var utils = __webpack_require__(/*! ./utils */ 51);
	var Draggable = __webpack_require__(/*! react-draggable */ 53);
	var Resizable = __webpack_require__(/*! react-resizable */ 57).Resizable;
	var PureDeepRenderMixin = __webpack_require__(/*! ./mixins/PureDeepRenderMixin */ 60);
	
	/**
	 * An individual item within a ReactGridLayout.
	 */
	var GridItem = React.createClass({
	  displayName: 'GridItem',
	
	  mixins: [PureDeepRenderMixin],
	
	  propTypes: {
	    // Children must be only a single element
	    children: React.PropTypes.element,
	
	    // General grid attributes
	    cols: React.PropTypes.number.isRequired,
	    containerWidth: React.PropTypes.number.isRequired,
	    rowHeight: React.PropTypes.number.isRequired,
	    margin: React.PropTypes.array.isRequired,
	
	    // These are all in grid units
	    x: React.PropTypes.number.isRequired,
	    y: React.PropTypes.number.isRequired,
	    w: React.PropTypes.number.isRequired,
	    h: React.PropTypes.number.isRequired,
	
	    // All optional
	    minW: function minW(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.minW > props.w || props.minW > props.maxW) constraintError('minW', props);
	    },
	    maxW: function maxW(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.maxW < props.w || props.maxW < props.minW) constraintError('maxW', props);
	    },
	    minH: function minH(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.minH > props.h || props.minH > props.maxH) constraintError('minH', props);
	    },
	    maxH: function maxH(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.maxH < props.h || props.maxH < props.minH) constraintError('maxH', props);
	    },
	
	    // ID is nice to have for callbacks
	    i: React.PropTypes.string.isRequired,
	
	    // If true, item will be repositioned when x/y/w/h change
	    moveOnStartChange: React.PropTypes.bool,
	
	    // Functions
	    onDragStop: React.PropTypes.func,
	    onDragStart: React.PropTypes.func,
	    onDrag: React.PropTypes.func,
	    onResizeStop: React.PropTypes.func,
	    onResizeStart: React.PropTypes.func,
	    onResize: React.PropTypes.func,
	
	    // Flags
	    isDraggable: React.PropTypes.bool,
	    isResizable: React.PropTypes.bool,
	    // Use CSS transforms instead of top/left
	    useCSSTransforms: React.PropTypes.bool,
	    isPlaceholder: React.PropTypes.bool,
	
	    // Others
	    className: React.PropTypes.string,
	    // Selector for draggable handle
	    handle: React.PropTypes.string,
	    // Selector for draggable cancel (see react-draggable)
	    cancel: React.PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      isDraggable: true,
	      isResizable: true,
	      useCSSTransforms: true,
	      className: '',
	      cancel: '',
	      minH: 1,
	      minW: 1,
	      maxH: Infinity,
	      maxW: Infinity
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      resizing: false,
	      className: ''
	    };
	  },
	
	  /**
	   * Return position on the page given an x, y, w, h.
	   * left, top, width, height are all in pixels.
	   * @param  {Number}  x             X coordinate in grid units.
	   * @param  {Number}  y             Y coordinate in grid units.
	   * @param  {Number}  w             W coordinate in grid units.
	   * @param  {Number}  h             H coordinate in grid units.
	   * @return {Object}                Object containing coords.
	   */
	  calcPosition: function calcPosition(x, y, w, h) {
	    var p = this.props;
	    var width = p.containerWidth - p.margin[0];
	    var out = {
	      left: width * (x / p.cols) + p.margin[0],
	      top: p.rowHeight * y + p.margin[1],
	      width: width * (w / p.cols) - p.margin[0],
	      height: h * p.rowHeight - p.margin[1]
	    };
	    return out;
	  },
	
	  /**
	   * Translate x and y coordinates from pixels to grid units.
	   * @param  {Number} options.left  Left offset in pixels.
	   * @param  {Number} options.top   Top offset in pixels.
	   * @return {Object}               x and y in grid units.
	   */
	  calcXY: function calcXY(_ref) {
	    var left = _ref.left;
	    var top = _ref.top;
	
	    left = left - this.props.margin[0];
	    top = top - this.props.margin[1];
	    // This is intentional; because so much of the logic on moving boxes up/down relies
	    // on an exact y position, we only round the x, not the y.
	    var x = Math.round(left / this.props.containerWidth * this.props.cols);
	    var y = Math.floor(top / this.props.rowHeight);
	    x = Math.max(Math.min(x, this.props.cols), 0);
	    y = Math.max(y, 0);
	    return { x: x, y: y };
	  },
	
	  /**
	   * Given a height and width in pixel values, calculate grid units.
	   * @param  {Number} options.height Height in pixels.
	   * @param  {Number} options.width  Width in pixels.
	   * @return {Object}                w, h as grid units.
	   */
	  calcWH: function calcWH(_ref2) {
	    var height = _ref2.height;
	    var width = _ref2.width;
	
	    width = width + this.props.margin[0];
	    height = height + this.props.margin[1];
	    var w = Math.round(width / this.props.containerWidth * this.props.cols);
	    var h = Math.round(height / this.props.rowHeight);
	    w = Math.max(Math.min(w, this.props.cols - this.props.x), 0);
	    h = Math.max(h, 0);
	    return { w: w, h: h };
	  },
	
	  /**
	   * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
	   * well when server rendering, and the only way to do that properly is to use percentage width/left because
	   * we don't know exactly what the browser viewport is.
	   * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
	   * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
	   *
	   * @param  {Object} pos Position object with width, height, left, top.
	   * @return {Object}     Style object.
	   */
	  createStyle: function createStyle(pos) {
	    var style = {
	      width: pos.width + 'px',
	      height: pos.height + 'px',
	      left: pos.left + 'px',
	      top: pos.top + 'px',
	      position: 'absolute'
	    };
	
	    // This is used for server rendering.
	    if (this.props.usePercentages) {
	      pos.left = utils.perc(pos.left / this.props.containerWidth);
	      style.left = pos.left;
	      style.width = utils.perc(pos.width / this.props.containerWidth);
	    }
	
	    // CSS Transforms support
	    if (this.props.useCSSTransforms) {
	      utils.setTransform(style, [pos.left, pos.top]);
	      delete style.left;
	      delete style.top;
	    }
	
	    return style;
	  },
	
	  /**
	   * Mix a Draggable instance into a child.
	   * @param  {Element} child    Child element.
	   * @param  {Object} position  Position object (pixel values)
	   * @return {Element}          Child wrapped in Draggable.
	   */
	  mixinDraggable: function mixinDraggable(child, position) {
	    return React.createElement(
	      Draggable,
	      {
	        start: { x: position.left, y: position.top },
	        moveOnStartChange: this.props.moveOnStartChange,
	        onStop: this.onDragHandler('onDragStop'),
	        onStart: this.onDragHandler('onDragStart'),
	        onDrag: this.onDragHandler('onDrag'),
	        handle: this.props.handle,
	        cancel: ".react-resizable-handle " + this.props.cancel,
	        useCSSTransforms: this.props.useCSSTransforms
	      },
	      child
	    );
	  },
	
	  /**
	   * Mix a Resizable instance into a child.
	   * @param  {Element} child    Child element.
	   * @param  {Object} position  Position object (pixel values)
	   * @return {Element}          Child wrapped in Resizable.
	   */
	  mixinResizable: function mixinResizable(child, position) {
	    var p = this.props;
	    // This is the max possible width - doesn't go to infinity because of the width of the window
	    var maxWidth = this.calcPosition(0, 0, p.cols - p.x, 0).width;
	
	    // Calculate min/max constraints using our min & maxes
	    var mins = this.calcPosition(0, 0, p.minW, p.minH);
	    var maxes = this.calcPosition(0, 0, p.maxW, p.maxH);
	    var minConstraints = [mins.width, mins.height];
	    var maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
	    return React.createElement(
	      Resizable,
	      {
	        width: position.width,
	        height: position.height,
	        minConstraints: minConstraints,
	        maxConstraints: maxConstraints,
	        onResizeStop: this.onResizeHandler('onResizeStop'),
	        onResizeStart: this.onResizeHandler('onResizeStart'),
	        onResize: this.onResizeHandler('onResize')
	      },
	      child
	    );
	  },
	
	  /**
	   * Wrapper around drag events to provide more useful data.
	   * All drag events call the function with the given handler name,
	   * with the signature (index, x, y).
	   *
	   * @param  {String} handlerName Handler name to wrap.
	   * @return {Function}           Handler function.
	   */
	  onDragHandler: function onDragHandler(handlerName) {
	    var me = this;
	    return function (e, _ref3) {
	      var element = _ref3.element;
	      var position = _ref3.position;
	
	      if (!me.props[handlerName]) return;
	      // Get new XY
	
	      var _me$calcXY = me.calcXY(position);
	
	      var x = _me$calcXY.x;
	      var y = _me$calcXY.y;
	
	      // Cap x at numCols
	      x = Math.min(x, me.props.cols - me.props.w);
	
	      me.props[handlerName](me.props.i, x, y, { e: e, element: element, position: position });
	    };
	  },
	
	  /**
	   * Wrapper around drag events to provide more useful data.
	   * All drag events call the function with the given handler name,
	   * with the signature (index, x, y).
	   *
	   * @param  {String} handlerName Handler name to wrap.
	   * @return {Function}           Handler function.
	   */
	  onResizeHandler: function onResizeHandler(handlerName) {
	    var me = this;
	    return function (e, _ref4) {
	      var element = _ref4.element;
	      var size = _ref4.size;
	
	      if (!me.props[handlerName]) return;
	
	      // Get new XY
	
	      var _me$calcWH = me.calcWH(size);
	
	      var w = _me$calcWH.w;
	      var h = _me$calcWH.h;
	
	      // Cap w at numCols
	      w = Math.min(w, me.props.cols - me.props.x);
	      // Ensure w is at least 1
	      w = Math.max(w, 1);
	
	      // Min/max capping
	      w = Math.max(Math.min(w, me.props.maxW), me.props.minW);
	      h = Math.max(Math.min(h, me.props.maxH), me.props.minH);
	
	      me.setState({ resizing: handlerName === 'onResizeStop' ? null : size });
	
	      me.props[handlerName](me.props.i, w, h, { e: e, element: element, size: size });
	    };
	  },
	
	  render: function render() {
	    var p = this.props,
	        pos = this.calcPosition(p.x, p.y, p.w, p.h);
	    if (this.state.resizing) {
	      pos.width = this.state.resizing.width;
	      pos.height = this.state.resizing.height;
	    }
	
	    // Create the child element. We clone the existing element but modify its className and style.
	    var child = cloneWithProps(this.props.children, {
	      // Munge a classname. Use passed in classnames and resizing.
	      // React with merge the classNames.
	      className: ['react-grid-item', this.props.className, this.state.resizing ? 'resizing' : '', this.props.useCSSTransforms ? 'cssTransforms' : ''].join(' '),
	      // We can set the width and height on the child, but unfortunately we can't set the position.
	      style: this.createStyle(pos)
	    });
	
	    // Resizable support. This is usually on but the user can toggle it off.
	    if (this.props.isResizable) {
	      child = this.mixinResizable(child, pos);
	    }
	
	    // Draggable support. This is always on, except for with placeholders.
	    if (this.props.isDraggable) {
	      child = this.mixinDraggable(child, pos);
	    }
	
	    return child;
	  }
	});
	
	function constraintError(name, props) {
	  delete props.children;
	  throw new Error(name + ' overrides contraints on gridItem ' + props.i + '. Full props: ' + JSON.stringify(props));
	}
	
	module.exports = GridItem;

/***/ },
/* 50 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react/lib/cloneWithProps.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React    = __webpack_require__(/*! react */ 1)
	  , hasOwn   = Object.prototype.hasOwnProperty
	  , version  = React.version.split('.').map(parseFloat)
	  , RESERVED = {
	      className:  resolve(joinClasses),
	      children:   function(){},
	      key:        function(){},
	      ref:        function(){},
	      style:      resolve(extend)
	    };
	
	module.exports = function cloneWithProps(child, props) {
	  var newProps = mergeProps(props, child.props);
	
	  if (!hasOwn.call(newProps, 'children') && hasOwn.call(child.props, 'children'))
	    newProps.children = child.props.children;
	
	  // < 0.11
	  if (version[0] === 0 && version[1] < 11)
	    return child.constructor.ConvenienceConstructor(newProps);
	  
	  // 0.11
	  if (version[0] === 0 && version[1] === 11)
	    return child.constructor(newProps);
	
	  // 0.12
	  else if (version[0] === 0 && version[1] === 12){
	    MockLegacyFactory.isReactLegacyFactory = true
	    MockLegacyFactory.type = child.type
	    return React.createElement(MockLegacyFactory, newProps);
	  }
	
	  // 0.13+
	  return React.createElement(child.type, newProps);
	
	  function MockLegacyFactory(){}
	}
	
	function mergeProps(currentProps, childProps) {
	  var newProps = extend(currentProps), key
	
	  for (key in childProps) {
	    if (hasOwn.call(RESERVED, key) )
	      RESERVED[key](newProps, childProps[key], key)
	
	    else if ( !hasOwn.call(newProps, key) )
	      newProps[key] = childProps[key];
	  }
	  return newProps
	}
	
	function resolve(fn){
	  return function(src, value, key){
	    if( !hasOwn.call(src, key)) src[key] = value
	    else src[key] = fn(src[key], value)
	  }
	}
	
	function joinClasses(a, b){
	  if ( !a ) return b || ''
	  return a + (b ? ' ' + b : '')
	}
	
	function extend() {
	  var target = {};
	  for (var i = 0; i < arguments.length; i++) 
	    for (var key in arguments[i]) if (hasOwn.call(arguments[i], key)) 
	      target[key] = arguments[i][key]   
	  return target
	}

/***/ },
/* 51 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/build/utils.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign = __webpack_require__(/*! object-assign */ 52);
	
	var utils = module.exports = {
	
	  /**
	   * Return the bottom coordinate of the layout.
	   *
	   * @param  {Array} layout Layout array.
	   * @return {Number}       Bottom coordinate.
	   */
	  bottom: function bottom(layout) {
	    var max = 0,
	        bottomY;
	    for (var i = 0, len = layout.length; i < len; i++) {
	      bottomY = layout[i].y + layout[i].h;
	      if (bottomY > max) max = bottomY;
	    }
	    return max;
	  },
	
	  /**
	   * Clones a shallow object.
	   * @param  {Object} obj Object to clone.
	   * @return {Object}   Cloned object.
	   */
	  clone: function clone(obj) {
	    return assign({}, obj);
	  },
	
	  /**
	   * Given two layouts, check if they collide.
	   *
	   * @param  {Object} l1 Layout object.
	   * @param  {Object} l2 Layout object.
	   * @return {Boolean}   True if colliding.
	   */
	  collides: function collides(l1, l2) {
	    if (l1 === l2) return false; // same element
	    if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2
	    if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2
	    if (l1.y + l1.h <= l2.y) return false; // l1 is above l2
	    if (l1.y >= l2.y + l2.h) return false; // l1 is below l2
	    return true; // boxes overlap
	  },
	
	  /**
	   * Given a layout, compact it. This involves going down each y coordinate and removing gaps
	   * between items.
	   *
	   * @param  {Array} layout Layout.
	   * @param  {Boolean} verticalCompact Whether or not to compact the layout
	   *   vertically.
	   * @return {Array}       Compacted Layout.
	   */
	  compact: function compact(layout, verticalCompact) {
	    // Statics go in the compareWith array right away so items flow around them.
	    var compareWith = utils.getStatics(layout),
	        out = [];
	    // We go through the items by row and column.
	    var sorted = utils.sortLayoutItemsByRowCol(layout);
	
	    for (var i = 0, len = sorted.length; i < len; i++) {
	      var l = sorted[i];
	
	      // Don't move static elements
	      if (!l['static']) {
	        l = utils.compactItem(compareWith, l, verticalCompact);
	
	        // Add to comparison array. We only collide with items before this one.
	        // Statics are already in this array.
	        compareWith.push(l);
	      }
	
	      // Add to output array to make sure they still come out in the right order.
	      out[layout.indexOf(l)] = l;
	
	      // Clear moved flag, if it exists.
	      delete l.moved;
	    }
	
	    return out;
	  },
	
	  compactItem: function compactItem(compareWith, l, verticalCompact) {
	    if (verticalCompact) {
	      // Move the element up as far as it can go without colliding.
	      while (l.y > 0 && !utils.getFirstCollision(compareWith, l)) {
	        l.y--;
	      }
	    }
	
	    // Move it down, and keep moving it down if it's colliding.
	    var collides;
	    while (collides = utils.getFirstCollision(compareWith, l)) {
	      l.y = collides.y + collides.h;
	    }
	    return l;
	  },
	
	  /**
	   * Given a layout, make sure all elements fit within its bounds.
	   *
	   * @param  {Array} layout Layout array.
	   * @param  {Number} bounds Number of columns.
	   * @return {[type]}        [description]
	   */
	  correctBounds: function correctBounds(layout, bounds) {
	    var collidesWith = utils.getStatics(layout);
	    for (var i = 0, len = layout.length; i < len; i++) {
	      var l = layout[i];
	      // Overflows right
	      if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w;
	      // Overflows left
	      if (l.x < 0) {
	        l.x = 0;
	        l.w = bounds.cols;
	      }
	      if (!l['static']) collidesWith.push(l);else {
	        // If this is static and collides with other statics, we must move it down.
	        // We have to do something nicer than just letting them overlap.
	        while (utils.getFirstCollision(collidesWith, l)) {
	          l.y++;
	        }
	      }
	    }
	    return layout;
	  },
	
	  /**
	   * Get a layout item by ID. Used so we can override later on if necessary.
	   *
	   * @param  {Array}  layout Layout array.
	   * @param  {Number} id     ID
	   * @return {LayoutItem}    Item at ID.
	   */
	  getLayoutItem: function getLayoutItem(layout, id) {
	    id = "" + id;
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if ("" + layout[i].i === id) return layout[i];
	    }
	  },
	
	  /**
	   * Returns the first item this layout collides with.
	   * It doesn't appear to matter which order we approach this from, although
	   * perhaps that is the wrong thing to do.
	   *
	   * @param  {Object} layoutItem Layout item.
	   * @return {Object|undefined}  A colliding layout item, or undefined.
	   */
	  getFirstCollision: function getFirstCollision(layout, layoutItem) {
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if (utils.collides(layout[i], layoutItem)) return layout[i];
	    }
	  },
	
	  getAllCollisions: function getAllCollisions(layout, layoutItem) {
	    var out = [];
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if (utils.collides(layout[i], layoutItem)) out.push(layout[i]);
	    }
	    return out;
	  },
	
	  /**
	   * Get all static elements.
	   * @param  {Array} layout Array of layout objects.
	   * @return {Array}        Array of static layout items..
	   */
	  getStatics: function getStatics(layout) {
	    var out = [];
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if (layout[i]['static']) out.push(layout[i]);
	    }
	    return out;
	  },
	
	  /**
	   * Move an element. Responsible for doing cascading movements of other elements.
	   *
	   * @param  {Array}      layout Full layout to modify.
	   * @param  {LayoutItem} l      element to move.
	   * @param  {Number}     [x]    X position in grid units.
	   * @param  {Number}     [y]    Y position in grid units.
	   * @param  {Boolean}    [isUserAction] If true, designates that the item we're moving is
	   *                                     being dragged/resized by th euser.
	   */
	  moveElement: function moveElement(layout, l, x, y, isUserAction) {
	    if (l['static']) return layout;
	
	    // Short-circuit if nothing to do.
	    if (l.y === y && l.x === x) return layout;
	
	    var movingUp = l.y > y;
	    // This is quite a bit faster than extending the object
	    if (x !== undefined) l.x = x;
	    if (y !== undefined) l.y = y;
	    l.moved = true;
	
	    // If this collides with anything, move it.
	    // When doing this comparison, we have to sort the items we compare with
	    // to ensure, in the case of multiple collisions, that we're getting the
	    // nearest collision.
	    var sorted = utils.sortLayoutItemsByRowCol(layout);
	    if (movingUp) sorted = sorted.reverse();
	    var collisions = utils.getAllCollisions(sorted, l);
	
	    // Move each item that collides away from this element.
	    for (var i = 0, len = collisions.length; i < len; i++) {
	      var collision = collisions[i];
	      // console.log('resolving collision between', l.i, 'at', l.y, 'and', collision.i, 'at', collision.y);
	
	      // Short circuit so we can't infinite loop
	      if (collision.moved) continue;
	
	      // This makes it feel a bit more precise by waiting to swap for just a bit when moving up.
	      if (l.y > collision.y && l.y - collision.y > collision.h / 4) continue;
	
	      // Don't move static items - we have to move *this* element away
	      if (collision['static']) {
	        layout = utils.moveElementAwayFromCollision(layout, collision, l, isUserAction);
	      } else {
	        layout = utils.moveElementAwayFromCollision(layout, l, collision, isUserAction);
	      }
	    }
	
	    return layout;
	  },
	
	  /**
	   * This is where the magic needs to happen - given a collision, move an element away from the collision.
	   * We attempt to move it up if there's room, otherwise it goes below.
	   *
	   * @param  {Array} layout            Full layout to modify.
	   * @param  {LayoutItem} collidesWith Layout item we're colliding with.
	   * @param  {LayoutItem} itemToMove   Layout item we're moving.
	   * @param  {Boolean} [isUserAction]  If true, designates that the item we're moving is being dragged/resized
	   *                                   by the user.
	   */
	  moveElementAwayFromCollision: function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction) {
	
	    // If there is enough space above the collision to put this element, move it there.
	    // We only do this on the main collision as this can get funky in cascades and cause
	    // unwanted swapping behavior.
	    if (isUserAction) {
	      // Make a mock item so we don't modify the item here, only modify in moveElement.
	      var fakeItem = {
	        x: itemToMove.x,
	        y: itemToMove.y,
	        w: itemToMove.w,
	        h: itemToMove.h
	      };
	      fakeItem.y = Math.max(collidesWith.y - itemToMove.h, 0);
	      if (!utils.getFirstCollision(layout, fakeItem)) {
	        return utils.moveElement(layout, itemToMove, undefined, fakeItem.y);
	      }
	    }
	
	    // Previously this was optimized to move below the collision directly, but this can cause problems
	    // with cascading moves, as an item may actually leapflog a collision and cause a reversal in order.
	    return utils.moveElement(layout, itemToMove, undefined, itemToMove.y + 1);
	  },
	
	  /**
	   * Helper to convert a number to a percentage string.
	   *
	   * @param  {Number} num Any number
	   * @return {String}     That number as a percentage.
	   */
	  perc: function perc(num) {
	    return num * 100 + '%';
	  },
	
	  setTransform: function setTransform(style, coords) {
	    // Replace unitless items with px
	    var x = ('' + coords[0]).replace(/(\d)$/, '$1px');
	    var y = ('' + coords[1]).replace(/(\d)$/, '$1px');
	    style.transform = "translate(" + x + "," + y + ")";
	    style.WebkitTransform = "translate(" + x + "," + y + ")";
	    style.MozTransform = "translate(" + x + "," + y + ")";
	    style.msTransform = "translate(" + x + "," + y + ")";
	    style.OTransform = "translate(" + x + "," + y + ")";
	    return style;
	  },
	
	  /**
	   * Get layout items sorted from top left to right and down.
	   *
	   * @return {Array} Array of layout objects.
	   * @return {Array}        Layout, sorted static items first.
	   */
	  sortLayoutItemsByRowCol: function sortLayoutItemsByRowCol(layout) {
	    return [].concat(layout).sort(function (a, b) {
	      if (a.y > b.y || a.y === b.y && a.x > b.x) {
	        return 1;
	      }
	      return -1;
	    });
	  },
	
	  /**
	   * Generate a layout using the initialLayout an children as a template.
	   * Missing entries will be added, extraneous ones will be truncated.
	   *
	   * @param  {Array}  initialLayout Layout passed in through props.
	   * @param  {String} breakpoint    Current responsive breakpoint.
	   * @param  {Boolean} verticalCompact Whether or not to compact the layout
	   *   vertically.
	   * @return {Array}                Working layout.
	   */
	  synchronizeLayoutWithChildren: function synchronizeLayoutWithChildren(initialLayout, children, cols, verticalCompact) {
	    // ensure 'children' is always an array
	    if (!Array.isArray(children)) {
	      children = [children];
	    }
	    initialLayout = initialLayout || [];
	
	    // Generate one layout item per child.
	    var layout = [];
	    for (var i = 0, len = children.length; i < len; i++) {
	      var child = children[i];
	      // Don't overwrite if it already exists.
	      var exists = utils.getLayoutItem(initialLayout, child.key);
	      if (exists) {
	        // Ensure 'i' is always a string
	        exists.i = '' + exists.i;
	        layout.push(exists);
	        continue;
	      }
	      // New item: attempt to use a layout item from the child, if it exists.
	      var g = child.props._grid;
	      if (g) {
	        utils.validateLayout([g], 'ReactGridLayout.child');
	        // Validated; add it to the layout. Bottom 'y' possible is the bottom of the layout.
	        // This allows you to do nice stuff like specify {y: Infinity}
	        if (verticalCompact) {
	          layout.push(assign({}, g, { y: Math.min(utils.bottom(layout), g.y), i: child.key }));
	        } else {
	          layout.push(assign({}, g, { y: g.y, i: child.key }));
	        }
	      } else {
	        // Nothing provided: ensure this is added to the bottom
	        layout.push({ w: 1, h: 1, x: 0, y: utils.bottom(layout), i: child.key });
	      }
	    }
	
	    // Correct the layout.
	    layout = utils.correctBounds(layout, { cols: cols });
	    layout = utils.compact(layout, verticalCompact);
	
	    return layout;
	  },
	
	  /**
	   * Validate a layout. Throws errors.
	   *
	   * @param  {Array}  layout        Array of layout items.
	   * @param  {String} [contextName] Context name for errors.
	   * @throw  {Error}                Validation error.
	   */
	  validateLayout: function validateLayout(layout, contextName) {
	    contextName = contextName || "Layout";
	    var subProps = ['x', 'y', 'w', 'h'];
	    if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");
	    for (var i = 0, len = layout.length; i < len; i++) {
	      for (var j = 0; j < subProps.length; j++) {
	        if (typeof layout[i][subProps[j]] !== 'number') {
	          throw new Error('ReactGridLayout: ' + contextName + '[' + i + '].' + subProps[j] + ' must be a Number!');
	        }
	      }
	      if (layout[i]['static'] !== undefined && typeof layout[i]['static'] !== 'boolean') {
	        throw new Error('ReactGridLayout: ' + contextName + '[' + i + '].static must be a Boolean!');
	      }
	    }
	  }
	};

/***/ },
/* 52 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/object-assign/index.js ***!
  \*******************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ },
/* 53 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/react-draggable/index.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./lib/draggable */ 54);


/***/ },
/* 54 */
/*!*****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/react-draggable/lib/draggable.js ***!
  \*****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(/*! react */ 1);
	var PureRenderMixin = __webpack_require__(/*! react/lib/ReactComponentWithPureRenderMixin */ 55);
	var emptyFunction = function(){};
	var cloneWithProps = __webpack_require__(/*! react/lib/cloneWithProps */ 50);
	
	function createUIEvent(draggable) {
		return {
			element: draggable.getDOMNode(),
			position: {
				top: (draggable._pendingState || draggable.state).clientY,
				left: (draggable._pendingState || draggable.state).clientX
			}
		};
	}
	
	function canDragY(draggable) {
		return draggable.props.axis === 'both' ||
				draggable.props.axis === 'y';
	}
	
	function canDragX(draggable) {
		return draggable.props.axis === 'both' ||
				draggable.props.axis === 'x';
	}
	
	function isFunction(func) {
	  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
	}
	
	// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
	function findInArray(array, callback) {
	  for (var i = 0, length = array.length, element = null; i < length, element = array[i]; i++) {
	    if (callback.apply(callback, [element, i, array])) return element;
	  }
	}
	
	function matchesSelector(el, selector) {
	  var method = findInArray([
	    'matches',
	    'webkitMatchesSelector',
	    'mozMatchesSelector',
	    'msMatchesSelector',
	    'oMatchesSelector'
	  ], function(method){
	    return isFunction(el[method]);
	  });
	
	  return el[method].call(el, selector);
	}
	
	function positionToCSSTransform(style) {
		// Replace unitless items with px
		var x = ('' + style.left).replace(/(\d)$/, '$1px');
		var y = ('' + style.top).replace(/(\d)$/, '$1px');
		style.transform = 'translate(' + x + ',' + y + ')';
		style.WebkitTransform = 'translate(' + x + ',' + y + ')';
		style.OTransform = 'translate(' + x + ',' + y + ')';
		style.msTransform = 'translate(' + x + ',' + y + ')';
		style.MozTransform = 'translate(' + x + ',' + y + ')';
		delete style.left;
		delete style.top;
		return style;
	}
	
	// @credits: http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
	/* Conditional to fix node server side rendering of component */
	if (typeof window === 'undefined') {
	    // Do Node Stuff
	    var isTouchDevice = false;
	} else {
	    // Do Browser Stuff
	    var isTouchDevice = 'ontouchstart' in window || // works on most browsers
	      'onmsgesturechange' in window; // works on ie10 on ms surface
	}
	
	// look ::handleDragStart
	//function isMultiTouch(e) {
	//  return e.touches && Array.isArray(e.touches) && e.touches.length > 1
	//}
	
	/**
	 * simple abstraction for dragging events names
	 * */
	var dragEventFor = (function () {
	  var eventsFor = {
	    touch: {
	      start: 'touchstart',
	      move: 'touchmove',
	      end: 'touchend'
	    },
	    mouse: {
	      start: 'mousedown',
	      move: 'mousemove',
	      end: 'mouseup'
	    }
	  };
	  return eventsFor[isTouchDevice ? 'touch' : 'mouse'];
	})();
	
	/**
	 * get {clientX, clientY} positions of control
	 * */
	function getControlPosition(e) {
	  var position = (e.touches && e.touches[0]) || e;
	  return {
	    clientX: position.clientX,
	    clientY: position.clientY
	  };
	}
	
	function addEvent(el, event, handler) {
		if (!el) { return; }
		if (el.attachEvent) {
			el.attachEvent('on' + event, handler);
		} else if (el.addEventListener) {
			el.addEventListener(event, handler, true);
		} else {
			el['on' + event] = handler;
		}
	}
	
	function removeEvent(el, event, handler) {
		if (!el) { return; }
		if (el.detachEvent) {
			el.detachEvent('on' + event, handler);
		} else if (el.removeEventListener) {
			el.removeEventListener(event, handler, true);
		} else {
			el['on' + event] = null;
		}
	}
	
	module.exports = React.createClass({
		displayName: 'Draggable',
		mixins: [PureRenderMixin],
	
		propTypes: {
			/**
			 * `axis` determines which axis the draggable can move.
			 *
			 * 'both' allows movement horizontally and vertically.
			 * 'x' limits movement to horizontal axis.
			 * 'y' limits movement to vertical axis.
			 *
			 * Defaults to 'both'.
			 */
			axis: React.PropTypes.oneOf(['both', 'x', 'y']),
	
			/**
			 * `handle` specifies a selector to be used as the handle that initiates drag.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	    	return (
			 * 	    	 	<Draggable handle=".handle">
			 * 	    	 	  <div>
			 * 	    	 	      <div className="handle">Click me to drag</div>
			 * 	    	 	      <div>This is some other content</div>
			 * 	    	 	  </div>
			 * 	    		</Draggable>
			 * 	    	);
			 * 	    }
			 * 	});
			 * ```
			 */
			handle: React.PropTypes.string,
	
			/**
			 * `cancel` specifies a selector to be used to prevent drag initialization.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return(
			 * 	            <Draggable cancel=".cancel">
			 * 	                <div>
			 * 	                	<div className="cancel">You can't drag from here</div>
			 *						<div>Dragging here works fine</div>
			 * 	                </div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			cancel: React.PropTypes.string,
	
			/**
			 * `grid` specifies the x and y that dragging should snap to.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable grid={[25, 25]}>
			 * 	                <div>I snap to a 25 x 25 grid</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			grid: React.PropTypes.arrayOf(React.PropTypes.number),
	
			/**
			 * `start` specifies the x and y that the dragged item should start at
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable start={{x: 25, y: 25}}>
			 * 	                <div>I start with left: 25px; top: 25px;</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			start: React.PropTypes.object,
	
			/**
			 * `moveOnStartChange` tells the Draggable element to reset its position
			 * if the `start` parameters are changed. By default, if the `start`
			 * parameters change, the Draggable element still remains where it started
			 * or was dragged to.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 			onButtonClick: function () {
			 * 				this.setState({clicked: true});
			 * 			},
			 * 	    render: function () {
			 * 	    		var start = this.state.clicked ?
			 * 	    		  {x: 25, y: 25} :
			 * 	    		  {x: 125, y: 125};
			 * 	        return (
			 * 	            <Draggable start={start}>
			 * 	                <div>I start with left: 25px; top: 25px;,
			 * 	                but move to left: 125px; top: 125px; when the button
			 * 	                is clicked.</div>
			 * 	                <div onClick={this.onButtonClick}>Button</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			moveOnStartChange: React.PropTypes.bool,
	
			/**
			 * `useCSSTransforms` if true will place the element using translate(x, y)
			 * rather than CSS top/left.
			 *
			 * This generally gives better performance, and is useful in combination with
			 * other layout systems that use translate(), such as react-grid-layout.
			 */
			useCSSTransforms: React.PropTypes.bool,
	
			/**
			 * `zIndex` specifies the zIndex to use while dragging.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable zIndex={100}>
			 * 	                <div>I have a zIndex</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			zIndex: React.PropTypes.number,
	
			/**
			 * Called when dragging starts.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onStart: React.PropTypes.func,
	
			/**
			 * Called while dragging.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onDrag: React.PropTypes.func,
	
			/**
			 * Called when dragging stops.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onStop: React.PropTypes.func,
	
			/**
			 * A workaround option which can be passed if onMouseDown needs to be accessed,
			 * since it'll always be blocked (due to that there's internal use of onMouseDown)
			 *
			 */
			onMouseDown: React.PropTypes.func
		},
	
		componentWillUnmount: function() {
			// Remove any leftover event handlers
			removeEvent(window, dragEventFor['move'], this.handleDrag);
			removeEvent(window, dragEventFor['end'], this.handleDragEnd);
		},
	
		componentWillReceiveProps: function(nextProps) {
			// If this is set to watch a changing start position,
			// set x and y to the new position.
			if (nextProps.moveOnStartChange) {
				this.setState({
					clientX: nextProps.start.x,
					clientY: nextProps.start.y
				});
			}
		},
	
		getDefaultProps: function () {
			return {
				axis: 'both',
				handle: null,
				cancel: null,
				grid: null,
				start: {
					x: 0,
					y: 0
				},
				moveOnStartChange: false,
				useCSSTransforms: false,
				zIndex: NaN,
				onStart: emptyFunction,
				onDrag: emptyFunction,
				onStop: emptyFunction,
				onMouseDown: emptyFunction
			};
		},
	
		getInitialState: function () {
			return {
				// Whether or not currently dragging
				dragging: false,
	
				// Start top/left of this.getDOMNode()
				startX: 0, startY: 0,
	
				// Offset between start top/left and mouse top/left
				offsetX: 0, offsetY: 0,
	
				// Current top/left of this.getDOMNode()
				clientX: this.props.start.x, clientY: this.props.start.y
			};
		},
	
		handleDragStart: function (e) {
	    // todo: write right implementation to prevent multitouch drag
	    // prevent multi-touch events
	    // if (isMultiTouch(e)) {
	    //     this.handleDragEnd.apply(e, arguments);
	    //     return
	    // }
	
			// Make it possible to attach event handlers on top of this one
			this.props.onMouseDown(e);
	
			// Only catch left clicks, if clicking
			if (typeof e.button === "number" && e.button !== 0) {
				return;
			}
	
			var node = this.getDOMNode();
	
			// Short circuit if handle or cancel prop was provided and selector doesn't match
			if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
				(this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
				return;
			}
	
	    var dragPoint = getControlPosition(e);
	
			// Initiate dragging
			this.setState({
				dragging: true,
				offsetX: parseInt(dragPoint.clientX, 10),
				offsetY: parseInt(dragPoint.clientY, 10),
				startX: parseInt(this.state.clientX, 10) || 0,
				startY: parseInt(this.state.clientY, 10) || 0
			});
	
			// Add a class to the body to disable user-select. This prevents text from
			// being selected all over the page.
			document.body.className += " react-draggable-active";
	
			// Call event handler
			this.props.onStart(e, createUIEvent(this));
	
			// Add event handlers
			addEvent(window, dragEventFor['move'], this.handleDrag);
			addEvent(window, dragEventFor['end'], this.handleDragEnd);
		},
	
		handleDragEnd: function (e) {
			// Short circuit if not currently dragging
			if (!this.state.dragging) {
				return;
			}
	
			// Turn off dragging
			this.setState({
				dragging: false
			});
	
			// Remove the body class used to disable user-select.
			document.body.className = document.body.className.replace(" react-draggable-active", "");
	
			// Call event handler
			this.props.onStop(e, createUIEvent(this));
	
			// Remove event handlers
	    removeEvent(window, dragEventFor['move'], this.handleDrag);
	    removeEvent(window, dragEventFor['end'], this.handleDragEnd);
		},
	
		handleDrag: function (e) {
	    var dragPoint = getControlPosition(e);
	
			// Calculate top and left
	    var clientX = (this.state.startX + (dragPoint.clientX - this.state.offsetX));
	    var clientY = (this.state.startY + (dragPoint.clientY - this.state.offsetY));
	
			// Snap to grid if prop has been provided
			if (Array.isArray(this.props.grid)) {
				var directionX = clientX < parseInt(this.state.clientX, 10) ? -1 : 1;
				var directionY = clientY < parseInt(this.state.clientY, 10) ? -1 : 1;
	
				clientX = Math.abs(clientX - parseInt(this.state.clientX, 10)) >= this.props.grid[0]
						? (parseInt(this.state.clientX, 10) + (this.props.grid[0] * directionX))
						: parseInt(this.state.clientX, 10);
	
				clientY = Math.abs(clientY - parseInt(this.state.clientY, 10)) >= this.props.grid[1]
						? (parseInt(this.state.clientY, 10) + (this.props.grid[1] * directionY))
						: parseInt(this.state.clientY, 10);
			}
	
			// Min/max constraints
			if (Array.isArray(this.props.minConstraints)) {
				clientX = Math.max(this.props.minConstraints[0], clientX);
				clientY = Math.max(this.props.minConstraints[1], clientY);
			}
			if (Array.isArray(this.props.maxConstraints)) {
				clientX = Math.min(this.props.maxConstraints[0], clientX);
				clientY = Math.min(this.props.maxConstraints[1], clientY);
			}
	
			// Update top and left
			this.setState({
				clientX: clientX,
				clientY: clientY
			});
	
			// Call event handler
			this.props.onDrag(e, createUIEvent(this));
		},
	
		render: function () {
			var style = {
				// Set top if vertical drag is enabled
				top: canDragY(this)
					? this.state.clientY
					: this.state.startY,
	
				// Set left if horizontal drag is enabled
				left: canDragX(this)
					? this.state.clientX
					: this.state.startX
			};
	
			if (this.props.useCSSTransforms) {
				style = positionToCSSTransform(style);
			}
	
			// Set zIndex if currently dragging and prop has been provided
			if (this.state.dragging && !isNaN(this.props.zIndex)) {
				style.zIndex = this.props.zIndex;
			}
	
			// Reuse the child provided
			// This makes it flexible to use whatever element is wanted (div, ul, etc)
			return cloneWithProps(React.Children.only(this.props.children), {
				style: style,
				className: 'react-draggable' + (this.state.dragging ? ' react-draggable-dragging' : ''),
	
				onMouseDown: this.handleDragStart,
				onTouchStart: function(ev){
	        ev.preventDefault(); // prevent for scroll
	        return this.handleDragStart.apply(this, arguments);
	      }.bind(this),
	
				onMouseUp: this.handleDragEnd,
				onTouchEnd: this.handleDragEnd
			});
		}
	});


/***/ },
/* 55 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react/lib/ReactComponentWithPureRenderMixin.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/
	
	'use strict';
	
	var shallowEqual = __webpack_require__(/*! ./shallowEqual */ 56);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 56 */
/*!**************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react/lib/shallowEqual.js ***!
  \**************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */
	
	'use strict';
	
	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = shallowEqual;


/***/ },
/* 57 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/react-resizable/index.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function() {
	  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
	};
	
	module.exports.Resizable = __webpack_require__(/*! ./build/Resizable */ 58);
	module.exports.ResizableBox = __webpack_require__(/*! ./build/ResizableBox */ 59);


/***/ },
/* 58 */
/*!*******************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/react-resizable/build/Resizable.js ***!
  \*******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(/*! react */ 1);
	var Draggable = __webpack_require__(/*! react-draggable */ 53);
	var PureRenderMixin = __webpack_require__(/*! react/lib/ReactComponentWithPureRenderMixin */ 55);
	var assign = __webpack_require__(/*! object-assign */ 52);
	var cloneWithProps = __webpack_require__(/*! react/lib/cloneWithProps */ 50);
	
	var Resizable = module.exports = React.createClass({
	  displayName: 'Resizable',
	  mixins: [PureRenderMixin],
	
	  propTypes: {
	    // Require that one and only one child be present.
	    children: React.PropTypes.element.isRequired,
	    // Functions
	    onResizeStop: React.PropTypes.func,
	    onResizeStart: React.PropTypes.func,
	    onResize: React.PropTypes.func,
	
	    width: React.PropTypes.number.isRequired,
	    height: React.PropTypes.number.isRequired,
	    // If you change this, be sure to update your css
	    handleSize: React.PropTypes.array,
	    // These will be passed wholesale to react-draggable
	    draggableOpts: React.PropTypes.object
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      handleSize: [20, 20]
	    };
	  },
	
	  minConstraints: function minConstraints() {
	    return parseConstraints(this.props.minConstraints, this.props.handleSize) || this.props.handleSize;
	  },
	
	  maxConstraints: function maxConstraints() {
	    return parseConstraints(this.props.maxConstraints, this.props.handleSize);
	  },
	
	  /**
	   * Wrapper around drag events to provide more useful data.
	   *
	   * @param  {String} handlerName Handler name to wrap.
	   * @return {Function}           Handler function.
	   */
	  resizeHandler: function resizeHandler(handlerName) {
	    var me = this;
	    return function (e, _ref) {
	      var element = _ref.element;
	      var position = _ref.position;
	
	      me.props[handlerName] && me.props[handlerName](e, { element: element, size: calcWH(position, me.props.handleSize) });
	    };
	  },
	
	  render: function render() {
	    var p = this.props;
	
	    // What we're doing here is getting the child of this element, and cloning it with this element's props.
	    // We are then defining its children as:
	    // Its original children (resizable's child's children), and
	    // A draggable handle.
	    return cloneWithProps(p.children, assign({}, p, {
	      children: [p.children.props.children, React.createElement(
	        Draggable,
	        _extends({}, p.draggableOpts, {
	          start: { x: p.width - 20, y: p.height - 20 },
	          moveOnStartChange: true,
	          onStop: this.resizeHandler('onResizeStop'),
	          onStart: this.resizeHandler('onResizeStart'),
	          onDrag: this.resizeHandler('onResize'),
	          minConstraints: this.minConstraints(),
	          maxConstraints: this.maxConstraints()
	        }),
	        React.createElement('span', { className: 'react-resizable-handle' })
	      )]
	    }));
	  }
	});
	
	/**
	 * Parse left and top coordinates; we have to add the handle size to get the full picture.
	 * @param  {Number} options.left Left coordinate.
	 * @param  {Number} options.top  Top coordinate.
	 * @param  {Array}  handleSize   Handle data.
	 * @return {Object}              Coordinates
	 */
	function calcWH(_ref, handleSize) {
	  var left = _ref.left;
	  var top = _ref.top;
	
	  return { width: left + handleSize[0], height: top + handleSize[1] };
	}
	
	/**
	 * Constraints must be subtracted by the size of the handle to work properly.
	 * This has a side-effect of effectively limiting the minimum size to the handleSize,
	 * which IMO is fine.
	 * @param  {Array} constraints Constraints array.
	 * @param  {Array} handleSize  Handle size array.
	 * @return {Array}             Transformed constraints.
	 */
	function parseConstraints(constraints, handleSize) {
	  if (!constraints) {
	    return;
	  }return constraints.map(function (c, i) {
	    return c - handleSize[i];
	  });
	}

/***/ },
/* 59 */
/*!**********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/react-resizable/build/ResizableBox.js ***!
  \**********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(/*! react */ 1);
	var Resizable = __webpack_require__(/*! ./Resizable */ 58);
	var PureRenderMixin = __webpack_require__(/*! react/lib/ReactComponentWithPureRenderMixin */ 55);
	
	// An example use of Resizable.
	var ResizableBox = module.exports = React.createClass({
	  displayName: 'ResizableBox',
	  mixins: [PureRenderMixin],
	
	  propTypes: {
	    lockAspectRatio: React.PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      lockAspectRatio: false,
	      handleSize: [20, 20],
	      minConstraints: [20, 20]
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      width: this.props.width,
	      height: this.props.height,
	      aspectRatio: this.props.width / this.props.height
	    };
	  },
	
	  onResize: function onResize(event, _ref) {
	    var element = _ref.element;
	    var size = _ref.size;
	    var width = size.width;
	    var height = size.height;
	
	    var widthChanged = width !== this.state.width,
	        heightChanged = height !== this.state.height;
	    if (!widthChanged && !heightChanged) {
	      return;
	    }if (this.props.lockAspectRatio) {
	      var _preserveAspectRatio = this.preserveAspectRatio(width, height);
	
	      var _preserveAspectRatio2 = _slicedToArray(_preserveAspectRatio, 2);
	
	      width = _preserveAspectRatio2[0];
	      height = _preserveAspectRatio2[1];
	    }
	
	    this.setState({
	      width: width,
	      height: height
	    });
	  },
	
	  // If you do this, be careful of constraints
	  preserveAspectRatio: function preserveAspectRatio(width, height) {
	    var min = this.props.minConstraints;
	    var max = this.props.maxConstraints;
	
	    height = width / this.state.aspectRatio;
	    width = height * this.state.aspectRatio;
	
	    if (min) {
	      width = Math.max(min[0], width);
	      height = Math.max(min[1], height);
	    }
	    if (max) {
	      width = Math.min(max[0], width);
	      height = Math.min(max[1], height);
	    }
	    return [width, height];
	  },
	
	  render: function render() {
	    // Basic wrapper around a Resizable instance.
	    // If you use Resizable directly, you are responsible for updating the component
	    // with a new width and height.
	    var _props = this.props;
	    var handleSize = _props.handleSize;
	    var minConstraints = _props.minConstraints;
	    var maxConstraints = _props.maxConstraints;
	
	    var props = _objectWithoutProperties(_props, ['handleSize', 'minConstraints', 'maxConstraints']);
	
	    return React.createElement(
	      Resizable,
	      {
	        minConstraints: minConstraints,
	        maxConstraints: maxConstraints,
	        handleSize: handleSize,
	        width: this.state.width,
	        height: this.state.height,
	        onResize: this.onResize,
	        draggableOpts: this.props.draggableOpts
	      },
	      React.createElement(
	        'div',
	        _extends({ style: { width: this.state.width + 'px', height: this.state.height + 'px' } }, props),
	        this.props.children
	      )
	    );
	  }
	});

/***/ },
/* 60 */
/*!******************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/build/mixins/PureDeepRenderMixin.js ***!
  \******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var deepEqual = __webpack_require__(/*! deep-equal */ 61);
	
	// Like PureRenderMixin, but with deep comparisons.
	var PureDeepRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
	  }
	};
	
	module.exports = PureDeepRenderMixin;

/***/ },
/* 61 */
/*!****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/deep-equal/index.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(/*! ./lib/keys.js */ 62);
	var isArguments = __webpack_require__(/*! ./lib/is_arguments.js */ 63);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 62 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/deep-equal/lib/keys.js ***!
  \*******************************************************************************************/
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 63 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/~/deep-equal/lib/is_arguments.js ***!
  \***************************************************************************************************/
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 64 */
/*!******************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/build/mixins/WidthListeningMixin.js ***!
  \******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(/*! react */ 1);
	
	/**
	 * A simple mixin that provides facility for listening to container resizes.
	 */
	var WidthListeningMixin = {
	
	  propTypes: {
	    // This allows setting this on the server side
	    initialWidth: React.PropTypes.number,
	
	    // If false, you should supply width yourself. Good if you want to debounce resize events
	    // or reuse a handler from somewhere else.
	    listenToWindowResize: React.PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      initialWidth: 1280,
	      listenToWindowResize: true
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.listenToWindowResize) {
	      window.addEventListener('resize', this.onWindowResize);
	      // This is intentional. Once to properly set the breakpoint and resize the elements,
	      // and again to compensate for any scrollbar that appeared because of the first step.
	      this.onWindowResize();
	      this.onWindowResize();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this.onWindowResize);
	  },
	
	  /**
	   * On window resize, update width.
	   */
	  onWindowResize: function onWindowResize() {
	    this.onWidthChange(this.getDOMNode().offsetWidth);
	  }
	
	};
	
	module.exports = WidthListeningMixin;

/***/ },
/* 65 */
/*!*****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/build/ResponsiveReactGridLayout.js ***!
  \*****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var React = __webpack_require__(/*! react */ 1);
	var utils = __webpack_require__(/*! ./utils */ 51);
	var responsiveUtils = __webpack_require__(/*! ./responsiveUtils */ 66);
	var PureDeepRenderMixin = __webpack_require__(/*! ./mixins/PureDeepRenderMixin */ 60);
	var WidthListeningMixin = __webpack_require__(/*! ./mixins/WidthListeningMixin */ 64);
	var ReactGridLayout = __webpack_require__(/*! ./ReactGridLayout */ 48);
	
	/**
	 * A wrapper around ReactGridLayout to support responsive breakpoints.
	 */
	var ResponsiveReactGridLayout = React.createClass({
	  displayName: 'ResponsiveReactGridLayout',
	
	  mixins: [PureDeepRenderMixin, WidthListeningMixin],
	
	  propTypes: {
	    //
	    // Basic props
	    //
	
	    // Optional, but if you are managing width yourself you may want to set the breakpoint
	    // yourself as well.
	    breakpoint: React.PropTypes.string,
	
	    // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
	    breakpoints: React.PropTypes.object,
	
	    // # of cols. This is a breakpoint -> cols map
	    cols: React.PropTypes.object,
	
	    // layouts is an object mapping breakpoints to layouts.
	    // e.g. {lg: Layout, md: Layout, ...}
	    layouts: function layouts(props, propName, componentName) {
	      React.PropTypes.object.isRequired.apply(this, arguments);
	
	      var layouts = props.layouts;
	      Object.keys(layouts).map(function (k) {
	        utils.validateLayout(layouts[k], 'layouts.' + k);
	      });
	    },
	
	    //
	    // Callbacks
	    //
	
	    // Calls back with breakpoint and new # cols
	    onBreakpointChange: React.PropTypes.func,
	
	    // Callback so you can save the layout.
	    // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
	    onLayoutChange: React.PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
	      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
	      layouts: {},
	      onBreakpointChange: function onBreakpointChange() {},
	      onLayoutChange: function onLayoutChange() {}
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var breakpoint = this.props.breakpoint || responsiveUtils.getBreakpointFromWidth(this.props.breakpoints, this.props.initialWidth);
	    var cols = responsiveUtils.getColsFromBreakpoint(breakpoint, this.props.cols);
	
	    // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
	    // for this layout.
	    var initialLayout = responsiveUtils.findOrGenerateResponsiveLayout(this.props.layouts, this.props.breakpoints, breakpoint, breakpoint, cols, this.props.verticalCompact);
	
	    return {
	      layout: initialLayout,
	      // storage for layouts obsoleted by breakpoints
	      layouts: this.props.layouts || {},
	      breakpoint: breakpoint,
	      cols: cols,
	      width: this.props.initialWidth
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // This allows you to set the width manually if you like.
	    // Use manual width changes in combination with `listenToWindowResize: false`
	    if (nextProps.width) this.onWidthChange(nextProps.width);
	
	    // Allow parent to set breakpoint directly.
	    if (nextProps.breakpoint !== this.props.breakpoint) {
	      this.onWidthChange(this.state.width);
	    }
	
	    // Allow parent to set layouts directly.
	    if (nextProps.layouts && nextProps.layouts !== this.state.layouts) {
	      // Since we're setting an entirely new layout object, we must generate a new responsive layout
	      // if one does not exist.
	      var newLayout = responsiveUtils.findOrGenerateResponsiveLayout(nextProps.layouts, nextProps.breakpoints, this.state.breakpoint, this.state.breakpoint, this.state.cols, this.props.verticalLayout);
	
	      this.setState({
	        layouts: nextProps.layouts,
	        layout: newLayout
	      });
	    }
	  },
	
	  /**
	   * Bubble this up, add `layouts` object.
	   * @param  {Array} layout Layout from inner Grid.
	   */
	  onLayoutChange: function onLayoutChange(layout) {
	    this.state.layouts[this.state.breakpoint] = layout;
	    this.setState({ layout: layout, layouts: this.state.layouts });
	    this.props.onLayoutChange(layout, this.state.layouts);
	  },
	
	  /**
	   * When the width changes work through breakpoints and reset state with the new width & breakpoint.
	   * Width changes are necessary to figure out the widget widths.
	   */
	  onWidthChange: function onWidthChange(width) {
	    // Set new breakpoint
	    var newState = { width: width };
	    newState.breakpoint = this.props.breakpoint || responsiveUtils.getBreakpointFromWidth(this.props.breakpoints, newState.width);
	    newState.cols = responsiveUtils.getColsFromBreakpoint(newState.breakpoint, this.props.cols);
	
	    // Breakpoint change
	    if (newState.cols !== this.state.cols) {
	
	      // Store the current layout
	      newState.layouts = this.state.layouts;
	      newState.layouts[this.state.breakpoint] = JSON.parse(JSON.stringify(this.state.layout));
	
	      // Find or generate a new one.
	      newState.layout = responsiveUtils.findOrGenerateResponsiveLayout(newState.layouts, this.props.breakpoints, newState.breakpoint, this.state.breakpoint, newState.cols, this.props.verticalLayout);
	
	      // This adds missing items.
	      newState.layout = utils.synchronizeLayoutWithChildren(newState.layout, this.props.children, newState.cols, this.props.verticalCompact);
	
	      // Store this new layout as well.
	      newState.layouts[newState.breakpoint] = newState.layout;
	
	      this.props.onBreakpointChange(newState.breakpoint, newState.cols);
	    }
	
	    this.setState(newState);
	  },
	
	  render: function render() {
	    // Don't pass responsive props to RGL.
	    /*jshint unused:false*/
	    var _props = this.props;
	    var layouts = _props.layouts;
	    var onBreakpointChange = _props.onBreakpointChange;
	    var breakpoints = _props.breakpoints;
	
	    var props = _objectWithoutProperties(_props, ['layouts', 'onBreakpointChange', 'breakpoints']);
	
	    return React.createElement(
	      ReactGridLayout,
	      _extends({}, props, {
	        layout: this.state.layout,
	        cols: this.state.cols,
	        listenToWindowResize: false,
	        onLayoutChange: this.onLayoutChange,
	        width: this.state.width }),
	      this.props.children
	    );
	  }
	});
	
	module.exports = ResponsiveReactGridLayout;

/***/ },
/* 66 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-grid-layout/build/responsiveUtils.js ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(/*! ./utils */ 51);
	
	var responsiveUtils = module.exports = {
	
	  /**
	   * Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
	   *
	   * @param  {Object} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
	   * @param  {Number} width Screen width.
	   * @return {String}       Highest breakpoint that is less than width.
	   */
	  getBreakpointFromWidth: function getBreakpointFromWidth(breakpoints, width) {
	    var sorted = responsiveUtils.sortBreakpoints(breakpoints);
	    var matching = sorted[0];
	    for (var i = 1, len = sorted.length; i < len; i++) {
	      var breakpointName = sorted[i];
	      if (width > breakpoints[breakpointName]) matching = breakpointName;
	    }
	    return matching;
	  },
	
	  /**
	   * Given a breakpoint, get the # of cols set for it.
	   * @param  {String} breakpoint Breakpoint name.
	   * @param  {Object} cols       Map of breakpoints to cols.
	   * @return {Number}            Number of cols.
	   */
	  getColsFromBreakpoint: function getColsFromBreakpoint(breakpoint, cols) {
	    if (!cols[breakpoint]) {
	      throw new Error("ResponsiveReactGridLayout: `cols` entry for breakpoint " + breakpoint + " is missing!");
	    }
	    return cols[breakpoint];
	  },
	
	  /**
	   * Given existing layouts and a new breakpoint, find or generate a new layout.
	   *
	   * This finds the layout above the new one and generates from it, if it exists.
	   *
	   * @param  {Array} layouts     Existing layouts.
	   * @param  {Array} breakpoints All breakpoints.
	   * @param  {String} breakpoint New breakpoint.
	   * @param  {String} breakpoint Last breakpoint (for fallback).
	   * @param  {Number} cols       Column count at new breakpoint.
	   * @param  {Boolean} verticalCompact Whether or not to compact the layout
	   *   vertically.
	   * @return {Array}             New layout.
	   */
	  findOrGenerateResponsiveLayout: function findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, lastBreakpoint, cols, verticalCompact) {
	    // If it already exists, just return it.
	    if (layouts[breakpoint]) return layouts[breakpoint];
	    // Find or generate the next layout
	    var layout = layouts[lastBreakpoint];
	    var breakpointsSorted = responsiveUtils.sortBreakpoints(breakpoints);
	    var breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));
	    for (var i = 0, len = breakpointsAbove.length; i < len; i++) {
	      var b = breakpointsAbove[i];
	      if (layouts[b]) {
	        layout = layouts[b];
	        break;
	      }
	    }
	    layout = JSON.parse(JSON.stringify(layout || [])); // clone layout so we don't modify existing items
	    return utils.compact(utils.correctBounds(layout, { cols: cols }), verticalCompact);
	  },
	
	  /**
	   * Given breakpoints, return an array of breakpoints sorted by width. This is usually
	   * e.g. ['xxs', 'xs', 'sm', ...]
	   *
	   * @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
	   * @return {Array}              Sorted breakpoints.
	   */
	  sortBreakpoints: function sortBreakpoints(breakpoints) {
	    var keys = Object.keys(breakpoints);
	    return keys.sort(function (a, b) {
	      return breakpoints[a] - breakpoints[b];
	    });
	  }
	};

/***/ },
/* 67 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/index.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 68)['default'];
	
	var _Object$defineProperty = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ 78)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 82)['default'];
	
	exports.__esModule = true;
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var _utilsDomUtils = __webpack_require__(/*! ./utils/domUtils */ 98);
	
	var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);
	
	var _utilsChildrenValueInputValidation = __webpack_require__(/*! ./utils/childrenValueInputValidation */ 118);
	
	var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _Accordion2 = __webpack_require__(/*! ./Accordion */ 123);
	
	var _Accordion3 = _interopRequireDefault(_Accordion2);
	
	exports.Accordion = _Accordion3['default'];
	
	var _Affix2 = __webpack_require__(/*! ./Affix */ 137);
	
	var _Affix3 = _interopRequireDefault(_Affix2);
	
	exports.Affix = _Affix3['default'];
	
	var _AffixMixin2 = __webpack_require__(/*! ./AffixMixin */ 138);
	
	var _AffixMixin3 = _interopRequireDefault(_AffixMixin2);
	
	exports.AffixMixin = _AffixMixin3['default'];
	
	var _Alert2 = __webpack_require__(/*! ./Alert */ 140);
	
	var _Alert3 = _interopRequireDefault(_Alert2);
	
	exports.Alert = _Alert3['default'];
	
	var _Badge2 = __webpack_require__(/*! ./Badge */ 141);
	
	var _Badge3 = _interopRequireDefault(_Badge2);
	
	exports.Badge = _Badge3['default'];
	
	var _BootstrapMixin2 = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin3 = _interopRequireDefault(_BootstrapMixin2);
	
	exports.BootstrapMixin = _BootstrapMixin3['default'];
	
	var _Button2 = __webpack_require__(/*! ./Button */ 142);
	
	var _Button3 = _interopRequireDefault(_Button2);
	
	exports.Button = _Button3['default'];
	
	var _ButtonGroup2 = __webpack_require__(/*! ./ButtonGroup */ 147);
	
	var _ButtonGroup3 = _interopRequireDefault(_ButtonGroup2);
	
	exports.ButtonGroup = _ButtonGroup3['default'];
	
	var _ButtonInput2 = __webpack_require__(/*! ./ButtonInput */ 143);
	
	var _ButtonInput3 = _interopRequireDefault(_ButtonInput2);
	
	exports.ButtonInput = _ButtonInput3['default'];
	
	var _ButtonToolbar2 = __webpack_require__(/*! ./ButtonToolbar */ 148);
	
	var _ButtonToolbar3 = _interopRequireDefault(_ButtonToolbar2);
	
	exports.ButtonToolbar = _ButtonToolbar3['default'];
	
	var _Carousel2 = __webpack_require__(/*! ./Carousel */ 149);
	
	var _Carousel3 = _interopRequireDefault(_Carousel2);
	
	exports.Carousel = _Carousel3['default'];
	
	var _CarouselItem2 = __webpack_require__(/*! ./CarouselItem */ 150);
	
	var _CarouselItem3 = _interopRequireDefault(_CarouselItem2);
	
	exports.CarouselItem = _CarouselItem3['default'];
	
	var _Col2 = __webpack_require__(/*! ./Col */ 152);
	
	var _Col3 = _interopRequireDefault(_Col2);
	
	exports.Col = _Col3['default'];
	
	var _CollapsibleMixin2 = __webpack_require__(/*! ./CollapsibleMixin */ 153);
	
	var _CollapsibleMixin3 = _interopRequireDefault(_CollapsibleMixin2);
	
	exports.CollapsibleMixin = _CollapsibleMixin3['default'];
	
	var _CollapsibleNav2 = __webpack_require__(/*! ./CollapsibleNav */ 154);
	
	var _CollapsibleNav3 = _interopRequireDefault(_CollapsibleNav2);
	
	exports.CollapsibleNav = _CollapsibleNav3['default'];
	
	var _Dropdown2 = __webpack_require__(/*! ./Dropdown */ 159);
	
	var _Dropdown3 = _interopRequireDefault(_Dropdown2);
	
	exports.Dropdown = _Dropdown3['default'];
	
	var _DropdownButton2 = __webpack_require__(/*! ./DropdownButton */ 237);
	
	var _DropdownButton3 = _interopRequireDefault(_DropdownButton2);
	
	exports.DropdownButton = _DropdownButton3['default'];
	
	var _NavDropdown2 = __webpack_require__(/*! ./NavDropdown */ 238);
	
	var _NavDropdown3 = _interopRequireDefault(_NavDropdown2);
	
	exports.NavDropdown = _NavDropdown3['default'];
	
	var _SplitButton3 = __webpack_require__(/*! ./SplitButton */ 239);
	
	var _SplitButton4 = _interopRequireDefault(_SplitButton3);
	
	exports.SplitButton = _SplitButton4['default'];
	
	var _FadeMixin2 = __webpack_require__(/*! ./FadeMixin */ 241);
	
	var _FadeMixin3 = _interopRequireDefault(_FadeMixin2);
	
	exports.FadeMixin = _FadeMixin3['default'];
	
	var _Glyphicon2 = __webpack_require__(/*! ./Glyphicon */ 146);
	
	var _Glyphicon3 = _interopRequireDefault(_Glyphicon2);
	
	exports.Glyphicon = _Glyphicon3['default'];
	
	var _Grid2 = __webpack_require__(/*! ./Grid */ 242);
	
	var _Grid3 = _interopRequireDefault(_Grid2);
	
	exports.Grid = _Grid3['default'];
	
	var _Input2 = __webpack_require__(/*! ./Input */ 243);
	
	var _Input3 = _interopRequireDefault(_Input2);
	
	exports.Input = _Input3['default'];
	
	var _Interpolate2 = __webpack_require__(/*! ./Interpolate */ 246);
	
	var _Interpolate3 = _interopRequireDefault(_Interpolate2);
	
	exports.Interpolate = _Interpolate3['default'];
	
	var _Jumbotron2 = __webpack_require__(/*! ./Jumbotron */ 247);
	
	var _Jumbotron3 = _interopRequireDefault(_Jumbotron2);
	
	exports.Jumbotron = _Jumbotron3['default'];
	
	var _Label2 = __webpack_require__(/*! ./Label */ 248);
	
	var _Label3 = _interopRequireDefault(_Label2);
	
	exports.Label = _Label3['default'];
	
	var _ListGroup2 = __webpack_require__(/*! ./ListGroup */ 249);
	
	var _ListGroup3 = _interopRequireDefault(_ListGroup2);
	
	exports.ListGroup = _ListGroup3['default'];
	
	var _ListGroupItem2 = __webpack_require__(/*! ./ListGroupItem */ 250);
	
	var _ListGroupItem3 = _interopRequireDefault(_ListGroupItem2);
	
	exports.ListGroupItem = _ListGroupItem3['default'];
	
	var _MenuItem2 = __webpack_require__(/*! ./MenuItem */ 251);
	
	var _MenuItem3 = _interopRequireDefault(_MenuItem2);
	
	exports.MenuItem = _MenuItem3['default'];
	
	var _Modal2 = __webpack_require__(/*! ./Modal */ 252);
	
	var _Modal3 = _interopRequireDefault(_Modal2);
	
	exports.Modal = _Modal3['default'];
	
	var _ModalHeader2 = __webpack_require__(/*! ./ModalHeader */ 264);
	
	var _ModalHeader3 = _interopRequireDefault(_ModalHeader2);
	
	exports.ModalHeader = _ModalHeader3['default'];
	
	var _ModalTitle2 = __webpack_require__(/*! ./ModalTitle */ 265);
	
	var _ModalTitle3 = _interopRequireDefault(_ModalTitle2);
	
	exports.ModalTitle = _ModalTitle3['default'];
	
	var _ModalBody2 = __webpack_require__(/*! ./ModalBody */ 263);
	
	var _ModalBody3 = _interopRequireDefault(_ModalBody2);
	
	exports.ModalBody = _ModalBody3['default'];
	
	var _ModalFooter2 = __webpack_require__(/*! ./ModalFooter */ 266);
	
	var _ModalFooter3 = _interopRequireDefault(_ModalFooter2);
	
	exports.ModalFooter = _ModalFooter3['default'];
	
	var _Nav2 = __webpack_require__(/*! ./Nav */ 267);
	
	var _Nav3 = _interopRequireDefault(_Nav2);
	
	exports.Nav = _Nav3['default'];
	
	var _Navbar2 = __webpack_require__(/*! ./Navbar */ 268);
	
	var _Navbar3 = _interopRequireDefault(_Navbar2);
	
	exports.Navbar = _Navbar3['default'];
	
	var _NavItem2 = __webpack_require__(/*! ./NavItem */ 269);
	
	var _NavItem3 = _interopRequireDefault(_NavItem2);
	
	exports.NavItem = _NavItem3['default'];
	
	var _Overlay2 = __webpack_require__(/*! ./Overlay */ 270);
	
	var _Overlay3 = _interopRequireDefault(_Overlay2);
	
	exports.Overlay = _Overlay3['default'];
	
	var _OverlayTrigger2 = __webpack_require__(/*! ./OverlayTrigger */ 275);
	
	var _OverlayTrigger3 = _interopRequireDefault(_OverlayTrigger2);
	
	exports.OverlayTrigger = _OverlayTrigger3['default'];
	
	var _PageHeader2 = __webpack_require__(/*! ./PageHeader */ 278);
	
	var _PageHeader3 = _interopRequireDefault(_PageHeader2);
	
	exports.PageHeader = _PageHeader3['default'];
	
	var _PageItem2 = __webpack_require__(/*! ./PageItem */ 279);
	
	var _PageItem3 = _interopRequireDefault(_PageItem2);
	
	exports.PageItem = _PageItem3['default'];
	
	var _Pager2 = __webpack_require__(/*! ./Pager */ 280);
	
	var _Pager3 = _interopRequireDefault(_Pager2);
	
	exports.Pager = _Pager3['default'];
	
	var _Pagination2 = __webpack_require__(/*! ./Pagination */ 281);
	
	var _Pagination3 = _interopRequireDefault(_Pagination2);
	
	exports.Pagination = _Pagination3['default'];
	
	var _Panel2 = __webpack_require__(/*! ./Panel */ 284);
	
	var _Panel3 = _interopRequireDefault(_Panel2);
	
	exports.Panel = _Panel3['default'];
	
	var _PanelGroup2 = __webpack_require__(/*! ./PanelGroup */ 132);
	
	var _PanelGroup3 = _interopRequireDefault(_PanelGroup2);
	
	exports.PanelGroup = _PanelGroup3['default'];
	
	var _Popover2 = __webpack_require__(/*! ./Popover */ 285);
	
	var _Popover3 = _interopRequireDefault(_Popover2);
	
	exports.Popover = _Popover3['default'];
	
	var _ProgressBar2 = __webpack_require__(/*! ./ProgressBar */ 286);
	
	var _ProgressBar3 = _interopRequireDefault(_ProgressBar2);
	
	exports.ProgressBar = _ProgressBar3['default'];
	
	var _Row2 = __webpack_require__(/*! ./Row */ 287);
	
	var _Row3 = _interopRequireDefault(_Row2);
	
	exports.Row = _Row3['default'];
	
	var _SafeAnchor2 = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor3 = _interopRequireDefault(_SafeAnchor2);
	
	exports.SafeAnchor = _SafeAnchor3['default'];
	
	var _SplitButton5 = _interopRequireDefault(_SplitButton3);
	
	exports.SplitButton = _SplitButton5['default'];
	
	var _styleMaps2 = __webpack_require__(/*! ./styleMaps */ 136);
	
	var _styleMaps3 = _interopRequireDefault(_styleMaps2);
	
	exports.styleMaps = _styleMaps3['default'];
	
	var _SubNav2 = __webpack_require__(/*! ./SubNav */ 288);
	
	var _SubNav3 = _interopRequireDefault(_SubNav2);
	
	exports.SubNav = _SubNav3['default'];
	
	var _Tab2 = __webpack_require__(/*! ./Tab */ 289);
	
	var _Tab3 = _interopRequireDefault(_Tab2);
	
	exports.Tab = _Tab3['default'];
	
	var _TabbedArea2 = __webpack_require__(/*! ./TabbedArea */ 290);
	
	var _TabbedArea3 = _interopRequireDefault(_TabbedArea2);
	
	exports.TabbedArea = _TabbedArea3['default'];
	
	var _Table2 = __webpack_require__(/*! ./Table */ 293);
	
	var _Table3 = _interopRequireDefault(_Table2);
	
	exports.Table = _Table3['default'];
	
	var _TabPane2 = __webpack_require__(/*! ./TabPane */ 292);
	
	var _TabPane3 = _interopRequireDefault(_TabPane2);
	
	exports.TabPane = _TabPane3['default'];
	
	var _Tabs2 = __webpack_require__(/*! ./Tabs */ 291);
	
	var _Tabs3 = _interopRequireDefault(_Tabs2);
	
	exports.Tabs = _Tabs3['default'];
	
	var _Thumbnail2 = __webpack_require__(/*! ./Thumbnail */ 294);
	
	var _Thumbnail3 = _interopRequireDefault(_Thumbnail2);
	
	exports.Thumbnail = _Thumbnail3['default'];
	
	var _Tooltip2 = __webpack_require__(/*! ./Tooltip */ 295);
	
	var _Tooltip3 = _interopRequireDefault(_Tooltip2);
	
	exports.Tooltip = _Tooltip3['default'];
	
	var _Well2 = __webpack_require__(/*! ./Well */ 296);
	
	var _Well3 = _interopRequireDefault(_Well2);
	
	exports.Well = _Well3['default'];
	
	var _Portal2 = __webpack_require__(/*! ./Portal */ 297);
	
	var _Portal3 = _interopRequireDefault(_Portal2);
	
	exports.Portal = _Portal3['default'];
	
	var _Position2 = __webpack_require__(/*! ./Position */ 298);
	
	var _Position3 = _interopRequireDefault(_Position2);
	
	exports.Position = _Position3['default'];
	
	var _Collapse2 = __webpack_require__(/*! ./Collapse */ 155);
	
	var _Collapse3 = _interopRequireDefault(_Collapse2);
	
	exports.Collapse = _Collapse3['default'];
	
	var _Fade2 = __webpack_require__(/*! ./Fade */ 261);
	
	var _Fade3 = _interopRequireDefault(_Fade2);
	
	exports.Fade = _Fade3['default'];
	
	var _FormControls2 = __webpack_require__(/*! ./FormControls */ 244);
	
	var _FormControls = _interopRequireWildcard(_FormControls2);
	
	exports.FormControls = _FormControls;
	
	function createDeprecationWrapper(obj, deprecated, instead, link) {
	  var wrapper = {};
	
	  if (process.env.NODE_ENV === 'production') {
	    return obj;
	  }
	
	  _Object$keys(obj).forEach(function (key) {
	    _Object$defineProperty(wrapper, key, {
	      get: function get() {
	        _utilsDeprecationWarning2['default'](deprecated, instead, link);
	        return obj[key];
	      },
	      set: function set(x) {
	        obj[key] = x;
	      }
	    });
	  });
	
	  return wrapper;
	}
	
	var utils = {
	  childrenValueInputValidation: _utilsChildrenValueInputValidation2['default'],
	  createChainedFunction: _utilsCreateChainedFunction2['default'],
	  ValidComponentChildren: _utilsValidComponentChildren2['default'],
	  CustomPropTypes: _utilsCustomPropTypes2['default'],
	  domUtils: createDeprecationWrapper(_utilsDomUtils2['default'], 'utils/domUtils', 'npm install dom-helpers')
	};
	exports.utils = utils;

/***/ },
/* 68 */
/*!*******************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/core-js/object/keys.js ***!
  \*******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/keys */ 69), __esModule: true };

/***/ },
/* 69 */
/*!********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/fn/object/keys.js ***!
  \********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.keys */ 70);
	module.exports = __webpack_require__(/*! ../../modules/$.core */ 76).Object.keys;

/***/ },
/* 70 */
/*!*****************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/es6.object.keys.js ***!
  \*****************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(/*! ./$.to-object */ 71);
	
	__webpack_require__(/*! ./$.object-sap */ 73)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 71 */
/*!*************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.to-object.js ***!
  \*************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./$.defined */ 72);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 72 */
/*!***********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.defined.js ***!
  \***********************************************************************************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 73 */
/*!**************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.object-sap.js ***!
  \**************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(/*! ./$.def */ 74)
	    , fn   = (__webpack_require__(/*! ./$.core */ 76).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(/*! ./$.fails */ 77)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 74 */
/*!*******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.def.js ***!
  \*******************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./$.global */ 75)
	  , core      = __webpack_require__(/*! ./$.core */ 76)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 75 */
/*!**********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.global.js ***!
  \**********************************************************************************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 76 */
/*!********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.core.js ***!
  \********************************************************************************************************************/
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 77 */
/*!*********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.fails.js ***!
  \*********************************************************************************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 78 */
/*!******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/core-js/object/define-property.js ***!
  \******************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ 79), __esModule: true };

/***/ },
/* 79 */
/*!*******************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ../../modules/$ */ 80);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 80 */
/*!***************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.js ***!
  \***************************************************************************************************************/
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 81 */
/*!*******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/helpers/interop-require-default.js ***!
  \*******************************************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 82 */
/*!********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/helpers/interop-require-wildcard.js ***!
  \********************************************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};
	
	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }
	
	    newObj["default"] = obj;
	    return newObj;
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 83 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/deprecationWarning.js ***!
  \************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _reactLibWarning = __webpack_require__(/*! react/lib/warning */ 96);
	
	var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);
	
	var warned = {};
	
	function deprecationWarning(oldname, newname, link) {
	  var message = undefined;
	
	  if (typeof oldname === 'object') {
	    message = oldname.message;
	  } else {
	    message = oldname + ' is deprecated. Use ' + newname + ' instead.';
	
	    if (link) {
	      message += '\nYou can read more about it at ' + link;
	    }
	  }
	
	  if (warned[message]) {
	    return;
	  }
	
	  _reactLibWarning2['default'](false, message);
	  warned[message] = true;
	}
	
	deprecationWarning.wrapper = function (Component) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return (function (_Component) {
	    _inherits(DeprecatedComponent, _Component);
	
	    function DeprecatedComponent() {
	      _classCallCheck(this, DeprecatedComponent);
	
	      _Component.apply(this, arguments);
	    }
	
	    DeprecatedComponent.prototype.componentWillMount = function componentWillMount() {
	      deprecationWarning.apply(undefined, args);
	
	      if (_Component.prototype.componentWillMount) {
	        var _Component$prototype$componentWillMount;
	
	        for (var _len2 = arguments.length, methodArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          methodArgs[_key2] = arguments[_key2];
	        }
	
	        (_Component$prototype$componentWillMount = _Component.prototype.componentWillMount).call.apply(_Component$prototype$componentWillMount, [this].concat(methodArgs));
	      }
	    };
	
	    return DeprecatedComponent;
	  })(Component);
	};
	
	exports['default'] = deprecationWarning;
	module.exports = exports['default'];

/***/ },
/* 84 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/helpers/inherits.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(/*! babel-runtime/core-js/object/create */ 85)["default"];
	
	var _Object$setPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ 87)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 85 */
/*!*********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/core-js/object/create.js ***!
  \*********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 86), __esModule: true };

/***/ },
/* 86 */
/*!**********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/fn/object/create.js ***!
  \**********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ../../modules/$ */ 80);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 87 */
/*!*******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/core-js/object/set-prototype-of.js ***!
  \*******************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ 88), __esModule: true };

/***/ },
/* 88 */
/*!********************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ 89);
	module.exports = __webpack_require__(/*! ../../modules/$.core */ 76).Object.setPrototypeOf;

/***/ },
/* 89 */
/*!*****************************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(/*! ./$.def */ 74);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./$.set-proto */ 90).set});

/***/ },
/* 90 */
/*!*************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.set-proto.js ***!
  \*************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(/*! ./$ */ 80).getDesc
	  , isObject = __webpack_require__(/*! ./$.is-object */ 91)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 92);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(/*! ./$.ctx */ 93)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 91 */
/*!*************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.is-object.js ***!
  \*************************************************************************************************************************/
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 92 */
/*!*************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.an-object.js ***!
  \*************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./$.is-object */ 91);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 93 */
/*!*******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.ctx.js ***!
  \*******************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./$.a-function */ 94);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 94 */
/*!**************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.a-function.js ***!
  \**************************************************************************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 95 */
/*!************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/helpers/class-call-check.js ***!
  \************************************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 96 */
/*!*********************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react/lib/warning.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */
	
	"use strict";
	
	var emptyFunction = __webpack_require__(/*! ./emptyFunction */ 97);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if ("production" !== process.env.NODE_ENV) {
	  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];});
	      console.warn(message);
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 97 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react/lib/emptyFunction.js ***!
  \***************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */
	
	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function() { return this; };
	emptyFunction.thatReturnsArgument = function(arg) { return arg; };
	
	module.exports = emptyFunction;


/***/ },
/* 98 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/domUtils.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _domHelpersUtilInDOM = __webpack_require__(/*! dom-helpers/util/inDOM */ 99);
	
	var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);
	
	var _domHelpersOwnerDocument = __webpack_require__(/*! dom-helpers/ownerDocument */ 100);
	
	var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);
	
	var _domHelpersOwnerWindow = __webpack_require__(/*! dom-helpers/ownerWindow */ 101);
	
	var _domHelpersOwnerWindow2 = _interopRequireDefault(_domHelpersOwnerWindow);
	
	var _domHelpersQueryContains = __webpack_require__(/*! dom-helpers/query/contains */ 103);
	
	var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);
	
	var _domHelpersActiveElement = __webpack_require__(/*! dom-helpers/activeElement */ 104);
	
	var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);
	
	var _domHelpersQueryOffset = __webpack_require__(/*! dom-helpers/query/offset */ 105);
	
	var _domHelpersQueryOffset2 = _interopRequireDefault(_domHelpersQueryOffset);
	
	var _domHelpersQueryOffsetParent = __webpack_require__(/*! dom-helpers/query/offsetParent */ 107);
	
	var _domHelpersQueryOffsetParent2 = _interopRequireDefault(_domHelpersQueryOffsetParent);
	
	var _domHelpersQueryPosition = __webpack_require__(/*! dom-helpers/query/position */ 115);
	
	var _domHelpersQueryPosition2 = _interopRequireDefault(_domHelpersQueryPosition);
	
	var _domHelpersStyle = __webpack_require__(/*! dom-helpers/style */ 108);
	
	var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);
	
	function ownerDocument(componentOrElement) {
	  var elem = _react2['default'].findDOMNode(componentOrElement);
	  return _domHelpersOwnerDocument2['default'](elem && elem.ownerDocument || document);
	}
	
	function ownerWindow(componentOrElement) {
	  var doc = ownerDocument(componentOrElement);
	  return _domHelpersOwnerWindow2['default'](doc);
	}
	
	// TODO remove in 0.26
	function getComputedStyles(elem) {
	  return ownerDocument(elem).defaultView.getComputedStyle(elem, null);
	}
	
	/**
	 * Get the height of the document
	 *
	 * @returns {documentHeight: number}
	 */
	function getDocumentHeight() {
	  return Math.max(document.documentElement.offsetHeight, document.height, document.body.scrollHeight, document.body.offsetHeight);
	}
	
	/**
	 * Get an element's size
	 *
	 * @param {HTMLElement} elem
	 * @returns {{width: number, height: number}}
	 */
	function getSize(elem) {
	  var rect = {
	    width: elem.offsetWidth || 0,
	    height: elem.offsetHeight || 0
	  };
	  if (typeof elem.getBoundingClientRect !== 'undefined') {
	    var _elem$getBoundingClientRect = elem.getBoundingClientRect();
	
	    var width = _elem$getBoundingClientRect.width;
	    var height = _elem$getBoundingClientRect.height;
	
	    rect.width = width || rect.width;
	    rect.height = height || rect.height;
	  }
	  return rect;
	}
	
	exports['default'] = {
	  canUseDom: _domHelpersUtilInDOM2['default'],
	  css: _domHelpersStyle2['default'],
	  getComputedStyles: getComputedStyles,
	  contains: _domHelpersQueryContains2['default'],
	  ownerWindow: ownerWindow,
	  ownerDocument: ownerDocument,
	  getOffset: _domHelpersQueryOffset2['default'],
	  getDocumentHeight: getDocumentHeight,
	  getPosition: _domHelpersQueryPosition2['default'],
	  getSize: getSize,
	  activeElement: _domHelpersActiveElement2['default'],
	  offsetParent: _domHelpersQueryOffsetParent2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 99 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/util/inDOM.js ***!
  \********************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 100 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/ownerDocument.js ***!
  \***********************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = ownerDocument;
	
	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}
	
	module.exports = exports["default"];

/***/ },
/* 101 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/ownerWindow.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(/*! ./util/babelHelpers.js */ 102);
	
	exports.__esModule = true;
	exports['default'] = ownerWindow;
	
	var _ownerDocument = __webpack_require__(/*! ./ownerDocument */ 100);
	
	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);
	
	function ownerWindow(node) {
	  var doc = (0, _ownerDocument2['default'])(node);
	  return doc && doc.defaultView || doc.parentWindow;
	}
	
	module.exports = exports['default'];

/***/ },
/* 102 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/util/babelHelpers.js ***!
  \***************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;
	
	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };
	
	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	
	    return target;
	  };
	})

/***/ },
/* 103 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/query/contains.js ***!
  \************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(/*! ../util/inDOM */ 99);
	
	var contains = (function () {
	  var root = canUseDOM && document.documentElement;
	
	  return root && root.contains ? function (context, node) {
	    return context.contains(node);
	  } : root && root.compareDocumentPosition ? function (context, node) {
	    return context === node || !!(context.compareDocumentPosition(node) & 16);
	  } : function (context, node) {
	    if (node) do {
	      if (node === context) return true;
	    } while (node = node.parentNode);
	
	    return false;
	  };
	})();
	
	module.exports = contains;

/***/ },
/* 104 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/activeElement.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(/*! ./util/babelHelpers.js */ 102);
	
	exports.__esModule = true;
	
	/**
	 * document.activeElement
	 */
	exports['default'] = activeElement;
	
	var _ownerDocument = __webpack_require__(/*! ./ownerDocument */ 100);
	
	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);
	
	function activeElement() {
	  var doc = arguments[0] === undefined ? document : arguments[0];
	
	  try {
	    return doc.activeElement;
	  } catch (e) {}
	}
	
	module.exports = exports['default'];

/***/ },
/* 105 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/query/offset.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var contains = __webpack_require__(/*! ./contains */ 103),
	    getWindow = __webpack_require__(/*! ./isWindow */ 106),
	    ownerDocument = __webpack_require__(/*! ../ownerDocument */ 100);
	
	module.exports = function offset(node) {
	  var doc = ownerDocument(node),
	      win = getWindow(doc),
	      docElem = doc && doc.documentElement,
	      box = { top: 0, left: 0, height: 0, width: 0 };
	
	  if (!doc) return;
	
	  // Make sure it's not a disconnected DOM node
	  if (!contains(docElem, node)) return box;
	
	  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();
	
	  if (box.width || box.height) {
	
	    box = {
	      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
	      width: (box.width == null ? node.offsetWidth : box.width) || 0,
	      height: (box.height == null ? node.offsetHeight : box.height) || 0
	    };
	  }
	
	  return box;
	};

/***/ },
/* 106 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/query/isWindow.js ***!
  \************************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	};

/***/ },
/* 107 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/query/offsetParent.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(/*! ../util/babelHelpers.js */ 102);
	
	exports.__esModule = true;
	exports['default'] = offsetParent;
	
	var _ownerDocument = __webpack_require__(/*! ../ownerDocument */ 100);
	
	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);
	
	var _style = __webpack_require__(/*! ../style */ 108);
	
	var _style2 = babelHelpers.interopRequireDefault(_style);
	
	function nodeName(node) {
	  return node.nodeName && node.nodeName.toLowerCase();
	}
	
	function offsetParent(node) {
	  var doc = (0, _ownerDocument2['default'])(node),
	      offsetParent = node && node.offsetParent;
	
	  while (offsetParent && nodeName(node) !== 'html' && (0, _style2['default'])(offsetParent, 'position') === 'static') {
	    offsetParent = offsetParent.offsetParent;
	  }
	
	  return offsetParent || doc.documentElement;
	}
	
	module.exports = exports['default'];

/***/ },
/* 108 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/style/index.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var camelize = __webpack_require__(/*! ../util/camelizeStyle */ 109),
	    hyphenate = __webpack_require__(/*! ../util/hyphenateStyle */ 111),
	    _getComputedStyle = __webpack_require__(/*! ./getComputedStyle */ 113),
	    removeStyle = __webpack_require__(/*! ./removeStyle */ 114);
	
	var has = Object.prototype.hasOwnProperty;
	
	module.exports = function style(node, property, value) {
	  var css = '',
	      props = property;
	
	  if (typeof property === 'string') {
	
	    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
	  }
	
	  for (var key in props) if (has.call(props, key)) {
	    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
	  }
	
	  node.style.cssText += ';' + css;
	};

/***/ },
/* 109 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/util/camelizeStyle.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	 */
	
	'use strict';
	var camelize = __webpack_require__(/*! ./camelize */ 110);
	var msPattern = /^-ms-/;
	
	module.exports = function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	};

/***/ },
/* 110 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/util/camelize.js ***!
  \***********************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	var rHyphen = /-(.)/g;
	
	module.exports = function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	};

/***/ },
/* 111 */
/*!*****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/util/hyphenateStyle.js ***!
  \*****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	 */
	
	"use strict";
	
	var hyphenate = __webpack_require__(/*! ./hyphenate */ 112);
	var msPattern = /^ms-/;
	
	module.exports = function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	};

/***/ },
/* 112 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/util/hyphenate.js ***!
  \************************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	var rUpper = /([A-Z])/g;
	
	module.exports = function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	};

/***/ },
/* 113 */
/*!********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/style/getComputedStyle.js ***!
  \********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(/*! ../util/babelHelpers.js */ 102);
	
	var _utilCamelizeStyle = __webpack_require__(/*! ../util/camelizeStyle */ 109);
	
	var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);
	
	var rposition = /^(top|right|bottom|left)$/;
	var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
	
	module.exports = function _getComputedStyle(node) {
	  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
	  var doc = node.ownerDocument;
	
	  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	    getPropertyValue: function getPropertyValue(prop) {
	      var style = node.style;
	
	      prop = (0, _utilCamelizeStyle2['default'])(prop);
	
	      if (prop == 'float') prop = 'styleFloat';
	
	      var current = node.currentStyle[prop] || null;
	
	      if (current == null && style && style[prop]) current = style[prop];
	
	      if (rnumnonpx.test(current) && !rposition.test(prop)) {
	        // Remember the original values
	        var left = style.left;
	        var runStyle = node.runtimeStyle;
	        var rsLeft = runStyle && runStyle.left;
	
	        // Put in the new values to get a computed value out
	        if (rsLeft) runStyle.left = node.currentStyle.left;
	
	        style.left = prop === 'fontSize' ? '1em' : current;
	        current = style.pixelLeft + 'px';
	
	        // Revert the changed values
	        style.left = left;
	        if (rsLeft) runStyle.left = rsLeft;
	      }
	
	      return current;
	    }
	  };
	};

/***/ },
/* 114 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/style/removeStyle.js ***!
  \***************************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	};

/***/ },
/* 115 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/query/position.js ***!
  \************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(/*! ../util/babelHelpers.js */ 102);
	
	exports.__esModule = true;
	exports['default'] = position;
	
	var _offset = __webpack_require__(/*! ./offset */ 105);
	
	var _offset2 = babelHelpers.interopRequireDefault(_offset);
	
	var _offsetParent = __webpack_require__(/*! ./offsetParent */ 107);
	
	var _offsetParent2 = babelHelpers.interopRequireDefault(_offsetParent);
	
	var _scrollTop = __webpack_require__(/*! ./scrollTop */ 116);
	
	var _scrollTop2 = babelHelpers.interopRequireDefault(_scrollTop);
	
	var _scrollLeft = __webpack_require__(/*! ./scrollLeft */ 117);
	
	var _scrollLeft2 = babelHelpers.interopRequireDefault(_scrollLeft);
	
	var _style = __webpack_require__(/*! ../style */ 108);
	
	var _style2 = babelHelpers.interopRequireDefault(_style);
	
	function nodeName(node) {
	  return node.nodeName && node.nodeName.toLowerCase();
	}
	
	function position(node, offsetParent) {
	  var parentOffset = { top: 0, left: 0 },
	      offset;
	
	  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
	  // because it is its only offset parent
	  if ((0, _style2['default'])(node, 'position') === 'fixed') {
	    offset = node.getBoundingClientRect();
	  } else {
	    offsetParent = offsetParent || (0, _offsetParent2['default'])(node);
	    offset = (0, _offset2['default'])(node);
	
	    if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset2['default'])(offsetParent);
	
	    parentOffset.top += parseInt((0, _style2['default'])(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop2['default'])(offsetParent) || 0;
	    parentOffset.left += parseInt((0, _style2['default'])(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft2['default'])(offsetParent) || 0;
	  }
	
	  // Subtract parent offsets and node margins
	  return babelHelpers._extends({}, offset, {
	    top: offset.top - parentOffset.top - (parseInt((0, _style2['default'])(node, 'marginTop'), 10) || 0),
	    left: offset.left - parentOffset.left - (parseInt((0, _style2['default'])(node, 'marginLeft'), 10) || 0)
	  });
	}
	
	module.exports = exports['default'];

/***/ },
/* 116 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/query/scrollTop.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(/*! ./isWindow */ 106);
	
	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);
	
	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;
	
	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	};

/***/ },
/* 117 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/query/scrollLeft.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(/*! ./isWindow */ 106);
	
	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);
	
	  if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;
	
	  if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
	};

/***/ },
/* 118 */
/*!**********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/childrenValueInputValidation.js ***!
  \**********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	exports['default'] = valueValidation;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CustomPropTypes = __webpack_require__(/*! ./CustomPropTypes */ 119);
	
	var propList = ['children', 'value'];
	
	function valueValidation(props, propName, componentName) {
	  var error = _CustomPropTypes.singlePropFrom(propList)(props, propName, componentName);
	
	  if (!error) {
	    error = _react2['default'].PropTypes.node(props, propName, componentName);
	  }
	
	  return error;
	}
	
	module.exports = exports['default'];

/***/ },
/* 119 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/CustomPropTypes.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 68)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactLibWarning = __webpack_require__(/*! react/lib/warning */ 96);
	
	var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);
	
	var _childrenToArray = __webpack_require__(/*! ./childrenToArray */ 120);
	
	var _childrenToArray2 = _interopRequireDefault(_childrenToArray);
	
	var ANONYMOUS = '<<anonymous>>';
	
	/**
	 * Create chain-able isRequired validator
	 *
	 * Largely copied directly from:
	 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
	 */
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName) {
	    componentName = componentName || ANONYMOUS;
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
	      }
	    } else {
	      return validate(props, propName, componentName);
	    }
	  }
	
	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	
	  return chainedCheckType;
	}
	
	function errMsg(props, propName, componentName, msgContinuation) {
	  return 'Invalid prop \'' + propName + '\' of value \'' + props[propName] + '\'' + (' supplied to \'' + componentName + '\'' + msgContinuation);
	}
	
	function createMountableChecker() {
	  function validate(props, propName, componentName) {
	    if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
	      return new Error(errMsg(props, propName, componentName, ', expected a DOM element or an object that has a `render` method'));
	    }
	  }
	
	  return createChainableTypeChecker(validate);
	}
	
	function createKeyOfChecker(obj) {
	  function validate(props, propName, componentName) {
	    var propValue = props[propName];
	    if (!obj.hasOwnProperty(propValue)) {
	      var valuesString = JSON.stringify(_Object$keys(obj));
	      return new Error(errMsg(props, propName, componentName, ', expected one of ' + valuesString + '.'));
	    }
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createSinglePropFromChecker(arrOfProps) {
	  function validate(props, propName) {
	    var usedPropCount = arrOfProps.map(function (listedProp) {
	      return props[listedProp];
	    }).reduce(function (acc, curr) {
	      return acc + (curr !== undefined ? 1 : 0);
	    }, 0);
	
	    if (usedPropCount > 1) {
	      var first = arrOfProps[0];
	      var others = arrOfProps.slice(1);
	
	      var message = others.join(', ') + ' and ' + first;
	      return new Error('Invalid prop \'' + propName + '\', only one of the following ' + ('may be provided: ' + message));
	    }
	  }
	  return validate;
	}
	
	function all(propTypes) {
	  if (propTypes === undefined) {
	    throw new Error('No validations provided');
	  }
	
	  if (!(propTypes instanceof Array)) {
	    throw new Error('Invalid argument must be an array');
	  }
	
	  if (propTypes.length === 0) {
	    throw new Error('No validations provided');
	  }
	
	  return function (props, propName, componentName) {
	    for (var i = 0; i < propTypes.length; i++) {
	      var result = propTypes[i](props, propName, componentName);
	
	      if (result !== undefined && result !== null) {
	        return result;
	      }
	    }
	  };
	}
	
	function createElementTypeChecker() {
	  function validate(props, propName, componentName) {
	    var errBeginning = errMsg(props, propName, componentName, '. Expected an Element `type`');
	
	    if (typeof props[propName] !== 'function') {
	      if (_react2['default'].isValidElement(props[propName])) {
	        return new Error(errBeginning + ', not an actual Element');
	      }
	
	      if (typeof props[propName] !== 'string') {
	        return new Error(errBeginning + ' such as a tag name or return value of React.createClass(...)');
	      }
	    }
	  }
	
	  return createChainableTypeChecker(validate);
	}
	
	exports['default'] = {
	
	  deprecated: function deprecated(propType, explanation) {
	    return function (props, propName, componentName) {
	      if (props[propName] != null) {
	        _reactLibWarning2['default'](false, '"' + propName + '" property of "' + componentName + '" has been deprecated.\n' + explanation);
	      }
	
	      return propType(props, propName, componentName);
	    };
	  },
	
	  isRequiredForA11y: function isRequiredForA11y(propType) {
	    return function (props, propName, componentName) {
	      if (props[propName] == null) {
	        return new Error('The prop `' + propName + '` is required to make ' + componentName + ' accessible ' + 'for users using assistive technologies such as screen readers `');
	      }
	
	      return propType(props, propName, componentName);
	    };
	  },
	
	  requiredRoles: function requiredRoles() {
	    for (var _len = arguments.length, roles = Array(_len), _key = 0; _key < _len; _key++) {
	      roles[_key] = arguments[_key];
	    }
	
	    return createChainableTypeChecker(function requiredRolesValidator(props, propName, component) {
	      var missing = undefined;
	      var children = _childrenToArray2['default'](props.children);
	
	      var inRole = function inRole(role, child) {
	        return role === child.props.bsRole;
	      };
	
	      roles.every(function (role) {
	        if (!children.some(function (child) {
	          return inRole(role, child);
	        })) {
	          missing = role;
	          return false;
	        }
	        return true;
	      });
	
	      if (missing) {
	        return new Error('(children) ' + component + ' - Missing a required child with bsRole: ' + missing + '. ' + (component + ' must have at least one child of each of the following bsRoles: ' + roles.join(', ')));
	      }
	    });
	  },
	
	  exclusiveRoles: function exclusiveRoles() {
	    for (var _len2 = arguments.length, roles = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      roles[_key2] = arguments[_key2];
	    }
	
	    return createChainableTypeChecker(function exclusiveRolesValidator(props, propName, component) {
	      var children = _childrenToArray2['default'](props.children);
	      var duplicate = undefined;
	
	      roles.every(function (role) {
	        var childrenWithRole = children.filter(function (child) {
	          return child.props.bsRole === role;
	        });
	
	        if (childrenWithRole.length > 1) {
	          duplicate = role;
	          return false;
	        }
	        return true;
	      });
	
	      if (duplicate) {
	        return new Error('(children) ' + component + ' - Duplicate children detected of bsRole: ' + duplicate + '. ' + ('Only one child each allowed with the following bsRoles: ' + roles.join(', ')));
	      }
	    });
	  },
	
	  /**
	   * Checks whether a prop provides a DOM element
	   *
	   * The element can be provided in two forms:
	   * - Directly passed
	   * - Or passed an object that has a `render` method
	   *
	   * @param props
	   * @param propName
	   * @param componentName
	   * @returns {Error|undefined}
	   */
	  mountable: createMountableChecker(),
	
	  /**
	   * Checks whether a prop provides a type of element.
	   *
	   * The type of element can be provided in two forms:
	   * - tag name (string)
	   * - a return value of React.createClass(...)
	   *
	   * @param props
	   * @param propName
	   * @param componentName
	   * @returns {Error|undefined}
	   */
	  elementType: createElementTypeChecker(),
	
	  /**
	   * Checks whether a prop matches a key of an associated object
	   *
	   * @param props
	   * @param propName
	   * @param componentName
	   * @returns {Error|undefined}
	   */
	  keyOf: createKeyOfChecker,
	  /**
	   * Checks if only one of the listed properties is in use. An error is given
	   * if multiple have a value
	   *
	   * @param props
	   * @param propName
	   * @param componentName
	   * @returns {Error|undefined}
	   */
	  singlePropFrom: createSinglePropFromChecker,
	
	  all: all
	};
	module.exports = exports['default'];

/***/ },
/* 120 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/childrenToArray.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	exports['default'] = childrenAsArray;
	
	var _ValidComponentChildren = __webpack_require__(/*! ./ValidComponentChildren */ 121);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function childrenAsArray(children) {
	  var result = [];
	
	  if (children === undefined) {
	    return result;
	  }
	
	  _ValidComponentChildren2['default'].forEach(children, function (child) {
	    result.push(child);
	  });
	
	  return result;
	}
	
	module.exports = exports['default'];

/***/ },
/* 121 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/ValidComponentChildren.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	/**
	 * Maps children that are typically specified as `props.children`,
	 * but only iterates over children that are "valid components".
	 *
	 * The mapFunction provided index will be normalised to the components mapped,
	 * so an invalid component would not increase the index.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} mapFunction.
	 * @param {*} mapContext Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapValidComponents(children, func, context) {
	  var index = 0;
	
	  return _react2['default'].Children.map(children, function (child) {
	    if (_react2['default'].isValidElement(child)) {
	      var lastIndex = index;
	      index++;
	      return func.call(context, child, lastIndex);
	    }
	
	    return child;
	  });
	}
	
	/**
	 * Iterates through children that are typically specified as `props.children`,
	 * but only iterates over children that are "valid components".
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child with the index reflecting the position relative to "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc.
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachValidComponents(children, func, context) {
	  var index = 0;
	
	  return _react2['default'].Children.forEach(children, function (child) {
	    if (_react2['default'].isValidElement(child)) {
	      func.call(context, child, index);
	      index++;
	    }
	  });
	}
	
	/**
	 * Count the number of "valid components" in the Children container.
	 *
	 * @param {?*} children Children tree container.
	 * @returns {number}
	 */
	function numberOfValidComponents(children) {
	  var count = 0;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (_react2['default'].isValidElement(child)) {
	      count++;
	    }
	  });
	
	  return count;
	}
	
	/**
	 * Determine if the Child container has one or more "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @returns {boolean}
	 */
	function hasValidComponent(children) {
	  var hasValid = false;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (!hasValid && _react2['default'].isValidElement(child)) {
	      hasValid = true;
	    }
	  });
	
	  return hasValid;
	}
	
	function find(children, finder) {
	  var child = undefined;
	
	  forEachValidComponents(children, function (c, idx) {
	    if (!child && finder(c, idx, children)) {
	      child = c;
	    }
	  });
	
	  return child;
	}
	
	exports['default'] = {
	  map: mapValidComponents,
	  forEach: forEachValidComponents,
	  numberOf: numberOfValidComponents,
	  find: find,
	  hasValidComponent: hasValidComponent
	};
	module.exports = exports['default'];

/***/ },
/* 122 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/createChainedFunction.js ***!
  \***************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} functions to chain
	 * @returns {function|null}
	 */
	'use strict';
	
	exports.__esModule = true;
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return funcs.filter(function (f) {
	    return f != null;
	  }).reduce(function (acc, f) {
	    if (typeof f !== 'function') {
	      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
	    }
	
	    if (acc === null) {
	      return f;
	    }
	
	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      acc.apply(this, args);
	      f.apply(this, args);
	    };
	  }, null);
	}
	
	exports['default'] = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 123 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Accordion.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PanelGroup = __webpack_require__(/*! ./PanelGroup */ 132);
	
	var _PanelGroup2 = _interopRequireDefault(_PanelGroup);
	
	var Accordion = _react2['default'].createClass({
	  displayName: 'Accordion',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      _PanelGroup2['default'],
	      _extends({}, this.props, { accordion: true }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Accordion;
	module.exports = exports['default'];

/***/ },
/* 124 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/helpers/extends.js ***!
  \***************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 125)["default"];
	
	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	
	  return target;
	};
	
	exports.__esModule = true;

/***/ },
/* 125 */
/*!*********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/core-js/object/assign.js ***!
  \*********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ 126), __esModule: true };

/***/ },
/* 126 */
/*!**********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/fn/object/assign.js ***!
  \**********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.assign */ 127);
	module.exports = __webpack_require__(/*! ../../modules/$.core */ 76).Object.assign;

/***/ },
/* 127 */
/*!*******************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(/*! ./$.def */ 74);
	
	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(/*! ./$.assign */ 128)});

/***/ },
/* 128 */
/*!**********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.assign.js ***!
  \**********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var toObject = __webpack_require__(/*! ./$.to-object */ 71)
	  , IObject  = __webpack_require__(/*! ./$.iobject */ 129)
	  , enumKeys = __webpack_require__(/*! ./$.enum-keys */ 131);
	
	module.exports = __webpack_require__(/*! ./$.fails */ 77)(function(){
	  return Symbol() in Object.assign({}); // Object.assign available and Symbol is native
	}) ? function assign(target, source){   // eslint-disable-line no-unused-vars
	  var T = toObject(target)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = IObject(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 129 */
/*!***********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.iobject.js ***!
  \***********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(/*! ./$.cof */ 130);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 130 */
/*!*******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.cof.js ***!
  \*******************************************************************************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 131 */
/*!*************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/$.enum-keys.js ***!
  \*************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(/*! ./$ */ 80);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 132 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/PanelGroup.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* eslint react/prop-types: [2, {ignore: "bsStyle"}] */
	/* BootstrapMixin contains `bsStyle` type validation */
	
	'use strict';
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var PanelGroup = _react2['default'].createClass({
	  displayName: 'PanelGroup',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    accordion: _react2['default'].PropTypes.bool,
	    activeKey: _react2['default'].PropTypes.any,
	    className: _react2['default'].PropTypes.string,
	    children: _react2['default'].PropTypes.node,
	    defaultActiveKey: _react2['default'].PropTypes.any,
	    onSelect: _react2['default'].PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      accordion: false,
	      bsClass: 'panel-group'
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var defaultActiveKey = this.props.defaultActiveKey;
	
	    return {
	      activeKey: defaultActiveKey
	    };
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	    var _props = this.props;
	    var className = _props.className;
	
	    var props = _objectWithoutProperties(_props, ['className']);
	
	    if (this.props.accordion) {
	      props.role = 'tablist';
	    }
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, props, { className: _classnames2['default'](className, classes), onSelect: null }),
	      _utilsValidComponentChildren2['default'].map(props.children, this.renderPanel)
	    );
	  },
	
	  renderPanel: function renderPanel(child, index) {
	    var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
	
	    var props = {
	      bsStyle: child.props.bsStyle || this.props.bsStyle,
	      key: child.key ? child.key : index,
	      ref: child.ref
	    };
	
	    if (this.props.accordion) {
	      props.headerRole = 'tab';
	      props.panelRole = 'tabpanel';
	      props.collapsible = true;
	      props.expanded = child.props.eventKey === activeKey;
	      props.onSelect = this.handleSelect;
	    }
	
	    return _react.cloneElement(child, props);
	  },
	
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    // Defer any updates to this component during the `onSelect` handler.
	    return !this._isChanging;
	  },
	
	  handleSelect: function handleSelect(e, key) {
	    e.preventDefault();
	
	    if (this.props.onSelect) {
	      this._isChanging = true;
	      this.props.onSelect(key);
	      this._isChanging = false;
	    }
	
	    if (this.state.activeKey === key) {
	      key = null;
	    }
	
	    this.setState({
	      activeKey: key
	    });
	  }
	});
	
	exports['default'] = PanelGroup;
	module.exports = exports['default'];

/***/ },
/* 133 */
/*!*********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/helpers/object-without-properties.js ***!
  \*********************************************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj, keys) {
	  var target = {};
	
	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }
	
	  return target;
	};
	
	exports.__esModule = true;

/***/ },
/* 134 */
/*!********************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/classnames/index.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	(function () {
		'use strict';
	
		function classNames () {
	
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;
	
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
	
				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	
	}());


/***/ },
/* 135 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/BootstrapMixin.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _styleMaps = __webpack_require__(/*! ./styleMaps */ 136);
	
	var _styleMaps2 = _interopRequireDefault(_styleMaps);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var BootstrapMixin = {
	  propTypes: {
	    /**
	     * bootstrap className
	     * @private
	     */
	    bsClass: _utilsCustomPropTypes2['default'].keyOf(_styleMaps2['default'].CLASSES),
	    /**
	     * Style variants
	     * @type {("default"|"primary"|"success"|"info"|"warning"|"danger"|"link")}
	     */
	    bsStyle: _react2['default'].PropTypes.oneOf(_styleMaps2['default'].STYLES),
	    /**
	     * Size variants
	     * @type {("xsmall"|"small"|"medium"|"large"|"xs"|"sm"|"md"|"lg")}
	     */
	    bsSize: _utilsCustomPropTypes2['default'].keyOf(_styleMaps2['default'].SIZES)
	  },
	
	  getBsClassSet: function getBsClassSet() {
	    var classes = {};
	
	    var bsClass = this.props.bsClass && _styleMaps2['default'].CLASSES[this.props.bsClass];
	    if (bsClass) {
	      classes[bsClass] = true;
	
	      var prefix = bsClass + '-';
	
	      var bsSize = this.props.bsSize && _styleMaps2['default'].SIZES[this.props.bsSize];
	      if (bsSize) {
	        classes[prefix + bsSize] = true;
	      }
	
	      if (this.props.bsStyle) {
	        if (_styleMaps2['default'].STYLES.indexOf(this.props.bsStyle) >= 0) {
	          classes[prefix + this.props.bsStyle] = true;
	        } else {
	          classes[this.props.bsStyle] = true;
	        }
	      }
	    }
	
	    return classes;
	  },
	
	  prefixClass: function prefixClass(subClass) {
	    return _styleMaps2['default'].CLASSES[this.props.bsClass] + '-' + subClass;
	  }
	};
	
	exports['default'] = BootstrapMixin;
	module.exports = exports['default'];

/***/ },
/* 136 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/styleMaps.js ***!
  \*********************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var styleMaps = {
	  CLASSES: {
	    'alert': 'alert',
	    'button': 'btn',
	    'button-group': 'btn-group',
	    'button-toolbar': 'btn-toolbar',
	    'column': 'col',
	    'input-group': 'input-group',
	    'form': 'form',
	    'glyphicon': 'glyphicon',
	    'label': 'label',
	    'thumbnail': 'thumbnail',
	    'list-group-item': 'list-group-item',
	    'panel': 'panel',
	    'panel-group': 'panel-group',
	    'pagination': 'pagination',
	    'progress-bar': 'progress-bar',
	    'nav': 'nav',
	    'navbar': 'navbar',
	    'modal': 'modal',
	    'row': 'row',
	    'well': 'well'
	  },
	  STYLES: ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link', 'inline', 'tabs', 'pills'],
	  addStyle: function addStyle(name) {
	    styleMaps.STYLES.push(name);
	  },
	  SIZES: {
	    'large': 'lg',
	    'medium': 'md',
	    'small': 'sm',
	    'xsmall': 'xs',
	    'lg': 'lg',
	    'md': 'md',
	    'sm': 'sm',
	    'xs': 'xs'
	  },
	  GRID_COLUMNS: 12
	};
	
	exports['default'] = styleMaps;
	module.exports = exports['default'];

/***/ },
/* 137 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Affix.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _AffixMixin = __webpack_require__(/*! ./AffixMixin */ 138);
	
	var _AffixMixin2 = _interopRequireDefault(_AffixMixin);
	
	var Affix = _react2['default'].createClass({
	  displayName: 'Affix',
	
	  mixins: [_AffixMixin2['default']],
	
	  render: function render() {
	    var holderStyle = _extends({
	      top: this.state.affixPositionTop
	    }, this.props.style);
	
	    // eslint-disable-line react/prop-types
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, this.state.affixClass),
	        style: holderStyle }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Affix;
	module.exports = exports['default'];
	// we don't want to expose the `style` property

/***/ },
/* 138 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/AffixMixin.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDomUtils = __webpack_require__(/*! ./utils/domUtils */ 98);
	
	var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);
	
	var _utilsEventListener = __webpack_require__(/*! ./utils/EventListener */ 139);
	
	var _utilsEventListener2 = _interopRequireDefault(_utilsEventListener);
	
	var AffixMixin = {
	  propTypes: {
	    offset: _react2['default'].PropTypes.number,
	    offsetTop: _react2['default'].PropTypes.number,
	    offsetBottom: _react2['default'].PropTypes.number
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      affixClass: 'affix-top'
	    };
	  },
	
	  getPinnedOffset: function getPinnedOffset(DOMNode) {
	    if (this.pinnedOffset) {
	      return this.pinnedOffset;
	    }
	
	    DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, '');
	    DOMNode.className += DOMNode.className.length ? ' affix' : 'affix';
	
	    this.pinnedOffset = _utilsDomUtils2['default'].getOffset(DOMNode).top - window.pageYOffset;
	
	    return this.pinnedOffset;
	  },
	
	  checkPosition: function checkPosition() {
	    var DOMNode = undefined,
	        scrollHeight = undefined,
	        scrollTop = undefined,
	        position = undefined,
	        offsetTop = undefined,
	        offsetBottom = undefined,
	        affix = undefined,
	        affixType = undefined,
	        affixPositionTop = undefined;
	
	    // TODO: or not visible
	    if (!this.isMounted()) {
	      return;
	    }
	
	    DOMNode = _react2['default'].findDOMNode(this);
	    scrollHeight = _utilsDomUtils2['default'].getDocumentHeight();
	    scrollTop = window.pageYOffset;
	    position = _utilsDomUtils2['default'].getOffset(DOMNode);
	
	    if (this.affixed === 'top') {
	      position.top += scrollTop;
	    }
	
	    offsetTop = this.props.offsetTop != null ? this.props.offsetTop : this.props.offset;
	    offsetBottom = this.props.offsetBottom != null ? this.props.offsetBottom : this.props.offset;
	
	    if (offsetTop == null && offsetBottom == null) {
	      return;
	    }
	    if (offsetTop == null) {
	      offsetTop = 0;
	    }
	    if (offsetBottom == null) {
	      offsetBottom = 0;
	    }
	
	    if (this.unpin != null && scrollTop + this.unpin <= position.top) {
	      affix = false;
	    } else if (offsetBottom != null && position.top + DOMNode.offsetHeight >= scrollHeight - offsetBottom) {
	      affix = 'bottom';
	    } else if (offsetTop != null && scrollTop <= offsetTop) {
	      affix = 'top';
	    } else {
	      affix = false;
	    }
	
	    if (this.affixed === affix) {
	      return;
	    }
	
	    if (this.unpin != null) {
	      DOMNode.style.top = '';
	    }
	
	    affixType = 'affix' + (affix ? '-' + affix : '');
	
	    this.affixed = affix;
	    this.unpin = affix === 'bottom' ? this.getPinnedOffset(DOMNode) : null;
	
	    if (affix === 'bottom') {
	      DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, 'affix-bottom');
	      affixPositionTop = scrollHeight - offsetBottom - DOMNode.offsetHeight - _utilsDomUtils2['default'].getOffset(DOMNode).top;
	    }
	
	    this.setState({
	      affixClass: affixType,
	      affixPositionTop: affixPositionTop
	    });
	  },
	
	  checkPositionWithEventLoop: function checkPositionWithEventLoop() {
	    setTimeout(this.checkPosition, 0);
	  },
	
	  componentDidMount: function componentDidMount() {
	    this._onWindowScrollListener = _utilsEventListener2['default'].listen(window, 'scroll', this.checkPosition);
	    this._onDocumentClickListener = _utilsEventListener2['default'].listen(_utilsDomUtils2['default'].ownerDocument(this), 'click', this.checkPositionWithEventLoop);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._onWindowScrollListener) {
	      this._onWindowScrollListener.remove();
	    }
	
	    if (this._onDocumentClickListener) {
	      this._onDocumentClickListener.remove();
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    if (prevState.affixClass === this.state.affixClass) {
	      this.checkPositionWithEventLoop();
	    }
	  }
	};
	
	exports['default'] = AffixMixin;
	module.exports = exports['default'];

/***/ },
/* 139 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/EventListener.js ***!
  \*******************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * This file contains a modified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/EventListener.js
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * TODO: remove in favour of solution provided by:
	 *  https://github.com/facebook/react/issues/285
	 */
	
	/**
	 * Does not take into account specific nature of platform.
	 */
	'use strict';
	
	exports.__esModule = true;
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  }
	};
	
	exports['default'] = EventListener;
	module.exports = exports['default'];

/***/ },
/* 140 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Alert.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var Alert = _react2['default'].createClass({
	  displayName: 'Alert',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    onDismiss: _react2['default'].PropTypes.func,
	    dismissAfter: _react2['default'].PropTypes.number,
	    closeLabel: _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'alert',
	      bsStyle: 'info',
	      closeLabel: 'Close Alert'
	    };
	  },
	
	  renderDismissButton: function renderDismissButton() {
	    return _react2['default'].createElement(
	      'button',
	      {
	        type: 'button',
	        className: 'close',
	        onClick: this.props.onDismiss,
	        'aria-hidden': 'true' },
	      _react2['default'].createElement(
	        'span',
	        null,
	        '×'
	      )
	    );
	  },
	
	  renderSrOnlyDismissButton: function renderSrOnlyDismissButton() {
	    return _react2['default'].createElement(
	      'button',
	      {
	        type: 'button',
	        className: 'close sr-only',
	        onClick: this.props.onDismiss },
	      this.props.closeLabel
	    );
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	    var isDismissable = !!this.props.onDismiss;
	
	    classes['alert-dismissable'] = isDismissable;
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, { role: 'alert', className: _classnames2['default'](this.props.className, classes) }),
	      isDismissable ? this.renderDismissButton() : null,
	      this.props.children,
	      isDismissable ? this.renderSrOnlyDismissButton() : null
	    );
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.dismissAfter && this.props.onDismiss) {
	      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this.dismissTimer);
	  }
	});
	
	exports['default'] = Alert;
	module.exports = exports['default'];

/***/ },
/* 141 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Badge.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Badge = _react2['default'].createClass({
	  displayName: 'Badge',
	
	  propTypes: {
	    pullRight: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      pullRight: false
	    };
	  },
	
	  hasContent: function hasContent() {
	    return _utilsValidComponentChildren2['default'].hasValidComponent(this.props.children) || _react2['default'].Children.count(this.props.children) > 1 || typeof this.props.children === 'string' || typeof this.props.children === 'number';
	  },
	
	  render: function render() {
	    var classes = {
	      'pull-right': this.props.pullRight,
	      'badge': this.hasContent()
	    };
	    return _react2['default'].createElement(
	      'span',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Badge;
	module.exports = exports['default'];

/***/ },
/* 142 */
/*!******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Button.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _ButtonInput = __webpack_require__(/*! ./ButtonInput */ 143);
	
	var _ButtonInput2 = _interopRequireDefault(_ButtonInput);
	
	var Button = _react2['default'].createClass({
	  displayName: 'Button',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    active: _react2['default'].PropTypes.bool,
	    disabled: _react2['default'].PropTypes.bool,
	    block: _react2['default'].PropTypes.bool,
	    navItem: _react2['default'].PropTypes.bool,
	    navDropdown: _react2['default'].PropTypes.bool,
	    /**
	     * You can use a custom element for this component
	     */
	    componentClass: _utilsCustomPropTypes2['default'].elementType,
	    href: _react2['default'].PropTypes.string,
	    target: _react2['default'].PropTypes.string,
	    /**
	     * Defines HTML button type Attribute
	     * @type {("button"|"reset"|"submit")}
	     * @defaultValue 'button'
	     */
	    type: _react2['default'].PropTypes.oneOf(_ButtonInput2['default'].types)
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: false,
	      block: false,
	      bsClass: 'button',
	      bsStyle: 'default',
	      disabled: false,
	      navItem: false,
	      navDropdown: false
	    };
	  },
	
	  render: function render() {
	    var classes = this.props.navDropdown ? {} : this.getBsClassSet();
	    var renderFuncName = undefined;
	
	    classes = _extends({
	      active: this.props.active,
	      'btn-block': this.props.block
	    }, classes);
	
	    if (this.props.navItem) {
	      return this.renderNavItem(classes);
	    }
	
	    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ? 'renderAnchor' : 'renderButton';
	
	    return this[renderFuncName](classes);
	  },
	
	  renderAnchor: function renderAnchor(classes) {
	    var Component = this.props.componentClass || 'a';
	    var href = this.props.href || '#';
	    classes.disabled = this.props.disabled;
	
	    return _react2['default'].createElement(
	      Component,
	      _extends({}, this.props, {
	        href: href,
	        className: _classnames2['default'](this.props.className, classes),
	        role: 'button' }),
	      this.props.children
	    );
	  },
	
	  renderButton: function renderButton(classes) {
	    var Component = this.props.componentClass || 'button';
	
	    return _react2['default'].createElement(
	      Component,
	      _extends({}, this.props, {
	        type: this.props.type || 'button',
	        className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  },
	
	  renderNavItem: function renderNavItem(classes) {
	    var liClasses = {
	      active: this.props.active
	    };
	
	    return _react2['default'].createElement(
	      'li',
	      { className: _classnames2['default'](liClasses) },
	      this.renderAnchor(classes)
	    );
	  }
	});
	
	exports['default'] = Button;
	module.exports = exports['default'];

/***/ },
/* 143 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ButtonInput.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(/*! ./Button */ 142);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _FormGroup = __webpack_require__(/*! ./FormGroup */ 144);
	
	var _FormGroup2 = _interopRequireDefault(_FormGroup);
	
	var _InputBase2 = __webpack_require__(/*! ./InputBase */ 145);
	
	var _InputBase3 = _interopRequireDefault(_InputBase2);
	
	var _utilsChildrenValueInputValidation = __webpack_require__(/*! ./utils/childrenValueInputValidation */ 118);
	
	var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);
	
	var ButtonInput = (function (_InputBase) {
	  _inherits(ButtonInput, _InputBase);
	
	  function ButtonInput() {
	    _classCallCheck(this, ButtonInput);
	
	    _InputBase.apply(this, arguments);
	  }
	
	  ButtonInput.prototype.renderFormGroup = function renderFormGroup(children) {
	    var _props = this.props;
	    var bsStyle = _props.bsStyle;
	    var value = _props.value;
	
	    var other = _objectWithoutProperties(_props, ['bsStyle', 'value']);
	
	    return _react2['default'].createElement(
	      _FormGroup2['default'],
	      other,
	      children
	    );
	  };
	
	  ButtonInput.prototype.renderInput = function renderInput() {
	    var _props2 = this.props;
	    var children = _props2.children;
	    var value = _props2.value;
	
	    var other = _objectWithoutProperties(_props2, ['children', 'value']);
	
	    var val = children ? children : value;
	    return _react2['default'].createElement(_Button2['default'], _extends({}, other, { componentClass: 'input', ref: 'input', key: 'input', value: val }));
	  };
	
	  return ButtonInput;
	})(_InputBase3['default']);
	
	ButtonInput.types = ['button', 'reset', 'submit'];
	
	ButtonInput.defaultProps = {
	  type: 'button'
	};
	
	ButtonInput.propTypes = {
	  type: _react2['default'].PropTypes.oneOf(ButtonInput.types),
	  bsStyle: function bsStyle() {
	    // defer to Button propTypes of bsStyle
	    return null;
	  },
	  children: _utilsChildrenValueInputValidation2['default'],
	  value: _utilsChildrenValueInputValidation2['default']
	};
	
	exports['default'] = ButtonInput;
	module.exports = exports['default'];

/***/ },
/* 144 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/FormGroup.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var FormGroup = (function (_React$Component) {
	  _inherits(FormGroup, _React$Component);
	
	  function FormGroup() {
	    _classCallCheck(this, FormGroup);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  FormGroup.prototype.render = function render() {
	    var classes = {
	      'form-group': !this.props.standalone,
	      'form-group-lg': !this.props.standalone && this.props.bsSize === 'large',
	      'form-group-sm': !this.props.standalone && this.props.bsSize === 'small',
	      'has-feedback': this.props.hasFeedback,
	      'has-success': this.props.bsStyle === 'success',
	      'has-warning': this.props.bsStyle === 'warning',
	      'has-error': this.props.bsStyle === 'error'
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      { className: _classnames2['default'](classes, this.props.groupClassName) },
	      this.props.children
	    );
	  };
	
	  return FormGroup;
	})(_react2['default'].Component);
	
	FormGroup.defaultProps = {
	  hasFeedback: false,
	  standalone: false
	};
	
	FormGroup.propTypes = {
	  standalone: _react2['default'].PropTypes.bool,
	  hasFeedback: _react2['default'].PropTypes.bool,
	  bsSize: function bsSize(props) {
	    if (props.standalone && props.bsSize !== undefined) {
	      return new Error('bsSize will not be used when `standalone` is set.');
	    }
	
	    return _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']).apply(null, arguments);
	  },
	  bsStyle: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
	  groupClassName: _react2['default'].PropTypes.string
	};
	
	exports['default'] = FormGroup;
	module.exports = exports['default'];

/***/ },
/* 145 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/InputBase.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _FormGroup = __webpack_require__(/*! ./FormGroup */ 144);
	
	var _FormGroup2 = _interopRequireDefault(_FormGroup);
	
	var _Glyphicon = __webpack_require__(/*! ./Glyphicon */ 146);
	
	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);
	
	var InputBase = (function (_React$Component) {
	  _inherits(InputBase, _React$Component);
	
	  function InputBase() {
	    _classCallCheck(this, InputBase);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  InputBase.prototype.getInputDOMNode = function getInputDOMNode() {
	    return _react2['default'].findDOMNode(this.refs.input);
	  };
	
	  InputBase.prototype.getValue = function getValue() {
	    if (this.props.type === 'static') {
	      return this.props.value;
	    } else if (this.props.type) {
	      if (this.props.type === 'select' && this.props.multiple) {
	        return this.getSelectedOptions();
	      } else {
	        return this.getInputDOMNode().value;
	      }
	    } else {
	      throw new Error('Cannot use getValue without specifying input type.');
	    }
	  };
	
	  InputBase.prototype.getChecked = function getChecked() {
	    return this.getInputDOMNode().checked;
	  };
	
	  InputBase.prototype.getSelectedOptions = function getSelectedOptions() {
	    var values = [];
	
	    Array.prototype.forEach.call(this.getInputDOMNode().getElementsByTagName('option'), function (option) {
	      if (option.selected) {
	        var value = option.getAttribute('value') || option.innerHtml;
	        values.push(value);
	      }
	    });
	
	    return values;
	  };
	
	  InputBase.prototype.isCheckboxOrRadio = function isCheckboxOrRadio() {
	    return this.props.type === 'checkbox' || this.props.type === 'radio';
	  };
	
	  InputBase.prototype.isFile = function isFile() {
	    return this.props.type === 'file';
	  };
	
	  InputBase.prototype.renderInputGroup = function renderInputGroup(children) {
	    var addonBefore = this.props.addonBefore ? _react2['default'].createElement(
	      'span',
	      { className: 'input-group-addon', key: 'addonBefore' },
	      this.props.addonBefore
	    ) : null;
	
	    var addonAfter = this.props.addonAfter ? _react2['default'].createElement(
	      'span',
	      { className: 'input-group-addon', key: 'addonAfter' },
	      this.props.addonAfter
	    ) : null;
	
	    var buttonBefore = this.props.buttonBefore ? _react2['default'].createElement(
	      'span',
	      { className: 'input-group-btn' },
	      this.props.buttonBefore
	    ) : null;
	
	    var buttonAfter = this.props.buttonAfter ? _react2['default'].createElement(
	      'span',
	      { className: 'input-group-btn' },
	      this.props.buttonAfter
	    ) : null;
	
	    var inputGroupClassName = undefined;
	    switch (this.props.bsSize) {
	      case 'small':
	        inputGroupClassName = 'input-group-sm';break;
	      case 'large':
	        inputGroupClassName = 'input-group-lg';break;
	      default:
	    }
	
	    return addonBefore || addonAfter || buttonBefore || buttonAfter ? _react2['default'].createElement(
	      'div',
	      { className: _classnames2['default'](inputGroupClassName, 'input-group'), key: 'input-group' },
	      addonBefore,
	      buttonBefore,
	      children,
	      addonAfter,
	      buttonAfter
	    ) : children;
	  };
	
	  InputBase.prototype.renderIcon = function renderIcon() {
	    if (this.props.hasFeedback) {
	      if (this.props.feedbackIcon) {
	        return _react2['default'].cloneElement(this.props.feedbackIcon, { formControlFeedback: true });
	      }
	
	      switch (this.props.bsStyle) {
	        case 'success':
	          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'ok', key: 'icon' });
	        case 'warning':
	          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'warning-sign', key: 'icon' });
	        case 'error':
	          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'remove', key: 'icon' });
	        default:
	          return _react2['default'].createElement('span', { className: 'form-control-feedback', key: 'icon' });
	      }
	    } else {
	      return null;
	    }
	  };
	
	  InputBase.prototype.renderHelp = function renderHelp() {
	    return this.props.help ? _react2['default'].createElement(
	      'span',
	      { className: 'help-block', key: 'help' },
	      this.props.help
	    ) : null;
	  };
	
	  InputBase.prototype.renderCheckboxAndRadioWrapper = function renderCheckboxAndRadioWrapper(children) {
	    var classes = {
	      'checkbox': this.props.type === 'checkbox',
	      'radio': this.props.type === 'radio'
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      { className: _classnames2['default'](classes), key: 'checkboxRadioWrapper' },
	      children
	    );
	  };
	
	  InputBase.prototype.renderWrapper = function renderWrapper(children) {
	    return this.props.wrapperClassName ? _react2['default'].createElement(
	      'div',
	      { className: this.props.wrapperClassName, key: 'wrapper' },
	      children
	    ) : children;
	  };
	
	  InputBase.prototype.renderLabel = function renderLabel(children) {
	    var classes = {
	      'control-label': !this.isCheckboxOrRadio()
	    };
	    classes[this.props.labelClassName] = this.props.labelClassName;
	
	    return this.props.label ? _react2['default'].createElement(
	      'label',
	      { htmlFor: this.props.id, className: _classnames2['default'](classes), key: 'label' },
	      children,
	      this.props.label
	    ) : children;
	  };
	
	  InputBase.prototype.renderInput = function renderInput() {
	    if (!this.props.type) {
	      return this.props.children;
	    }
	
	    switch (this.props.type) {
	      case 'select':
	        return _react2['default'].createElement(
	          'select',
	          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: 'input', key: 'input' }),
	          this.props.children
	        );
	      case 'textarea':
	        return _react2['default'].createElement('textarea', _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: 'input', key: 'input' }));
	      case 'static':
	        return _react2['default'].createElement(
	          'p',
	          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control-static'), ref: 'input', key: 'input' }),
	          this.props.value
	        );
	      default:
	        var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
	        return _react2['default'].createElement('input', _extends({}, this.props, { className: _classnames2['default'](this.props.className, className), ref: 'input', key: 'input' }));
	    }
	  };
	
	  InputBase.prototype.renderFormGroup = function renderFormGroup(children) {
	    return _react2['default'].createElement(
	      _FormGroup2['default'],
	      this.props,
	      children
	    );
	  };
	
	  InputBase.prototype.renderChildren = function renderChildren() {
	    return !this.isCheckboxOrRadio() ? [this.renderLabel(), this.renderWrapper([this.renderInputGroup(this.renderInput()), this.renderIcon(), this.renderHelp()])] : this.renderWrapper([this.renderCheckboxAndRadioWrapper(this.renderLabel(this.renderInput())), this.renderHelp()]);
	  };
	
	  InputBase.prototype.render = function render() {
	    var children = this.renderChildren();
	    return this.renderFormGroup(children);
	  };
	
	  return InputBase;
	})(_react2['default'].Component);
	
	InputBase.propTypes = {
	  type: _react2['default'].PropTypes.string,
	  label: _react2['default'].PropTypes.node,
	  help: _react2['default'].PropTypes.node,
	  addonBefore: _react2['default'].PropTypes.node,
	  addonAfter: _react2['default'].PropTypes.node,
	  buttonBefore: _react2['default'].PropTypes.node,
	  buttonAfter: _react2['default'].PropTypes.node,
	  bsSize: _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']),
	  bsStyle: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
	  hasFeedback: _react2['default'].PropTypes.bool,
	  feedbackIcon: _react2['default'].PropTypes.node,
	  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	  groupClassName: _react2['default'].PropTypes.string,
	  wrapperClassName: _react2['default'].PropTypes.string,
	  labelClassName: _react2['default'].PropTypes.string,
	  multiple: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool,
	  value: _react2['default'].PropTypes.any
	};
	
	InputBase.defaultProps = {
	  disabled: false,
	  hasFeedback: false,
	  multiple: false
	};
	
	exports['default'] = InputBase;
	module.exports = exports['default'];

/***/ },
/* 146 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Glyphicon.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Glyphicon = _react2['default'].createClass({
	  displayName: 'Glyphicon',
	
	  propTypes: {
	    /**
	     * bootstrap className
	     * @private
	     */
	    bsClass: _react2['default'].PropTypes.string,
	    /**
	     * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
	     */
	    glyph: _react2['default'].PropTypes.string.isRequired,
	    /**
	     * Adds 'form-control-feedback' class
	     * @private
	     */
	    formControlFeedback: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'glyphicon',
	      formControlFeedback: false
	    };
	  },
	
	  render: function render() {
	    var _classNames;
	
	    var className = _classnames2['default'](this.props.className, (_classNames = {}, _classNames[this.props.bsClass] = true, _classNames['glyphicon-' + this.props.glyph] = true, _classNames['form-control-feedback'] = this.props.formControlFeedback, _classNames));
	
	    return _react2['default'].createElement(
	      'span',
	      _extends({}, this.props, { className: className }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Glyphicon;
	module.exports = exports['default'];

/***/ },
/* 147 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ButtonGroup.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var ButtonGroup = _react2['default'].createClass({
	  displayName: 'ButtonGroup',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    vertical: _react2['default'].PropTypes.bool,
	    justified: _react2['default'].PropTypes.bool,
	    /**
	     * Display block buttons, only useful when used with the "vertical" prop.
	     * @type {bool}
	     */
	    block: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.bool, function (props) {
	      if (props.block && !props.vertical) {
	        return new Error('The block property requires the vertical property to be set to have any effect');
	      }
	    }])
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      block: false,
	      bsClass: 'button-group',
	      justified: false,
	      vertical: false
	    };
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	    classes['btn-group'] = !this.props.vertical;
	    classes['btn-group-vertical'] = this.props.vertical;
	    classes['btn-group-justified'] = this.props.justified;
	    classes['btn-block'] = this.props.block;
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = ButtonGroup;
	module.exports = exports['default'];

/***/ },
/* 148 */
/*!*************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ButtonToolbar.js ***!
  \*************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var ButtonToolbar = _react2['default'].createClass({
	  displayName: 'ButtonToolbar',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'button-toolbar'
	    };
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        role: 'toolbar',
	        className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = ButtonToolbar;
	module.exports = exports['default'];

/***/ },
/* 149 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Carousel.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _Glyphicon = __webpack_require__(/*! ./Glyphicon */ 146);
	
	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);
	
	var Carousel = _react2['default'].createClass({
	  displayName: 'Carousel',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    slide: _react2['default'].PropTypes.bool,
	    indicators: _react2['default'].PropTypes.bool,
	    interval: _react2['default'].PropTypes.number,
	    controls: _react2['default'].PropTypes.bool,
	    pauseOnHover: _react2['default'].PropTypes.bool,
	    wrap: _react2['default'].PropTypes.bool,
	    onSelect: _react2['default'].PropTypes.func,
	    onSlideEnd: _react2['default'].PropTypes.func,
	    activeIndex: _react2['default'].PropTypes.number,
	    defaultActiveIndex: _react2['default'].PropTypes.number,
	    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
	    prevIcon: _react2['default'].PropTypes.node,
	    nextIcon: _react2['default'].PropTypes.node
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      slide: true,
	      interval: 5000,
	      pauseOnHover: true,
	      wrap: true,
	      indicators: true,
	      controls: true,
	      prevIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-left' }),
	      nextIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-right' })
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      activeIndex: this.props.defaultActiveIndex == null ? 0 : this.props.defaultActiveIndex,
	      previousActiveIndex: null,
	      direction: null
	    };
	  },
	
	  getDirection: function getDirection(prevIndex, index) {
	    if (prevIndex === index) {
	      return null;
	    }
	
	    return prevIndex > index ? 'prev' : 'next';
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var activeIndex = this.getActiveIndex();
	
	    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
	      clearTimeout(this.timeout);
	      this.setState({
	        previousActiveIndex: activeIndex,
	        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
	      });
	    }
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.waitForNext();
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this.timeout);
	  },
	
	  next: function next(e) {
	    if (e) {
	      e.preventDefault();
	    }
	
	    var index = this.getActiveIndex() + 1;
	    var count = _utilsValidComponentChildren2['default'].numberOf(this.props.children);
	
	    if (index > count - 1) {
	      if (!this.props.wrap) {
	        return;
	      }
	      index = 0;
	    }
	
	    this.handleSelect(index, 'next');
	  },
	
	  prev: function prev(e) {
	    if (e) {
	      e.preventDefault();
	    }
	
	    var index = this.getActiveIndex() - 1;
	
	    if (index < 0) {
	      if (!this.props.wrap) {
	        return;
	      }
	      index = _utilsValidComponentChildren2['default'].numberOf(this.props.children) - 1;
	    }
	
	    this.handleSelect(index, 'prev');
	  },
	
	  pause: function pause() {
	    this.isPaused = true;
	    clearTimeout(this.timeout);
	  },
	
	  play: function play() {
	    this.isPaused = false;
	    this.waitForNext();
	  },
	
	  waitForNext: function waitForNext() {
	    if (!this.isPaused && this.props.slide && this.props.interval && this.props.activeIndex == null) {
	      this.timeout = setTimeout(this.next, this.props.interval);
	    }
	  },
	
	  handleMouseOver: function handleMouseOver() {
	    if (this.props.pauseOnHover) {
	      this.pause();
	    }
	  },
	
	  handleMouseOut: function handleMouseOut() {
	    if (this.isPaused) {
	      this.play();
	    }
	  },
	
	  render: function render() {
	    var classes = {
	      carousel: true,
	      slide: this.props.slide
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, classes),
	        onMouseOver: this.handleMouseOver,
	        onMouseOut: this.handleMouseOut }),
	      this.props.indicators ? this.renderIndicators() : null,
	      _react2['default'].createElement(
	        'div',
	        { className: 'carousel-inner', ref: 'inner' },
	        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderItem)
	      ),
	      this.props.controls ? this.renderControls() : null
	    );
	  },
	
	  renderPrev: function renderPrev() {
	    return _react2['default'].createElement(
	      'a',
	      { className: 'left carousel-control', href: '#prev', key: 0, onClick: this.prev },
	      this.props.prevIcon
	    );
	  },
	
	  renderNext: function renderNext() {
	    return _react2['default'].createElement(
	      'a',
	      { className: 'right carousel-control', href: '#next', key: 1, onClick: this.next },
	      this.props.nextIcon
	    );
	  },
	
	  renderControls: function renderControls() {
	    if (!this.props.wrap) {
	      var activeIndex = this.getActiveIndex();
	      var count = _utilsValidComponentChildren2['default'].numberOf(this.props.children);
	
	      return [activeIndex !== 0 ? this.renderPrev() : null, activeIndex !== count - 1 ? this.renderNext() : null];
	    }
	
	    return [this.renderPrev(), this.renderNext()];
	  },
	
	  renderIndicator: function renderIndicator(child, index) {
	    var className = index === this.getActiveIndex() ? 'active' : null;
	
	    return _react2['default'].createElement('li', {
	      key: index,
	      className: className,
	      onClick: this.handleSelect.bind(this, index, null) });
	  },
	
	  renderIndicators: function renderIndicators() {
	    var indicators = [];
	    _utilsValidComponentChildren2['default'].forEach(this.props.children, function (child, index) {
	      indicators.push(this.renderIndicator(child, index),
	
	      // Force whitespace between indicator elements, bootstrap
	      // requires this for correct spacing of elements.
	      ' ');
	    }, this);
	
	    return _react2['default'].createElement(
	      'ol',
	      { className: 'carousel-indicators' },
	      indicators
	    );
	  },
	
	  getActiveIndex: function getActiveIndex() {
	    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
	  },
	
	  handleItemAnimateOutEnd: function handleItemAnimateOutEnd() {
	    this.setState({
	      previousActiveIndex: null,
	      direction: null
	    }, function () {
	      this.waitForNext();
	
	      if (this.props.onSlideEnd) {
	        this.props.onSlideEnd();
	      }
	    });
	  },
	
	  renderItem: function renderItem(child, index) {
	    var activeIndex = this.getActiveIndex();
	    var isActive = index === activeIndex;
	    var isPreviousActive = this.state.previousActiveIndex != null && this.state.previousActiveIndex === index && this.props.slide;
	
	    return _react.cloneElement(child, {
	      active: isActive,
	      ref: child.ref,
	      key: child.key ? child.key : index,
	      index: index,
	      animateOut: isPreviousActive,
	      animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
	      direction: this.state.direction,
	      onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd : null
	    });
	  },
	
	  handleSelect: function handleSelect(index, direction) {
	    clearTimeout(this.timeout);
	
	    if (this.isMounted()) {
	      var previousActiveIndex = this.getActiveIndex();
	      direction = direction || this.getDirection(previousActiveIndex, index);
	
	      if (this.props.onSelect) {
	        this.props.onSelect(index, direction);
	      }
	
	      if (this.props.activeIndex == null && index !== previousActiveIndex) {
	        if (this.state.previousActiveIndex != null) {
	          // If currently animating don't activate the new index.
	          // TODO: look into queuing this canceled call and
	          // animating after the current animation has ended.
	          return;
	        }
	
	        this.setState({
	          activeIndex: index,
	          previousActiveIndex: previousActiveIndex,
	          direction: direction
	        });
	      }
	    }
	  }
	});
	
	exports['default'] = Carousel;
	module.exports = exports['default'];

/***/ },
/* 150 */
/*!************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/CarouselItem.js ***!
  \************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsTransitionEvents = __webpack_require__(/*! ./utils/TransitionEvents */ 151);
	
	var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);
	
	var CarouselItem = _react2['default'].createClass({
	  displayName: 'CarouselItem',
	
	  propTypes: {
	    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
	    onAnimateOutEnd: _react2['default'].PropTypes.func,
	    active: _react2['default'].PropTypes.bool,
	    animateIn: _react2['default'].PropTypes.bool,
	    animateOut: _react2['default'].PropTypes.bool,
	    caption: _react2['default'].PropTypes.node,
	    index: _react2['default'].PropTypes.number
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      direction: null
	    };
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: false,
	      animateIn: false,
	      animateOut: false
	    };
	  },
	
	  handleAnimateOutEnd: function handleAnimateOutEnd() {
	    if (this.props.onAnimateOutEnd && this.isMounted()) {
	      this.props.onAnimateOutEnd(this.props.index);
	    }
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.active !== nextProps.active) {
	      this.setState({
	        direction: null
	      });
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    if (!this.props.active && prevProps.active) {
	      _utilsTransitionEvents2['default'].addEndEventListener(_react2['default'].findDOMNode(this), this.handleAnimateOutEnd);
	    }
	
	    if (this.props.active !== prevProps.active) {
	      setTimeout(this.startAnimation, 20);
	    }
	  },
	
	  startAnimation: function startAnimation() {
	    if (!this.isMounted()) {
	      return;
	    }
	
	    this.setState({
	      direction: this.props.direction === 'prev' ? 'right' : 'left'
	    });
	  },
	
	  render: function render() {
	    var classes = {
	      item: true,
	      active: this.props.active && !this.props.animateIn || this.props.animateOut,
	      next: this.props.active && this.props.animateIn && this.props.direction === 'next',
	      prev: this.props.active && this.props.animateIn && this.props.direction === 'prev'
	    };
	
	    if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
	      classes[this.state.direction] = true;
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children,
	      this.props.caption ? this.renderCaption() : null
	    );
	  },
	
	  renderCaption: function renderCaption() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'carousel-caption' },
	      this.props.caption
	    );
	  }
	});
	
	exports['default'] = CarouselItem;
	module.exports = exports['default'];

/***/ },
/* 151 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/TransitionEvents.js ***!
  \**********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains a modified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/addons/transitions/ReactTransitionEvents.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },
	
	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}
	
	if (canUseDOM) {
	  detectEvents();
	}
	
	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var ReactTransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	
	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	exports['default'] = ReactTransitionEvents;
	module.exports = exports['default'];

/***/ },
/* 152 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Col.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _Object$keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 68)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _styleMaps = __webpack_require__(/*! ./styleMaps */ 136);
	
	var _styleMaps2 = _interopRequireDefault(_styleMaps);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var Col = _react2['default'].createClass({
	  displayName: 'Col',
	
	  propTypes: {
	    /**
	     * The number of columns you wish to span
	     *
	     * for Extra small devices Phones (<768px)
	     *
	     * class-prefix `col-xs-`
	     */
	    xs: _react2['default'].PropTypes.number,
	    /**
	     * The number of columns you wish to span
	     *
	     * for Small devices Tablets (≥768px)
	     *
	     * class-prefix `col-sm-`
	     */
	    sm: _react2['default'].PropTypes.number,
	    /**
	     * The number of columns you wish to span
	     *
	     * for Medium devices Desktops (≥992px)
	     *
	     * class-prefix `col-md-`
	     */
	    md: _react2['default'].PropTypes.number,
	    /**
	     * The number of columns you wish to span
	     *
	     * for Large devices Desktops (≥1200px)
	     *
	     * class-prefix `col-lg-`
	     */
	    lg: _react2['default'].PropTypes.number,
	    /**
	     * Move columns to the right
	     *
	     * for Extra small devices Phones
	     *
	     * class-prefix `col-xs-offset-`
	     */
	    xsOffset: _react2['default'].PropTypes.number,
	    /**
	     * Move columns to the right
	     *
	     * for Small devices Tablets
	     *
	     * class-prefix `col-sm-offset-`
	     */
	    smOffset: _react2['default'].PropTypes.number,
	    /**
	     * Move columns to the right
	     *
	     * for Medium devices Desktops
	     *
	     * class-prefix `col-md-offset-`
	     */
	    mdOffset: _react2['default'].PropTypes.number,
	    /**
	     * Move columns to the right
	     *
	     * for Large devices Desktops
	     *
	     * class-prefix `col-lg-offset-`
	     */
	    lgOffset: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the right
	     *
	     * for Extra small devices Phones
	     *
	     * class-prefix `col-xs-push-`
	     */
	    xsPush: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the right
	     *
	     * for Small devices Tablets
	     *
	     * class-prefix `col-sm-push-`
	     */
	    smPush: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the right
	     *
	     * for Medium devices Desktops
	     *
	     * class-prefix `col-md-push-`
	     */
	    mdPush: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the right
	     *
	     * for Large devices Desktops
	     *
	     * class-prefix `col-lg-push-`
	     */
	    lgPush: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the left
	     *
	     * for Extra small devices Phones
	     *
	     * class-prefix `col-xs-pull-`
	     */
	    xsPull: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the left
	     *
	     * for Small devices Tablets
	     *
	     * class-prefix `col-sm-pull-`
	     */
	    smPull: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the left
	     *
	     * for Medium devices Desktops
	     *
	     * class-prefix `col-md-pull-`
	     */
	    mdPull: _react2['default'].PropTypes.number,
	    /**
	     * Change the order of grid columns to the left
	     *
	     * for Large devices Desktops
	     *
	     * class-prefix `col-lg-pull-`
	     */
	    lgPull: _react2['default'].PropTypes.number,
	    /**
	     * You can use a custom element for this component
	     */
	    componentClass: _utilsCustomPropTypes2['default'].elementType
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      componentClass: 'div'
	    };
	  },
	
	  render: function render() {
	    var ComponentClass = this.props.componentClass;
	    var classes = {};
	
	    _Object$keys(_styleMaps2['default'].SIZES).forEach(function (key) {
	      var size = _styleMaps2['default'].SIZES[key];
	      var prop = size;
	      var classPart = size + '-';
	
	      if (this.props[prop]) {
	        classes['col-' + classPart + this.props[prop]] = true;
	      }
	
	      prop = size + 'Offset';
	      classPart = size + '-offset-';
	      if (this.props[prop] >= 0) {
	        classes['col-' + classPart + this.props[prop]] = true;
	      }
	
	      prop = size + 'Push';
	      classPart = size + '-push-';
	      if (this.props[prop] >= 0) {
	        classes['col-' + classPart + this.props[prop]] = true;
	      }
	
	      prop = size + 'Pull';
	      classPart = size + '-pull-';
	      if (this.props[prop] >= 0) {
	        classes['col-' + classPart + this.props[prop]] = true;
	      }
	    }, this);
	
	    return _react2['default'].createElement(
	      ComponentClass,
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Col;
	module.exports = exports['default'];

/***/ },
/* 153 */
/*!****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/CollapsibleMixin.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsTransitionEvents = __webpack_require__(/*! ./utils/TransitionEvents */ 151);
	
	var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var CollapsibleMixin = {
	
	  propTypes: {
	    defaultExpanded: _react2['default'].PropTypes.bool,
	    expanded: _react2['default'].PropTypes.bool
	  },
	
	  getInitialState: function getInitialState() {
	    var defaultExpanded = this.props.defaultExpanded != null ? this.props.defaultExpanded : !!this.props.expanded;
	
	    return {
	      expanded: defaultExpanded,
	      collapsing: false
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    _utilsDeprecationWarning2['default']('CollapsibleMixin', 'Collapse Component');
	  },
	
	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    var willExpanded = nextProps.expanded != null ? nextProps.expanded : nextState.expanded;
	    if (willExpanded === this.isExpanded()) {
	      return;
	    }
	
	    // if the expanded state is being toggled, ensure node has a dimension value
	    // this is needed for the animation to work and needs to be set before
	    // the collapsing class is applied (after collapsing is applied the in class
	    // is removed and the node's dimension will be wrong)
	
	    var node = this.getCollapsibleDOMNode();
	    var dimension = this.dimension();
	    var value = '0';
	
	    if (!willExpanded) {
	      value = this.getCollapsibleDimensionValue();
	    }
	
	    node.style[dimension] = value + 'px';
	
	    this._afterWillUpdate();
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // check if expanded is being toggled; if so, set collapsing
	    this._checkToggleCollapsing(prevProps, prevState);
	
	    // check if collapsing was turned on; if so, start animation
	    this._checkStartAnimation();
	  },
	
	  // helps enable test stubs
	  _afterWillUpdate: function _afterWillUpdate() {},
	
	  _checkStartAnimation: function _checkStartAnimation() {
	    if (!this.state.collapsing) {
	      return;
	    }
	
	    var node = this.getCollapsibleDOMNode();
	    var dimension = this.dimension();
	    var value = this.getCollapsibleDimensionValue();
	
	    // setting the dimension here starts the transition animation
	    var result = undefined;
	    if (this.isExpanded()) {
	      result = value + 'px';
	    } else {
	      result = '0px';
	    }
	    node.style[dimension] = result;
	  },
	
	  _checkToggleCollapsing: function _checkToggleCollapsing(prevProps, prevState) {
	    var wasExpanded = prevProps.expanded != null ? prevProps.expanded : prevState.expanded;
	    var isExpanded = this.isExpanded();
	    if (wasExpanded !== isExpanded) {
	      if (wasExpanded) {
	        this._handleCollapse();
	      } else {
	        this._handleExpand();
	      }
	    }
	  },
	
	  _handleExpand: function _handleExpand() {
	    var _this = this;
	
	    var node = this.getCollapsibleDOMNode();
	    var dimension = this.dimension();
	
	    var complete = function complete() {
	      _this._removeEndEventListener(node, complete);
	      // remove dimension value - this ensures the collapsible item can grow
	      // in dimension after initial display (such as an image loading)
	      node.style[dimension] = '';
	      _this.setState({
	        collapsing: false
	      });
	    };
	
	    this._addEndEventListener(node, complete);
	
	    this.setState({
	      collapsing: true
	    });
	  },
	
	  _handleCollapse: function _handleCollapse() {
	    var _this2 = this;
	
	    var node = this.getCollapsibleDOMNode();
	
	    var complete = function complete() {
	      _this2._removeEndEventListener(node, complete);
	      _this2.setState({
	        collapsing: false
	      });
	    };
	
	    this._addEndEventListener(node, complete);
	
	    this.setState({
	      collapsing: true
	    });
	  },
	
	  // helps enable test stubs
	  _addEndEventListener: function _addEndEventListener(node, complete) {
	    _utilsTransitionEvents2['default'].addEndEventListener(node, complete);
	  },
	
	  // helps enable test stubs
	  _removeEndEventListener: function _removeEndEventListener(node, complete) {
	    _utilsTransitionEvents2['default'].removeEndEventListener(node, complete);
	  },
	
	  dimension: function dimension() {
	    return typeof this.getCollapsibleDimension === 'function' ? this.getCollapsibleDimension() : 'height';
	  },
	
	  isExpanded: function isExpanded() {
	    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
	  },
	
	  getCollapsibleClassSet: function getCollapsibleClassSet(className) {
	    var classes = {};
	
	    if (typeof className === 'string') {
	      className.split(' ').forEach(function (subClasses) {
	        if (subClasses) {
	          classes[subClasses] = true;
	        }
	      });
	    }
	
	    classes.collapsing = this.state.collapsing;
	    classes.collapse = !this.state.collapsing;
	    classes['in'] = this.isExpanded() && !this.state.collapsing;
	
	    return classes;
	  }
	};
	
	exports['default'] = CollapsibleMixin;
	module.exports = exports['default'];

/***/ },
/* 154 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/CollapsibleNav.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _Collapse = __webpack_require__(/*! ./Collapse */ 155);
	
	var _Collapse2 = _interopRequireDefault(_Collapse);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var CollapsibleNav = _react2['default'].createClass({
	  displayName: 'CollapsibleNav',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    onSelect: _react2['default'].PropTypes.func,
	    activeHref: _react2['default'].PropTypes.string,
	    activeKey: _react2['default'].PropTypes.any,
	    collapsible: _react2['default'].PropTypes.bool,
	    expanded: _react2['default'].PropTypes.bool,
	    eventKey: _react2['default'].PropTypes.any
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      collapsible: false,
	      expanded: false
	    };
	  },
	
	  render: function render() {
	    /*
	     * this.props.collapsible is set in NavBar when an eventKey is supplied.
	     */
	    var classes = this.props.collapsible ? 'navbar-collapse' : null;
	    var renderChildren = this.props.collapsible ? this.renderCollapsibleNavChildren : this.renderChildren;
	
	    var nav = _react2['default'].createElement(
	      'div',
	      { eventKey: this.props.eventKey, className: _classnames2['default'](this.props.className, classes) },
	      _utilsValidComponentChildren2['default'].map(this.props.children, renderChildren)
	    );
	
	    if (this.props.collapsible) {
	      return _react2['default'].createElement(
	        _Collapse2['default'],
	        { 'in': this.props.expanded },
	        nav
	      );
	    } else {
	      return nav;
	    }
	  },
	
	  getChildActiveProp: function getChildActiveProp(child) {
	    if (child.props.active) {
	      return true;
	    }
	    if (this.props.activeKey != null) {
	      if (child.props.eventKey === this.props.activeKey) {
	        return true;
	      }
	    }
	    if (this.props.activeHref != null) {
	      if (child.props.href === this.props.activeHref) {
	        return true;
	      }
	    }
	
	    return child.props.active;
	  },
	
	  renderChildren: function renderChildren(child, index) {
	    var key = child.key ? child.key : index;
	    return _react.cloneElement(child, {
	      activeKey: this.props.activeKey,
	      activeHref: this.props.activeHref,
	      ref: 'nocollapse_' + key,
	      key: key,
	      navItem: true
	    });
	  },
	
	  renderCollapsibleNavChildren: function renderCollapsibleNavChildren(child, index) {
	    var key = child.key ? child.key : index;
	    return _react.cloneElement(child, {
	      active: this.getChildActiveProp(child),
	      activeKey: this.props.activeKey,
	      activeHref: this.props.activeHref,
	      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
	      ref: 'collapsible_' + key,
	      key: key,
	      navItem: true
	    });
	  }
	});
	
	exports['default'] = CollapsibleNav;
	module.exports = exports['default'];

/***/ },
/* 155 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Collapse.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactOverlaysLibTransition = __webpack_require__(/*! react-overlays/lib/Transition */ 156);
	
	var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);
	
	var _utilsDomUtils = __webpack_require__(/*! ./utils/domUtils */ 98);
	
	var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var capitalize = function capitalize(str) {
	  return str[0].toUpperCase() + str.substr(1);
	};
	
	// reading a dimension prop will cause the browser to recalculate,
	// which will let our animations work
	var triggerBrowserReflow = function triggerBrowserReflow(node) {
	  return node.offsetHeight;
	};
	
	var MARGINS = {
	  height: ['marginTop', 'marginBottom'],
	  width: ['marginLeft', 'marginRight']
	};
	
	function getDimensionValue(dimension, elem) {
	  var value = elem['offset' + capitalize(dimension)];
	  var margins = MARGINS[dimension];
	
	  return value + parseInt(_utilsDomUtils2['default'].css(elem, margins[0]), 10) + parseInt(_utilsDomUtils2['default'].css(elem, margins[1]), 10);
	}
	
	var Collapse = (function (_React$Component) {
	  _inherits(Collapse, _React$Component);
	
	  function Collapse(props, context) {
	    _classCallCheck(this, Collapse);
	
	    _React$Component.call(this, props, context);
	
	    this.onEnterListener = this.handleEnter.bind(this);
	    this.onEnteringListener = this.handleEntering.bind(this);
	    this.onEnteredListener = this.handleEntered.bind(this);
	    this.onExitListener = this.handleExit.bind(this);
	    this.onExitingListener = this.handleExiting.bind(this);
	  }
	
	  // Explicitly copied from Transition for doc generation.
	  // TODO: Remove duplication once #977 is resolved.
	
	  Collapse.prototype.render = function render() {
	    var enter = _utilsCreateChainedFunction2['default'](this.onEnterListener, this.props.onEnter);
	    var entering = _utilsCreateChainedFunction2['default'](this.onEnteringListener, this.props.onEntering);
	    var entered = _utilsCreateChainedFunction2['default'](this.onEnteredListener, this.props.onEntered);
	    var exit = _utilsCreateChainedFunction2['default'](this.onExitListener, this.props.onExit);
	    var exiting = _utilsCreateChainedFunction2['default'](this.onExitingListener, this.props.onExiting);
	
	    return _react2['default'].createElement(
	      _reactOverlaysLibTransition2['default'],
	      _extends({
	        ref: 'transition'
	      }, this.props, {
	        'aria-expanded': this.props.role ? this.props['in'] : null,
	        className: this._dimension() === 'width' ? 'width' : '',
	        exitedClassName: 'collapse',
	        exitingClassName: 'collapsing',
	        enteredClassName: 'collapse in',
	        enteringClassName: 'collapsing',
	        onEnter: enter,
	        onEntering: entering,
	        onEntered: entered,
	        onExit: exit,
	        onExiting: exiting,
	        onExited: this.props.onExited
	      }),
	      this.props.children
	    );
	  };
	
	  /* -- Expanding -- */
	
	  Collapse.prototype.handleEnter = function handleEnter(elem) {
	    var dimension = this._dimension();
	    elem.style[dimension] = '0';
	  };
	
	  Collapse.prototype.handleEntering = function handleEntering(elem) {
	    var dimension = this._dimension();
	
	    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
	  };
	
	  Collapse.prototype.handleEntered = function handleEntered(elem) {
	    var dimension = this._dimension();
	    elem.style[dimension] = null;
	  };
	
	  /* -- Collapsing -- */
	
	  Collapse.prototype.handleExit = function handleExit(elem) {
	    var dimension = this._dimension();
	
	    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
	  };
	
	  Collapse.prototype.handleExiting = function handleExiting(elem) {
	    var dimension = this._dimension();
	
	    triggerBrowserReflow(elem);
	    elem.style[dimension] = '0';
	  };
	
	  Collapse.prototype._dimension = function _dimension() {
	    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
	  };
	
	  // for testing
	
	  Collapse.prototype._getTransitionInstance = function _getTransitionInstance() {
	    return this.refs.transition;
	  };
	
	  Collapse.prototype._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
	    return elem['scroll' + capitalize(dimension)] + 'px';
	  };
	
	  return Collapse;
	})(_react2['default'].Component);
	
	Collapse.propTypes = {
	  /**
	   * Show the component; triggers the expand or collapse animation
	   */
	  'in': _react2['default'].PropTypes.bool,
	
	  /**
	   * Unmount the component (remove it from the DOM) when it is collapsed
	   */
	  unmountOnExit: _react2['default'].PropTypes.bool,
	
	  /**
	   * Run the expand animation when the component mounts, if it is initially
	   * shown
	   */
	  transitionAppear: _react2['default'].PropTypes.bool,
	
	  /**
	   * Duration of the collapse animation in milliseconds, to ensure that
	   * finishing callbacks are fired even if the original browser transition end
	   * events are canceled
	   */
	  timeout: _react2['default'].PropTypes.number,
	
	  /**
	   * duration
	   * @private
	   */
	  duration: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.number, function (props) {
	    if (props.duration != null) {
	      _utilsDeprecationWarning2['default']('Collapse `duration`', 'the `timeout` prop');
	    }
	    return null;
	  }]),
	
	  /**
	   * Callback fired before the component expands
	   */
	  onEnter: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to expand
	   */
	  onEntering: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component has expanded
	   */
	  onEntered: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired before the component collapses
	   */
	  onExit: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to collapse
	   */
	  onExiting: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component has collapsed
	   */
	  onExited: _react2['default'].PropTypes.func,
	
	  /**
	   * The dimension used when collapsing, or a function that returns the
	   * dimension
	   *
	   * _Note: Bootstrap only partially supports 'width'!
	   * You will need to supply your own CSS animation for the `.width` CSS class._
	   */
	  dimension: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['height', 'width']), _react2['default'].PropTypes.func]),
	
	  /**
	   * Function that returns the height or width of the animating DOM node
	   *
	   * Allows for providing some custom logic for how much the Collapse component
	   * should animate in its specified dimension. Called with the current
	   * dimension prop value and the DOM node.
	   */
	  getDimensionValue: _react2['default'].PropTypes.func,
	
	  /**
	   * ARIA role of collapsible element
	   */
	  role: _react2['default'].PropTypes.string
	};
	
	Collapse.defaultProps = {
	  'in': false,
	  timeout: 300,
	  unmountOnExit: false,
	  transitionAppear: false,
	
	  dimension: 'height',
	  getDimensionValue: getDimensionValue
	};
	
	exports['default'] = Collapse;
	module.exports = exports['default'];

/***/ },
/* 156 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/Transition.js ***!
  \***************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _domHelpersTransitionProperties = __webpack_require__(/*! dom-helpers/transition/properties */ 157);
	
	var _domHelpersTransitionProperties2 = _interopRequireDefault(_domHelpersTransitionProperties);
	
	var _domHelpersEventsOn = __webpack_require__(/*! dom-helpers/events/on */ 158);
	
	var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var transitionEndEvent = _domHelpersTransitionProperties2['default'].end;
	
	var UNMOUNTED = 0;
	exports.UNMOUNTED = UNMOUNTED;
	var EXITED = 1;
	exports.EXITED = EXITED;
	var ENTERING = 2;
	exports.ENTERING = ENTERING;
	var ENTERED = 3;
	exports.ENTERED = ENTERED;
	var EXITING = 4;
	
	exports.EXITING = EXITING;
	/**
	 * The Transition component lets you define and run css transitions with a simple declarative api.
	 * It works similar to React's own [CSSTransitionGroup](http://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup)
	 * but is specifically optimized for transitioning a single child "in" or "out".
	 *
	 * You don't even need to use class based css transitions if you don't want to (but it is easiest).
	 * The extensive set of lifecyle callbacks means you have control over
	 * the transitioning now at each step of the way.
	 */
	
	var Transition = (function (_React$Component) {
	  function Transition(props, context) {
	    _classCallCheck(this, Transition);
	
	    _React$Component.call(this, props, context);
	
	    var initialStatus = undefined;
	    if (props['in']) {
	      // Start enter transition in componentDidMount.
	      initialStatus = props.transitionAppear ? EXITED : ENTERED;
	    } else {
	      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
	    }
	    this.state = { status: initialStatus };
	
	    this.nextCallback = null;
	  }
	
	  _inherits(Transition, _React$Component);
	
	  Transition.prototype.componentDidMount = function componentDidMount() {
	    if (this.props.transitionAppear && this.props['in']) {
	      this.performEnter(this.props);
	    }
	  };
	
	  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var status = this.state.status;
	    if (nextProps['in']) {
	      if (status === EXITING) {
	        this.performEnter(nextProps);
	      } else if (this.props.unmountOnExit) {
	        if (status === UNMOUNTED) {
	          // Start enter transition in componentDidUpdate.
	          this.setState({ status: EXITED });
	        }
	      } else if (status === EXITED) {
	        this.performEnter(nextProps);
	      }
	
	      // Otherwise we're already entering or entered.
	    } else {
	      if (status === ENTERING || status === ENTERED) {
	        this.performExit(nextProps);
	      }
	
	      // Otherwise we're already exited or exiting.
	    }
	  };
	
	  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
	    if (this.props.unmountOnExit && this.state.status === EXITED) {
	      // EXITED is always a transitional state to either ENTERING or UNMOUNTED
	      // when using unmountOnExit.
	      if (this.props['in']) {
	        this.performEnter(this.props);
	      } else {
	        this.setState({ status: UNMOUNTED });
	      }
	    }
	  };
	
	  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.cancelNextCallback();
	  };
	
	  Transition.prototype.performEnter = function performEnter(props) {
	    var _this = this;
	
	    this.cancelNextCallback();
	    var node = _react2['default'].findDOMNode(this);
	
	    // Not this.props, because we might be about to receive new props.
	    props.onEnter(node);
	
	    this.safeSetState({ status: ENTERING }, function () {
	      _this.props.onEntering(node);
	
	      _this.onTransitionEnd(node, function () {
	        _this.safeSetState({ status: ENTERED }, function () {
	          _this.props.onEntered(node);
	        });
	      });
	    });
	  };
	
	  Transition.prototype.performExit = function performExit(props) {
	    var _this2 = this;
	
	    this.cancelNextCallback();
	    var node = _react2['default'].findDOMNode(this);
	
	    // Not this.props, because we might be about to receive new props.
	    props.onExit(node);
	
	    this.safeSetState({ status: EXITING }, function () {
	      _this2.props.onExiting(node);
	
	      _this2.onTransitionEnd(node, function () {
	        _this2.safeSetState({ status: EXITED }, function () {
	          _this2.props.onExited(node);
	        });
	      });
	    });
	  };
	
	  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
	    if (this.nextCallback !== null) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  };
	
	  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
	    // This shouldn't be necessary, but there are weird race conditions with
	    // setState callbacks and unmounting in testing, so always make sure that
	    // we can cancel any pending setState callbacks after we unmount.
	    this.setState(nextState, this.setNextCallback(callback));
	  };
	
	  Transition.prototype.setNextCallback = function setNextCallback(callback) {
	    var _this3 = this;
	
	    var active = true;
	
	    this.nextCallback = function (event) {
	      if (active) {
	        active = false;
	        _this3.nextCallback = null;
	
	        callback(event);
	      }
	    };
	
	    this.nextCallback.cancel = function () {
	      active = false;
	    };
	
	    return this.nextCallback;
	  };
	
	  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, handler) {
	    this.setNextCallback(handler);
	
	    if (node) {
	      _domHelpersEventsOn2['default'](node, transitionEndEvent, this.nextCallback);
	      setTimeout(this.nextCallback, this.props.timeout);
	    } else {
	      setTimeout(this.nextCallback, 0);
	    }
	  };
	
	  Transition.prototype.render = function render() {
	    var status = this.state.status;
	    if (status === UNMOUNTED) {
	      return null;
	    }
	
	    var _props = this.props;
	    var children = _props.children;
	    var className = _props.className;
	
	    var childProps = _objectWithoutProperties(_props, ['children', 'className']);
	
	    Object.keys(Transition.propTypes).forEach(function (key) {
	      return delete childProps[key];
	    });
	
	    var transitionClassName = undefined;
	    if (status === EXITED) {
	      transitionClassName = this.props.exitedClassName;
	    } else if (status === ENTERING) {
	      transitionClassName = this.props.enteringClassName;
	    } else if (status === ENTERED) {
	      transitionClassName = this.props.enteredClassName;
	    } else if (status === EXITING) {
	      transitionClassName = this.props.exitingClassName;
	    }
	
	    var child = _react2['default'].Children.only(children);
	    return _react2['default'].cloneElement(child, _extends({}, childProps, {
	      className: _classnames2['default'](child.props.className, className, transitionClassName)
	    }));
	  };
	
	  return Transition;
	})(_react2['default'].Component);
	
	Transition.propTypes = {
	  /**
	   * Show the component; triggers the enter or exit animation
	   */
	  'in': _react2['default'].PropTypes.bool,
	
	  /**
	   * Unmount the component (remove it from the DOM) when it is not shown
	   */
	  unmountOnExit: _react2['default'].PropTypes.bool,
	
	  /**
	   * Run the enter animation when the component mounts, if it is initially
	   * shown
	   */
	  transitionAppear: _react2['default'].PropTypes.bool,
	
	  /**
	   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
	   * transition indefinately if the browser transitionEnd events are
	   * canceled or interrupted.
	   *
	   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
	   * setting this to the duration of your animation (or a bit above it).
	   */
	  timeout: _react2['default'].PropTypes.number,
	
	  /**
	   * CSS class or classes applied when the component is exited
	   */
	  exitedClassName: _react2['default'].PropTypes.string,
	  /**
	   * CSS class or classes applied while the component is exiting
	   */
	  exitingClassName: _react2['default'].PropTypes.string,
	  /**
	   * CSS class or classes applied when the component is entered
	   */
	  enteredClassName: _react2['default'].PropTypes.string,
	  /**
	   * CSS class or classes applied while the component is entering
	   */
	  enteringClassName: _react2['default'].PropTypes.string,
	
	  /**
	   * Callback fired before the "entering" classes are applied
	   */
	  onEnter: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the "entering" classes are applied
	   */
	  onEntering: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the "enter" classes are applied
	   */
	  onEntered: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired before the "exiting" classes are applied
	   */
	  onExit: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the "exiting" classes are applied
	   */
	  onExiting: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the "exited" classes are applied
	   */
	  onExited: _react2['default'].PropTypes.func
	};
	
	// Name the function so it is clearer in the documentation
	function noop() {}
	
	Transition.displayName = 'Transition';
	
	Transition.defaultProps = {
	  'in': false,
	  unmountOnExit: false,
	  transitionAppear: false,
	
	  timeout: 5000,
	
	  onEnter: noop,
	  onEntering: noop,
	  onEntered: noop,
	
	  onExit: noop,
	  onExiting: noop,
	  onExited: noop
	};
	
	exports['default'] = Transition;

/***/ },
/* 157 */
/*!*******************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/transition/properties.js ***!
  \*******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(/*! ../util/inDOM */ 99);
	
	var has = Object.prototype.hasOwnProperty,
	    transform = 'transform',
	    transition = {},
	    transitionTiming,
	    transitionDuration,
	    transitionProperty,
	    transitionDelay;
	
	if (canUseDOM) {
	  transition = getTransitionProperties();
	
	  transform = transition.prefix + transform;
	
	  transitionProperty = transition.prefix + 'transition-property';
	  transitionDuration = transition.prefix + 'transition-duration';
	  transitionDelay = transition.prefix + 'transition-delay';
	  transitionTiming = transition.prefix + 'transition-timing-function';
	}
	
	module.exports = {
	  transform: transform,
	  end: transition.end,
	  property: transitionProperty,
	  timing: transitionTiming,
	  delay: transitionDelay,
	  duration: transitionDuration
	};
	
	function getTransitionProperties() {
	  var endEvent,
	      prefix = '',
	      transitions = {
	    O: 'otransitionend',
	    Moz: 'transitionend',
	    Webkit: 'webkitTransitionEnd',
	    ms: 'MSTransitionEnd'
	  };
	
	  var element = document.createElement('div');
	
	  for (var vendor in transitions) if (has.call(transitions, vendor)) {
	    if (element.style[vendor + 'TransitionProperty'] !== undefined) {
	      prefix = '-' + vendor.toLowerCase() + '-';
	      endEvent = transitions[vendor];
	      break;
	    }
	  }
	
	  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = 'transitionend';
	
	  return { end: endEvent, prefix: prefix };
	}

/***/ },
/* 158 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/events/on.js ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(/*! ../util/inDOM */ 99);
	var on = function on() {};
	
	if (canUseDOM) {
	  on = (function () {
	
	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, handler);
	    };
	  })();
	}
	
	module.exports = on;

/***/ },
/* 159 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Dropdown.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _keycode = __webpack_require__(/*! keycode */ 160);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _uncontrollable = __webpack_require__(/*! uncontrollable */ 161);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _ButtonGroup = __webpack_require__(/*! ./ButtonGroup */ 147);
	
	var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);
	
	var _DropdownToggle = __webpack_require__(/*! ./DropdownToggle */ 165);
	
	var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);
	
	var _DropdownMenu = __webpack_require__(/*! ./DropdownMenu */ 167);
	
	var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _lodashCollectionFind = __webpack_require__(/*! lodash/collection/find */ 173);
	
	var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);
	
	var _lodashObjectOmit = __webpack_require__(/*! lodash/object/omit */ 222);
	
	var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);
	
	var _domHelpersActiveElement = __webpack_require__(/*! dom-helpers/activeElement */ 104);
	
	var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);
	
	var _domHelpersQueryContains = __webpack_require__(/*! dom-helpers/query/contains */ 103);
	
	var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);
	
	var TOGGLE_REF = 'toggle-btn';
	
	var TOGGLE_ROLE = _DropdownToggle2['default'].defaultProps.bsRole;
	exports.TOGGLE_ROLE = TOGGLE_ROLE;
	var MENU_ROLE = _DropdownMenu2['default'].defaultProps.bsRole;
	
	exports.MENU_ROLE = MENU_ROLE;
	
	var Dropdown = (function (_React$Component) {
	  _inherits(Dropdown, _React$Component);
	
	  function Dropdown(props) {
	    _classCallCheck(this, Dropdown);
	
	    _React$Component.call(this, props);
	
	    this.Toggle = _DropdownToggle2['default'];
	
	    this.toggleOpen = this.toggleOpen.bind(this);
	    this.handleClick = this.handleClick.bind(this);
	    this.handleKeyDown = this.handleKeyDown.bind(this);
	    this.handleClose = this.handleClose.bind(this);
	    this.extractChildren = this.extractChildren.bind(this);
	
	    this.refineMenu = this.refineMenu.bind(this);
	    this.refineToggle = this.refineToggle.bind(this);
	
	    this.childExtractors = [{
	      key: 'toggle',
	      matches: function matches(child) {
	        return child.props.bsRole === TOGGLE_ROLE;
	      },
	      refine: this.refineToggle
	    }, {
	      key: 'menu',
	      exclusive: true,
	      matches: function matches(child) {
	        return child.props.bsRole === MENU_ROLE;
	      },
	      refine: this.refineMenu
	    }];
	
	    this.state = {};
	  }
	
	  Dropdown.prototype.componentDidMount = function componentDidMount() {
	    var menu = this.refs.menu;
	    if (this.props.open && menu.focusNext) {
	      menu.focusNext();
	    }
	  };
	
	  Dropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
	    if (!nextProps.open && this.props.open) {
	      this._focusInDropdown = _domHelpersQueryContains2['default'](_react2['default'].findDOMNode(this.refs.menu), _domHelpersActiveElement2['default'](document));
	    }
	  };
	
	  Dropdown.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var menu = this.refs.menu;
	
	    if (this.props.open && !prevProps.open && menu.focusNext) {
	      menu.focusNext();
	    }
	
	    if (!this.props.open && prevProps.open) {
	      // if focus hasn't already moved from the menu lets return it
	      // to the toggle
	      if (this._focusInDropdown) {
	        this._focusInDropdown = false;
	        this.focus();
	      }
	    }
	  };
	
	  Dropdown.prototype.render = function render() {
	    var children = this.extractChildren();
	    var Component = this.props.componentClass;
	
	    var props = _lodashObjectOmit2['default'](this.props, ['id']);
	
	    var rootClasses = {
	      open: this.props.open,
	      dropdown: !this.props.dropup,
	      dropup: this.props.dropup
	    };
	
	    return _react2['default'].createElement(
	      Component,
	      _extends({}, props, {
	        tabIndex: '-1',
	        className: _classnames2['default'](this.props.className, rootClasses)
	      }),
	      children
	    );
	  };
	
	  Dropdown.prototype.toggleOpen = function toggleOpen() {
	    var open = !this.props.open;
	
	    if (this.props.onToggle) {
	      this.props.onToggle(open);
	    }
	  };
	
	  Dropdown.prototype.handleClick = function handleClick() {
	    if (this.props.disabled) {
	      return;
	    }
	
	    this.toggleOpen();
	  };
	
	  Dropdown.prototype.handleKeyDown = function handleKeyDown(event) {
	    var _this = this;
	
	    var focusNext = function focusNext() {
	      if (_this.refs.menu.focusNext) {
	        _this.refs.menu.focusNext();
	      }
	    };
	
	    switch (event.keyCode) {
	      case _keycode2['default'].codes.down:
	        if (!this.props.open) {
	          this.toggleOpen();
	        } else {
	          focusNext();
	        }
	        event.preventDefault();
	        break;
	      case _keycode2['default'].codes.esc:
	      case _keycode2['default'].codes.tab:
	        this.handleClose(event);
	        break;
	      default:
	    }
	  };
	
	  Dropdown.prototype.handleClose = function handleClose() {
	    if (!this.props.open) {
	      return;
	    }
	
	    this.toggleOpen();
	  };
	
	  Dropdown.prototype.focus = function focus() {
	    var toggle = _react2['default'].findDOMNode(this.refs[TOGGLE_REF]);
	
	    if (toggle && toggle.focus) {
	      toggle.focus();
	    }
	  };
	
	  Dropdown.prototype.extractChildren = function extractChildren() {
	    var _this2 = this;
	
	    var open = !!this.props.open;
	    var seen = {};
	
	    return _utilsValidComponentChildren2['default'].map(this.props.children, function (child) {
	      var extractor = _lodashCollectionFind2['default'](_this2.childExtractors, function (x) {
	        return x.matches(child);
	      });
	
	      if (extractor) {
	        if (seen[extractor.key]) {
	          return false;
	        }
	
	        seen[extractor.key] = extractor.exclusive;
	        child = extractor.refine(child, open);
	      }
	
	      return child;
	    });
	  };
	
	  Dropdown.prototype.refineMenu = function refineMenu(menu, open) {
	    var menuProps = {
	      ref: 'menu',
	      open: open,
	      labelledBy: this.props.id,
	      pullRight: this.props.pullRight
	    };
	
	    menuProps.onClose = _utilsCreateChainedFunction2['default'](menu.props.onClose, this.props.onClose, this.handleClose);
	
	    menuProps.onSelect = _utilsCreateChainedFunction2['default'](menu.props.onSelect, this.props.onSelect, this.handleClose);
	
	    return _react.cloneElement(menu, menuProps, menu.props.children);
	  };
	
	  Dropdown.prototype.refineToggle = function refineToggle(toggle, open) {
	    var toggleProps = {
	      open: open,
	      id: this.props.id,
	      ref: TOGGLE_REF
	    };
	
	    toggleProps.onClick = _utilsCreateChainedFunction2['default'](toggle.props.onClick, this.handleClick);
	
	    toggleProps.onKeyDown = _utilsCreateChainedFunction2['default'](toggle.props.onKeyDown, this.handleKeyDown);
	
	    return _react.cloneElement(toggle, toggleProps, toggle.props.children);
	  };
	
	  return Dropdown;
	})(_react2['default'].Component);
	
	Dropdown.Toggle = _DropdownToggle2['default'];
	
	Dropdown.TOGGLE_REF = TOGGLE_REF;
	
	Dropdown.defaultProps = {
	  componentClass: _ButtonGroup2['default']
	};
	
	Dropdown.propTypes = {
	  /**
	   * The menu will open above the dropdown button, instead of below it.
	   */
	  dropup: _react2['default'].PropTypes.bool,
	
	  /**
	   * An html id attribute, necessary for assistive technologies, such as screen readers.
	   * @type {string|number}
	   * @required
	   */
	  id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
	
	  componentClass: _utilsCustomPropTypes2['default'].elementType,
	
	  /**
	   * The children of a Dropdown may be a `<Dropdown.Toggle/>` or a `<Dropdown.Menu/>`.
	   * @type {node}
	   */
	  children: _utilsCustomPropTypes2['default'].all([_utilsCustomPropTypes2['default'].requiredRoles(TOGGLE_ROLE, MENU_ROLE), _utilsCustomPropTypes2['default'].exclusiveRoles(MENU_ROLE)]),
	
	  /**
	   * Whether or not component is disabled.
	   */
	  disabled: _react2['default'].PropTypes.bool,
	
	  /**
	   * Align the menu to the right  side of the Dropdown toggle
	   */
	  pullRight: _react2['default'].PropTypes.bool,
	
	  /**
	   * Whether or not the Dropdown is visible.
	   *
	   * @controllable onToggle
	   */
	  open: _react2['default'].PropTypes.bool,
	
	  /**
	   * A callback fired when the Dropdown closes.
	   */
	  onClose: _react2['default'].PropTypes.func,
	
	  /**
	   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
	   * `open` value.
	   *
	   * ```js
	   * function(Boolean isOpen) {}
	   * ```
	   * @controllable open
	   */
	  onToggle: _react2['default'].PropTypes.func,
	
	  /**
	   * A callback fired when a menu item is selected.
	   *
	   * ```js
	   * function(Object event, Any eventKey)
	   * ```
	   */
	  onSelect: _react2['default'].PropTypes.func
	};
	
	Dropdown = _uncontrollable2['default'](Dropdown, { open: 'onToggle' });
	
	Dropdown.Toggle = _DropdownToggle2['default'];
	Dropdown.Menu = _DropdownMenu2['default'];
	
	exports['default'] = Dropdown;

/***/ },
/* 160 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/keycode/index.js ***!
  \***********************************************************************************/
/***/ function(module, exports) {

	// Source: http://jsfiddle.net/vWx8V/
	// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes
	
	
	
	/**
	 * Conenience method returns corresponding value for given keyName or keyCode.
	 *
	 * @param {Mixed} keyCode {Number} or keyName {String}
	 * @return {Mixed}
	 * @api public
	 */
	
	exports = module.exports = function(searchInput) {
	  // Keyboard Events
	  if (searchInput && 'object' === typeof searchInput) {
	    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
	    if (hasKeyCode) searchInput = hasKeyCode
	  }
	
	  // Numbers
	  if ('number' === typeof searchInput) return names[searchInput]
	
	  // Everything else (cast to string)
	  var search = String(searchInput)
	
	  // check codes
	  var foundNamedKey = codes[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // check aliases
	  var foundNamedKey = aliases[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // weird character?
	  if (search.length === 1) return search.charCodeAt(0)
	
	  return undefined
	}
	
	/**
	 * Get by name
	 *
	 *   exports.code['enter'] // => 13
	 */
	
	var codes = exports.code = exports.codes = {
	  'backspace': 8,
	  'tab': 9,
	  'enter': 13,
	  'shift': 16,
	  'ctrl': 17,
	  'alt': 18,
	  'pause/break': 19,
	  'caps lock': 20,
	  'esc': 27,
	  'space': 32,
	  'page up': 33,
	  'page down': 34,
	  'end': 35,
	  'home': 36,
	  'left': 37,
	  'up': 38,
	  'right': 39,
	  'down': 40,
	  'insert': 45,
	  'delete': 46,
	  'command': 91,
	  'right click': 93,
	  'numpad *': 106,
	  'numpad +': 107,
	  'numpad -': 109,
	  'numpad .': 110,
	  'numpad /': 111,
	  'num lock': 144,
	  'scroll lock': 145,
	  'my computer': 182,
	  'my calculator': 183,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221,
	  "'": 222,
	}
	
	// Helper aliases
	
	var aliases = exports.aliases = {
	  'windows': 91,
	  '⇧': 16,
	  '⌥': 18,
	  '⌃': 17,
	  '⌘': 91,
	  'ctl': 17,
	  'control': 17,
	  'option': 18,
	  'pause': 19,
	  'break': 19,
	  'caps': 20,
	  'return': 13,
	  'escape': 27,
	  'spc': 32,
	  'pgup': 33,
	  'pgdn': 33,
	  'ins': 45,
	  'del': 46,
	  'cmd': 91
	}
	
	
	/*!
	 * Programatically add the following
	 */
	
	// lower case chars
	for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32
	
	// numbers
	for (var i = 48; i < 58; i++) codes[i - 48] = i
	
	// function keys
	for (i = 1; i < 13; i++) codes['f'+i] = i + 111
	
	// numpad keys
	for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96
	
	/**
	 * Get by code
	 *
	 *   exports.name[13] // => 'Enter'
	 */
	
	var names = exports.names = exports.title = {} // title for backward compat
	
	// Create reverse mapping
	for (i in codes) names[codes[i]] = i
	
	// Add aliases
	for (var alias in aliases) {
	  codes[alias] = aliases[alias]
	}


/***/ },
/* 161 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/uncontrollable/index.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createUncontrollable = __webpack_require__(/*! ./createUncontrollable */ 162);
	
	var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);
	
	var mixin = {
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    //let the setState trigger the update
	    return !this._notifying;
	  }
	};
	
	function set(component, propName, handler, value, args) {
	  if (handler) {
	    component._notifying = true;
	    handler.call.apply(handler, [component, value].concat(args));
	    component._notifying = false;
	  }
	
	  component._values[propName] = value;
	  component.forceUpdate();
	}
	
	exports['default'] = _createUncontrollable2['default']([mixin], set);
	module.exports = exports['default'];

/***/ },
/* 162 */
/*!*********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/uncontrollable/createUncontrollable.js ***!
  \*********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = createUncontrollable;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(/*! ./utils */ 163);
	
	var utils = _interopRequireWildcard(_utils);
	
	function createUncontrollable(mixins, set) {
	
	  return uncontrollable;
	
	  function uncontrollable(Component, controlledValues) {
	    var methods = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
	    var displayName = Component.displayName || Component.name || 'Component',
	        basePropTypes = utils.getType(Component).propTypes,
	        propTypes;
	
	    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);
	
	    methods = utils.transform(methods, function (obj, method) {
	      obj[method] = function () {
	        var _refs$inner;
	
	        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
	      };
	    }, {});
	
	    var component = _react2['default'].createClass(_extends({
	
	      displayName: 'Uncontrolled(' + displayName + ')',
	
	      mixins: mixins,
	
	      propTypes: propTypes
	
	    }, methods, {
	
	      componentWillMount: function componentWillMount() {
	        var props = this.props,
	            keys = Object.keys(controlledValues);
	
	        this._values = utils.transform(keys, function (values, key) {
	          values[key] = props[utils.defaultKey(key)];
	        }, {});
	      },
	
	      render: function render() {
	        var _this = this;
	
	        var newProps = {};
	        var _props = this.props;
	        var valueLink = _props.valueLink;
	        var checkedLink = _props.checkedLink;
	
	        var props = _objectWithoutProperties(_props, ['valueLink', 'checkedLink']);
	
	        utils.each(controlledValues, function (handle, propName) {
	          var linkPropName = utils.getLinkName(propName),
	              prop = _this.props[propName];
	
	          if (linkPropName && !isProp(_this.props, propName) && isProp(_this.props, linkPropName)) {
	            prop = _this.props[linkPropName].value;
	          }
	
	          newProps[propName] = prop !== undefined ? prop : _this._values[propName];
	
	          newProps[handle] = setAndNotify.bind(_this, propName);
	        });
	
	        newProps = _extends({}, props, newProps, { ref: 'inner' });
	
	        return _react2['default'].createElement(Component, newProps);
	      }
	    }));
	
	    component.ControlledComponent = Component;
	
	    return component;
	
	    function setAndNotify(propName, value) {
	      var linkName = utils.getLinkName(propName),
	          handler = this.props[controlledValues[propName]];
	
	      if (linkName && isProp(this.props, linkName) && !handler) {
	        handler = this.props[linkName].requestChange;
	      }
	
	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }
	
	      set(this, propName, handler, value, args);
	    }
	
	    function isProp(props, prop) {
	      return props[prop] !== undefined;
	    }
	  }
	}
	
	module.exports = exports['default'];

/***/ },
/* 163 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/uncontrollable/utils.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.customPropType = customPropType;
	exports.uncontrolledPropTypes = uncontrolledPropTypes;
	exports.getType = getType;
	exports.getLinkName = getLinkName;
	exports.defaultKey = defaultKey;
	exports.chain = chain;
	exports.transform = transform;
	exports.each = each;
	exports.has = has;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(/*! invariant */ 164);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function customPropType(handler, propType, name) {
	
	  return function (props, propName, componentName) {
	
	    if (props[propName] !== undefined) {
	      if (!props[handler]) {
	        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
	      }
	
	      return propType && propType(props, propName, name);
	    }
	  };
	}
	
	function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
	  var propTypes = {};
	
	  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
	    transform(controlledValues, function (obj, handler, prop) {
	      var type = basePropTypes[prop];
	
	      _invariant2['default'](typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);
	
	      obj[prop] = customPropType(handler, type, displayName);
	
	      if (type !== undefined) obj[defaultKey(prop)] = type;
	    }, propTypes);
	  }
	
	  return propTypes;
	}
	
	var version = _react2['default'].version.split('.').map(parseFloat);
	
	exports.version = version;
	
	function getType(component) {
	  if (version[0] === 0 && version[1] >= 13) return component;
	
	  return component.type;
	}
	
	function getLinkName(name) {
	  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
	}
	
	function defaultKey(key) {
	  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
	}
	
	function chain(thisArg, a, b) {
	  return function chainedFunction() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    a && a.call.apply(a, [thisArg].concat(args));
	    b && b.call.apply(b, [thisArg].concat(args));
	  };
	}
	
	function transform(obj, cb, seed) {
	  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	  return seed;
	}
	
	function each(obj, cb, thisArg) {
	  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);
	
	  for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	}
	
	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}

/***/ },
/* 164 */
/*!**********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/uncontrollable/~/invariant/invariant.js ***!
  \**********************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var __DEV__ = process.env.NODE_ENV !== 'production';
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (__DEV__) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 165 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/DropdownToggle.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(/*! ./Button */ 142);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _SafeAnchor = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var CARET = _react2['default'].createElement(
	  'span',
	  null,
	  ' ',
	  _react2['default'].createElement('span', { className: 'caret' })
	);
	
	var DropdownToggle = (function (_React$Component) {
	  _inherits(DropdownToggle, _React$Component);
	
	  function DropdownToggle() {
	    _classCallCheck(this, DropdownToggle);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  DropdownToggle.prototype.render = function render() {
	    var caret = this.props.noCaret ? null : CARET;
	
	    var classes = {
	      'dropdown-toggle': true
	    };
	
	    var Component = this.props.useAnchor ? _SafeAnchor2['default'] : _Button2['default'];
	
	    return _react2['default'].createElement(
	      Component,
	      _extends({}, this.props, {
	        className: _classnames2['default'](classes, this.props.className),
	        type: 'button',
	        'aria-haspopup': true,
	        'aria-expanded': this.props.open }),
	      this.props.title || this.props.children,
	      caret
	    );
	  };
	
	  return DropdownToggle;
	})(_react2['default'].Component);
	
	exports['default'] = DropdownToggle;
	
	var titleAndChildrenValidation = _utilsCustomPropTypes2['default'].singlePropFrom(['title', 'children']);
	
	DropdownToggle.defaultProps = {
	  open: false,
	  useAnchor: false,
	  bsRole: 'toggle'
	};
	
	DropdownToggle.propTypes = {
	  bsRole: _react2['default'].PropTypes.string,
	  children: titleAndChildrenValidation,
	  noCaret: _react2['default'].PropTypes.bool,
	  open: _react2['default'].PropTypes.bool,
	  title: titleAndChildrenValidation,
	  useAnchor: _react2['default'].PropTypes.bool
	};
	
	DropdownToggle.isToggle = true;
	DropdownToggle.titleProp = 'title';
	DropdownToggle.onClickProp = 'onClick';
	module.exports = exports['default'];

/***/ },
/* 166 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/SafeAnchor.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	/**
	 * Note: This is intended as a stop-gap for accessibility concerns that the
	 * Bootstrap CSS does not address as they have styled anchors and not buttons
	 * in many cases.
	 */
	
	var SafeAnchor = (function (_React$Component) {
	  _inherits(SafeAnchor, _React$Component);
	
	  function SafeAnchor(props) {
	    _classCallCheck(this, SafeAnchor);
	
	    _React$Component.call(this, props);
	
	    this.handleClick = this.handleClick.bind(this);
	  }
	
	  SafeAnchor.prototype.handleClick = function handleClick(event) {
	    if (this.props.href === undefined) {
	      event.preventDefault();
	    }
	  };
	
	  SafeAnchor.prototype.render = function render() {
	    return _react2['default'].createElement('a', _extends({ role: this.props.href ? undefined : 'button'
	    }, this.props, {
	      onClick: _utilsCreateChainedFunction2['default'](this.props.onClick, this.handleClick),
	      href: this.props.href || '' }));
	  };
	
	  return SafeAnchor;
	})(_react2['default'].Component);
	
	exports['default'] = SafeAnchor;
	
	SafeAnchor.propTypes = {
	  href: _react2['default'].PropTypes.string,
	  onClick: _react2['default'].PropTypes.func
	};
	module.exports = exports['default'];

/***/ },
/* 167 */
/*!************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/DropdownMenu.js ***!
  \************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _keycode = __webpack_require__(/*! keycode */ 160);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactOverlaysLibRootCloseWrapper = __webpack_require__(/*! react-overlays/lib/RootCloseWrapper */ 168);
	
	var _reactOverlaysLibRootCloseWrapper2 = _interopRequireDefault(_reactOverlaysLibRootCloseWrapper);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var DropdownMenu = (function (_React$Component) {
	  _inherits(DropdownMenu, _React$Component);
	
	  function DropdownMenu(props) {
	    _classCallCheck(this, DropdownMenu);
	
	    _React$Component.call(this, props);
	
	    this.focusNext = this.focusNext.bind(this);
	    this.focusPrevious = this.focusPrevious.bind(this);
	    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
	    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);
	
	    this.handleKeyDown = this.handleKeyDown.bind(this);
	  }
	
	  DropdownMenu.prototype.handleKeyDown = function handleKeyDown(event) {
	    switch (event.keyCode) {
	      case _keycode2['default'].codes.down:
	        this.focusNext();
	        event.preventDefault();
	        break;
	      case _keycode2['default'].codes.up:
	        this.focusPrevious();
	        event.preventDefault();
	        break;
	      case _keycode2['default'].codes.esc:
	      case _keycode2['default'].codes.tab:
	        this.props.onClose(event);
	        break;
	      default:
	    }
	  };
	
	  DropdownMenu.prototype.focusNext = function focusNext() {
	    var _getItemsAndActiveIndex = this.getItemsAndActiveIndex();
	
	    var items = _getItemsAndActiveIndex.items;
	    var activeItemIndex = _getItemsAndActiveIndex.activeItemIndex;
	
	    if (items.length === 0) {
	      return;
	    }
	
	    if (activeItemIndex === items.length - 1) {
	      items[0].focus();
	      return;
	    }
	
	    items[activeItemIndex + 1].focus();
	  };
	
	  DropdownMenu.prototype.focusPrevious = function focusPrevious() {
	    var _getItemsAndActiveIndex2 = this.getItemsAndActiveIndex();
	
	    var items = _getItemsAndActiveIndex2.items;
	    var activeItemIndex = _getItemsAndActiveIndex2.activeItemIndex;
	
	    if (activeItemIndex === 0) {
	      items[items.length - 1].focus();
	      return;
	    }
	
	    items[activeItemIndex - 1].focus();
	  };
	
	  DropdownMenu.prototype.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
	    var items = this.getFocusableMenuItems();
	    var activeElement = document.activeElement;
	    var activeItemIndex = items.indexOf(activeElement);
	
	    return { items: items, activeItemIndex: activeItemIndex };
	  };
	
	  DropdownMenu.prototype.getFocusableMenuItems = function getFocusableMenuItems() {
	    var menuNode = _react2['default'].findDOMNode(this);
	
	    if (menuNode === undefined) {
	      return [];
	    }
	
	    return [].slice.call(menuNode.querySelectorAll('[tabIndex="-1"]'), 0);
	  };
	
	  DropdownMenu.prototype.render = function render() {
	    var _this = this;
	
	    var items = _utilsValidComponentChildren2['default'].map(this.props.children, function (child) {
	      var _ref = child.props || {};
	
	      var children = _ref.children;
	      var onKeyDown = _ref.onKeyDown;
	      var onSelect = _ref.onSelect;
	
	      return _react2['default'].cloneElement(child, {
	        onKeyDown: _utilsCreateChainedFunction2['default'](onKeyDown, _this.handleKeyDown),
	        onSelect: _utilsCreateChainedFunction2['default'](onSelect, _this.props.onSelect)
	      }, children);
	    });
	
	    var classes = {
	      'dropdown-menu': true,
	      'dropdown-menu-right': this.props.pullRight
	    };
	
	    var list = _react2['default'].createElement(
	      'ul',
	      {
	        className: _classnames2['default'](this.props.className, classes),
	        role: 'menu',
	        'aria-labelledby': this.props.labelledBy
	      },
	      items
	    );
	
	    if (this.props.open) {
	      list = _react2['default'].createElement(
	        _reactOverlaysLibRootCloseWrapper2['default'],
	        { noWrap: true, onRootClose: this.props.onClose },
	        list
	      );
	    }
	
	    return list;
	  };
	
	  return DropdownMenu;
	})(_react2['default'].Component);
	
	DropdownMenu.defaultProps = {
	  bsRole: 'menu',
	  pullRight: false
	};
	
	DropdownMenu.propTypes = {
	  open: _react2['default'].PropTypes.bool,
	  pullRight: _react2['default'].PropTypes.bool,
	  onClose: _react2['default'].PropTypes.func,
	  labelledBy: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	  onSelect: _react2['default'].PropTypes.func
	};
	
	exports['default'] = DropdownMenu;
	module.exports = exports['default'];

/***/ },
/* 168 */
/*!*********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/RootCloseWrapper.js ***!
  \*********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsAddEventListener = __webpack_require__(/*! ./utils/addEventListener */ 169);
	
	var _utilsAddEventListener2 = _interopRequireDefault(_utilsAddEventListener);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 171);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _utilsOwnerDocument = __webpack_require__(/*! ./utils/ownerDocument */ 172);
	
	var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);
	
	// TODO: Consider using an ES6 symbol here, once we use babel-runtime.
	var CLICK_WAS_INSIDE = '__click_was_inside';
	
	function suppressRootClose(event) {
	  // Tag the native event to prevent the root close logic on document click.
	  // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
	  // which is only supported in IE >= 9.
	  event.nativeEvent[CLICK_WAS_INSIDE] = true;
	}
	
	var RootCloseWrapper = (function (_React$Component) {
	  function RootCloseWrapper(props) {
	    _classCallCheck(this, RootCloseWrapper);
	
	    _React$Component.call(this, props);
	
	    this.handleDocumentClick = this.handleDocumentClick.bind(this);
	    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
	  }
	
	  _inherits(RootCloseWrapper, _React$Component);
	
	  RootCloseWrapper.prototype.bindRootCloseHandlers = function bindRootCloseHandlers() {
	    var doc = _utilsOwnerDocument2['default'](this);
	
	    this._onDocumentClickListener = _utilsAddEventListener2['default'](doc, 'click', this.handleDocumentClick);
	
	    this._onDocumentKeyupListener = _utilsAddEventListener2['default'](doc, 'keyup', this.handleDocumentKeyUp);
	  };
	
	  RootCloseWrapper.prototype.handleDocumentClick = function handleDocumentClick(e) {
	    // This is now the native event.
	    if (e[CLICK_WAS_INSIDE]) {
	      return;
	    }
	
	    this.props.onRootClose();
	  };
	
	  RootCloseWrapper.prototype.handleDocumentKeyUp = function handleDocumentKeyUp(e) {
	    if (e.keyCode === 27) {
	      this.props.onRootClose();
	    }
	  };
	
	  RootCloseWrapper.prototype.unbindRootCloseHandlers = function unbindRootCloseHandlers() {
	    if (this._onDocumentClickListener) {
	      this._onDocumentClickListener.remove();
	    }
	
	    if (this._onDocumentKeyupListener) {
	      this._onDocumentKeyupListener.remove();
	    }
	  };
	
	  RootCloseWrapper.prototype.componentDidMount = function componentDidMount() {
	    this.bindRootCloseHandlers();
	  };
	
	  RootCloseWrapper.prototype.render = function render() {
	    var _props = this.props;
	    var noWrap = _props.noWrap;
	    var children = _props.children;
	
	    var child = _react2['default'].Children.only(children);
	
	    if (noWrap) {
	      return _react2['default'].cloneElement(child, {
	        onClick: _utilsCreateChainedFunction2['default'](suppressRootClose, child.props.onClick)
	      });
	    }
	
	    // Wrap the child in a new element, so the child won't have to handle
	    // potentially combining multiple onClick listeners.
	    return _react2['default'].createElement(
	      'div',
	      { onClick: suppressRootClose },
	      child
	    );
	  };
	
	  RootCloseWrapper.prototype.getWrappedDOMNode = function getWrappedDOMNode() {
	    // We can't use a ref to identify the wrapped child, since we might be
	    // stealing the ref from the owner, but we know exactly the DOM structure
	    // that will be rendered, so we can just do this to get the child's DOM
	    // node for doing size calculations in OverlayMixin.
	    var node = _react2['default'].findDOMNode(this);
	    return this.props.noWrap ? node : node.firstChild;
	  };
	
	  RootCloseWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.unbindRootCloseHandlers();
	  };
	
	  return RootCloseWrapper;
	})(_react2['default'].Component);
	
	exports['default'] = RootCloseWrapper;
	
	RootCloseWrapper.displayName = 'RootCloseWrapper';
	
	RootCloseWrapper.propTypes = {
	  onRootClose: _react2['default'].PropTypes.func.isRequired,
	
	  /**
	   * Passes the suppress click handler directly to the child component instead
	   * of placing it on a wrapping div. Only use when you can be sure the child
	   * properly handle the click event.
	   */
	  noWrap: _react2['default'].PropTypes.bool
	};
	module.exports = exports['default'];

/***/ },
/* 169 */
/*!***************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/utils/addEventListener.js ***!
  \***************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _domHelpersEventsOn = __webpack_require__(/*! dom-helpers/events/on */ 158);
	
	var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);
	
	var _domHelpersEventsOff = __webpack_require__(/*! dom-helpers/events/off */ 170);
	
	var _domHelpersEventsOff2 = _interopRequireDefault(_domHelpersEventsOff);
	
	exports['default'] = function (node, event, handler) {
	  _domHelpersEventsOn2['default'](node, event, handler);
	  return {
	    remove: function remove() {
	      _domHelpersEventsOff2['default'](node, event, handler);
	    }
	  };
	};
	
	module.exports = exports['default'];

/***/ },
/* 170 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/events/off.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(/*! ../util/inDOM */ 99);
	var off = function off() {};
	
	if (canUseDOM) {
	
	  off = (function () {
	
	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.removeEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.detachEvent('on' + eventName, handler);
	    };
	  })();
	}
	
	module.exports = off;

/***/ },
/* 171 */
/*!********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/utils/createChainedFunction.js ***!
  \********************************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} functions to chain
	 * @returns {function|null}
	 */
	'use strict';
	
	exports.__esModule = true;
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return funcs.filter(function (f) {
	    return f != null;
	  }).reduce(function (acc, f) {
	    if (typeof f !== 'function') {
	      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
	    }
	
	    if (acc === null) {
	      return f;
	    }
	
	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      acc.apply(this, args);
	      f.apply(this, args);
	    };
	  }, null);
	}
	
	exports['default'] = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 172 */
/*!************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/utils/ownerDocument.js ***!
  \************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _domHelpersOwnerDocument = __webpack_require__(/*! dom-helpers/ownerDocument */ 100);
	
	var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);
	
	exports['default'] = function (componentOrElement) {
	  return _domHelpersOwnerDocument2['default'](_react2['default'].findDOMNode(componentOrElement));
	};
	
	module.exports = exports['default'];

/***/ },
/* 173 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/collection/find.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(/*! ../internal/baseEach */ 174),
	    createFind = __webpack_require__(/*! ../internal/createFind */ 195);
	
	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias detect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.result(_.find(users, function(chr) {
	 *   return chr.age < 40;
	 * }), 'user');
	 * // => 'barney'
	 *
	 * // using the `_.matches` callback shorthand
	 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	 * // => 'pebbles'
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.result(_.find(users, 'active', false), 'user');
	 * // => 'fred'
	 *
	 * // using the `_.property` callback shorthand
	 * _.result(_.find(users, 'active'), 'user');
	 * // => 'barney'
	 */
	var find = createFind(baseEach);
	
	module.exports = find;


/***/ },
/* 174 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseEach.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(/*! ./baseForOwn */ 175),
	    createBaseEach = __webpack_require__(/*! ./createBaseEach */ 194);
	
	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 175 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseForOwn.js ***!
  \************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(/*! ./baseFor */ 176),
	    keys = __webpack_require__(/*! ../object/keys */ 180);
	
	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 176 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseFor.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(/*! ./createBaseFor */ 177);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 177 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/createBaseFor.js ***!
  \***************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(/*! ./toObject */ 178);
	
	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;
	
	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 178 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/toObject.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ../lang/isObject */ 179);
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	module.exports = toObject;


/***/ },
/* 179 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/lang/isObject.js ***!
  \******************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 180 */
/*!****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/object/keys.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ../internal/getNative */ 181),
	    isArrayLike = __webpack_require__(/*! ../internal/isArrayLike */ 185),
	    isObject = __webpack_require__(/*! ../lang/isObject */ 179),
	    shimKeys = __webpack_require__(/*! ../internal/shimKeys */ 189);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	module.exports = keys;


/***/ },
/* 181 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/getNative.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(/*! ../lang/isNative */ 182);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 182 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/lang/isNative.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(/*! ./isFunction */ 183),
	    isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 184);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 183 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/lang/isFunction.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./isObject */ 179);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 184 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/isObjectLike.js ***!
  \**************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 185 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/isArrayLike.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(/*! ./getLength */ 186),
	    isLength = __webpack_require__(/*! ./isLength */ 188);
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 186 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/getLength.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(/*! ./baseProperty */ 187);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 187 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseProperty.js ***!
  \**************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 188 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/isLength.js ***!
  \**********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 189 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/shimKeys.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(/*! ../lang/isArguments */ 190),
	    isArray = __webpack_require__(/*! ../lang/isArray */ 191),
	    isIndex = __webpack_require__(/*! ./isIndex */ 192),
	    isLength = __webpack_require__(/*! ./isLength */ 188),
	    keysIn = __webpack_require__(/*! ../object/keysIn */ 193);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = shimKeys;


/***/ },
/* 190 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/lang/isArguments.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(/*! ../internal/isArrayLike */ 185),
	    isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 184);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 191 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/lang/isArray.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ../internal/getNative */ 181),
	    isLength = __webpack_require__(/*! ../internal/isLength */ 188),
	    isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 184);
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	module.exports = isArray;


/***/ },
/* 192 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/isIndex.js ***!
  \*********************************************************************************************/
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 193 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/object/keysIn.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(/*! ../lang/isArguments */ 190),
	    isArray = __webpack_require__(/*! ../lang/isArray */ 191),
	    isIndex = __webpack_require__(/*! ../internal/isIndex */ 192),
	    isLength = __webpack_require__(/*! ../internal/isLength */ 188),
	    isObject = __webpack_require__(/*! ../lang/isObject */ 179);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 194 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/createBaseEach.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(/*! ./getLength */ 186),
	    isLength = __webpack_require__(/*! ./isLength */ 188),
	    toObject = __webpack_require__(/*! ./toObject */ 178);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 195 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/createFind.js ***!
  \************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(/*! ./baseCallback */ 196),
	    baseFind = __webpack_require__(/*! ./baseFind */ 220),
	    baseFindIndex = __webpack_require__(/*! ./baseFindIndex */ 221),
	    isArray = __webpack_require__(/*! ../lang/isArray */ 191);
	
	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(eachFunc, fromRight) {
	  return function(collection, predicate, thisArg) {
	    predicate = baseCallback(predicate, thisArg, 3);
	    if (isArray(collection)) {
	      var index = baseFindIndex(collection, predicate, fromRight);
	      return index > -1 ? collection[index] : undefined;
	    }
	    return baseFind(collection, predicate, eachFunc);
	  };
	}
	
	module.exports = createFind;


/***/ },
/* 196 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseCallback.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(/*! ./baseMatches */ 197),
	    baseMatchesProperty = __webpack_require__(/*! ./baseMatchesProperty */ 209),
	    bindCallback = __webpack_require__(/*! ./bindCallback */ 216),
	    identity = __webpack_require__(/*! ../utility/identity */ 217),
	    property = __webpack_require__(/*! ../utility/property */ 218);
	
	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}
	
	module.exports = baseCallback;


/***/ },
/* 197 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseMatches.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(/*! ./baseIsMatch */ 198),
	    getMatchData = __webpack_require__(/*! ./getMatchData */ 206),
	    toObject = __webpack_require__(/*! ./toObject */ 178);
	
	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];
	
	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 198 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseIsMatch.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(/*! ./baseIsEqual */ 199),
	    toObject = __webpack_require__(/*! ./toObject */ 178);
	
	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 199 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseIsEqual.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(/*! ./baseIsEqualDeep */ 200),
	    isObject = __webpack_require__(/*! ../lang/isObject */ 179),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 184);
	
	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 200 */
/*!*****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseIsEqualDeep.js ***!
  \*****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(/*! ./equalArrays */ 201),
	    equalByTag = __webpack_require__(/*! ./equalByTag */ 203),
	    equalObjects = __webpack_require__(/*! ./equalObjects */ 204),
	    isArray = __webpack_require__(/*! ../lang/isArray */ 191),
	    isTypedArray = __webpack_require__(/*! ../lang/isTypedArray */ 205);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);
	
	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);
	
	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
	
	  stackA.pop();
	  stackB.pop();
	
	  return result;
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 201 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/equalArrays.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(/*! ./arraySome */ 202);
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
	
	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = equalArrays;


/***/ },
/* 202 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/arraySome.js ***!
  \***********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 203 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/equalByTag.js ***!
  \************************************************************************************************/
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 204 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/equalObjects.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(/*! ../object/keys */ 180);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;
	
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = equalObjects;


/***/ },
/* 205 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/lang/isTypedArray.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(/*! ../internal/isLength */ 188),
	    isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 184);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 206 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/getMatchData.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(/*! ./isStrictComparable */ 207),
	    pairs = __webpack_require__(/*! ../object/pairs */ 208);
	
	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;
	
	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 207 */
/*!********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/isStrictComparable.js ***!
  \********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ../lang/isObject */ 179);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 208 */
/*!*****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/object/pairs.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(/*! ./keys */ 180),
	    toObject = __webpack_require__(/*! ../internal/toObject */ 178);
	
	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);
	
	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);
	
	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}
	
	module.exports = pairs;


/***/ },
/* 209 */
/*!*********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseMatchesProperty.js ***!
  \*********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(/*! ./baseGet */ 210),
	    baseIsEqual = __webpack_require__(/*! ./baseIsEqual */ 199),
	    baseSlice = __webpack_require__(/*! ./baseSlice */ 211),
	    isArray = __webpack_require__(/*! ../lang/isArray */ 191),
	    isKey = __webpack_require__(/*! ./isKey */ 212),
	    isStrictComparable = __webpack_require__(/*! ./isStrictComparable */ 207),
	    last = __webpack_require__(/*! ../array/last */ 213),
	    toObject = __webpack_require__(/*! ./toObject */ 178),
	    toPath = __webpack_require__(/*! ./toPath */ 214);
	
	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');
	
	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 210 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseGet.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(/*! ./toObject */ 178);
	
	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 211 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseSlice.js ***!
  \***********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.exports = baseSlice;


/***/ },
/* 212 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/isKey.js ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(/*! ../lang/isArray */ 191),
	    toObject = __webpack_require__(/*! ./toObject */ 178);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}
	
	module.exports = isKey;


/***/ },
/* 213 */
/*!***************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/array/last.js ***!
  \***************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}
	
	module.exports = last;


/***/ },
/* 214 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/toPath.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(/*! ./baseToString */ 215),
	    isArray = __webpack_require__(/*! ../lang/isArray */ 191);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.exports = toPath;


/***/ },
/* 215 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseToString.js ***!
  \**************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}
	
	module.exports = baseToString;


/***/ },
/* 216 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/bindCallback.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(/*! ../utility/identity */ 217);
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	module.exports = bindCallback;


/***/ },
/* 217 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/utility/identity.js ***!
  \*********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 218 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/utility/property.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(/*! ../internal/baseProperty */ 187),
	    basePropertyDeep = __webpack_require__(/*! ../internal/basePropertyDeep */ 219),
	    isKey = __webpack_require__(/*! ../internal/isKey */ 212);
	
	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 219 */
/*!******************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/basePropertyDeep.js ***!
  \******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(/*! ./baseGet */ 210),
	    toPath = __webpack_require__(/*! ./toPath */ 214);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 220 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseFind.js ***!
  \**********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	 * without support for callback shorthands and `this` binding, which iterates
	 * over `collection` using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element
	 *  instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}
	
	module.exports = baseFind;


/***/ },
/* 221 */
/*!***************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseFindIndex.js ***!
  \***************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 222 */
/*!****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/object/omit.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(/*! ../internal/arrayMap */ 223),
	    baseDifference = __webpack_require__(/*! ../internal/baseDifference */ 224),
	    baseFlatten = __webpack_require__(/*! ../internal/baseFlatten */ 231),
	    bindCallback = __webpack_require__(/*! ../internal/bindCallback */ 216),
	    keysIn = __webpack_require__(/*! ./keysIn */ 193),
	    pickByArray = __webpack_require__(/*! ../internal/pickByArray */ 233),
	    pickByCallback = __webpack_require__(/*! ../internal/pickByCallback */ 234),
	    restParam = __webpack_require__(/*! ../function/restParam */ 236);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to omit, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.omit(object, 'age');
	 * // => { 'user': 'fred' }
	 *
	 * _.omit(object, _.isNumber);
	 * // => { 'user': 'fred' }
	 */
	var omit = restParam(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  if (typeof props[0] != 'function') {
	    var props = arrayMap(baseFlatten(props), String);
	    return pickByArray(object, baseDifference(keysIn(object), props));
	  }
	  var predicate = bindCallback(props[0], props[1], 3);
	  return pickByCallback(object, function(value, key, object) {
	    return !predicate(value, key, object);
	  });
	});
	
	module.exports = omit;


/***/ },
/* 223 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/arrayMap.js ***!
  \**********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 224 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseDifference.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(/*! ./baseIndexOf */ 225),
	    cacheIndexOf = __webpack_require__(/*! ./cacheIndexOf */ 227),
	    createCache = __webpack_require__(/*! ./createCache */ 228);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var length = array ? array.length : 0,
	      result = [];
	
	  if (!length) {
	    return result;
	  }
	  var index = -1,
	      indexOf = baseIndexOf,
	      isCommon = true,
	      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	      valuesLength = values.length;
	
	  if (cache) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	    values = cache;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index];
	
	    if (isCommon && value === value) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === value) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (indexOf(values, value, 0) < 0) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 225 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseIndexOf.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(/*! ./indexOfNaN */ 226);
	
	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 226 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/indexOfNaN.js ***!
  \************************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = indexOfNaN;


/***/ },
/* 227 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/cacheIndexOf.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ../lang/isObject */ 179);
	
	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
	
	  return result ? 0 : -1;
	}
	
	module.exports = cacheIndexOf;


/***/ },
/* 228 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/createCache.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(/*! ./SetCache */ 229),
	    getNative = __webpack_require__(/*! ./getNative */ 181);
	
	/** Native method references. */
	var Set = getNative(global, 'Set');
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');
	
	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}
	
	module.exports = createCache;


/***/ },
/* 229 */
/*!**********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/SetCache.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var cachePush = __webpack_require__(/*! ./cachePush */ 230),
	    getNative = __webpack_require__(/*! ./getNative */ 181);
	
	/** Native method references. */
	var Set = getNative(global, 'Set');
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');
	
	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;
	
	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}
	
	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;
	
	module.exports = SetCache;


/***/ },
/* 230 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/cachePush.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ../lang/isObject */ 179);
	
	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}
	
	module.exports = cachePush;


/***/ },
/* 231 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseFlatten.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(/*! ./arrayPush */ 232),
	    isArguments = __webpack_require__(/*! ../lang/isArguments */ 190),
	    isArray = __webpack_require__(/*! ../lang/isArray */ 191),
	    isArrayLike = __webpack_require__(/*! ./isArrayLike */ 185),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 184);
	
	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);
	
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 232 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/arrayPush.js ***!
  \***********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	module.exports = arrayPush;


/***/ },
/* 233 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/pickByArray.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(/*! ./toObject */ 178);
	
	/**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function pickByArray(object, props) {
	  object = toObject(object);
	
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index];
	    if (key in object) {
	      result[key] = object[key];
	    }
	  }
	  return result;
	}
	
	module.exports = pickByArray;


/***/ },
/* 234 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/pickByCallback.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(/*! ./baseForIn */ 235);
	
	/**
	 * A specialized version of `_.pick` which picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
	function pickByCallback(object, predicate) {
	  var result = {};
	  baseForIn(object, function(value, key, object) {
	    if (predicate(value, key, object)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}
	
	module.exports = pickByCallback;


/***/ },
/* 235 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/internal/baseForIn.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(/*! ./baseFor */ 176),
	    keysIn = __webpack_require__(/*! ../object/keysIn */ 193);
	
	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}
	
	module.exports = baseForIn;


/***/ },
/* 236 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/function/restParam.js ***!
  \***********************************************************************************************/
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 237 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/DropdownButton.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _Dropdown = __webpack_require__(/*! ./Dropdown */ 159);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _NavDropdown = __webpack_require__(/*! ./NavDropdown */ 238);
	
	var _NavDropdown2 = _interopRequireDefault(_NavDropdown);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var _lodashObjectOmit = __webpack_require__(/*! lodash/object/omit */ 222);
	
	var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);
	
	var DropdownButton = (function (_React$Component) {
	  _inherits(DropdownButton, _React$Component);
	
	  function DropdownButton(props) {
	    _classCallCheck(this, DropdownButton);
	
	    _React$Component.call(this, props);
	  }
	
	  DropdownButton.prototype.render = function render() {
	    var _props = this.props;
	    var title = _props.title;
	    var navItem = _props.navItem;
	
	    var props = _objectWithoutProperties(_props, ['title', 'navItem']);
	
	    var toggleProps = _lodashObjectOmit2['default'](props, _Dropdown2['default'].ControlledComponent.propTypes);
	
	    if (navItem) {
	      return _react2['default'].createElement(_NavDropdown2['default'], this.props);
	    }
	
	    return _react2['default'].createElement(
	      _Dropdown2['default'],
	      props,
	      _react2['default'].createElement(
	        _Dropdown2['default'].Toggle,
	        toggleProps,
	        title
	      ),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Menu,
	        null,
	        this.props.children
	      )
	    );
	  };
	
	  return DropdownButton;
	})(_react2['default'].Component);
	
	DropdownButton.propTypes = _extends({
	  /**
	   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
	   */
	  noCaret: _react2['default'].PropTypes.bool,
	
	  /**
	   * Specify whether this Dropdown is part of a Nav component
	   *
	   * @type {bool}
	   * @deprecated Use the `NavDropdown` instead.
	   */
	  navItem: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.bool, function (props) {
	    if (props.navItem) {
	      _utilsDeprecationWarning2['default']('navItem', 'NavDropdown component', 'https://github.com/react-bootstrap/react-bootstrap/issues/526');
	    }
	  }]),
	  title: _react2['default'].PropTypes.node.isRequired
	}, _Dropdown2['default'].propTypes, _BootstrapMixin2['default'].propTypes);
	
	DropdownButton.defaultProps = {
	  pullRight: false,
	  dropup: false,
	  navItem: false,
	  noCaret: false
	};
	
	exports['default'] = DropdownButton;
	module.exports = exports['default'];

/***/ },
/* 238 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/NavDropdown.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dropdown = __webpack_require__(/*! ./Dropdown */ 159);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var NavDropdown = (function (_React$Component) {
	  _inherits(NavDropdown, _React$Component);
	
	  function NavDropdown() {
	    _classCallCheck(this, NavDropdown);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  NavDropdown.prototype.render = function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var title = _props.title;
	    var noCaret = _props.noCaret;
	
	    var props = _objectWithoutProperties(_props, ['children', 'title', 'noCaret']);
	
	    return _react2['default'].createElement(
	      _Dropdown2['default'],
	      _extends({}, props, { componentClass: 'li' }),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Toggle,
	        {
	          useAnchor: true,
	          disabled: props.disabled,
	          noCaret: noCaret
	        },
	        title
	      ),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Menu,
	        null,
	        children
	      )
	    );
	  };
	
	  return NavDropdown;
	})(_react2['default'].Component);
	
	NavDropdown.propTypes = _extends({
	  noCaret: _react2['default'].PropTypes.bool,
	  title: _react2['default'].PropTypes.node.isRequired
	}, _Dropdown2['default'].propTypes);
	
	exports['default'] = NavDropdown;
	module.exports = exports['default'];

/***/ },
/* 239 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/SplitButton.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _Button = __webpack_require__(/*! ./Button */ 142);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Dropdown = __webpack_require__(/*! ./Dropdown */ 159);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _SplitToggle = __webpack_require__(/*! ./SplitToggle */ 240);
	
	var _SplitToggle2 = _interopRequireDefault(_SplitToggle);
	
	var SplitButton = (function (_React$Component) {
	  _inherits(SplitButton, _React$Component);
	
	  function SplitButton() {
	    _classCallCheck(this, SplitButton);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  SplitButton.prototype.render = function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var title = _props.title;
	    var onClick = _props.onClick;
	    var target = _props.target;
	    var href = _props.href;
	    var
	    // bsStyle is validated by 'Button' component
	    bsStyle = _props.bsStyle;
	
	    var props = _objectWithoutProperties(_props, ['children', 'title', 'onClick', 'target', 'href', 'bsStyle']);
	
	    var disabled = props.disabled;
	
	    var button = _react2['default'].createElement(
	      _Button2['default'],
	      {
	        onClick: onClick,
	        bsStyle: bsStyle,
	        disabled: disabled,
	        target: target,
	        href: href
	      },
	      title
	    );
	
	    return _react2['default'].createElement(
	      _Dropdown2['default'],
	      props,
	      button,
	      _react2['default'].createElement(_SplitToggle2['default'], {
	        'aria-label': title,
	        bsStyle: bsStyle,
	        disabled: disabled
	      }),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Menu,
	        null,
	        children
	      )
	    );
	  };
	
	  return SplitButton;
	})(_react2['default'].Component);
	
	SplitButton.propTypes = _extends({}, _Dropdown2['default'].propTypes, _BootstrapMixin2['default'].propTypes, {
	
	  /**
	   * @private
	   */
	  onClick: function onClick() {},
	  target: _react2['default'].PropTypes.string,
	  href: _react2['default'].PropTypes.string,
	  /**
	   * The content of the split button.
	   */
	  title: _react2['default'].PropTypes.node.isRequired
	});
	
	SplitButton.defaultProps = {
	  disabled: false,
	  dropup: false,
	  pullRight: false
	};
	
	SplitButton.Toggle = _SplitToggle2['default'];
	
	exports['default'] = SplitButton;
	module.exports = exports['default'];
	// eslint-disable-line

/***/ },
/* 240 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/SplitToggle.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _DropdownToggle = __webpack_require__(/*! ./DropdownToggle */ 165);
	
	var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);
	
	var SplitToggle = (function (_React$Component) {
	  _inherits(SplitToggle, _React$Component);
	
	  function SplitToggle() {
	    _classCallCheck(this, SplitToggle);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  SplitToggle.prototype.render = function render() {
	    return _react2['default'].createElement(_DropdownToggle2['default'], _extends({}, this.props, {
	      useAnchor: false,
	      noCaret: false
	    }));
	  };
	
	  return SplitToggle;
	})(_react2['default'].Component);
	
	exports['default'] = SplitToggle;
	
	SplitToggle.defaultProps = _DropdownToggle2['default'].defaultProps;
	module.exports = exports['default'];

/***/ },
/* 241 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/FadeMixin.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDomUtils = __webpack_require__(/*! ./utils/domUtils */ 98);
	
	var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	// TODO: listen for onTransitionEnd to remove el
	function getElementsAndSelf(root, classes) {
	  var els = root.querySelectorAll('.' + classes.join('.'));
	
	  els = [].map.call(els, function (e) {
	    return e;
	  });
	
	  for (var i = 0; i < classes.length; i++) {
	    if (!root.className.match(new RegExp('\\b' + classes[i] + '\\b'))) {
	      return els;
	    }
	  }
	  els.unshift(root);
	  return els;
	}
	
	exports['default'] = {
	  componentWillMount: function componentWillMount() {
	    _utilsDeprecationWarning2['default']('FadeMixin', 'Fade Component');
	  },
	
	  _fadeIn: function _fadeIn() {
	    var els = undefined;
	
	    if (this.isMounted()) {
	      els = getElementsAndSelf(_react2['default'].findDOMNode(this), ['fade']);
	
	      if (els.length) {
	        els.forEach(function (el) {
	          el.className += ' in';
	        });
	      }
	    }
	  },
	
	  _fadeOut: function _fadeOut() {
	    var els = getElementsAndSelf(this._fadeOutEl, ['fade', 'in']);
	
	    if (els.length) {
	      els.forEach(function (el) {
	        el.className = el.className.replace(/\bin\b/, '');
	      });
	    }
	
	    setTimeout(this._handleFadeOutEnd, 300);
	  },
	
	  _handleFadeOutEnd: function _handleFadeOutEnd() {
	    if (this._fadeOutEl && this._fadeOutEl.parentNode) {
	      this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
	    }
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (document.querySelectorAll) {
	      // Firefox needs delay for transition to be triggered
	      setTimeout(this._fadeIn, 20);
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    var els = getElementsAndSelf(_react2['default'].findDOMNode(this), ['fade']);
	    var container = this.props.container && _react2['default'].findDOMNode(this.props.container) || _utilsDomUtils2['default'].ownerDocument(this).body;
	
	    if (els.length) {
	      this._fadeOutEl = document.createElement('div');
	      container.appendChild(this._fadeOutEl);
	      this._fadeOutEl.appendChild(_react2['default'].findDOMNode(this).cloneNode(true));
	      // Firefox needs delay for transition to be triggered
	      setTimeout(this._fadeOut, 20);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 242 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Grid.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var Grid = _react2['default'].createClass({
	  displayName: 'Grid',
	
	  propTypes: {
	    /**
	     * Turn any fixed-width grid layout into a full-width layout by this property.
	     *
	     * Adds `container-fluid` class.
	     */
	    fluid: _react2['default'].PropTypes.bool,
	    /**
	     * You can use a custom element for this component
	     */
	    componentClass: _utilsCustomPropTypes2['default'].elementType
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      componentClass: 'div',
	      fluid: false
	    };
	  },
	
	  render: function render() {
	    var ComponentClass = this.props.componentClass;
	    var className = this.props.fluid ? 'container-fluid' : 'container';
	
	    return _react2['default'].createElement(
	      ComponentClass,
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, className) }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Grid;
	module.exports = exports['default'];

/***/ },
/* 243 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Input.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 82)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InputBase2 = __webpack_require__(/*! ./InputBase */ 145);
	
	var _InputBase3 = _interopRequireDefault(_InputBase2);
	
	var _FormControls = __webpack_require__(/*! ./FormControls */ 244);
	
	var FormControls = _interopRequireWildcard(_FormControls);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var Input = (function (_InputBase) {
	  _inherits(Input, _InputBase);
	
	  function Input() {
	    _classCallCheck(this, Input);
	
	    _InputBase.apply(this, arguments);
	  }
	
	  Input.prototype.render = function render() {
	    if (this.props.type === 'static') {
	      _utilsDeprecationWarning2['default']('Input type=static', 'StaticText');
	      return _react2['default'].createElement(FormControls.Static, this.props);
	    }
	
	    return _InputBase.prototype.render.call(this);
	  };
	
	  return Input;
	})(_InputBase3['default']);
	
	Input.propTypes = {
	  type: _react2['default'].PropTypes.string
	};
	
	exports['default'] = Input;
	module.exports = exports['default'];

/***/ },
/* 244 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/FormControls/index.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _Static2 = __webpack_require__(/*! ./Static */ 245);
	
	var _Static3 = _interopRequireDefault(_Static2);
	
	exports.Static = _Static3['default'];

/***/ },
/* 245 */
/*!*******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/FormControls/Static.js ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _InputBase2 = __webpack_require__(/*! ../InputBase */ 145);
	
	var _InputBase3 = _interopRequireDefault(_InputBase2);
	
	var _utilsChildrenValueInputValidation = __webpack_require__(/*! ../utils/childrenValueInputValidation */ 118);
	
	var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);
	
	var Static = (function (_InputBase) {
	  _inherits(Static, _InputBase);
	
	  function Static() {
	    _classCallCheck(this, Static);
	
	    _InputBase.apply(this, arguments);
	  }
	
	  Static.prototype.getValue = function getValue() {
	    var _props = this.props;
	    var children = _props.children;
	    var value = _props.value;
	
	    return children ? children : value;
	  };
	
	  Static.prototype.renderInput = function renderInput() {
	    return _react2['default'].createElement(
	      'p',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control-static'), ref: 'input', key: 'input' }),
	      this.getValue()
	    );
	  };
	
	  return Static;
	})(_InputBase3['default']);
	
	Static.propTypes = {
	  value: _utilsChildrenValueInputValidation2['default'],
	  children: _utilsChildrenValueInputValidation2['default']
	};
	
	exports['default'] = Static;
	module.exports = exports['default'];

/***/ },
/* 246 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Interpolate.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://www.npmjs.org/package/react-interpolate-component
	// TODO: Drop this in favor of es6 string interpolation
	
	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var REGEXP = /\%\((.+?)\)s/;
	
	var Interpolate = _react2['default'].createClass({
	  displayName: 'Interpolate',
	
	  propTypes: {
	    component: _react2['default'].PropTypes.node,
	    format: _react2['default'].PropTypes.string,
	    unsafe: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'span',
	      unsafe: false
	    };
	  },
	
	  render: function render() {
	    var format = _utilsValidComponentChildren2['default'].hasValidComponent(this.props.children) || typeof this.props.children === 'string' ? this.props.children : this.props.format;
	    var parent = this.props.component;
	    var unsafe = this.props.unsafe === true;
	    var props = _extends({}, this.props);
	
	    delete props.children;
	    delete props.format;
	    delete props.component;
	    delete props.unsafe;
	
	    if (unsafe) {
	      var content = format.split(REGEXP).reduce(function (memo, match, index) {
	        var html = undefined;
	
	        if (index % 2 === 0) {
	          html = match;
	        } else {
	          html = props[match];
	          delete props[match];
	        }
	
	        if (_react2['default'].isValidElement(html)) {
	          throw new Error('cannot interpolate a React component into unsafe text');
	        }
	
	        memo += html;
	
	        return memo;
	      }, '');
	
	      props.dangerouslySetInnerHTML = { __html: content };
	
	      return _react2['default'].createElement(parent, props);
	    } else {
	      var kids = format.split(REGEXP).reduce(function (memo, match, index) {
	        var child = undefined;
	
	        if (index % 2 === 0) {
	          if (match.length === 0) {
	            return memo;
	          }
	
	          child = match;
	        } else {
	          child = props[match];
	          delete props[match];
	        }
	
	        memo.push(child);
	
	        return memo;
	      }, []);
	
	      return _react2['default'].createElement(parent, props, kids);
	    }
	  }
	});
	
	exports['default'] = Interpolate;
	module.exports = exports['default'];

/***/ },
/* 247 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Jumbotron.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var Jumbotron = _react2['default'].createClass({
	  displayName: 'Jumbotron',
	
	  propTypes: {
	    /**
	     * You can use a custom element for this component
	     */
	    componentClass: _utilsCustomPropTypes2['default'].elementType
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return { componentClass: 'div' };
	  },
	
	  render: function render() {
	    var ComponentClass = this.props.componentClass;
	
	    return _react2['default'].createElement(
	      ComponentClass,
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'jumbotron') }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Jumbotron;
	module.exports = exports['default'];

/***/ },
/* 248 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Label.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var Label = _react2['default'].createClass({
	  displayName: 'Label',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'label',
	      bsStyle: 'default'
	    };
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	
	    return _react2['default'].createElement(
	      'span',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Label;
	module.exports = exports['default'];

/***/ },
/* 249 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ListGroup.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var ListGroup = (function (_React$Component) {
	  _inherits(ListGroup, _React$Component);
	
	  function ListGroup() {
	    _classCallCheck(this, ListGroup);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  ListGroup.prototype.render = function render() {
	    var _this = this;
	
	    var items = _utilsValidComponentChildren2['default'].map(this.props.children, function (item, index) {
	      return _react.cloneElement(item, { key: item.key ? item.key : index });
	    });
	
	    var shouldRenderDiv = false;
	
	    if (!this.props.children) {
	      shouldRenderDiv = true;
	    } else {
	      _utilsValidComponentChildren2['default'].forEach(this.props.children, function (child) {
	        if (_this.isAnchorOrButton(child.props)) {
	          shouldRenderDiv = true;
	        }
	      });
	    }
	
	    if (shouldRenderDiv) {
	      return this.renderDiv(items);
	    } else {
	      return this.renderUL(items);
	    }
	  };
	
	  ListGroup.prototype.isAnchorOrButton = function isAnchorOrButton(props) {
	    return props.href || props.onClick;
	  };
	
	  ListGroup.prototype.renderUL = function renderUL(items) {
	    var listItems = _utilsValidComponentChildren2['default'].map(items, function (item) {
	      return _react.cloneElement(item, { listItem: true });
	    });
	
	    return _react2['default'].createElement(
	      'ul',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, 'list-group') }),
	      listItems
	    );
	  };
	
	  ListGroup.prototype.renderDiv = function renderDiv(items) {
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, 'list-group') }),
	      items
	    );
	  };
	
	  return ListGroup;
	})(_react2['default'].Component);
	
	ListGroup.propTypes = {
	  className: _react2['default'].PropTypes.string,
	  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
	};
	
	exports['default'] = ListGroup;
	module.exports = exports['default'];

/***/ },
/* 250 */
/*!*************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ListGroupItem.js ***!
  \*************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var ListGroupItem = _react2['default'].createClass({
	  displayName: 'ListGroupItem',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    bsStyle: _react2['default'].PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
	    className: _react2['default'].PropTypes.string,
	    active: _react2['default'].PropTypes.any,
	    disabled: _react2['default'].PropTypes.any,
	    header: _react2['default'].PropTypes.node,
	    listItem: _react2['default'].PropTypes.bool,
	    onClick: _react2['default'].PropTypes.func,
	    eventKey: _react2['default'].PropTypes.any,
	    href: _react2['default'].PropTypes.string,
	    target: _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'list-group-item',
	      listItem: false
	    };
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	
	    classes.active = this.props.active;
	    classes.disabled = this.props.disabled;
	
	    if (this.props.href) {
	      return this.renderAnchor(classes);
	    } else if (this.props.onClick) {
	      return this.renderButton(classes);
	    } else if (this.props.listItem) {
	      return this.renderLi(classes);
	    } else {
	      return this.renderSpan(classes);
	    }
	  },
	
	  renderLi: function renderLi(classes) {
	    return _react2['default'].createElement(
	      'li',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      this.props.header ? this.renderStructuredContent() : this.props.children
	    );
	  },
	
	  renderAnchor: function renderAnchor(classes) {
	    return _react2['default'].createElement(
	      'a',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, classes)
	      }),
	      this.props.header ? this.renderStructuredContent() : this.props.children
	    );
	  },
	
	  renderButton: function renderButton(classes) {
	    return _react2['default'].createElement(
	      'button',
	      _extends({
	        type: 'button'
	      }, this.props, {
	        className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  },
	
	  renderSpan: function renderSpan(classes) {
	    return _react2['default'].createElement(
	      'span',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      this.props.header ? this.renderStructuredContent() : this.props.children
	    );
	  },
	
	  renderStructuredContent: function renderStructuredContent() {
	    var header = undefined;
	    if (_react2['default'].isValidElement(this.props.header)) {
	      header = _react.cloneElement(this.props.header, {
	        key: 'header',
	        className: _classnames2['default'](this.props.header.props.className, 'list-group-item-heading')
	      });
	    } else {
	      header = _react2['default'].createElement(
	        'h4',
	        { key: 'header', className: 'list-group-item-heading' },
	        this.props.header
	      );
	    }
	
	    var content = _react2['default'].createElement(
	      'p',
	      { key: 'content', className: 'list-group-item-text' },
	      this.props.children
	    );
	
	    return [header, content];
	  }
	});
	
	exports['default'] = ListGroupItem;
	module.exports = exports['default'];

/***/ },
/* 251 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/MenuItem.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _SafeAnchor = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var MenuItem = (function (_React$Component) {
	  _inherits(MenuItem, _React$Component);
	
	  function MenuItem(props) {
	    _classCallCheck(this, MenuItem);
	
	    _React$Component.call(this, props);
	
	    this.handleClick = this.handleClick.bind(this);
	  }
	
	  MenuItem.prototype.handleClick = function handleClick(event) {
	    if (!this.props.href || this.props.disabled) {
	      event.preventDefault();
	    }
	
	    if (this.props.disabled) {
	      return;
	    }
	
	    if (this.props.onSelect) {
	      this.props.onSelect(event, this.props.eventKey);
	    }
	  };
	
	  MenuItem.prototype.render = function render() {
	    if (this.props.divider) {
	      return _react2['default'].createElement('li', { role: 'separator', className: 'divider' });
	    }
	
	    if (this.props.header) {
	      return _react2['default'].createElement(
	        'li',
	        { role: 'heading', className: 'dropdown-header' },
	        this.props.children
	      );
	    }
	
	    var classes = {
	      disabled: this.props.disabled,
	      active: this.props.active
	    };
	
	    return _react2['default'].createElement(
	      'li',
	      { role: 'presentation',
	        className: _classnames2['default'](this.props.className, classes),
	        style: this.props.style
	      },
	      _react2['default'].createElement(
	        _SafeAnchor2['default'],
	        {
	          role: 'menuitem',
	          tabIndex: '-1',
	          id: this.props.id,
	          target: this.props.target,
	          title: this.props.title,
	          href: this.props.href || '',
	          onKeyDown: this.props.onKeyDown,
	          onClick: this.handleClick },
	        this.props.children
	      )
	    );
	  };
	
	  return MenuItem;
	})(_react2['default'].Component);
	
	exports['default'] = MenuItem;
	
	MenuItem.propTypes = {
	  disabled: _react2['default'].PropTypes.bool,
	  active: _react2['default'].PropTypes.bool,
	  divider: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.bool, function (props) {
	    if (props.divider && props.children) {
	      return new Error('Children will not be rendered for dividers');
	    }
	  }]),
	  eventKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  header: _react2['default'].PropTypes.bool,
	  href: _react2['default'].PropTypes.string,
	  target: _react2['default'].PropTypes.string,
	  title: _react2['default'].PropTypes.string,
	  onKeyDown: _react2['default'].PropTypes.func,
	  onSelect: _react2['default'].PropTypes.func,
	  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
	};
	
	MenuItem.defaultProps = {
	  divider: false,
	  disabled: false,
	  header: false
	};
	module.exports = exports['default'];

/***/ },
/* 252 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Modal.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable react/prop-types */
	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _Object$isFrozen = __webpack_require__(/*! babel-runtime/core-js/object/is-frozen */ 253)['default'];
	
	var _Object$keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 68)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsDomUtils = __webpack_require__(/*! ./utils/domUtils */ 98);
	
	var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);
	
	var _domHelpersUtilScrollbarSize = __webpack_require__(/*! dom-helpers/util/scrollbarSize */ 256);
	
	var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);
	
	var _utilsEventListener = __webpack_require__(/*! ./utils/EventListener */ 139);
	
	var _utilsEventListener2 = _interopRequireDefault(_utilsEventListener);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _reactOverlaysLibPortal = __webpack_require__(/*! react-overlays/lib/Portal */ 257);
	
	var _reactOverlaysLibPortal2 = _interopRequireDefault(_reactOverlaysLibPortal);
	
	var _Fade = __webpack_require__(/*! ./Fade */ 261);
	
	var _Fade2 = _interopRequireDefault(_Fade);
	
	var _ModalDialog = __webpack_require__(/*! ./ModalDialog */ 262);
	
	var _ModalDialog2 = _interopRequireDefault(_ModalDialog);
	
	var _ModalBody = __webpack_require__(/*! ./ModalBody */ 263);
	
	var _ModalBody2 = _interopRequireDefault(_ModalBody);
	
	var _ModalHeader = __webpack_require__(/*! ./ModalHeader */ 264);
	
	var _ModalHeader2 = _interopRequireDefault(_ModalHeader);
	
	var _ModalTitle = __webpack_require__(/*! ./ModalTitle */ 265);
	
	var _ModalTitle2 = _interopRequireDefault(_ModalTitle);
	
	var _ModalFooter = __webpack_require__(/*! ./ModalFooter */ 266);
	
	var _ModalFooter2 = _interopRequireDefault(_ModalFooter);
	
	/**
	 * Gets the correct clientHeight of the modal container
	 * when the body/window/document you need to use the docElement clientHeight
	 * @param  {HTMLElement} container
	 * @param  {ReactElement|HTMLElement} context
	 * @return {Number}
	 */
	function containerClientHeight(container, context) {
	  var doc = _utilsDomUtils2['default'].ownerDocument(context);
	
	  return container === doc.body || container === doc.documentElement ? doc.documentElement.clientHeight : container.clientHeight;
	}
	
	function getContainer(context) {
	  return context.props.container && _react2['default'].findDOMNode(context.props.container) || _utilsDomUtils2['default'].ownerDocument(context).body;
	}
	
	var currentFocusListener = undefined;
	
	/**
	 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
	 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
	 *
	 * We only allow one Listener at a time to avoid stack overflows
	 *
	 * @param  {ReactElement|HTMLElement} context
	 * @param  {Function} handler
	 */
	function onFocus(context, handler) {
	  var doc = _utilsDomUtils2['default'].ownerDocument(context);
	  var useFocusin = !doc.addEventListener;
	  var remove = undefined;
	
	  if (currentFocusListener) {
	    currentFocusListener.remove();
	  }
	
	  if (useFocusin) {
	    document.attachEvent('onfocusin', handler);
	    remove = function () {
	      return document.detachEvent('onfocusin', handler);
	    };
	  } else {
	    document.addEventListener('focus', handler, true);
	    remove = function () {
	      return document.removeEventListener('focus', handler, true);
	    };
	  }
	
	  currentFocusListener = { remove: remove };
	
	  return currentFocusListener;
	}
	
	var Modal = _react2['default'].createClass({
	  displayName: 'Modal',
	
	  propTypes: _extends({}, _reactOverlaysLibPortal2['default'].propTypes, _ModalDialog2['default'].propTypes, {
	
	    /**
	     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
	     */
	    backdrop: _react2['default'].PropTypes.oneOf(['static', true, false]),
	
	    /**
	     * Close the modal when escape key is pressed
	     */
	    keyboard: _react2['default'].PropTypes.bool,
	
	    /**
	     * Open and close the Modal with a slide and fade animation.
	     */
	    animation: _react2['default'].PropTypes.bool,
	
	    /**
	     * A Component type that provides the modal content Markup. This is a useful prop when you want to use your own
	     * styles and markup to create a custom modal component.
	     */
	    dialogComponent: _utilsCustomPropTypes2['default'].elementType,
	
	    /**
	     * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
	     * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
	     */
	    autoFocus: _react2['default'].PropTypes.bool,
	
	    /**
	     * When `true` The modal will prevent focus from leaving the Modal while open.
	     * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
	     * such as screen readers.
	     */
	    enforceFocus: _react2['default'].PropTypes.bool,
	
	    /**
	     * Hide this from automatic props documentation generation.
	     * @private
	     */
	    bsStyle: _react2['default'].PropTypes.string,
	
	    /**
	     * When `true` The modal will show itself.
	     */
	    show: _react2['default'].PropTypes.bool
	  }),
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'modal',
	      dialogComponent: _ModalDialog2['default'],
	      show: false,
	      animation: true,
	      backdrop: true,
	      keyboard: true,
	      autoFocus: true,
	      enforceFocus: true
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      exited: !this.props.show
	    };
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var animation = _props.animation;
	    var backdrop = _props.backdrop;
	
	    var props = _objectWithoutProperties(_props, ['children', 'animation', 'backdrop']);
	
	    var onExit = props.onExit;
	    var onExiting = props.onExiting;
	    var onEnter = props.onEnter;
	    var onEntering = props.onEntering;
	    var onEntered = props.onEntered;
	
	    var show = !!props.show;
	    var Dialog = props.dialogComponent;
	
	    var mountModal = show || animation && !this.state.exited;
	    if (!mountModal) {
	      return null;
	    }
	
	    var modal = _react2['default'].createElement(
	      Dialog,
	      _extends({}, props, {
	        ref: this._setDialogRef,
	        className: _classnames2['default'](this.props.className, { 'in': show && !animation }),
	        onClick: backdrop === true ? this.handleBackdropClick : null }),
	      this.renderContent()
	    );
	
	    if (animation) {
	      modal = _react2['default'].createElement(
	        _Fade2['default'],
	        {
	          transitionAppear: true,
	          unmountOnExit: true,
	          'in': show,
	          timeout: Modal.TRANSITION_DURATION,
	          onExit: onExit,
	          onExiting: onExiting,
	          onExited: this.handleHidden,
	          onEnter: onEnter,
	          onEntering: onEntering,
	          onEntered: onEntered },
	        modal
	      );
	    }
	
	    if (backdrop) {
	      modal = this.renderBackdrop(modal);
	    }
	
	    return _react2['default'].createElement(
	      _reactOverlaysLibPortal2['default'],
	      { container: props.container },
	      modal
	    );
	  },
	
	  renderContent: function renderContent() {
	    var _this = this;
	
	    return _react2['default'].Children.map(this.props.children, function (child) {
	      // TODO: use context in 0.14
	      if (child && child.type && child.type.__isModalHeader) {
	        return _react.cloneElement(child, {
	          onHide: _utilsCreateChainedFunction2['default'](_this.props.onHide, child.props.onHide)
	        });
	      }
	      return child;
	    });
	  },
	
	  renderBackdrop: function renderBackdrop(modal) {
	    var _props2 = this.props;
	    var animation = _props2.animation;
	    var bsClass = _props2.bsClass;
	
	    var duration = Modal.BACKDROP_TRANSITION_DURATION;
	
	    // Don't handle clicks for "static" backdrops
	    var onClick = this.props.backdrop === true ? this.handleBackdropClick : null;
	
	    var backdrop = _react2['default'].createElement('div', {
	      ref: 'backdrop',
	      className: _classnames2['default'](bsClass + '-backdrop', { 'in': this.props.show && !animation }),
	      onClick: onClick });
	
	    return _react2['default'].createElement(
	      'div',
	      {
	        ref: 'modal' },
	      animation ? _react2['default'].createElement(
	        _Fade2['default'],
	        { transitionAppear: true, 'in': this.props.show, timeout: duration },
	        backdrop
	      ) : backdrop,
	      modal
	    );
	  },
	
	  _setDialogRef: function _setDialogRef(ref) {
	    // issue #1074
	    // due to: https://github.com/facebook/react/blob/v0.13.3/src/core/ReactCompositeComponent.js#L842
	    //
	    // when backdrop is `false` react hasn't had a chance to reassign the refs to a usable object, b/c there are no other
	    // "classic" refs on the component (or they haven't been processed yet)
	    // TODO: Remove the need for this in next breaking release
	    if (_Object$isFrozen(this.refs) && !_Object$keys(this.refs).length) {
	      this.refs = {};
	    }
	
	    this.refs.dialog = ref;
	
	    // maintains backwards compat with older component breakdown
	    if (!this.props.backdrop) {
	      this.refs.modal = ref;
	    }
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.show) {
	      this.setState({ exited: false });
	    } else if (!nextProps.animation) {
	      // Otherwise let handleHidden take care of marking exited.
	      this.setState({ exited: true });
	    }
	  },
	
	  componentWillUpdate: function componentWillUpdate(nextProps) {
	    if (nextProps.show) {
	      this.checkForFocus();
	    }
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.show) {
	      this.onShow();
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var animation = this.props.animation;
	
	    if (prevProps.show && !this.props.show && !animation) {
	      // otherwise handleHidden will call this.
	      this.onHide();
	    } else if (!prevProps.show && this.props.show) {
	      this.onShow();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.show) {
	      this.onHide();
	    }
	  },
	
	  onShow: function onShow() {
	    var _this2 = this;
	
	    var doc = _utilsDomUtils2['default'].ownerDocument(this);
	    var win = _utilsDomUtils2['default'].ownerWindow(this);
	
	    this._onDocumentKeyupListener = _utilsEventListener2['default'].listen(doc, 'keyup', this.handleDocumentKeyUp);
	
	    this._onWindowResizeListener = _utilsEventListener2['default'].listen(win, 'resize', this.handleWindowResize);
	
	    if (this.props.enforceFocus) {
	      this._onFocusinListener = onFocus(this, this.enforceFocus);
	    }
	
	    var container = getContainer(this);
	
	    container.className += container.className.length ? ' modal-open' : 'modal-open';
	
	    this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);
	
	    this._originalPadding = container.style.paddingRight;
	
	    if (this._containerIsOverflowing) {
	      container.style.paddingRight = parseInt(this._originalPadding || 0, 10) + _domHelpersUtilScrollbarSize2['default']() + 'px';
	    }
	
	    if (this.props.backdrop) {
	      this.iosClickHack();
	    }
	
	    this.setState(this._getStyles(), function () {
	      return _this2.focusModalContent();
	    });
	  },
	
	  onHide: function onHide() {
	    this._onDocumentKeyupListener.remove();
	    this._onWindowResizeListener.remove();
	
	    if (this._onFocusinListener) {
	      this._onFocusinListener.remove();
	    }
	
	    var container = getContainer(this);
	
	    container.style.paddingRight = this._originalPadding;
	
	    container.className = container.className.replace(/ ?modal-open/, '');
	
	    this.restoreLastFocus();
	  },
	
	  handleHidden: function handleHidden() {
	    this.setState({ exited: true });
	
	    this.onHide();
	
	    if (this.props.onExited) {
	      var _props3;
	
	      (_props3 = this.props).onExited.apply(_props3, arguments);
	    }
	  },
	
	  handleBackdropClick: function handleBackdropClick(e) {
	    if (e.target !== e.currentTarget) {
	      return;
	    }
	
	    this.props.onHide();
	  },
	
	  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
	    if (this.props.keyboard && e.keyCode === 27) {
	      this.props.onHide();
	    }
	  },
	
	  handleWindowResize: function handleWindowResize() {
	    this.setState(this._getStyles());
	  },
	
	  checkForFocus: function checkForFocus() {
	    if (_utilsDomUtils2['default'].canUseDom) {
	      this.lastFocus = _utilsDomUtils2['default'].activeElement(document);
	    }
	  },
	
	  focusModalContent: function focusModalContent() {
	    var modalContent = _react2['default'].findDOMNode(this.refs.dialog);
	    var current = _utilsDomUtils2['default'].activeElement(_utilsDomUtils2['default'].ownerDocument(this));
	    var focusInModal = current && _utilsDomUtils2['default'].contains(modalContent, current);
	
	    if (modalContent && this.props.autoFocus && !focusInModal) {
	      this.lastFocus = current;
	      modalContent.focus();
	    }
	  },
	
	  restoreLastFocus: function restoreLastFocus() {
	    if (this.lastFocus && this.lastFocus.focus) {
	      this.lastFocus.focus();
	      this.lastFocus = null;
	    }
	  },
	
	  enforceFocus: function enforceFocus() {
	    if (!this.isMounted()) {
	      return;
	    }
	
	    var active = _utilsDomUtils2['default'].activeElement(_utilsDomUtils2['default'].ownerDocument(this));
	    var modal = _react2['default'].findDOMNode(this.refs.dialog);
	
	    if (modal && modal !== active && !_utilsDomUtils2['default'].contains(modal, active)) {
	      modal.focus();
	    }
	  },
	
	  iosClickHack: function iosClickHack() {
	    // IOS only allows click events to be delegated to the document on elements
	    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
	    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
	    _react2['default'].findDOMNode(this.refs.modal).onclick = function () {};
	    _react2['default'].findDOMNode(this.refs.backdrop).onclick = function () {};
	  },
	
	  _getStyles: function _getStyles() {
	    if (!_utilsDomUtils2['default'].canUseDom) {
	      return {};
	    }
	
	    var node = _react2['default'].findDOMNode(this.refs.modal);
	    var scrollHt = node.scrollHeight;
	    var container = getContainer(this);
	    var containerIsOverflowing = this._containerIsOverflowing;
	    var modalIsOverflowing = scrollHt > containerClientHeight(container, this);
	
	    return {
	      dialogStyles: {
	        paddingRight: containerIsOverflowing && !modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0,
	        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0
	      }
	    };
	  }
	
	});
	
	Modal.Body = _ModalBody2['default'];
	Modal.Header = _ModalHeader2['default'];
	Modal.Title = _ModalTitle2['default'];
	Modal.Footer = _ModalFooter2['default'];
	
	Modal.Dialog = _ModalDialog2['default'];
	
	Modal.TRANSITION_DURATION = 300;
	Modal.BACKDROP_TRANSITION_DURATION = 150;
	
	exports['default'] = Modal;
	module.exports = exports['default'];

/***/ },
/* 253 */
/*!************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/core-js/object/is-frozen.js ***!
  \************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/is-frozen */ 254), __esModule: true };

/***/ },
/* 254 */
/*!*************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/fn/object/is-frozen.js ***!
  \*************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.is-frozen */ 255);
	module.exports = __webpack_require__(/*! ../../modules/$.core */ 76).Object.isFrozen;

/***/ },
/* 255 */
/*!**********************************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/babel-runtime/~/core-js/library/modules/es6.object.is-frozen.js ***!
  \**********************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(/*! ./$.is-object */ 91);
	
	__webpack_require__(/*! ./$.object-sap */ 73)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 256 */
/*!****************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/dom-helpers/util/scrollbarSize.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var canUseDOM = __webpack_require__(/*! ./inDOM */ 99);
	
	var size;
	
	module.exports = function (recalc) {
	  if (!size || recalc) {
	    if (canUseDOM) {
	      var scrollDiv = document.createElement('div');
	
	      scrollDiv.style.position = 'absolute';
	      scrollDiv.style.top = '-9999px';
	      scrollDiv.style.width = '50px';
	      scrollDiv.style.height = '50px';
	      scrollDiv.style.overflow = 'scroll';
	
	      document.body.appendChild(scrollDiv);
	      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	      document.body.removeChild(scrollDiv);
	    }
	  }
	
	  return size;
	};

/***/ },
/* 257 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/Portal.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactPropTypesLibMountable = __webpack_require__(/*! react-prop-types/lib/mountable */ 258);
	
	var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);
	
	var _utilsOwnerDocument = __webpack_require__(/*! ./utils/ownerDocument */ 172);
	
	var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);
	
	var _utilsGetContainer = __webpack_require__(/*! ./utils/getContainer */ 260);
	
	var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);
	
	/**
	 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
	 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
	 * The children of `<Portal/>` component will be appended to the `container` specified.
	 */
	var Portal = _react2['default'].createClass({
	
	  displayName: 'Portal',
	
	  propTypes: {
	    /**
	     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
	     * appended to it.
	     */
	    container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func])
	  },
	
	  componentDidMount: function componentDidMount() {
	    this._renderOverlay();
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    this._renderOverlay();
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this._unrenderOverlay();
	    this._unmountOverlayTarget();
	  },
	
	  _mountOverlayTarget: function _mountOverlayTarget() {
	    if (!this._overlayTarget) {
	      this._overlayTarget = document.createElement('div');
	      this.getContainerDOMNode().appendChild(this._overlayTarget);
	    }
	  },
	
	  _unmountOverlayTarget: function _unmountOverlayTarget() {
	    if (this._overlayTarget) {
	      this.getContainerDOMNode().removeChild(this._overlayTarget);
	      this._overlayTarget = null;
	    }
	  },
	
	  _renderOverlay: function _renderOverlay() {
	
	    var overlay = !this.props.children ? null : _react2['default'].Children.only(this.props.children);
	
	    // Save reference for future access.
	    if (overlay !== null) {
	      this._mountOverlayTarget();
	      this._overlayInstance = _react2['default'].render(overlay, this._overlayTarget);
	    } else {
	      // Unrender if the component is null for transitions to null
	      this._unrenderOverlay();
	      this._unmountOverlayTarget();
	    }
	  },
	
	  _unrenderOverlay: function _unrenderOverlay() {
	    if (this._overlayTarget) {
	      _react2['default'].unmountComponentAtNode(this._overlayTarget);
	      this._overlayInstance = null;
	    }
	  },
	
	  render: function render() {
	    return null;
	  },
	
	  getOverlayDOMNode: function getOverlayDOMNode() {
	    if (!this.isMounted()) {
	      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
	    }
	
	    if (this._overlayInstance) {
	      if (this._overlayInstance.getWrappedDOMNode) {
	        return this._overlayInstance.getWrappedDOMNode();
	      } else {
	        return _react2['default'].findDOMNode(this._overlayInstance);
	      }
	    }
	
	    return null;
	  },
	
	  getContainerDOMNode: function getContainerDOMNode() {
	    return _utilsGetContainer2['default'](this.props.container, _utilsOwnerDocument2['default'](this).body);
	  }
	});
	
	exports['default'] = Portal;
	module.exports = exports['default'];

/***/ },
/* 258 */
/*!*********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/~/react-prop-types/lib/mountable.js ***!
  \*********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _common = __webpack_require__(/*! ./common */ 259);
	
	/**
	 * Checks whether a prop provides a DOM element
	 *
	 * The element can be provided in two forms:
	 * - Directly passed
	 * - Or passed an object that has a `render` method
	 *
	 * @param props
	 * @param propName
	 * @param componentName
	 * @returns {Error|undefined}
	 */
	
	function validate(props, propName, componentName) {
	  if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
	    return new Error(_common.errMsg(props, propName, componentName, ', expected a DOM element or an object that has a `render` method'));
	  }
	}
	
	exports['default'] = _common.createChainableTypeChecker(validate);
	module.exports = exports['default'];

/***/ },
/* 259 */
/*!******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/~/react-prop-types/lib/common.js ***!
  \******************************************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.errMsg = errMsg;
	exports.createChainableTypeChecker = createChainableTypeChecker;
	
	function errMsg(props, propName, componentName, msgContinuation) {
	  return 'Invalid prop \'' + propName + '\' of value \'' + props[propName] + '\'' + (' supplied to \'' + componentName + '\'' + msgContinuation);
	}
	
	/**
	 * Create chain-able isRequired validator
	 *
	 * Largely copied directly from:
	 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
	 */
	
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName) {
	    componentName = componentName || '<<anonymous>>';
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
	      }
	    } else {
	      return validate(props, propName, componentName);
	    }
	  }
	
	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	
	  return chainedCheckType;
	}

/***/ },
/* 260 */
/*!***********************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/utils/getContainer.js ***!
  \***********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = getContainer;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function getContainer(container, defaultContainer) {
	  container = typeof container === 'function' ? container() : container;
	  return _react2['default'].findDOMNode(container) || defaultContainer;
	}
	
	module.exports = exports['default'];

/***/ },
/* 261 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Fade.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactOverlaysLibTransition = __webpack_require__(/*! react-overlays/lib/Transition */ 156);
	
	var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var Fade = (function (_React$Component) {
	  _inherits(Fade, _React$Component);
	
	  function Fade() {
	    _classCallCheck(this, Fade);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  // Explicitly copied from Transition for doc generation.
	  // TODO: Remove duplication once #977 is resolved.
	
	  Fade.prototype.render = function render() {
	    var timeout = this.props.timeout || this.props.duration;
	
	    return _react2['default'].createElement(
	      _reactOverlaysLibTransition2['default'],
	      _extends({}, this.props, {
	        timeout: timeout,
	        className: 'fade',
	        enteredClassName: 'in',
	        enteringClassName: 'in'
	      }),
	      this.props.children
	    );
	  };
	
	  return Fade;
	})(_react2['default'].Component);
	
	Fade.propTypes = {
	  /**
	   * Show the component; triggers the fade in or fade out animation
	   */
	  'in': _react2['default'].PropTypes.bool,
	
	  /**
	   * Unmount the component (remove it from the DOM) when it is faded out
	   */
	  unmountOnExit: _react2['default'].PropTypes.bool,
	
	  /**
	   * Run the fade in animation when the component mounts, if it is initially
	   * shown
	   */
	  transitionAppear: _react2['default'].PropTypes.bool,
	
	  /**
	   * Duration of the fade animation in milliseconds, to ensure that finishing
	   * callbacks are fired even if the original browser transition end events are
	   * canceled
	   */
	  timeout: _react2['default'].PropTypes.number,
	
	  /**
	   * duration
	   * @private
	   */
	  duration: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.number, function (props) {
	    if (props.duration != null) {
	      _utilsDeprecationWarning2['default']('Fade `duration`', 'the `timeout` prop');
	    }
	    return null;
	  }]),
	
	  /**
	   * Callback fired before the component fades in
	   */
	  onEnter: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to fade in
	   */
	  onEntering: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the has component faded in
	   */
	  onEntered: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired before the component fades out
	   */
	  onExit: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to fade out
	   */
	  onExiting: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component has faded out
	   */
	  onExited: _react2['default'].PropTypes.func
	};
	
	Fade.defaultProps = {
	  'in': false,
	  timeout: 300,
	  unmountOnExit: false,
	  transitionAppear: false
	};
	
	exports['default'] = Fade;
	module.exports = exports['default'];

/***/ },
/* 262 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ModalDialog.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable react/prop-types */
	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var ModalDialog = _react2['default'].createClass({
	  displayName: 'ModalDialog',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    /**
	     * A Callback fired when the header closeButton or non-static backdrop is clicked.
	     * @type {function}
	     * @required
	     */
	    onHide: _react2['default'].PropTypes.func.isRequired,
	
	    /**
	     * A css class to apply to the Modal dialog DOM node.
	     */
	    dialogClassName: _react2['default'].PropTypes.string
	
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'modal',
	      closeButton: true
	    };
	  },
	
	  render: function render() {
	    var modalStyle = _extends({
	      display: 'block'
	    }, this.props.style);
	    var bsClass = this.props.bsClass;
	    var dialogClasses = this.getBsClassSet();
	
	    delete dialogClasses.modal;
	    dialogClasses[bsClass + '-dialog'] = true;
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        title: null,
	        tabIndex: '-1',
	        role: 'dialog',
	        style: modalStyle,
	        className: _classnames2['default'](this.props.className, bsClass) }),
	      _react2['default'].createElement(
	        'div',
	        { className: _classnames2['default'](this.props.dialogClassName, dialogClasses) },
	        _react2['default'].createElement(
	          'div',
	          { className: bsClass + '-content', role: 'document' },
	          this.props.children
	        )
	      )
	    );
	  }
	});
	
	exports['default'] = ModalDialog;
	module.exports = exports['default'];

/***/ },
/* 263 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ModalBody.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var ModalBody = (function (_React$Component) {
	  _inherits(ModalBody, _React$Component);
	
	  function ModalBody() {
	    _classCallCheck(this, ModalBody);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  ModalBody.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, this.props.modalClassName) }),
	      this.props.children
	    );
	  };
	
	  return ModalBody;
	})(_react2['default'].Component);
	
	ModalBody.propTypes = {
	  /**
	   * A css class applied to the Component
	   */
	  modalClassName: _react2['default'].PropTypes.string
	};
	
	ModalBody.defaultProps = {
	  modalClassName: 'modal-body'
	};
	
	exports['default'] = ModalBody;
	module.exports = exports['default'];

/***/ },
/* 264 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ModalHeader.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var ModalHeader = (function (_React$Component) {
	  _inherits(ModalHeader, _React$Component);
	
	  function ModalHeader() {
	    _classCallCheck(this, ModalHeader);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  // used in liue of parent contexts right now to auto wire the close button
	
	  ModalHeader.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, this.props.modalClassName) }),
	      this.props.closeButton && _react2['default'].createElement(
	        'button',
	        {
	          className: 'close',
	          onClick: this.props.onHide },
	        _react2['default'].createElement(
	          'span',
	          { 'aria-hidden': 'true' },
	          '×'
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return ModalHeader;
	})(_react2['default'].Component);
	
	ModalHeader.__isModalHeader = true;
	
	ModalHeader.propTypes = {
	  /**
	   * The 'aria-label' attribute is used to define a string that labels the current element.
	   * It is used for Assistive Technology when the label text is not visible on screen.
	   */
	  'aria-label': _react2['default'].PropTypes.string,
	
	  /**
	   * A css class applied to the Component
	   */
	  modalClassName: _react2['default'].PropTypes.string,
	
	  /**
	   * Specify whether the Component should contain a close button
	   */
	  closeButton: _react2['default'].PropTypes.bool,
	
	  /**
	   * A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically
	   * be propagated up to the parent Modal `onHide`.
	   */
	  onHide: _react2['default'].PropTypes.func
	};
	
	ModalHeader.defaultProps = {
	  'aria-label': 'Close',
	  modalClassName: 'modal-header',
	  closeButton: false
	};
	
	exports['default'] = ModalHeader;
	module.exports = exports['default'];

/***/ },
/* 265 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ModalTitle.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var ModalTitle = (function (_React$Component) {
	  _inherits(ModalTitle, _React$Component);
	
	  function ModalTitle() {
	    _classCallCheck(this, ModalTitle);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  ModalTitle.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'h4',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, this.props.modalClassName) }),
	      this.props.children
	    );
	  };
	
	  return ModalTitle;
	})(_react2['default'].Component);
	
	ModalTitle.propTypes = {
	  /**
	   * A css class applied to the Component
	   */
	  modalClassName: _react2['default'].PropTypes.string
	};
	
	ModalTitle.defaultProps = {
	  modalClassName: 'modal-title'
	};
	
	exports['default'] = ModalTitle;
	module.exports = exports['default'];

/***/ },
/* 266 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ModalFooter.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var ModalFooter = (function (_React$Component) {
	  _inherits(ModalFooter, _React$Component);
	
	  function ModalFooter() {
	    _classCallCheck(this, ModalFooter);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  ModalFooter.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, this.props.modalClassName) }),
	      this.props.children
	    );
	  };
	
	  return ModalFooter;
	})(_react2['default'].Component);
	
	ModalFooter.propTypes = {
	  /**
	   * A css class applied to the Component
	   */
	  modalClassName: _react2['default'].PropTypes.string
	};
	
	ModalFooter.defaultProps = {
	  modalClassName: 'modal-footer'
	};
	
	exports['default'] = ModalFooter;
	module.exports = exports['default'];

/***/ },
/* 267 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Nav.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _Collapse = __webpack_require__(/*! ./Collapse */ 155);
	
	var _Collapse2 = _interopRequireDefault(_Collapse);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var Nav = _react2['default'].createClass({
	  displayName: 'Nav',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    activeHref: _react2['default'].PropTypes.string,
	    activeKey: _react2['default'].PropTypes.any,
	    bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),
	    stacked: _react2['default'].PropTypes.bool,
	    justified: _react2['default'].PropTypes.bool,
	    onSelect: _react2['default'].PropTypes.func,
	    collapsible: _react2['default'].PropTypes.bool,
	    /**
	     * CSS classes for the wrapper `nav` element
	     */
	    className: _react2['default'].PropTypes.string,
	    /**
	     * HTML id for the wrapper `nav` element
	     */
	    id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	    /**
	     * CSS classes for the inner `ul` element
	     */
	    ulClassName: _react2['default'].PropTypes.string,
	    /**
	     * HTML id for the inner `ul` element
	     */
	    ulId: _react2['default'].PropTypes.string,
	    expanded: _react2['default'].PropTypes.bool,
	    navbar: _react2['default'].PropTypes.bool,
	    eventKey: _react2['default'].PropTypes.any,
	    pullRight: _react2['default'].PropTypes.bool,
	    right: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'nav',
	      collapsible: false,
	      expanded: true,
	      justified: false,
	      navbar: false,
	      pullRight: false,
	      right: false,
	      stacked: false
	    };
	  },
	
	  render: function render() {
	    var classes = this.props.collapsible ? 'navbar-collapse' : null;
	
	    if (this.props.navbar && !this.props.collapsible) {
	      return this.renderUl();
	    }
	
	    return _react2['default'].createElement(
	      _Collapse2['default'],
	      { 'in': this.props.expanded },
	      _react2['default'].createElement(
	        'nav',
	        _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	        this.renderUl()
	      )
	    );
	  },
	
	  renderUl: function renderUl() {
	    var classes = this.getBsClassSet();
	
	    classes['nav-stacked'] = this.props.stacked;
	    classes['nav-justified'] = this.props.justified;
	    classes['navbar-nav'] = this.props.navbar;
	    classes['pull-right'] = this.props.pullRight;
	    classes['navbar-right'] = this.props.right;
	
	    return _react2['default'].createElement(
	      'ul',
	      _extends({}, this.props, {
	        role: this.props.bsStyle === 'tabs' ? 'tablist' : null,
	        className: _classnames2['default'](this.props.ulClassName, classes),
	        id: this.props.ulId,
	        ref: 'ul'
	      }),
	      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem)
	    );
	  },
	
	  getChildActiveProp: function getChildActiveProp(child) {
	    if (child.props.active) {
	      return true;
	    }
	    if (this.props.activeKey != null) {
	      if (child.props.eventKey === this.props.activeKey) {
	        return true;
	      }
	    }
	    if (this.props.activeHref != null) {
	      if (child.props.href === this.props.activeHref) {
	        return true;
	      }
	    }
	
	    return child.props.active;
	  },
	
	  renderNavItem: function renderNavItem(child, index) {
	    return _react.cloneElement(child, {
	      role: this.props.bsStyle === 'tabs' ? 'tab' : null,
	      active: this.getChildActiveProp(child),
	      activeKey: this.props.activeKey,
	      activeHref: this.props.activeHref,
	      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
	      key: child.key ? child.key : index,
	      navItem: true
	    });
	  }
	});
	
	exports['default'] = Nav;
	module.exports = exports['default'];

/***/ },
/* 268 */
/*!******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Navbar.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var Navbar = _react2['default'].createClass({
	  displayName: 'Navbar',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    fixedTop: _react2['default'].PropTypes.bool,
	    fixedBottom: _react2['default'].PropTypes.bool,
	    staticTop: _react2['default'].PropTypes.bool,
	    inverse: _react2['default'].PropTypes.bool,
	    fluid: _react2['default'].PropTypes.bool,
	    role: _react2['default'].PropTypes.string,
	    /**
	     * You can use a custom element for this component
	     */
	    componentClass: _utilsCustomPropTypes2['default'].elementType,
	    brand: _react2['default'].PropTypes.node,
	    toggleButton: _react2['default'].PropTypes.node,
	    toggleNavKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	    onToggle: _react2['default'].PropTypes.func,
	    navExpanded: _react2['default'].PropTypes.bool,
	    defaultNavExpanded: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'navbar',
	      bsStyle: 'default',
	      role: 'navigation',
	      componentClass: 'nav',
	      fixedTop: false,
	      fixedBottom: false,
	      staticTop: false,
	      inverse: false,
	      fluid: false,
	      defaultNavExpanded: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      navExpanded: this.props.defaultNavExpanded
	    };
	  },
	
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    // Defer any updates to this component during the `onSelect` handler.
	    return !this._isChanging;
	  },
	
	  handleToggle: function handleToggle() {
	    if (this.props.onToggle) {
	      this._isChanging = true;
	      this.props.onToggle();
	      this._isChanging = false;
	    }
	
	    this.setState({
	      navExpanded: !this.state.navExpanded
	    });
	  },
	
	  isNavExpanded: function isNavExpanded() {
	    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	    var ComponentClass = this.props.componentClass;
	
	    classes['navbar-fixed-top'] = this.props.fixedTop;
	    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
	    classes['navbar-static-top'] = this.props.staticTop;
	    classes['navbar-inverse'] = this.props.inverse;
	
	    return _react2['default'].createElement(
	      ComponentClass,
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      _react2['default'].createElement(
	        'div',
	        { className: this.props.fluid ? 'container-fluid' : 'container' },
	        this.props.brand || this.props.toggleButton || this.props.toggleNavKey != null ? this.renderHeader() : null,
	        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderChild)
	      )
	    );
	  },
	
	  renderChild: function renderChild(child, index) {
	    return _react.cloneElement(child, {
	      navbar: true,
	      collapsible: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
	      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
	      key: child.key ? child.key : index
	    });
	  },
	
	  renderHeader: function renderHeader() {
	    var brand = undefined;
	
	    if (this.props.brand) {
	      if (_react2['default'].isValidElement(this.props.brand)) {
	        brand = _react.cloneElement(this.props.brand, {
	          className: _classnames2['default'](this.props.brand.props.className, 'navbar-brand')
	        });
	      } else {
	        brand = _react2['default'].createElement(
	          'span',
	          { className: 'navbar-brand' },
	          this.props.brand
	        );
	      }
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'navbar-header' },
	      brand,
	      this.props.toggleButton || this.props.toggleNavKey != null ? this.renderToggleButton() : null
	    );
	  },
	
	  renderToggleButton: function renderToggleButton() {
	    var children = undefined;
	
	    if (_react2['default'].isValidElement(this.props.toggleButton)) {
	      return _react.cloneElement(this.props.toggleButton, {
	        className: _classnames2['default'](this.props.toggleButton.props.className, 'navbar-toggle'),
	        onClick: _utilsCreateChainedFunction2['default'](this.handleToggle, this.props.toggleButton.props.onClick)
	      });
	    }
	
	    children = this.props.toggleButton != null ? this.props.toggleButton : [_react2['default'].createElement(
	      'span',
	      { className: 'sr-only', key: 0 },
	      'Toggle navigation'
	    ), _react2['default'].createElement('span', { className: 'icon-bar', key: 1 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 2 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 3 })];
	
	    return _react2['default'].createElement(
	      'button',
	      { className: 'navbar-toggle', type: 'button', onClick: this.handleToggle },
	      children
	    );
	  }
	});
	
	exports['default'] = Navbar;
	module.exports = exports['default'];

/***/ },
/* 269 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/NavItem.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _SafeAnchor = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var NavItem = _react2['default'].createClass({
	  displayName: 'NavItem',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    linkId: _react2['default'].PropTypes.string,
	    onSelect: _react2['default'].PropTypes.func,
	    active: _react2['default'].PropTypes.bool,
	    disabled: _react2['default'].PropTypes.bool,
	    href: _react2['default'].PropTypes.string,
	    role: _react2['default'].PropTypes.string,
	    title: _react2['default'].PropTypes.node,
	    eventKey: _react2['default'].PropTypes.any,
	    target: _react2['default'].PropTypes.string,
	    'aria-controls': _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: false,
	      disabled: false
	    };
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var role = _props.role;
	    var linkId = _props.linkId;
	    var disabled = _props.disabled;
	    var active = _props.active;
	    var href = _props.href;
	    var title = _props.title;
	    var target = _props.target;
	    var children = _props.children;
	    var tabIndex = _props.tabIndex;
	    var ariaControls = _props['aria-controls'];
	
	    var props = _objectWithoutProperties(_props, ['role', 'linkId', 'disabled', 'active', 'href', 'title', 'target', 'children', 'tabIndex', 'aria-controls']);
	
	    var classes = {
	      active: active,
	      disabled: disabled
	    };
	    var linkProps = {
	      role: role,
	      href: href,
	      title: title,
	      target: target,
	      tabIndex: tabIndex,
	      id: linkId,
	      onClick: this.handleClick
	    };
	
	    if (!role && href === '#') {
	      linkProps.role = 'button';
	    }
	
	    return _react2['default'].createElement(
	      'li',
	      _extends({}, props, { role: 'presentation', className: _classnames2['default'](props.className, classes) }),
	      _react2['default'].createElement(
	        _SafeAnchor2['default'],
	        _extends({}, linkProps, { 'aria-selected': active, 'aria-controls': ariaControls }),
	        children
	      )
	    );
	  },
	
	  handleClick: function handleClick(e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	
	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
	      }
	    }
	  }
	});
	
	exports['default'] = NavItem;
	module.exports = exports['default'];
	//eslint-disable-line

/***/ },
/* 270 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Overlay.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* eslint react/prop-types: [2, {ignore: ["container", "containerPadding", "target", "placement", "children"] }] */
	/* These properties are validated in 'Portal' and 'Position' components */
	
	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactOverlaysLibOverlay = __webpack_require__(/*! react-overlays/lib/Overlay */ 271);
	
	var _reactOverlaysLibOverlay2 = _interopRequireDefault(_reactOverlaysLibOverlay);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _Fade = __webpack_require__(/*! ./Fade */ 261);
	
	var _Fade2 = _interopRequireDefault(_Fade);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Overlay = (function (_React$Component) {
	  _inherits(Overlay, _React$Component);
	
	  function Overlay() {
	    _classCallCheck(this, Overlay);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Overlay.prototype.render = function render() {
	    var _props = this.props;
	    var child = _props.children;
	    var transition = _props.animation;
	
	    var props = _objectWithoutProperties(_props, ['children', 'animation']);
	
	    if (transition === true) {
	      transition = _Fade2['default'];
	    }
	
	    if (!transition) {
	      child = _react.cloneElement(child, {
	        className: _classnames2['default']('in', child.props.className)
	      });
	    }
	
	    return _react2['default'].createElement(
	      _reactOverlaysLibOverlay2['default'],
	      _extends({}, props, {
	        transition: transition
	      }),
	      child
	    );
	  };
	
	  return Overlay;
	})(_react2['default'].Component);
	
	Overlay.propTypes = _extends({}, _reactOverlaysLibOverlay2['default'].propTypes, {
	
	  /**
	   * Set the visibility of the Overlay
	   */
	  show: _react2['default'].PropTypes.bool,
	  /**
	   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
	   */
	  rootClose: _react2['default'].PropTypes.bool,
	  /**
	   * A Callback fired by the Overlay when it wishes to be hidden.
	   */
	  onHide: _react2['default'].PropTypes.func,
	
	  /**
	   * Use animation
	   */
	  animation: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _utilsCustomPropTypes2['default'].elementType]),
	
	  /**
	   * Callback fired before the Overlay transitions in
	   */
	  onEnter: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition in
	   */
	  onEntering: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning in
	   */
	  onEntered: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired right before the Overlay transitions out
	   */
	  onExit: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition out
	   */
	  onExiting: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning out
	   */
	  onExited: _react2['default'].PropTypes.func
	});
	
	Overlay.defaultProps = {
	  animation: _Fade2['default'],
	  rootClose: false,
	  show: false
	};
	
	exports['default'] = Overlay;
	module.exports = exports['default'];

/***/ },
/* 271 */
/*!************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/Overlay.js ***!
  \************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Portal = __webpack_require__(/*! ./Portal */ 257);
	
	var _Portal2 = _interopRequireDefault(_Portal);
	
	var _Position = __webpack_require__(/*! ./Position */ 272);
	
	var _Position2 = _interopRequireDefault(_Position);
	
	var _RootCloseWrapper = __webpack_require__(/*! ./RootCloseWrapper */ 168);
	
	var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);
	
	var _reactPropTypesLibElementType = __webpack_require__(/*! react-prop-types/lib/elementType */ 274);
	
	var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);
	
	/**
	 * Built on top of `<Position/>` and `<Portal/>`, the overlay component is great for custom tooltip overlays.
	 */
	
	var Overlay = (function (_React$Component) {
	  function Overlay(props, context) {
	    _classCallCheck(this, Overlay);
	
	    _React$Component.call(this, props, context);
	
	    this.state = { exited: !props.show };
	    this.onHiddenListener = this.handleHidden.bind(this);
	  }
	
	  _inherits(Overlay, _React$Component);
	
	  Overlay.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps.show) {
	      this.setState({ exited: false });
	    } else if (!nextProps.transition) {
	      // Otherwise let handleHidden take care of marking exited.
	      this.setState({ exited: true });
	    }
	  };
	
	  Overlay.prototype.render = function render() {
	    var _props = this.props;
	    var container = _props.container;
	    var containerPadding = _props.containerPadding;
	    var target = _props.target;
	    var placement = _props.placement;
	    var rootClose = _props.rootClose;
	    var children = _props.children;
	    var Transition = _props.transition;
	
	    var props = _objectWithoutProperties(_props, ['container', 'containerPadding', 'target', 'placement', 'rootClose', 'children', 'transition']);
	
	    // Don't un-render the overlay while it's transitioning out.
	    var mountOverlay = props.show || Transition && !this.state.exited;
	    if (!mountOverlay) {
	      // Don't bother showing anything if we don't have to.
	      return null;
	    }
	
	    var child = children;
	
	    // Position is be inner-most because it adds inline styles into the child,
	    // which the other wrappers don't forward correctly.
	    child = _react2['default'].createElement(
	      _Position2['default'],
	      { container: container, containerPadding: containerPadding, target: target, placement: placement },
	      child
	    );
	
	    if (Transition) {
	      var onExit = props.onExit;
	      var onExiting = props.onExiting;
	      var onEnter = props.onEnter;
	      var onEntering = props.onEntering;
	      var onEntered = props.onEntered;
	
	      // This animates the child node by injecting props, so it must precede
	      // anything that adds a wrapping div.
	      child = _react2['default'].createElement(
	        Transition,
	        {
	          'in': props.show,
	          transitionAppear: true,
	          onExit: onExit,
	          onExiting: onExiting,
	          onExited: this.onHiddenListener,
	          onEnter: onEnter,
	          onEntering: onEntering,
	          onEntered: onEntered
	        },
	        child
	      );
	    }
	
	    // This goes after everything else because it adds a wrapping div.
	    if (rootClose) {
	      child = _react2['default'].createElement(
	        _RootCloseWrapper2['default'],
	        { onRootClose: props.onHide },
	        child
	      );
	    }
	
	    return _react2['default'].createElement(
	      _Portal2['default'],
	      { container: container },
	      child
	    );
	  };
	
	  Overlay.prototype.handleHidden = function handleHidden() {
	    this.setState({ exited: true });
	
	    if (this.props.onExited) {
	      var _props2;
	
	      (_props2 = this.props).onExited.apply(_props2, arguments);
	    }
	  };
	
	  return Overlay;
	})(_react2['default'].Component);
	
	Overlay.propTypes = _extends({}, _Portal2['default'].propTypes, _Position2['default'].propTypes, {
	  /**
	   * Set the visibility of the Overlay
	   */
	  show: _react2['default'].PropTypes.bool,
	  /**
	   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
	   */
	  rootClose: _react2['default'].PropTypes.bool,
	  /**
	   * A Callback fired by the Overlay when it wishes to be hidden.
	   */
	  onHide: _react2['default'].PropTypes.func,
	
	  /**
	   * A `<Transition/>` component used to animate the overlay changes visibility.
	   */
	  transition: _reactPropTypesLibElementType2['default'],
	
	  /**
	   * Callback fired before the Overlay transitions in
	   */
	  onEnter: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition in
	   */
	  onEntering: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning in
	   */
	  onEntered: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired right before the Overlay transitions out
	   */
	  onExit: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition out
	   */
	  onExiting: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning out
	   */
	  onExited: _react2['default'].PropTypes.func
	});
	
	exports['default'] = Overlay;
	module.exports = exports['default'];

/***/ },
/* 272 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/Position.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsOwnerDocument = __webpack_require__(/*! ./utils/ownerDocument */ 172);
	
	var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);
	
	var _utilsGetContainer = __webpack_require__(/*! ./utils/getContainer */ 260);
	
	var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);
	
	var _utilsOverlayPositionUtils = __webpack_require__(/*! ./utils/overlayPositionUtils */ 273);
	
	var _reactPropTypesLibMountable = __webpack_require__(/*! react-prop-types/lib/mountable */ 258);
	
	var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);
	
	/**
	 * The Position component calulates the corrdinates for its child, to
	 * position it relative to a `target` component or node. Useful for creating callouts and tooltips,
	 * the Position component injects a `style` props with `left` and `top` values for positioning your component.
	 *
	 * It also injects "arrow" `left`, and `top` values for styling callout arrows for giving your components
	 * a sense of directionality.
	 */
	
	var Position = (function (_React$Component) {
	  function Position(props, context) {
	    _classCallCheck(this, Position);
	
	    _React$Component.call(this, props, context);
	
	    this.state = {
	      positionLeft: null,
	      positionTop: null,
	      arrowOffsetLeft: null,
	      arrowOffsetTop: null
	    };
	
	    this._needsFlush = false;
	    this._lastTarget = null;
	  }
	
	  _inherits(Position, _React$Component);
	
	  Position.prototype.componentDidMount = function componentDidMount() {
	    this.updatePosition();
	  };
	
	  Position.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
	    this._needsFlush = true;
	  };
	
	  Position.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    if (this._needsFlush) {
	      this._needsFlush = false;
	      this.updatePosition(prevProps.placement !== this.props.placement);
	    }
	  };
	
	  Position.prototype.componentWillUnmount = function componentWillUnmount() {
	    // Probably not necessary, but just in case holding a reference to the
	    // target causes problems somewhere.
	    this._lastTarget = null;
	  };
	
	  Position.prototype.render = function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var className = _props.className;
	
	    var props = _objectWithoutProperties(_props, ['children', 'className']);
	
	    var _state = this.state;
	    var positionLeft = _state.positionLeft;
	    var positionTop = _state.positionTop;
	
	    var arrowPosition = _objectWithoutProperties(_state, ['positionLeft', 'positionTop']);
	
	    var child = _react2['default'].Children.only(children);
	    return _react.cloneElement(child, _extends({}, props, arrowPosition, {
	      //do we need to also forward positionLeft and positionTop if they are set to style?
	      positionLeft: positionLeft,
	      positionTop: positionTop,
	      className: _classnames2['default'](className, child.props.className),
	      style: _extends({}, child.props.style, {
	        left: positionLeft,
	        top: positionTop
	      })
	    }));
	  };
	
	  Position.prototype.getTargetSafe = function getTargetSafe() {
	    if (!this.props.target) {
	      return null;
	    }
	
	    var target = this.props.target(this.props);
	    if (!target) {
	      // This is so we can just use === check below on all falsy targets.
	      return null;
	    }
	
	    return target;
	  };
	
	  Position.prototype.updatePosition = function updatePosition(placementChanged) {
	    var target = this.getTargetSafe();
	
	    if (target === this._lastTarget && !placementChanged) {
	      return;
	    }
	
	    this._lastTarget = target;
	
	    if (!target) {
	      this.setState({
	        positionLeft: null,
	        positionTop: null,
	        arrowOffsetLeft: null,
	        arrowOffsetTop: null
	      });
	
	      return;
	    }
	
	    var overlay = _react2['default'].findDOMNode(this);
	    var container = _utilsGetContainer2['default'](this.props.container, _utilsOwnerDocument2['default'](this).body);
	
	    this.setState(_utilsOverlayPositionUtils.calcOverlayPosition(this.props.placement, overlay, target, container, this.props.containerPadding));
	  };
	
	  return Position;
	})(_react2['default'].Component);
	
	Position.propTypes = {
	  /**
	   * Function mapping props to a DOM node the component is positioned next to
	   */
	  target: _react2['default'].PropTypes.func,
	  /**
	   * "offsetParent" of the component
	   */
	  container: _reactPropTypesLibMountable2['default'],
	  /**
	   * Minimum spacing in pixels between container border and component border
	   */
	  containerPadding: _react2['default'].PropTypes.number,
	  /**
	   * How to position the component relative to the target
	   */
	  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
	};
	
	Position.displayName = 'Position';
	
	Position.defaultProps = {
	  containerPadding: 0,
	  placement: 'right'
	};
	
	exports['default'] = Position;
	module.exports = exports['default'];

/***/ },
/* 273 */
/*!*******************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/lib/utils/overlayPositionUtils.js ***!
  \*******************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _ownerDocument = __webpack_require__(/*! ./ownerDocument */ 172);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	var _domHelpersQueryOffset = __webpack_require__(/*! dom-helpers/query/offset */ 105);
	
	var _domHelpersQueryOffset2 = _interopRequireDefault(_domHelpersQueryOffset);
	
	var _domHelpersQueryPosition = __webpack_require__(/*! dom-helpers/query/position */ 115);
	
	var _domHelpersQueryPosition2 = _interopRequireDefault(_domHelpersQueryPosition);
	
	var _domHelpersQueryScrollTop = __webpack_require__(/*! dom-helpers/query/scrollTop */ 116);
	
	var _domHelpersQueryScrollTop2 = _interopRequireDefault(_domHelpersQueryScrollTop);
	
	var utils = {
	
	  getContainerDimensions: function getContainerDimensions(containerNode) {
	    var width = undefined,
	        height = undefined,
	        scroll = undefined;
	
	    if (containerNode.tagName === 'BODY') {
	      width = window.innerWidth;
	      height = window.innerHeight;
	
	      scroll = _domHelpersQueryScrollTop2['default'](_ownerDocument2['default'](containerNode).documentElement) || _domHelpersQueryScrollTop2['default'](containerNode);
	    } else {
	      var _getOffset = _domHelpersQueryOffset2['default'](containerNode);
	
	      width = _getOffset.width;
	      height = _getOffset.height;
	
	      scroll = _domHelpersQueryScrollTop2['default'](containerNode);
	    }
	
	    return { width: width, height: height, scroll: scroll };
	  },
	
	  getPosition: function getPosition(target, container) {
	    var offset = container.tagName === 'BODY' ? _domHelpersQueryOffset2['default'](target) : _domHelpersQueryPosition2['default'](target, container);
	
	    return offset;
	  },
	
	  calcOverlayPosition: function calcOverlayPosition(placement, overlayNode, target, container, padding) {
	    var childOffset = utils.getPosition(target, container);
	
	    var _getOffset2 = _domHelpersQueryOffset2['default'](overlayNode);
	
	    var overlayHeight = _getOffset2.height;
	    var overlayWidth = _getOffset2.width;
	
	    var positionLeft = undefined,
	        positionTop = undefined,
	        arrowOffsetLeft = undefined,
	        arrowOffsetTop = undefined;
	
	    if (placement === 'left' || placement === 'right') {
	      positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;
	
	      if (placement === 'left') {
	        positionLeft = childOffset.left - overlayWidth;
	      } else {
	        positionLeft = childOffset.left + childOffset.width;
	      }
	
	      var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);
	
	      positionTop += topDelta;
	      arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
	      arrowOffsetLeft = void 0;
	    } else if (placement === 'top' || placement === 'bottom') {
	      positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;
	
	      if (placement === 'top') {
	        positionTop = childOffset.top - overlayHeight;
	      } else {
	        positionTop = childOffset.top + childOffset.height;
	      }
	
	      var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
	      positionLeft += leftDelta;
	      arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
	      arrowOffsetTop = void 0;
	    } else {
	      throw new Error('calcOverlayPosition(): No such placement of "' + placement + '" found.');
	    }
	
	    return { positionLeft: positionLeft, positionTop: positionTop, arrowOffsetLeft: arrowOffsetLeft, arrowOffsetTop: arrowOffsetTop };
	  }
	};
	
	function getTopDelta(top, overlayHeight, container, padding) {
	  var containerDimensions = utils.getContainerDimensions(container);
	  var containerScroll = containerDimensions.scroll;
	  var containerHeight = containerDimensions.height;
	
	  var topEdgeOffset = top - padding - containerScroll;
	  var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;
	
	  if (topEdgeOffset < 0) {
	    return -topEdgeOffset;
	  } else if (bottomEdgeOffset > containerHeight) {
	    return containerHeight - bottomEdgeOffset;
	  } else {
	    return 0;
	  }
	}
	
	function getLeftDelta(left, overlayWidth, container, padding) {
	  var containerDimensions = utils.getContainerDimensions(container);
	  var containerWidth = containerDimensions.width;
	
	  var leftEdgeOffset = left - padding;
	  var rightEdgeOffset = left + padding + overlayWidth;
	
	  if (leftEdgeOffset < 0) {
	    return -leftEdgeOffset;
	  } else if (rightEdgeOffset > containerWidth) {
	    return containerWidth - rightEdgeOffset;
	  } else {
	    return 0;
	  }
	}
	exports['default'] = utils;
	module.exports = exports['default'];

/***/ },
/* 274 */
/*!***********************************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/react-overlays/~/react-prop-types/lib/elementType.js ***!
  \***********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _common = __webpack_require__(/*! ./common */ 259);
	
	/**
	 * Checks whether a prop provides a type of element.
	 *
	 * The type of element can be provided in two forms:
	 * - tag name (string)
	 * - a return value of React.createClass(...)
	 *
	 * @param props
	 * @param propName
	 * @param componentName
	 * @returns {Error|undefined}
	 */
	
	function validate(props, propName, componentName) {
	  var errBeginning = _common.errMsg(props, propName, componentName, '. Expected an Element `type`');
	
	  if (typeof props[propName] !== 'function') {
	    if (_react2['default'].isValidElement(props[propName])) {
	      return new Error(errBeginning + ', not an actual Element');
	    }
	
	    if (typeof props[propName] !== 'string') {
	      return new Error(errBeginning + ' such as a tag name or return value of React.createClass(...)');
	    }
	  }
	}
	
	exports['default'] = _common.createChainableTypeChecker(validate);
	module.exports = exports['default'];

/***/ },
/* 275 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/OverlayTrigger.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable react/prop-types */
	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _Object$keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 68)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _domHelpersQueryContains = __webpack_require__(/*! dom-helpers/query/contains */ 103);
	
	var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _utilsCreateContextWrapper = __webpack_require__(/*! ./utils/createContextWrapper */ 276);
	
	var _utilsCreateContextWrapper2 = _interopRequireDefault(_utilsCreateContextWrapper);
	
	var _Overlay = __webpack_require__(/*! ./Overlay */ 270);
	
	var _Overlay2 = _interopRequireDefault(_Overlay);
	
	var _reactLibWarning = __webpack_require__(/*! react/lib/warning */ 96);
	
	var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);
	
	var _lodashObjectPick = __webpack_require__(/*! lodash/object/pick */ 277);
	
	var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);
	
	/**
	 * Check if value one is inside or equal to the of value
	 *
	 * @param {string} one
	 * @param {string|array} of
	 * @returns {boolean}
	 */
	function isOneOf(one, of) {
	  if (Array.isArray(of)) {
	    return of.indexOf(one) >= 0;
	  }
	  return one === of;
	}
	
	var OverlayTrigger = _react2['default'].createClass({
	  displayName: 'OverlayTrigger',
	
	  propTypes: _extends({}, _Overlay2['default'].propTypes, {
	
	    /**
	    * Specify which action or actions trigger Overlay visibility
	    */
	    trigger: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']), _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),
	
	    /**
	     * A millisecond delay amount to show and hide the Overlay once triggered
	     */
	    delay: _react2['default'].PropTypes.number,
	    /**
	     * A millisecond delay amount before showing the Overlay once triggered.
	     */
	    delayShow: _react2['default'].PropTypes.number,
	    /**
	     * A millisecond delay amount before hiding the Overlay once triggered.
	     */
	    delayHide: _react2['default'].PropTypes.number,
	
	    /**
	     * The initial visibility state of the Overlay, for more nuanced visibility controll consider
	     * using the Overlay component directly.
	     */
	    defaultOverlayShown: _react2['default'].PropTypes.bool,
	
	    /**
	     * An element or text to overlay next to the target.
	     */
	    overlay: _react2['default'].PropTypes.node.isRequired,
	
	    /**
	     * @private
	     */
	    onBlur: _react2['default'].PropTypes.func,
	    /**
	     * @private
	     */
	    onClick: _react2['default'].PropTypes.func,
	    /**
	     * @private
	     */
	    onFocus: _react2['default'].PropTypes.func,
	    /**
	     * @private
	     */
	    onMouseEnter: _react2['default'].PropTypes.func,
	    /**
	     * @private
	     */
	    onMouseLeave: _react2['default'].PropTypes.func,
	
	    // override specific overlay props
	    /**
	     * @private
	     */
	    target: function target() {},
	    /**
	    * @private
	    */
	    onHide: function onHide() {},
	    /**
	     * @private
	     */
	    show: function show() {}
	  }),
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      defaultOverlayShown: false,
	      trigger: ['hover', 'focus']
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      isOverlayShown: this.props.defaultOverlayShown
	    };
	  },
	
	  show: function show() {
	    this.setState({
	      isOverlayShown: true
	    });
	  },
	
	  hide: function hide() {
	    this.setState({
	      isOverlayShown: false
	    });
	  },
	
	  toggle: function toggle() {
	    if (this.state.isOverlayShown) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.handleMouseOver = this.handleMouseOverOut.bind(null, this.handleDelayedShow);
	    this.handleMouseOut = this.handleMouseOverOut.bind(null, this.handleDelayedHide);
	  },
	
	  componentDidMount: function componentDidMount() {
	    this._mountNode = document.createElement('div');
	    _react2['default'].render(this._overlay, this._mountNode);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    _react2['default'].unmountComponentAtNode(this._mountNode);
	    this._mountNode = null;
	    clearTimeout(this._hoverDelay);
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    if (this._mountNode) {
	      _react2['default'].render(this._overlay, this._mountNode);
	    }
	  },
	
	  getOverlayTarget: function getOverlayTarget() {
	    return _react2['default'].findDOMNode(this);
	  },
	
	  getOverlay: function getOverlay() {
	    var overlayProps = _extends({}, _lodashObjectPick2['default'](this.props, _Object$keys(_Overlay2['default'].propTypes)), {
	      show: this.state.isOverlayShown,
	      onHide: this.hide,
	      target: this.getOverlayTarget,
	      onExit: this.props.onExit,
	      onExiting: this.props.onExiting,
	      onExited: this.props.onExited,
	      onEnter: this.props.onEnter,
	      onEntering: this.props.onEntering,
	      onEntered: this.props.onEntered
	    });
	
	    var overlay = _react.cloneElement(this.props.overlay, {
	      placement: overlayProps.placement,
	      container: overlayProps.container
	    });
	
	    return _react2['default'].createElement(
	      _Overlay2['default'],
	      overlayProps,
	      overlay
	    );
	  },
	
	  render: function render() {
	    var trigger = _react2['default'].Children.only(this.props.children);
	    var triggerProps = trigger.props;
	
	    var props = {
	      'aria-describedby': this.props.overlay.props.id
	    };
	
	    // create in render otherwise owner is lost...
	    this._overlay = this.getOverlay();
	
	    props.onClick = _utilsCreateChainedFunction2['default'](triggerProps.onClick, this.props.onClick);
	
	    if (isOneOf('click', this.props.trigger)) {
	      props.onClick = _utilsCreateChainedFunction2['default'](this.toggle, props.onClick);
	    }
	
	    if (isOneOf('hover', this.props.trigger)) {
	      _reactLibWarning2['default'](!(this.props.trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' + 'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.');
	
	      props.onMouseOver = _utilsCreateChainedFunction2['default'](this.handleMouseOver, this.props.onMouseOver, triggerProps.onMouseOver);
	      props.onMouseOut = _utilsCreateChainedFunction2['default'](this.handleMouseOut, this.props.onMouseOut, triggerProps.onMouseOut);
	    }
	
	    if (isOneOf('focus', this.props.trigger)) {
	      props.onFocus = _utilsCreateChainedFunction2['default'](this.handleDelayedShow, this.props.onFocus, triggerProps.onFocus);
	      props.onBlur = _utilsCreateChainedFunction2['default'](this.handleDelayedHide, this.props.onBlur, triggerProps.onBlur);
	    }
	
	    return _react.cloneElement(trigger, props);
	  },
	
	  handleDelayedShow: function handleDelayedShow() {
	    var _this = this;
	
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }
	
	    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;
	
	    if (!delay) {
	      this.show();
	      return;
	    }
	
	    this._hoverDelay = setTimeout(function () {
	      _this._hoverDelay = null;
	      _this.show();
	    }, delay);
	  },
	
	  handleDelayedHide: function handleDelayedHide() {
	    var _this2 = this;
	
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }
	
	    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;
	
	    if (!delay) {
	      this.hide();
	      return;
	    }
	
	    this._hoverDelay = setTimeout(function () {
	      _this2._hoverDelay = null;
	      _this2.hide();
	    }, delay);
	  },
	
	  // Simple implementation of mouseEnter and mouseLeave.
	  // React's built version is broken: https://github.com/facebook/react/issues/4251
	  // for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
	  // from one child element to another.
	  handleMouseOverOut: function handleMouseOverOut(handler, e) {
	    var target = e.currentTarget;
	    var related = e.relatedTarget || e.nativeEvent.toElement;
	
	    if (!related || related !== target && !_domHelpersQueryContains2['default'](target, related)) {
	      handler(e);
	    }
	  }
	
	});
	
	/**
	 * Creates a new OverlayTrigger class that forwards the relevant context
	 *
	 * This static method should only be called at the module level, instead of in
	 * e.g. a render() method, because it's expensive to create new classes.
	 *
	 * For example, you would want to have:
	 *
	 * > export default OverlayTrigger.withContext({
	 * >   myContextKey: React.PropTypes.object
	 * > });
	 *
	 * and import this when needed.
	 */
	OverlayTrigger.withContext = _utilsCreateContextWrapper2['default'](OverlayTrigger, 'overlay');
	
	exports['default'] = OverlayTrigger;
	module.exports = exports['default'];

/***/ },
/* 276 */
/*!**************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/createContextWrapper.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	exports['default'] = createContextWrapper;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	/**
	 * Creates new trigger class that injects context into overlay.
	 */
	
	function createContextWrapper(Trigger, propName) {
	  return function (contextTypes) {
	    var ContextWrapper = (function (_React$Component) {
	      _inherits(ContextWrapper, _React$Component);
	
	      function ContextWrapper() {
	        _classCallCheck(this, ContextWrapper);
	
	        _React$Component.apply(this, arguments);
	      }
	
	      ContextWrapper.prototype.getChildContext = function getChildContext() {
	        return this.props.context;
	      };
	
	      ContextWrapper.prototype.render = function render() {
	        // Strip injected props from below.
	        var _props = this.props;
	        var wrapped = _props.wrapped;
	        var context = _props.context;
	
	        var props = _objectWithoutProperties(_props, ['wrapped', 'context']);
	
	        return _react2['default'].cloneElement(wrapped, props);
	      };
	
	      return ContextWrapper;
	    })(_react2['default'].Component);
	
	    ContextWrapper.childContextTypes = contextTypes;
	
	    var TriggerWithContext = (function () {
	      function TriggerWithContext() {
	        _classCallCheck(this, TriggerWithContext);
	      }
	
	      TriggerWithContext.prototype.render = function render() {
	        var props = _extends({}, this.props);
	        props[propName] = this.getWrappedOverlay();
	
	        return _react2['default'].createElement(
	          Trigger,
	          props,
	          this.props.children
	        );
	      };
	
	      TriggerWithContext.prototype.getWrappedOverlay = function getWrappedOverlay() {
	        return _react2['default'].createElement(ContextWrapper, {
	          context: this.context,
	          wrapped: this.props[propName]
	        });
	      };
	
	      return TriggerWithContext;
	    })();
	
	    TriggerWithContext.contextTypes = contextTypes;
	
	    return TriggerWithContext;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 277 */
/*!****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/~/lodash/object/pick.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(/*! ../internal/baseFlatten */ 231),
	    bindCallback = __webpack_require__(/*! ../internal/bindCallback */ 216),
	    pickByArray = __webpack_require__(/*! ../internal/pickByArray */ 233),
	    pickByCallback = __webpack_require__(/*! ../internal/pickByCallback */ 234),
	    restParam = __webpack_require__(/*! ../function/restParam */ 236);
	
	/**
	 * Creates an object composed of the picked `object` properties. Property
	 * names may be specified as individual arguments or as arrays of property
	 * names. If `predicate` is provided it's invoked for each property of `object`
	 * picking the properties `predicate` returns truthy for. The predicate is
	 * bound to `thisArg` and invoked with three arguments: (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to pick, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.pick(object, 'user');
	 * // => { 'user': 'fred' }
	 *
	 * _.pick(object, _.isString);
	 * // => { 'user': 'fred' }
	 */
	var pick = restParam(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  return typeof props[0] == 'function'
	    ? pickByCallback(object, bindCallback(props[0], props[1], 3))
	    : pickByArray(object, baseFlatten(props));
	});
	
	module.exports = pick;


/***/ },
/* 278 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/PageHeader.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var PageHeader = _react2['default'].createClass({
	  displayName: 'PageHeader',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'page-header') }),
	      _react2['default'].createElement(
	        'h1',
	        null,
	        this.props.children
	      )
	    );
	  }
	});
	
	exports['default'] = PageHeader;
	module.exports = exports['default'];

/***/ },
/* 279 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/PageItem.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _SafeAnchor = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var PageItem = _react2['default'].createClass({
	  displayName: 'PageItem',
	
	  propTypes: {
	    href: _react2['default'].PropTypes.string,
	    target: _react2['default'].PropTypes.string,
	    title: _react2['default'].PropTypes.string,
	    disabled: _react2['default'].PropTypes.bool,
	    previous: _react2['default'].PropTypes.bool,
	    next: _react2['default'].PropTypes.bool,
	    onSelect: _react2['default'].PropTypes.func,
	    eventKey: _react2['default'].PropTypes.any
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      disabled: false,
	      previous: false,
	      next: false
	    };
	  },
	
	  render: function render() {
	    var classes = {
	      'disabled': this.props.disabled,
	      'previous': this.props.previous,
	      'next': this.props.next
	    };
	
	    return _react2['default'].createElement(
	      'li',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, classes) }),
	      _react2['default'].createElement(
	        _SafeAnchor2['default'],
	        {
	          href: this.props.href,
	          title: this.props.title,
	          target: this.props.target,
	          onClick: this.handleSelect },
	        this.props.children
	      )
	    );
	  },
	
	  handleSelect: function handleSelect(e) {
	    if (this.props.onSelect || this.props.disabled) {
	      e.preventDefault();
	
	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
	      }
	    }
	  }
	});
	
	exports['default'] = PageItem;
	module.exports = exports['default'];

/***/ },
/* 280 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Pager.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var Pager = _react2['default'].createClass({
	  displayName: 'Pager',
	
	  propTypes: {
	    onSelect: _react2['default'].PropTypes.func
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'ul',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, 'pager') }),
	      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderPageItem)
	    );
	  },
	
	  renderPageItem: function renderPageItem(child, index) {
	    return _react.cloneElement(child, {
	      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
	      key: child.key ? child.key : index
	    });
	  }
	});
	
	exports['default'] = Pager;
	module.exports = exports['default'];

/***/ },
/* 281 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Pagination.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _PaginationButton = __webpack_require__(/*! ./PaginationButton */ 282);
	
	var _PaginationButton2 = _interopRequireDefault(_PaginationButton);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var _SafeAnchor = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var Pagination = _react2['default'].createClass({
	  displayName: 'Pagination',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    activePage: _react2['default'].PropTypes.number,
	    items: _react2['default'].PropTypes.number,
	    maxButtons: _react2['default'].PropTypes.number,
	    ellipsis: _react2['default'].PropTypes.bool,
	    first: _react2['default'].PropTypes.bool,
	    last: _react2['default'].PropTypes.bool,
	    prev: _react2['default'].PropTypes.bool,
	    next: _react2['default'].PropTypes.bool,
	    onSelect: _react2['default'].PropTypes.func,
	    /**
	     * You can use a custom element for the buttons
	     */
	    buttonComponentClass: _utilsCustomPropTypes2['default'].elementType
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      activePage: 1,
	      items: 1,
	      maxButtons: 0,
	      first: false,
	      last: false,
	      prev: false,
	      next: false,
	      ellipsis: true,
	      buttonComponentClass: _SafeAnchor2['default'],
	      bsClass: 'pagination'
	    };
	  },
	
	  renderPageButtons: function renderPageButtons() {
	    var pageButtons = [];
	    var startPage = undefined,
	        endPage = undefined,
	        hasHiddenPagesAfter = undefined;
	    var _props = this.props;
	    var maxButtons = _props.maxButtons;
	    var activePage = _props.activePage;
	    var items = _props.items;
	    var onSelect = _props.onSelect;
	    var ellipsis = _props.ellipsis;
	    var buttonComponentClass = _props.buttonComponentClass;
	
	    if (maxButtons) {
	      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
	      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
	      hasHiddenPagesAfter = startPage + maxButtons <= items;
	
	      if (!hasHiddenPagesAfter) {
	        endPage = items;
	        startPage = items - maxButtons + 1;
	        if (startPage < 1) {
	          startPage = 1;
	        }
	      } else {
	        endPage = startPage + maxButtons - 1;
	      }
	    } else {
	      startPage = 1;
	      endPage = items;
	    }
	
	    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
	      pageButtons.push(_react2['default'].createElement(
	        _PaginationButton2['default'],
	        {
	          key: pagenumber,
	          eventKey: pagenumber,
	          active: pagenumber === activePage,
	          onSelect: onSelect,
	          buttonComponentClass: buttonComponentClass },
	        pagenumber
	      ));
	    }
	
	    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
	      pageButtons.push(_react2['default'].createElement(
	        _PaginationButton2['default'],
	        {
	          key: 'ellipsis',
	          disabled: true,
	          buttonComponentClass: buttonComponentClass },
	        _react2['default'].createElement(
	          'span',
	          { 'aria-label': 'More' },
	          '...'
	        )
	      ));
	    }
	
	    return pageButtons;
	  },
	
	  renderPrev: function renderPrev() {
	    if (!this.props.prev) {
	      return null;
	    }
	
	    return _react2['default'].createElement(
	      _PaginationButton2['default'],
	      {
	        key: 'prev',
	        eventKey: this.props.activePage - 1,
	        disabled: this.props.activePage === 1,
	        onSelect: this.props.onSelect,
	        buttonComponentClass: this.props.buttonComponentClass },
	      _react2['default'].createElement(
	        'span',
	        { 'aria-label': 'Previous' },
	        '‹'
	      )
	    );
	  },
	
	  renderNext: function renderNext() {
	    if (!this.props.next) {
	      return null;
	    }
	
	    return _react2['default'].createElement(
	      _PaginationButton2['default'],
	      {
	        key: 'next',
	        eventKey: this.props.activePage + 1,
	        disabled: this.props.activePage >= this.props.items,
	        onSelect: this.props.onSelect,
	        buttonComponentClass: this.props.buttonComponentClass },
	      _react2['default'].createElement(
	        'span',
	        { 'aria-label': 'Next' },
	        '›'
	      )
	    );
	  },
	
	  renderFirst: function renderFirst() {
	    if (!this.props.first) {
	      return null;
	    }
	
	    return _react2['default'].createElement(
	      _PaginationButton2['default'],
	      {
	        key: 'first',
	        eventKey: 1,
	        disabled: this.props.activePage === 1,
	        onSelect: this.props.onSelect,
	        buttonComponentClass: this.props.buttonComponentClass },
	      _react2['default'].createElement(
	        'span',
	        { 'aria-label': 'First' },
	        '«'
	      )
	    );
	  },
	
	  renderLast: function renderLast() {
	    if (!this.props.last) {
	      return null;
	    }
	
	    return _react2['default'].createElement(
	      _PaginationButton2['default'],
	      {
	        key: 'last',
	        eventKey: this.props.items,
	        disabled: this.props.activePage >= this.props.items,
	        onSelect: this.props.onSelect,
	        buttonComponentClass: this.props.buttonComponentClass },
	      _react2['default'].createElement(
	        'span',
	        { 'aria-label': 'Last' },
	        '»'
	      )
	    );
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'ul',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, this.getBsClassSet()) }),
	      this.renderFirst(),
	      this.renderPrev(),
	      this.renderPageButtons(),
	      this.renderNext(),
	      this.renderLast()
	    );
	  }
	});
	
	exports['default'] = Pagination;
	module.exports = exports['default'];

/***/ },
/* 282 */
/*!****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/PaginationButton.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _utilsCreateSelectedEvent = __webpack_require__(/*! ./utils/createSelectedEvent */ 283);
	
	var _utilsCreateSelectedEvent2 = _interopRequireDefault(_utilsCreateSelectedEvent);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var PaginationButton = _react2['default'].createClass({
	  displayName: 'PaginationButton',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    className: _react2['default'].PropTypes.string,
	    eventKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	    onSelect: _react2['default'].PropTypes.func,
	    disabled: _react2['default'].PropTypes.bool,
	    active: _react2['default'].PropTypes.bool,
	    /**
	     * You can use a custom element for this component
	     */
	    buttonComponentClass: _utilsCustomPropTypes2['default'].elementType
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: false,
	      disabled: false
	    };
	  },
	
	  handleClick: function handleClick(event) {
	    if (this.props.disabled) {
	      return;
	    }
	
	    if (this.props.onSelect) {
	      var selectedEvent = _utilsCreateSelectedEvent2['default'](this.props.eventKey);
	      this.props.onSelect(event, selectedEvent);
	    }
	  },
	
	  render: function render() {
	    var classes = _extends({
	      active: this.props.active,
	      disabled: this.props.disabled
	    }, this.getBsClassSet());
	
	    var _props = this.props;
	    var className = _props.className;
	
	    var anchorProps = _objectWithoutProperties(_props, ['className']);
	
	    var ButtonComponentClass = this.props.buttonComponentClass;
	
	    return _react2['default'].createElement(
	      'li',
	      { className: _classnames2['default'](className, classes) },
	      _react2['default'].createElement(ButtonComponentClass, _extends({}, anchorProps, {
	        onClick: this.handleClick }))
	    );
	  }
	});
	
	exports['default'] = PaginationButton;
	module.exports = exports['default'];

/***/ },
/* 283 */
/*!*************************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/utils/createSelectedEvent.js ***!
  \*************************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = createSelectedEvent;
	
	function createSelectedEvent(eventKey) {
	  var selectionPrevented = false;
	
	  return {
	    eventKey: eventKey,
	
	    preventSelection: function preventSelection() {
	      selectionPrevented = true;
	    },
	
	    isSelectionPrevented: function isSelectionPrevented() {
	      return selectionPrevented;
	    }
	  };
	}
	
	module.exports = exports["default"];

/***/ },
/* 284 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Panel.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _Collapse = __webpack_require__(/*! ./Collapse */ 155);
	
	var _Collapse2 = _interopRequireDefault(_Collapse);
	
	var Panel = _react2['default'].createClass({
	  displayName: 'Panel',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    collapsible: _react2['default'].PropTypes.bool,
	    onSelect: _react2['default'].PropTypes.func,
	    header: _react2['default'].PropTypes.node,
	    id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	    footer: _react2['default'].PropTypes.node,
	    defaultExpanded: _react2['default'].PropTypes.bool,
	    expanded: _react2['default'].PropTypes.bool,
	    eventKey: _react2['default'].PropTypes.any,
	    headerRole: _react2['default'].PropTypes.string,
	    panelRole: _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'panel',
	      bsStyle: 'default',
	      defaultExpanded: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      expanded: this.props.defaultExpanded
	    };
	  },
	
	  handleSelect: function handleSelect(e) {
	    e.selected = true;
	
	    if (this.props.onSelect) {
	      this.props.onSelect(e, this.props.eventKey);
	    } else {
	      e.preventDefault();
	    }
	
	    if (e.selected) {
	      this.handleToggle();
	    }
	  },
	
	  handleToggle: function handleToggle() {
	    this.setState({ expanded: !this.state.expanded });
	  },
	
	  isExpanded: function isExpanded() {
	    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var headerRole = _props.headerRole;
	    var panelRole = _props.panelRole;
	
	    var props = _objectWithoutProperties(_props, ['headerRole', 'panelRole']);
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, props, {
	        className: _classnames2['default'](this.props.className, this.getBsClassSet()),
	        id: this.props.collapsible ? null : this.props.id, onSelect: null }),
	      this.renderHeading(headerRole),
	      this.props.collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody(),
	      this.renderFooter()
	    );
	  },
	
	  renderCollapsibleBody: function renderCollapsibleBody(panelRole) {
	    var props = {
	      className: this.prefixClass('collapse'),
	      id: this.props.id,
	      ref: 'panel',
	      'aria-hidden': !this.isExpanded()
	    };
	    if (panelRole) {
	      props.role = panelRole;
	    }
	
	    return _react2['default'].createElement(
	      _Collapse2['default'],
	      { 'in': this.isExpanded() },
	      _react2['default'].createElement(
	        'div',
	        props,
	        this.renderBody()
	      )
	    );
	  },
	
	  renderBody: function renderBody() {
	    var allChildren = this.props.children;
	    var bodyElements = [];
	    var panelBodyChildren = [];
	    var bodyClass = this.prefixClass('body');
	
	    function getProps() {
	      return { key: bodyElements.length };
	    }
	
	    function addPanelChild(child) {
	      bodyElements.push(_react.cloneElement(child, getProps()));
	    }
	
	    function addPanelBody(children) {
	      bodyElements.push(_react2['default'].createElement(
	        'div',
	        _extends({ className: bodyClass }, getProps()),
	        children
	      ));
	    }
	
	    function maybeRenderPanelBody() {
	      if (panelBodyChildren.length === 0) {
	        return;
	      }
	
	      addPanelBody(panelBodyChildren);
	      panelBodyChildren = [];
	    }
	
	    // Handle edge cases where we should not iterate through children.
	    if (!Array.isArray(allChildren) || allChildren.length === 0) {
	      if (this.shouldRenderFill(allChildren)) {
	        addPanelChild(allChildren);
	      } else {
	        addPanelBody(allChildren);
	      }
	    } else {
	      allChildren.forEach((function (child) {
	        if (this.shouldRenderFill(child)) {
	          maybeRenderPanelBody();
	
	          // Separately add the filled element.
	          addPanelChild(child);
	        } else {
	          panelBodyChildren.push(child);
	        }
	      }).bind(this));
	
	      maybeRenderPanelBody();
	    }
	
	    return bodyElements;
	  },
	
	  shouldRenderFill: function shouldRenderFill(child) {
	    return _react2['default'].isValidElement(child) && child.props.fill != null;
	  },
	
	  renderHeading: function renderHeading(headerRole) {
	    var header = this.props.header;
	
	    if (!header) {
	      return null;
	    }
	
	    if (!_react2['default'].isValidElement(header) || Array.isArray(header)) {
	      header = this.props.collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
	    } else {
	      var className = _classnames2['default'](this.prefixClass('title'), header.props.className);
	
	      if (this.props.collapsible) {
	        header = _react.cloneElement(header, {
	          className: className,
	          children: this.renderAnchor(header.props.children, headerRole)
	        });
	      } else {
	        header = _react.cloneElement(header, { className: className });
	      }
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { className: this.prefixClass('heading') },
	      header
	    );
	  },
	
	  renderAnchor: function renderAnchor(header, headerRole) {
	    return _react2['default'].createElement(
	      'a',
	      {
	        href: '#' + (this.props.id || ''),
	        'aria-controls': this.props.collapsible ? this.props.id : null,
	        className: this.isExpanded() ? null : 'collapsed',
	        'aria-expanded': this.isExpanded(),
	        'aria-selected': this.isExpanded(),
	        onClick: this.handleSelect,
	        role: headerRole },
	      header
	    );
	  },
	
	  renderCollapsibleTitle: function renderCollapsibleTitle(header, headerRole) {
	    return _react2['default'].createElement(
	      'h4',
	      { className: this.prefixClass('title'), role: 'presentation' },
	      this.renderAnchor(header, headerRole)
	    );
	  },
	
	  renderFooter: function renderFooter() {
	    if (!this.props.footer) {
	      return null;
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { className: this.prefixClass('footer') },
	      this.props.footer
	    );
	  }
	});
	
	exports['default'] = Panel;
	module.exports = exports['default'];

/***/ },
/* 285 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Popover.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var Popover = _react2['default'].createClass({
	  displayName: 'Popover',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    /**
	     * An html id attribute, necessary for accessibility
	     * @type {string}
	     * @required
	     */
	    id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
	
	    /**
	     * Sets the direction the Popover is positioned towards.
	     */
	    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	
	    /**
	     * The "left" position value for the Popover.
	     */
	    positionLeft: _react2['default'].PropTypes.number,
	    /**
	     * The "top" position value for the Popover.
	     */
	    positionTop: _react2['default'].PropTypes.number,
	    /**
	     * The "left" position value for the Popover arrow.
	     */
	    arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	    /**
	     * The "top" position value for the Popover arrow.
	     */
	    arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	    /**
	     * Title text
	     */
	    title: _react2['default'].PropTypes.node
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      placement: 'right'
	    };
	  },
	
	  render: function render() {
	    var _classes;
	
	    var classes = (_classes = {
	      'popover': true
	    }, _classes[this.props.placement] = true, _classes);
	
	    var style = _extends({
	      'left': this.props.positionLeft,
	      'top': this.props.positionTop,
	      'display': 'block'
	    }, this.props.style);
	
	    // eslint-disable-line react/prop-types
	    var arrowStyle = {
	      'left': this.props.arrowOffsetLeft,
	      'top': this.props.arrowOffsetTop
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({ role: 'tooltip' }, this.props, { className: _classnames2['default'](this.props.className, classes), style: style, title: null }),
	      _react2['default'].createElement('div', { className: 'arrow', style: arrowStyle }),
	      this.props.title ? this.renderTitle() : null,
	      _react2['default'].createElement(
	        'div',
	        { className: 'popover-content' },
	        this.props.children
	      )
	    );
	  },
	
	  renderTitle: function renderTitle() {
	    return _react2['default'].createElement(
	      'h3',
	      { className: 'popover-title' },
	      this.props.title
	    );
	  }
	});
	
	exports['default'] = Popover;
	module.exports = exports['default'];
	// we don't want to expose the `style` property

/***/ },
/* 286 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/ProgressBar.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* eslint react/prop-types: [2, {ignore: "bsStyle"}] */
	/* BootstrapMixin contains `bsStyle` type validation */
	
	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Interpolate = __webpack_require__(/*! ./Interpolate */ 246);
	
	var _Interpolate2 = _interopRequireDefault(_Interpolate);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var ProgressBar = _react2['default'].createClass({
	  displayName: 'ProgressBar',
	
	  propTypes: {
	    min: _react.PropTypes.number,
	    now: _react.PropTypes.number,
	    max: _react.PropTypes.number,
	    label: _react.PropTypes.node,
	    srOnly: _react.PropTypes.bool,
	    striped: _react.PropTypes.bool,
	    active: _react.PropTypes.bool,
	    children: onlyProgressBar, // eslint-disable-line no-use-before-define
	    className: _react2['default'].PropTypes.string,
	    interpolateClass: _react.PropTypes.node,
	    /**
	     * @private
	     */
	    isChild: _react.PropTypes.bool
	  },
	
	  mixins: [_BootstrapMixin2['default']],
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'progress-bar',
	      min: 0,
	      max: 100,
	      active: false,
	      isChild: false,
	      srOnly: false,
	      striped: false
	    };
	  },
	
	  getPercentage: function getPercentage(now, min, max) {
	    var roundPrecision = 1000;
	    return Math.round((now - min) / (max - min) * 100 * roundPrecision) / roundPrecision;
	  },
	
	  render: function render() {
	    if (this.props.isChild) {
	      return this.renderProgressBar();
	    }
	
	    var content = undefined;
	
	    if (this.props.children) {
	      content = _utilsValidComponentChildren2['default'].map(this.props.children, this.renderChildBar);
	    } else {
	      content = this.renderProgressBar();
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        className: _classnames2['default'](this.props.className, 'progress'),
	        min: null,
	        max: null,
	        label: null,
	        'aria-valuetext': null
	      }),
	      content
	    );
	  },
	
	  renderChildBar: function renderChildBar(child, index) {
	    return _react.cloneElement(child, {
	      isChild: true,
	      key: child.key ? child.key : index
	    });
	  },
	
	  renderProgressBar: function renderProgressBar() {
	    var _props = this.props;
	    var className = _props.className;
	    var label = _props.label;
	    var now = _props.now;
	    var min = _props.min;
	    var max = _props.max;
	
	    var props = _objectWithoutProperties(_props, ['className', 'label', 'now', 'min', 'max']);
	
	    var percentage = this.getPercentage(now, min, max);
	
	    if (typeof label === 'string') {
	      label = this.renderLabel(percentage);
	    }
	
	    if (this.props.srOnly) {
	      label = _react2['default'].createElement(
	        'span',
	        { className: 'sr-only' },
	        label
	      );
	    }
	
	    var classes = _classnames2['default'](className, this.getBsClassSet(), {
	      active: this.props.active,
	      'progress-bar-striped': this.props.active || this.props.striped
	    });
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, props, {
	        className: classes,
	        role: 'progressbar',
	        style: { width: percentage + '%' },
	        'aria-valuenow': this.props.now,
	        'aria-valuemin': this.props.min,
	        'aria-valuemax': this.props.max }),
	      label
	    );
	  },
	
	  renderLabel: function renderLabel(percentage) {
	    var InterpolateClass = this.props.interpolateClass || _Interpolate2['default'];
	
	    return _react2['default'].createElement(
	      InterpolateClass,
	      {
	        now: this.props.now,
	        min: this.props.min,
	        max: this.props.max,
	        percent: percentage,
	        bsStyle: this.props.bsStyle },
	      this.props.label
	    );
	  }
	});
	
	/**
	 * Custom propTypes checker
	 */
	function onlyProgressBar(props, propName, componentName) {
	  if (props[propName]) {
	    var _ret = (function () {
	      var error = undefined,
	          childIdentifier = undefined;
	
	      _react2['default'].Children.forEach(props[propName], function (child) {
	        if (child.type !== ProgressBar) {
	          childIdentifier = child.type.displayName ? child.type.displayName : child.type;
	          error = new Error('Children of ' + componentName + ' can contain only ProgressBar components. Found ' + childIdentifier);
	        }
	      });
	
	      return {
	        v: error
	      };
	    })();
	
	    if (typeof _ret === 'object') return _ret.v;
	  }
	}
	
	exports['default'] = ProgressBar;
	module.exports = exports['default'];

/***/ },
/* 287 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Row.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var Row = _react2['default'].createClass({
	  displayName: 'Row',
	
	  propTypes: {
	    /**
	     * You can use a custom element for this component
	     */
	    componentClass: _utilsCustomPropTypes2['default'].elementType
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      componentClass: 'div'
	    };
	  },
	
	  render: function render() {
	    var ComponentClass = this.props.componentClass;
	
	    return _react2['default'].createElement(
	      ComponentClass,
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'row') }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Row;
	module.exports = exports['default'];

/***/ },
/* 288 */
/*!******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/SubNav.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _SafeAnchor = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var SubNav = _react2['default'].createClass({
	  displayName: 'SubNav',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    onSelect: _react2['default'].PropTypes.func,
	    active: _react2['default'].PropTypes.bool,
	    activeHref: _react2['default'].PropTypes.string,
	    activeKey: _react2['default'].PropTypes.any,
	    disabled: _react2['default'].PropTypes.bool,
	    eventKey: _react2['default'].PropTypes.any,
	    href: _react2['default'].PropTypes.string,
	    title: _react2['default'].PropTypes.string,
	    text: _react2['default'].PropTypes.node,
	    target: _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'nav',
	      active: false,
	      disabled: false
	    };
	  },
	
	  handleClick: function handleClick(e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	
	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
	      }
	    }
	  },
	
	  isActive: function isActive() {
	    return this.isChildActive(this);
	  },
	
	  isChildActive: function isChildActive(child) {
	    if (child.props.active) {
	      return true;
	    }
	
	    if (this.props.activeKey != null && this.props.activeKey === child.props.eventKey) {
	      return true;
	    }
	
	    if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
	      return true;
	    }
	
	    if (child.props.children) {
	      var isActive = false;
	
	      _utilsValidComponentChildren2['default'].forEach(child.props.children, function (grandchild) {
	        if (this.isChildActive(grandchild)) {
	          isActive = true;
	        }
	      }, this);
	
	      return isActive;
	    }
	
	    return false;
	  },
	
	  getChildActiveProp: function getChildActiveProp(child) {
	    if (child.props.active) {
	      return true;
	    }
	    if (this.props.activeKey != null) {
	      if (child.props.eventKey === this.props.activeKey) {
	        return true;
	      }
	    }
	    if (this.props.activeHref != null) {
	      if (child.props.href === this.props.activeHref) {
	        return true;
	      }
	    }
	
	    return child.props.active;
	  },
	
	  render: function render() {
	    var classes = {
	      'active': this.isActive(),
	      'disabled': this.props.disabled
	    };
	
	    return _react2['default'].createElement(
	      'li',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      _react2['default'].createElement(
	        _SafeAnchor2['default'],
	        {
	          href: this.props.href,
	          title: this.props.title,
	          target: this.props.target,
	          onClick: this.handleClick },
	        this.props.text
	      ),
	      _react2['default'].createElement(
	        'ul',
	        { className: 'nav' },
	        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem)
	      )
	    );
	  },
	
	  renderNavItem: function renderNavItem(child, index) {
	    return _react.cloneElement(child, {
	      active: this.getChildActiveProp(child),
	      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
	      key: child.key ? child.key : index
	    });
	  }
	});
	
	exports['default'] = SubNav;
	module.exports = exports['default'];

/***/ },
/* 289 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Tab.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsTransitionEvents = __webpack_require__(/*! ./utils/TransitionEvents */ 151);
	
	var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);
	
	var Tab = _react2['default'].createClass({
	  displayName: 'Tab',
	
	  propTypes: {
	    /**
	     * @private
	     */
	    active: _react2['default'].PropTypes.bool,
	    animation: _react2['default'].PropTypes.bool,
	    /**
	     * It is used by 'Tabs' - parent component
	     * @private
	     */
	    onAnimateOutEnd: _react2['default'].PropTypes.func,
	    disabled: _react2['default'].PropTypes.bool,
	    title: _react2['default'].PropTypes.node
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      animation: true
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      animateIn: false,
	      animateOut: false
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.animation) {
	      if (!this.state.animateIn && nextProps.active && !this.props.active) {
	        this.setState({
	          animateIn: true
	        });
	      } else if (!this.state.animateOut && !nextProps.active && this.props.active) {
	        this.setState({
	          animateOut: true
	        });
	      }
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    if (this.state.animateIn) {
	      setTimeout(this.startAnimateIn, 0);
	    }
	    if (this.state.animateOut) {
	      _utilsTransitionEvents2['default'].addEndEventListener(_react2['default'].findDOMNode(this), this.stopAnimateOut);
	    }
	  },
	
	  startAnimateIn: function startAnimateIn() {
	    if (this.isMounted()) {
	      this.setState({
	        animateIn: false
	      });
	    }
	  },
	
	  stopAnimateOut: function stopAnimateOut() {
	    if (this.isMounted()) {
	      this.setState({
	        animateOut: false
	      });
	
	      if (this.props.onAnimateOutEnd) {
	        this.props.onAnimateOutEnd();
	      }
	    }
	  },
	
	  render: function render() {
	    var classes = {
	      'tab-pane': true,
	      'fade': true,
	      'active': this.props.active || this.state.animateOut,
	      'in': this.props.active && !this.state.animateIn
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, {
	        title: undefined,
	        role: 'tabpanel',
	        'aria-hidden': !this.props.active,
	        className: _classnames2['default'](this.props.className, classes)
	      }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Tab;
	module.exports = exports['default'];

/***/ },
/* 290 */
/*!**********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/TabbedArea.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Tabs = __webpack_require__(/*! ./Tabs */ 291);
	
	var _Tabs2 = _interopRequireDefault(_Tabs);
	
	var _TabPane = __webpack_require__(/*! ./TabPane */ 292);
	
	var _TabPane2 = _interopRequireDefault(_TabPane);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var TabbedArea = _react2['default'].createClass({
	  displayName: 'TabbedArea',
	
	  componentWillMount: function componentWillMount() {
	    _utilsDeprecationWarning2['default']('TabbedArea', 'Tabs', 'https://github.com/react-bootstrap/react-bootstrap/pull/1091');
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var children = _props.children;
	
	    var props = _objectWithoutProperties(_props, ['children']);
	
	    var tabs = _utilsValidComponentChildren2['default'].map(children, function (child) {
	      var _child$props = child.props;
	      var title = _child$props.tab;
	
	      var others = _objectWithoutProperties(_child$props, ['tab']);
	
	      return _react2['default'].createElement(_TabPane2['default'], _extends({ title: title }, others));
	    });
	
	    return _react2['default'].createElement(
	      _Tabs2['default'],
	      props,
	      tabs
	    );
	  }
	});
	
	exports['default'] = TabbedArea;
	module.exports = exports['default'];

/***/ },
/* 291 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Tabs.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _Object$keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 68)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Col = __webpack_require__(/*! ./Col */ 152);
	
	var _Col2 = _interopRequireDefault(_Col);
	
	var _Nav = __webpack_require__(/*! ./Nav */ 267);
	
	var _Nav2 = _interopRequireDefault(_Nav);
	
	var _NavItem = __webpack_require__(/*! ./NavItem */ 269);
	
	var _NavItem2 = _interopRequireDefault(_NavItem);
	
	var _styleMaps = __webpack_require__(/*! ./styleMaps */ 136);
	
	var _styleMaps2 = _interopRequireDefault(_styleMaps);
	
	var _keycode = __webpack_require__(/*! keycode */ 160);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _utilsCreateChainedFunction = __webpack_require__(/*! ./utils/createChainedFunction */ 122);
	
	var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
	
	var _utilsValidComponentChildren = __webpack_require__(/*! ./utils/ValidComponentChildren */ 121);
	
	var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);
	
	var paneId = function paneId(props, child) {
	  return child.props.id ? child.props.id : props.id && props.id + '___pane___' + child.props.eventKey;
	};
	var tabId = function tabId(props, child) {
	  return child.props.id ? child.props.id + '___tab' : props.id && props.id + '___tab___' + child.props.eventKey;
	};
	
	var findChild = _utilsValidComponentChildren2['default'].find;
	
	function getDefaultActiveKeyFromChildren(children) {
	  var defaultActiveKey = undefined;
	
	  _utilsValidComponentChildren2['default'].forEach(children, function (child) {
	    if (defaultActiveKey == null) {
	      defaultActiveKey = child.props.eventKey;
	    }
	  });
	
	  return defaultActiveKey;
	}
	
	function move(children, currentKey, keys, moveNext) {
	  var lastIdx = keys.length - 1;
	  var stopAt = keys[moveNext ? Math.max(lastIdx, 0) : 0];
	  var nextKey = currentKey;
	
	  function getNext() {
	    var idx = keys.indexOf(nextKey);
	    nextKey = moveNext ? keys[Math.min(lastIdx, idx + 1)] : keys[Math.max(0, idx - 1)];
	
	    return findChild(children, function (_child) {
	      return _child.props.eventKey === nextKey;
	    });
	  }
	
	  var next = getNext();
	
	  while (next.props.eventKey !== stopAt && next.props.disabled) {
	    next = getNext();
	  }
	
	  return next.props.disabled ? currentKey : next.props.eventKey;
	}
	
	var Tabs = _react2['default'].createClass({
	  displayName: 'Tabs',
	
	  propTypes: {
	    activeKey: _react2['default'].PropTypes.any,
	    defaultActiveKey: _react2['default'].PropTypes.any,
	    /**
	     * Navigation style for tabs
	     *
	     * If not specified, it will be treated as `'tabs'` when vertically
	     * positioned and `'pills'` when horizontally positioned.
	     */
	    bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),
	    animation: _react2['default'].PropTypes.bool,
	    id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	    onSelect: _react2['default'].PropTypes.func,
	    position: _react2['default'].PropTypes.oneOf(['top', 'left', 'right']),
	    /**
	     * Number of grid columns for the tabs if horizontally positioned
	     *
	     * This accepts either a single width or a mapping of size to width.
	     */
	    tabWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.object]),
	    /**
	     * Number of grid columns for the panes if horizontally positioned
	     *
	     * This accepts either a single width or a mapping of size to width. If not
	     * specified, it will be treated as `styleMaps.GRID_COLUMNS` minus
	     * `tabWidth`.
	     */
	    paneWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.object]),
	    /**
	     * Render without clearfix if horizontally positioned
	     */
	    standalone: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      animation: true,
	      tabWidth: 2,
	      position: 'top',
	      standalone: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var defaultActiveKey = this.props.defaultActiveKey != null ? this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);
	
	    return {
	      activeKey: defaultActiveKey,
	      previousActiveKey: null
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var _this = this;
	
	    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
	      (function () {
	        // check if the 'previousActiveKey' child still exists
	        var previousActiveKey = _this.props.activeKey;
	        _react2['default'].Children.forEach(nextProps.children, function (child) {
	          if (_react2['default'].isValidElement(child)) {
	            if (child.props.eventKey === previousActiveKey) {
	              _this.setState({
	                previousActiveKey: previousActiveKey
	              });
	              return;
	            }
	          }
	        });
	      })();
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    var tabs = this._tabs;
	    var tabIdx = this._eventKeys().indexOf(this.getActiveKey());
	
	    if (this._needsRefocus) {
	      this._needsRefocus = false;
	      if (tabs && tabIdx !== -1) {
	        var tabNode = _react.findDOMNode(tabs[tabIdx]);
	
	        if (tabNode) {
	          tabNode.firstChild.focus();
	        }
	      }
	    }
	  },
	
	  handlePaneAnimateOutEnd: function handlePaneAnimateOutEnd() {
	    this.setState({
	      previousActiveKey: null
	    });
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var id = _props.id;
	    var className = _props.className;
	    var style = _props.style;
	    var position = _props.position;
	    var bsStyle = _props.bsStyle;
	    var tabWidth = _props.tabWidth;
	    var paneWidth = _props.paneWidth;
	    var standalone = _props.standalone;
	    var children = _props.children;
	
	    var props = _objectWithoutProperties(_props, ['id', 'className', 'style', 'position', 'bsStyle', 'tabWidth', 'paneWidth', 'standalone', 'children']);
	
	    var isHorizontal = position === 'left' || position === 'right';
	
	    if (bsStyle == null) {
	      bsStyle = isHorizontal ? 'pills' : 'tabs';
	    }
	
	    var containerProps = { id: id, className: className, style: style };
	
	    var tabsProps = _extends({}, props, {
	      bsStyle: bsStyle,
	      stacked: isHorizontal,
	      activeKey: this.getActiveKey(),
	      onSelect: this.handleSelect,
	      ref: 'tabs',
	      role: 'tablist'
	    });
	    var childTabs = _utilsValidComponentChildren2['default'].map(children, this.renderTab);
	
	    var panesProps = {
	      className: 'tab-content',
	      ref: 'panes'
	    };
	    var childPanes = _utilsValidComponentChildren2['default'].map(children, this.renderPane);
	
	    if (isHorizontal) {
	      if (!standalone) {
	        containerProps.className = _classnames2['default'](containerProps.className, 'clearfix');
	      }
	
	      var _getColProps = this.getColProps({ tabWidth: tabWidth, paneWidth: paneWidth });
	
	      var tabsColProps = _getColProps.tabsColProps;
	      var panesColProps = _getColProps.panesColProps;
	
	      var tabs = _react2['default'].createElement(
	        _Col2['default'],
	        _extends({ componentClass: _Nav2['default'] }, tabsProps, tabsColProps),
	        childTabs
	      );
	      var panes = _react2['default'].createElement(
	        _Col2['default'],
	        _extends({}, panesProps, panesColProps),
	        childPanes
	      );
	
	      if (position === 'left') {
	        return _react2['default'].createElement(
	          'div',
	          containerProps,
	          tabs,
	          panes
	        );
	      } else {
	        return _react2['default'].createElement(
	          'div',
	          containerProps,
	          panes,
	          tabs
	        );
	      }
	    } else {
	      return _react2['default'].createElement(
	        'div',
	        containerProps,
	        _react2['default'].createElement(
	          _Nav2['default'],
	          tabsProps,
	          childTabs
	        ),
	        _react2['default'].createElement(
	          'div',
	          panesProps,
	          childPanes
	        )
	      );
	    }
	  },
	
	  getActiveKey: function getActiveKey() {
	    return this.props.activeKey !== undefined ? this.props.activeKey : this.state.activeKey;
	  },
	
	  renderPane: function renderPane(child, index) {
	    var previousActiveKey = this.state.previousActiveKey;
	
	    var shouldPaneBeSetActive = child.props.eventKey === this.getActiveKey();
	    var thereIsNoActivePane = previousActiveKey == null;
	
	    var paneIsAlreadyActive = previousActiveKey != null && child.props.eventKey === previousActiveKey;
	
	    return _react.cloneElement(child, {
	      active: shouldPaneBeSetActive && (thereIsNoActivePane || !this.props.animation),
	      id: paneId(this.props, child),
	      'aria-labelledby': tabId(this.props, child),
	      key: child.key ? child.key : index,
	      animation: this.props.animation,
	      onAnimateOutEnd: paneIsAlreadyActive ? this.handlePaneAnimateOutEnd : null
	    });
	  },
	
	  renderTab: function renderTab(child, index) {
	    var _this2 = this;
	
	    if (child.props.title == null) {
	      return null;
	    }
	
	    var _child$props = child.props;
	    var eventKey = _child$props.eventKey;
	    var title = _child$props.title;
	    var disabled = _child$props.disabled;
	    var onKeyDown = _child$props.onKeyDown;
	    var _child$props$tabIndex = _child$props.tabIndex;
	    var tabIndex = _child$props$tabIndex === undefined ? 0 : _child$props$tabIndex;
	
	    var isActive = this.getActiveKey() === eventKey;
	
	    return _react2['default'].createElement(
	      _NavItem2['default'],
	      {
	        linkId: tabId(this.props, child),
	        ref: function (ref) {
	          return (_this2._tabs || (_this2._tabs = []))[index] = ref;
	        },
	        'aria-controls': paneId(this.props, child),
	        onKeyDown: _utilsCreateChainedFunction2['default'](this.handleKeyDown, onKeyDown),
	        eventKey: eventKey,
	        tabIndex: isActive ? tabIndex : -1,
	        disabled: disabled },
	      title
	    );
	  },
	
	  getColProps: function getColProps(_ref) {
	    var tabWidth = _ref.tabWidth;
	    var paneWidth = _ref.paneWidth;
	
	    var tabsColProps = undefined;
	    if (tabWidth instanceof Object) {
	      tabsColProps = tabWidth;
	    } else {
	      tabsColProps = { xs: tabWidth };
	    }
	
	    var panesColProps = undefined;
	    if (paneWidth == null) {
	      panesColProps = {};
	      _Object$keys(tabsColProps).forEach(function (size) {
	        panesColProps[size] = _styleMaps2['default'].GRID_COLUMNS - tabsColProps[size];
	      });
	    } else if (paneWidth instanceof Object) {
	      panesColProps = paneWidth;
	    } else {
	      panesColProps = { xs: paneWidth };
	    }
	
	    return { tabsColProps: tabsColProps, panesColProps: panesColProps };
	  },
	
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    // Defer any updates to this component during the `onSelect` handler.
	    return !this._isChanging;
	  },
	
	  handleSelect: function handleSelect(selectedKey) {
	    if (this.props.onSelect) {
	      this._isChanging = true;
	      this.props.onSelect(selectedKey);
	      this._isChanging = false;
	      return;
	    }
	
	    // if there is no external handler, then use embedded one
	    var previousActiveKey = this.getActiveKey();
	    if (selectedKey !== previousActiveKey) {
	      this.setState({
	        activeKey: selectedKey,
	        previousActiveKey: previousActiveKey
	      });
	    }
	  },
	
	  handleKeyDown: function handleKeyDown(event) {
	    var keys = this._eventKeys();
	    var currentKey = this.getActiveKey() || keys[0];
	    var next = undefined;
	
	    switch (event.keyCode) {
	
	      case _keycode2['default'].codes.left:
	      case _keycode2['default'].codes.up:
	        next = move(this.props.children, currentKey, keys, false);
	
	        if (next && next !== currentKey) {
	          event.preventDefault();
	          this.handleSelect(next);
	          this._needsRefocus = true;
	        }
	        break;
	      case _keycode2['default'].codes.right:
	      case _keycode2['default'].codes.down:
	        next = move(this.props.children, currentKey, keys, true);
	
	        if (next && next !== currentKey) {
	          event.preventDefault();
	          this.handleSelect(next);
	          this._needsRefocus = true;
	        }
	        break;
	      default:
	    }
	  },
	
	  _eventKeys: function _eventKeys() {
	    var keys = [];
	
	    _utilsValidComponentChildren2['default'].forEach(this.props.children, function (_ref2) {
	      var eventKey = _ref2.props.eventKey;
	      return keys.push(eventKey);
	    });
	
	    return keys;
	  }
	});
	
	exports['default'] = Tabs;
	module.exports = exports['default'];

/***/ },
/* 292 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/TabPane.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var _Tab = __webpack_require__(/*! ./Tab */ 289);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var TabPane = _react2['default'].createClass({
	  displayName: 'TabPane',
	
	  componentWillMount: function componentWillMount() {
	    _utilsDeprecationWarning2['default']('TabPane', 'Tab', 'https://github.com/react-bootstrap/react-bootstrap/pull/1091');
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(_Tab2['default'], this.props);
	  }
	});
	
	exports['default'] = TabPane;
	module.exports = exports['default'];

/***/ },
/* 293 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Table.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Table = _react2['default'].createClass({
	  displayName: 'Table',
	
	  propTypes: {
	    striped: _react2['default'].PropTypes.bool,
	    bordered: _react2['default'].PropTypes.bool,
	    condensed: _react2['default'].PropTypes.bool,
	    hover: _react2['default'].PropTypes.bool,
	    responsive: _react2['default'].PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bordered: false,
	      condensed: false,
	      hover: false,
	      responsive: false,
	      striped: false
	    };
	  },
	
	  render: function render() {
	    var classes = {
	      'table': true,
	      'table-striped': this.props.striped,
	      'table-bordered': this.props.bordered,
	      'table-condensed': this.props.condensed,
	      'table-hover': this.props.hover
	    };
	    var table = _react2['default'].createElement(
	      'table',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	
	    return this.props.responsive ? _react2['default'].createElement(
	      'div',
	      { className: 'table-responsive' },
	      table
	    ) : table;
	  }
	});
	
	exports['default'] = Table;
	module.exports = exports['default'];

/***/ },
/* 294 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Thumbnail.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var _SafeAnchor = __webpack_require__(/*! ./SafeAnchor */ 166);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var Thumbnail = _react2['default'].createClass({
	  displayName: 'Thumbnail',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  propTypes: {
	    alt: _react2['default'].PropTypes.string,
	    href: _react2['default'].PropTypes.string,
	    src: _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'thumbnail'
	    };
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	
	    if (this.props.href) {
	      return _react2['default'].createElement(
	        _SafeAnchor2['default'],
	        _extends({}, this.props, { href: this.props.href, className: _classnames2['default'](this.props.className, classes) }),
	        _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
	      );
	    } else {
	      if (this.props.children) {
	        return _react2['default'].createElement(
	          'div',
	          _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	          _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt }),
	          _react2['default'].createElement(
	            'div',
	            { className: 'caption' },
	            this.props.children
	          )
	        );
	      } else {
	        return _react2['default'].createElement(
	          'div',
	          _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	          _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
	        );
	      }
	    }
	  }
	});
	
	exports['default'] = Thumbnail;
	module.exports = exports['default'];

/***/ },
/* 295 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Tooltip.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 84)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 95)['default'];
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _objectWithoutProperties = __webpack_require__(/*! babel-runtime/helpers/object-without-properties */ 133)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsCustomPropTypes = __webpack_require__(/*! ./utils/CustomPropTypes */ 119);
	
	var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);
	
	var Tooltip = (function (_React$Component) {
	  _inherits(Tooltip, _React$Component);
	
	  function Tooltip() {
	    _classCallCheck(this, Tooltip);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Tooltip.prototype.render = function render() {
	    var _props = this.props;
	    var placement = _props.placement;
	    var positionLeft = _props.positionLeft;
	    var positionTop = _props.positionTop;
	    var arrowOffsetLeft = _props.arrowOffsetLeft;
	    var arrowOffsetTop = _props.arrowOffsetTop;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	
	    var props = _objectWithoutProperties(_props, ['placement', 'positionLeft', 'positionTop', 'arrowOffsetLeft', 'arrowOffsetTop', 'className', 'style', 'children']);
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({
	        role: 'tooltip'
	      }, props, {
	        className: _classnames2['default'](className, 'tooltip', placement),
	        style: _extends({ left: positionLeft, top: positionTop }, style)
	      }),
	      _react2['default'].createElement('div', {
	        className: 'tooltip-arrow',
	        style: { left: arrowOffsetLeft, top: arrowOffsetTop }
	      }),
	      _react2['default'].createElement(
	        'div',
	        { className: 'tooltip-inner' },
	        children
	      )
	    );
	  };
	
	  return Tooltip;
	})(_react2['default'].Component);
	
	exports['default'] = Tooltip;
	
	Tooltip.propTypes = {
	  /**
	   * An html id attribute, necessary for accessibility
	   * @type {string}
	   * @required
	   */
	  id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
	
	  /**
	   * The direction the tooltip is positioned towards
	   */
	  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	
	  /**
	   * The `left` position value for the tooltip
	   */
	  positionLeft: _react2['default'].PropTypes.number,
	  /**
	   * The `top` position value for the tooltip
	   */
	  positionTop: _react2['default'].PropTypes.number,
	  /**
	   * The `left` position value for the tooltip arrow
	   */
	  arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  /**
	   * The `top` position value for the tooltip arrow
	   */
	  arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string])
	};
	
	Tooltip.defaultProps = {
	  placement: 'right'
	};
	module.exports = exports['default'];

/***/ },
/* 296 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Well.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(/*! babel-runtime/helpers/extends */ 124)['default'];
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 134);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _BootstrapMixin = __webpack_require__(/*! ./BootstrapMixin */ 135);
	
	var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);
	
	var Well = _react2['default'].createClass({
	  displayName: 'Well',
	
	  mixins: [_BootstrapMixin2['default']],
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      bsClass: 'well'
	    };
	  },
	
	  render: function render() {
	    var classes = this.getBsClassSet();
	
	    return _react2['default'].createElement(
	      'div',
	      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Well;
	module.exports = exports['default'];

/***/ },
/* 297 */
/*!******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Portal.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var _reactOverlaysLibPortal = __webpack_require__(/*! react-overlays/lib/Portal */ 257);
	
	var _reactOverlaysLibPortal2 = _interopRequireDefault(_reactOverlaysLibPortal);
	
	exports['default'] = _utilsDeprecationWarning2['default'].wrapper(_reactOverlaysLibPortal2['default'], {
	  message: 'The Portal component is deprecated in react-bootstrap. It has been moved to a more generic library: react-overlays. ' + 'You can read more at: ' + 'http://react-bootstrap.github.io/react-overlays/examples/#portal and ' + 'https://github.com/react-bootstrap/react-bootstrap/issues/1084'
	});
	module.exports = exports['default'];

/***/ },
/* 298 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-bootstrap/lib/Position.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 81)['default'];
	
	exports.__esModule = true;
	
	var _utilsDeprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning */ 83);
	
	var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);
	
	var _reactOverlaysLibPosition = __webpack_require__(/*! react-overlays/lib/Position */ 272);
	
	var _reactOverlaysLibPosition2 = _interopRequireDefault(_reactOverlaysLibPosition);
	
	exports['default'] = _utilsDeprecationWarning2['default'].wrapper(_reactOverlaysLibPosition2['default'], {
	  message: 'The Position component is deprecated in react-bootstrap. It has been moved to a more generic library: react-overlays. ' + 'You can read more at: ' + 'http://react-bootstrap.github.io/react-overlays/examples/#position and ' + 'https://github.com/react-bootstrap/react-bootstrap/issues/1084'
	});
	module.exports = exports['default'];

/***/ },
/* 299 */
/*!*************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/index.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsCreateAll = __webpack_require__(/*! ./components/createAll */ 300);
	
	var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);
	
	var _createAll = _componentsCreateAll2['default'](_react2['default']);
	
	var Provider = _createAll.Provider;
	var connect = _createAll.connect;
	exports.Provider = Provider;
	exports.connect = connect;

/***/ },
/* 300 */
/*!****************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/components/createAll.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = createAll;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createProvider = __webpack_require__(/*! ./createProvider */ 301);
	
	var _createProvider2 = _interopRequireDefault(_createProvider);
	
	var _createConnect = __webpack_require__(/*! ./createConnect */ 303);
	
	var _createConnect2 = _interopRequireDefault(_createConnect);
	
	function createAll(React) {
	  var Provider = _createProvider2['default'](React);
	  var connect = _createConnect2['default'](React);
	
	  return { Provider: Provider, connect: connect };
	}
	
	module.exports = exports['default'];

/***/ },
/* 301 */
/*!*********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/components/createProvider.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = createProvider;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _utilsCreateStoreShape = __webpack_require__(/*! ../utils/createStoreShape */ 302);
	
	var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);
	
	function isUsingOwnerContext(React) {
	  var version = React.version;
	
	  if (typeof version !== 'string') {
	    return true;
	  }
	
	  var sections = version.split('.');
	  var major = parseInt(sections[0], 10);
	  var minor = parseInt(sections[1], 10);
	
	  return major === 0 && minor === 13;
	}
	
	function createProvider(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;
	  var Children = React.Children;
	
	  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);
	  var requireFunctionChild = isUsingOwnerContext(React);
	
	  var didWarnAboutChild = false;
	  function warnAboutFunctionChild() {
	    if (didWarnAboutChild || requireFunctionChild) {
	      return;
	    }
	
	    didWarnAboutChild = true;
	    console.error( // eslint-disable-line no-console
	    'With React 0.14 and later versions, you no longer need to ' + 'wrap <Provider> child into a function.');
	  }
	  function warnAboutElementChild() {
	    if (didWarnAboutChild || !requireFunctionChild) {
	      return;
	    }
	
	    didWarnAboutChild = true;
	    console.error( // eslint-disable-line no-console
	    'With React 0.13, you need to ' + 'wrap <Provider> child into a function. ' + 'This restriction will be removed with React 0.14.');
	  }
	
	  var didWarnAboutReceivingStore = false;
	  function warnAboutReceivingStore() {
	    if (didWarnAboutReceivingStore) {
	      return;
	    }
	
	    didWarnAboutReceivingStore = true;
	    console.error( // eslint-disable-line no-console
	    '<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	  }
	
	  var Provider = (function (_Component) {
	    _inherits(Provider, _Component);
	
	    Provider.prototype.getChildContext = function getChildContext() {
	      return { store: this.store };
	    };
	
	    function Provider(props, context) {
	      _classCallCheck(this, Provider);
	
	      _Component.call(this, props, context);
	      this.store = props.store;
	    }
	
	    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var store = this.store;
	      var nextStore = nextProps.store;
	
	      if (store !== nextStore) {
	        warnAboutReceivingStore();
	      }
	    };
	
	    Provider.prototype.render = function render() {
	      var children = this.props.children;
	
	      if (typeof children === 'function') {
	        warnAboutFunctionChild();
	        children = children();
	      } else {
	        warnAboutElementChild();
	      }
	
	      return Children.only(children);
	    };
	
	    return Provider;
	  })(Component);
	
	  Provider.childContextTypes = {
	    store: storeShape.isRequired
	  };
	  Provider.propTypes = {
	    store: storeShape.isRequired,
	    children: (requireFunctionChild ? PropTypes.func : PropTypes.element).isRequired
	  };
	
	  return Provider;
	}
	
	module.exports = exports['default'];

/***/ },
/* 302 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/utils/createStoreShape.js ***!
  \******************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = createStoreShape;
	
	function createStoreShape(PropTypes) {
	  return PropTypes.shape({
	    subscribe: PropTypes.func.isRequired,
	    dispatch: PropTypes.func.isRequired,
	    getState: PropTypes.func.isRequired
	  });
	}
	
	module.exports = exports["default"];

/***/ },
/* 303 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/components/createConnect.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = createConnect;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _utilsCreateStoreShape = __webpack_require__(/*! ../utils/createStoreShape */ 302);
	
	var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);
	
	var _utilsShallowEqual = __webpack_require__(/*! ../utils/shallowEqual */ 304);
	
	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);
	
	var _utilsIsPlainObject = __webpack_require__(/*! ../utils/isPlainObject */ 305);
	
	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);
	
	var _utilsWrapActionCreators = __webpack_require__(/*! ../utils/wrapActionCreators */ 306);
	
	var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);
	
	var _hoistNonReactStatics = __webpack_require__(/*! hoist-non-react-statics */ 316);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _invariant = __webpack_require__(/*! invariant */ 317);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var defaultMapStateToProps = function defaultMapStateToProps() {
	  return {};
	};
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};
	
	function getDisplayName(Component) {
	  return Component.displayName || Component.name || 'Component';
	}
	
	// Helps track hot reloading.
	var nextVersion = 0;
	
	function createConnect(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;
	
	  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);
	
	  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    var shouldSubscribe = Boolean(mapStateToProps);
	    var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
	    var finalMapDispatchToProps = _utilsIsPlainObject2['default'](mapDispatchToProps) ? _utilsWrapActionCreators2['default'](mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
	    var finalMergeProps = mergeProps || defaultMergeProps;
	    var shouldUpdateStateProps = finalMapStateToProps.length > 1;
	    var shouldUpdateDispatchProps = finalMapDispatchToProps.length > 1;
	    var _options$pure = options.pure;
	    var pure = _options$pure === undefined ? true : _options$pure;
	
	    // Helps track hot reloading.
	    var version = nextVersion++;
	
	    function computeStateProps(store, props) {
	      var state = store.getState();
	      var stateProps = shouldUpdateStateProps ? finalMapStateToProps(state, props) : finalMapStateToProps(state);
	
	      _invariant2['default'](_utilsIsPlainObject2['default'](stateProps), '`mapStateToProps` must return an object. Instead received %s.', stateProps);
	      return stateProps;
	    }
	
	    function computeDispatchProps(store, props) {
	      var dispatch = store.dispatch;
	
	      var dispatchProps = shouldUpdateDispatchProps ? finalMapDispatchToProps(dispatch, props) : finalMapDispatchToProps(dispatch);
	
	      _invariant2['default'](_utilsIsPlainObject2['default'](dispatchProps), '`mapDispatchToProps` must return an object. Instead received %s.', dispatchProps);
	      return dispatchProps;
	    }
	
	    function _computeNextState(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      _invariant2['default'](_utilsIsPlainObject2['default'](mergedProps), '`mergeProps` must return an object. Instead received %s.', mergedProps);
	      return mergedProps;
	    }
	
	    return function wrapWithConnect(WrappedComponent) {
	      var Connect = (function (_Component) {
	        _inherits(Connect, _Component);
	
	        Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	          if (!pure) {
	            this.updateStateProps(nextProps);
	            this.updateDispatchProps(nextProps);
	            this.updateState(nextProps);
	            return true;
	          }
	
	          var storeChanged = nextState.storeState !== this.state.storeState;
	          var propsChanged = !_utilsShallowEqual2['default'](nextProps, this.props);
	          var mapStateProducedChange = false;
	          var dispatchPropsChanged = false;
	
	          if (storeChanged || propsChanged && shouldUpdateStateProps) {
	            mapStateProducedChange = this.updateStateProps(nextProps);
	          }
	
	          if (propsChanged && shouldUpdateDispatchProps) {
	            dispatchPropsChanged = this.updateDispatchProps(nextProps);
	          }
	
	          if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
	            this.updateState(nextProps);
	            return true;
	          }
	
	          return false;
	        };
	
	        function Connect(props, context) {
	          _classCallCheck(this, Connect);
	
	          _Component.call(this, props, context);
	          this.version = version;
	          this.store = props.store || context.store;
	
	          _invariant2['default'](this.store, 'Could not find "store" in either the context or ' + ('props of "' + this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + this.constructor.displayName + '".'));
	
	          this.stateProps = computeStateProps(this.store, props);
	          this.dispatchProps = computeDispatchProps(this.store, props);
	          this.state = { storeState: null };
	          this.updateState();
	        }
	
	        Connect.prototype.computeNextState = function computeNextState() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	          return _computeNextState(this.stateProps, this.dispatchProps, props);
	        };
	
	        Connect.prototype.updateStateProps = function updateStateProps() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	          var nextStateProps = computeStateProps(this.store, props);
	          if (_utilsShallowEqual2['default'](nextStateProps, this.stateProps)) {
	            return false;
	          }
	
	          this.stateProps = nextStateProps;
	          return true;
	        };
	
	        Connect.prototype.updateDispatchProps = function updateDispatchProps() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	          var nextDispatchProps = computeDispatchProps(this.store, props);
	          if (_utilsShallowEqual2['default'](nextDispatchProps, this.dispatchProps)) {
	            return false;
	          }
	
	          this.dispatchProps = nextDispatchProps;
	          return true;
	        };
	
	        Connect.prototype.updateState = function updateState() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	          this.nextState = this.computeNextState(props);
	        };
	
	        Connect.prototype.isSubscribed = function isSubscribed() {
	          return typeof this.unsubscribe === 'function';
	        };
	
	        Connect.prototype.trySubscribe = function trySubscribe() {
	          if (shouldSubscribe && !this.unsubscribe) {
	            this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	            this.handleChange();
	          }
	        };
	
	        Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	          if (this.unsubscribe) {
	            this.unsubscribe();
	            this.unsubscribe = null;
	          }
	        };
	
	        Connect.prototype.componentDidMount = function componentDidMount() {
	          this.trySubscribe();
	        };
	
	        Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	          this.tryUnsubscribe();
	        };
	
	        Connect.prototype.handleChange = function handleChange() {
	          if (!this.unsubscribe) {
	            return;
	          }
	
	          this.setState({
	            storeState: this.store.getState()
	          });
	        };
	
	        Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	          return this.refs.wrappedInstance;
	        };
	
	        Connect.prototype.render = function render() {
	          return React.createElement(WrappedComponent, _extends({ ref: 'wrappedInstance'
	          }, this.nextState));
	        };
	
	        return Connect;
	      })(Component);
	
	      Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	      Connect.WrappedComponent = WrappedComponent;
	      Connect.contextTypes = {
	        store: storeShape
	      };
	      Connect.propTypes = {
	        store: storeShape
	      };
	
	      if (process.env.NODE_ENV !== 'production') {
	        Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	          if (this.version === version) {
	            return;
	          }
	
	          // We are hot reloading!
	          this.version = version;
	
	          // Update the state and bindings.
	          this.trySubscribe();
	          this.updateStateProps();
	          this.updateDispatchProps();
	          this.updateState();
	        };
	      }
	
	      return _hoistNonReactStatics2['default'](Connect, WrappedComponent);
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 304 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/utils/shallowEqual.js ***!
  \**************************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = shallowEqual;
	
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports["default"];

/***/ },
/* 305 */
/*!***************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/utils/isPlainObject.js ***!
  \***************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};
	
	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	
	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }
	
	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;
	
	  if (proto === null) {
	    return true;
	  }
	
	  var constructor = proto.constructor;
	
	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}
	
	module.exports = exports['default'];

/***/ },
/* 306 */
/*!********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/lib/utils/wrapActionCreators.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = wrapActionCreators;
	
	var _redux = __webpack_require__(/*! redux */ 307);
	
	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return _redux.bindActionCreators(actionCreators, dispatch);
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 307 */
/*!*******************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/index.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createStore = __webpack_require__(/*! ./createStore */ 308);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _utilsCombineReducers = __webpack_require__(/*! ./utils/combineReducers */ 310);
	
	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);
	
	var _utilsBindActionCreators = __webpack_require__(/*! ./utils/bindActionCreators */ 313);
	
	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);
	
	var _utilsApplyMiddleware = __webpack_require__(/*! ./utils/applyMiddleware */ 314);
	
	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);
	
	var _utilsCompose = __webpack_require__(/*! ./utils/compose */ 315);
	
	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);
	
	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 308 */
/*!*************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/createStore.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = createStore;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsIsPlainObject = __webpack_require__(/*! ./utils/isPlainObject */ 309);
	
	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};
	
	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	
	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	
	    return function unsubscribe() {
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 309 */
/*!*********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/utils/isPlainObject.js ***!
  \*********************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};
	
	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	
	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }
	
	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;
	
	  if (proto === null) {
	    return true;
	  }
	
	  var constructor = proto.constructor;
	
	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}
	
	module.exports = exports['default'];

/***/ },
/* 310 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/utils/combineReducers.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = combineReducers;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createStore = __webpack_require__(/*! ../createStore */ 308);
	
	var _utilsIsPlainObject = __webpack_require__(/*! ../utils/isPlainObject */ 309);
	
	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);
	
	var _utilsMapValues = __webpack_require__(/*! ../utils/mapValues */ 311);
	
	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);
	
	var _utilsPick = __webpack_require__(/*! ../utils/pick */ 312);
	
	var _utilsPick2 = _interopRequireDefault(_utilsPick);
	
	/* eslint-disable no-console */
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}
	
	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!_utilsIsPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	
	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;
	
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }
	
	  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
	    return undefined;
	  });
	
	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;
	
	    if (sanityError) {
	      throw sanityError;
	    }
	
	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var newState = reducer(state[key], action);
	      if (typeof newState === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      return newState;
	    });
	
	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }
	
	    return finalState;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 311 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/utils/mapValues.js ***!
  \*****************************************************************************/
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = mapValues;
	
	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}
	
	module.exports = exports["default"];

/***/ },
/* 312 */
/*!************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/utils/pick.js ***!
  \************************************************************************/
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = pick;
	
	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}
	
	module.exports = exports["default"];

/***/ },
/* 313 */
/*!**************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/utils/bindActionCreators.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsMapValues = __webpack_require__(/*! ../utils/mapValues */ 311);
	
	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);
	
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    // eslint-disable-line no-eq-null
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}
	
	module.exports = exports['default'];

/***/ },
/* 314 */
/*!***********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/utils/applyMiddleware.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = applyMiddleware;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _compose = __webpack_require__(/*! ./compose */ 315);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 315 */
/*!***************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux/lib/utils/compose.js ***!
  \***************************************************************************/
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}
	
	module.exports = exports["default"];

/***/ },
/* 316 */
/*!***********************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/~/hoist-non-react-statics/index.js ***!
  \***********************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';
	
	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};
	
	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};
	
	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            targetComponent[keys[i]] = sourceComponent[keys[i]];
	        }
	    }
	
	    return targetComponent;
	};


/***/ },
/* 317 */
/*!*************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/react-redux/~/invariant/invariant.js ***!
  \*************************************************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var __DEV__ = process.env.NODE_ENV !== 'production';
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (__DEV__) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 318 */
/*!************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux-undo/lib/index.js ***!
  \************************************************************************/
/***/ function(module, exports) {

	// debug output
	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.parseActions = parseActions;
	exports['default'] = undoable;
	exports.distinctState = distinctState;
	exports.ifAction = ifAction;
	exports.excludeAction = excludeAction;
	var __DEBUG__ = undefined;
	function debug() {
	  if (__DEBUG__) {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (!console.group) {
	      args.unshift('%credux-undo', 'font-style: italic');
	    }
	    console.log.apply(console, args);
	  }
	}
	function debugStart(action, state) {
	  if (__DEBUG__) {
	    var args = ['action', action.type];
	    if (console.group) {
	      args.unshift('%credux-undo', 'font-style: italic');
	      console.groupCollapsed.apply(console, args);
	      console.log('received', { state: state, action: action });
	    } else {
	      debug.apply(undefined, args);
	    }
	  }
	}
	function debugEnd() {
	  if (__DEBUG__) {
	    console.groupEnd && console.groupEnd();
	  }
	}
	// /debug output
	
	// action types
	var ActionTypes = {
	  UNDO: '@@redux-undo/UNDO',
	  REDO: '@@redux-undo/REDO'
	};
	exports.ActionTypes = ActionTypes;
	// /action types
	
	// action creators to change the state
	var ActionCreators = {
	  undo: function undo() {
	    return { type: ActionTypes.UNDO };
	  },
	  redo: function redo() {
	    return { type: ActionTypes.REDO };
	  }
	};
	exports.ActionCreators = ActionCreators;
	// /action creators
	
	// length: get length of history
	function length(history) {
	  var past = history.past;
	  var future = history.future;
	
	  return past.length + 1 + future.length;
	}
	// /length
	
	// insert: insert `state` into history, which means adding the current state
	//         into `past`, setting the new `state` as `present` and erasing
	//         the `future`.
	function insert(history, state, limit) {
	  debug('insert', { state: state, history: history, free: limit - length(history) });
	
	  var past = history.past;
	  var present = history.present;
	
	  var historyOverflow = limit && length(history) >= limit;
	
	  if (present === undefined) {
	    // init history
	    return {
	      past: [],
	      present: state,
	      future: []
	    };
	  }
	
	  return {
	    past: [].concat(past.slice(historyOverflow ? 1 : 0), [present]),
	    present: state,
	    future: []
	  };
	}
	// /insert
	
	// undo: go back to the previous point in history
	function undo(history) {
	  debug('undo', { history: history });
	
	  var past = history.past;
	  var present = history.present;
	  var future = history.future;
	
	  if (past.length <= 0) return history;
	
	  return {
	    past: past.slice(0, past.length - 1), // remove last element from past
	    present: past[past.length - 1], // set element as new present
	    future: [present].concat(future)
	  };
	}
	// /undo
	
	// redo: go to the next point in history
	function redo(history) {
	  debug('redo', { history: history });
	
	  var past = history.past;
	  var present = history.present;
	  var future = history.future;
	
	  if (future.length <= 0) return history;
	
	  return {
	    future: future.slice(1, future.length), // remove element from future
	    present: future[0], // set element as new present
	    past: [].concat(past, [present])
	  };
	}
	// /redo
	
	// updateState
	// old present state is in the past now
	function updateState(state, history) {
	  return _extends({}, state, {
	    history: history,
	    present: history.present
	  });
	}
	// /updateState
	
	// createHistory
	function createHistory(state) {
	  return {
	    past: [],
	    present: state,
	    future: []
	  };
	}
	// /createHistory
	
	// parseActions
	
	function parseActions(rawActions) {
	  var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	  if (Array.isArray(rawActions)) {
	    return rawActions;
	  } else if (typeof rawActions === 'string') {
	    return [rawActions];
	  }
	  return defaultValue;
	}
	
	// /parseActions
	
	// redux-undo higher order reducer
	
	function undoable(reducer) {
	  var rawConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  __DEBUG__ = rawConfig.debug;
	
	  var config = {
	    initialState: rawConfig.initialState,
	    initTypes: parseActions(rawConfig.initTypes, ['@@redux/INIT', '@@INIT']),
	    limit: rawConfig.limit,
	    filter: rawConfig.filter || function () {
	      return true;
	    },
	    undoType: rawConfig.undoType || ActionTypes.UNDO,
	    redoType: rawConfig.redoType || ActionTypes.REDO
	  };
	  config.history = rawConfig.initialHistory || createHistory(config.initialState);
	
	  if (config.initTypes.length === 0) {
	    console.warn('redux-undo: supply at least one action type in initTypes to ensure initial state');
	  }
	
	  return function (state, action) {
	    debugStart(action, state);
	    var res = undefined;
	    switch (action.type) {
	      case config.undoType:
	        res = undo(state.history);
	        debug('after undo', res);
	        debugEnd();
	        return res ? updateState(state, res) : state;
	
	      case config.redoType:
	        res = redo(state.history);
	        debug('after redo', res);
	        debugEnd();
	        return res ? updateState(state, res) : state;
	
	      default:
	        res = reducer(state && state.present, action);
	
	        if (config.initTypes.some(function (actionType) {
	          return actionType === action.type;
	        })) {
	          debug('reset history due to init action');
	          debugEnd();
	          return _extends({}, state, {
	            present: res,
	            history: createHistory(res)
	          });
	        }
	
	        if (config.filter && typeof config.filter === 'function') {
	          if (!config.filter(action, res, state && state.present)) {
	            debug('filter prevented action, not storing it');
	            debugEnd();
	            return _extends({}, state, {
	              present: res
	            });
	          }
	        }
	
	        var history = state && state.history !== undefined ? state.history : config.history;
	        var updatedHistory = insert(history, res, config.limit);
	        debug('after insert', { history: updatedHistory, free: config.limit - length(updatedHistory) });
	        debugEnd();
	
	        return _extends({}, state, {
	          present: res,
	          history: updatedHistory
	        });
	    }
	  };
	}
	
	// /redux-undo
	
	// distinctState helper
	
	function distinctState() {
	  return function (action, currentState, previousState) {
	    return currentState !== previousState;
	  };
	}
	
	// /distinctState
	
	// ifAction helper
	
	function ifAction(rawActions) {
	  var actions = parseActions(rawActions);
	  return function (action) {
	    return actions.indexOf(action.type) >= 0;
	  };
	}
	
	// /ifAction
	
	// excludeAction helper
	
	function excludeAction() {
	  var rawActions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	  var actions = parseActions(rawActions);
	  return function (action) {
	    return actions.indexOf(action.type) < 0;
	  };
	}
	
	// /excludeAction
	// old present state is in the future now

/***/ },
/* 319 */
/*!********************!*\
  !*** ./actions.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.setOrder = setOrder;
	exports.toggleCardExpansion = toggleCardExpansion;
	exports.initCards = initCards;
	exports.setAttrLabel = setAttrLabel;
	exports.setAttrType = setAttrType;
	exports.fillFromSchema = fillFromSchema;
	exports.renameColumns = renameColumns;
	exports.createNewTable = createNewTable;
	exports.loadTable = loadTable;
	exports.writeTable = writeTable;
	exports.configIndyva = configIndyva;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _context = __webpack_require__(/*! context */ 320);
	
	var _context2 = _interopRequireDefault(_context);
	
	var SET_ORDER = 'SET_ORDER';
	exports.SET_ORDER = SET_ORDER;
	var TOGGLE_CARD_EXPANSION = 'TOGGLE_CARD_EXPANSION';
	exports.TOGGLE_CARD_EXPANSION = TOGGLE_CARD_EXPANSION;
	var SET_ATTR_LABEL = 'SET_ATTR_LABEL';
	exports.SET_ATTR_LABEL = SET_ATTR_LABEL;
	var SET_ATTR_TYPE = 'SET_ATTR_TYPE';
	exports.SET_ATTR_TYPE = SET_ATTR_TYPE;
	var FILL_FROM_SCHEMA = 'FILL_FROM_SCHEMA';
	exports.FILL_FROM_SCHEMA = FILL_FROM_SCHEMA;
	var INIT_CARDS = 'INIT_CARDS';
	
	exports.INIT_CARDS = INIT_CARDS;
	var LOAD_TABLE_REQUEST = 'LOAD_TABLE_REQUEST';
	exports.LOAD_TABLE_REQUEST = LOAD_TABLE_REQUEST;
	var LOAD_TABLE_FAILURE = 'LOAD_TABLE_FAILURE';
	exports.LOAD_TABLE_FAILURE = LOAD_TABLE_FAILURE;
	var LOAD_TABLE_SUCCESS = 'LOAD_TABLE_SUCCESS';
	
	exports.LOAD_TABLE_SUCCESS = LOAD_TABLE_SUCCESS;
	var RENAME_COLUMNS_REQUEST = 'RENAME_COLUMNS_REQUEST';
	exports.RENAME_COLUMNS_REQUEST = RENAME_COLUMNS_REQUEST;
	var RENAME_COLUMNS_FAILURE = 'RENAME_COLUMNS_FAILURE';
	exports.RENAME_COLUMNS_FAILURE = RENAME_COLUMNS_FAILURE;
	var RENAME_COLUMNS_SUCCESS = 'RENAME_COLUMNS_SUCCESS';
	
	exports.RENAME_COLUMNS_SUCCESS = RENAME_COLUMNS_SUCCESS;
	var CREATE_NEW_TABLE_REQUEST = 'CREATE_NEW_TABLE_REQUEST';
	exports.CREATE_NEW_TABLE_REQUEST = CREATE_NEW_TABLE_REQUEST;
	var CREATE_NEW_TABLE_FAILURE = 'CREATE_NEW_TABLE_FAILURE';
	exports.CREATE_NEW_TABLE_FAILURE = CREATE_NEW_TABLE_FAILURE;
	var CREATE_NEW_TABLE_SUCCESS = 'CREATE_NEW_TABLE_SUCCESS';
	
	exports.CREATE_NEW_TABLE_SUCCESS = CREATE_NEW_TABLE_SUCCESS;
	var WRITE_TABLE_REQUEST = 'WRITE_TABLE_REQUEST';
	exports.WRITE_TABLE_REQUEST = WRITE_TABLE_REQUEST;
	var WRITE_TABLE_FAILURE = 'WRITE_TABLE_FAILURE';
	exports.WRITE_TABLE_FAILURE = WRITE_TABLE_FAILURE;
	var WRITE_TABLE_SUCCESS = 'WRITE_TABLE_SUCCESS';
	
	exports.WRITE_TABLE_SUCCESS = WRITE_TABLE_SUCCESS;
	var CONFIG_INDYVA_REQUEST = 'CONFIG_INDYVA_REQUEST';
	exports.CONFIG_INDYVA_REQUEST = CONFIG_INDYVA_REQUEST;
	var CONFIG_INDYVA_FAILURE = 'CONFIG_INDYVA_FAILURE';
	exports.CONFIG_INDYVA_FAILURE = CONFIG_INDYVA_FAILURE;
	var CONFIG_INDYVA_SUCCESS = 'CONFIG_INDYVA_SUCCESS';
	
	exports.CONFIG_INDYVA_SUCCESS = CONFIG_INDYVA_SUCCESS;
	
	function setOrder(order) {
	    return { type: SET_ORDER, order: order };
	}
	
	function toggleCardExpansion(cardKey) {
	    return { type: TOGGLE_CARD_EXPANSION, cardKey: cardKey };
	}
	
	function initCards(attributes) {
	    return { type: INIT_CARDS, attributes: attributes };
	}
	
	function setAttrLabel(attr, label) {
	    return { type: SET_ATTR_LABEL, attr: attr, label: label };
	}
	
	function setAttrType(attr, type) {
	    return { type: SET_ATTR_TYPE, attr: attr, attrType: type };
	}
	
	function fillFromSchema(schema) {
	    return { type: FILL_FROM_SCHEMA, schema: schema };
	}
	
	function renameColumns(tableName, namesMap) {
	    var rpc = _context2['default'].instance().rpc;
	    if (_.isEmpty(namesMap)) {
	        /* If nothing has to be renamed, dispatch a success */
	        return function (dispatch) {
	            return Promise.resolve(dispatch({ type: RENAME_COLUMNS_SUCCESS, namesMap: namesMap }));
	        };
	    }
	    return function (dispatch) {
	        dispatch({ type: RENAME_COLUMNS_REQUEST });
	
	        return rpc.call("TableSrv.rename_columns", [tableName, namesMap]).then(function () {
	            return dispatch({ type: RENAME_COLUMNS_SUCCESS, namesMap: namesMap });
	        }).otherwise(function (error) {
	            return dispatch({ type: RENAME_COLUMNS_FAILURE, namesMap: namesMap, error: error });
	        });
	    };
	}
	
	function createNewTable(name, sourceTable, schema) {
	    var rpc = _context2['default'].instance().rpc;
	    return function (dispatch) {
	        dispatch({ type: CREATE_NEW_TABLE_REQUEST });
	
	        return rpc.call("TableSrv.get_data", [sourceTable]).then(function (data) {
	            return rpc.call("TableSrv.new_table", [name, data, schema]);
	        }).then(function () {
	            return dispatch({ type: CREATE_NEW_TABLE_SUCCESS });
	        }).otherwise(function (error) {
	            return dispatch({ type: CREATE_NEW_TABLE_FAILURE, error: error });
	        });
	    };
	}
	
	function loadTable(tableName, destination) {
	    var rpc = _context2['default'].instance().rpc;
	    return function (dispatch) {
	        dispatch({ type: LOAD_TABLE_REQUEST });
	
	        return rpc.call("IOSrv.read_csv", [tableName, destination]).then(function (table) {
	            return rpc.call("TableSrv.schema", [table]);
	        }).then(function (schema) {
	            dispatch({ type: LOAD_TABLE_SUCCESS });
	            dispatch(fillFromSchema(schema));
	            dispatch(initCards(schema.attributes));
	        }).otherwise(function (error) {
	            dispatch({ type: LOAD_TABLE_FAILURE, error: error });
	        });
	    };
	}
	
	function writeTable(tableName, filePath) {
	    var rpc = _context2['default'].instance().rpc;
	    return function (dispatch) {
	        dispatch({ type: WRITE_TABLE_REQUEST });
	
	        return rpc.call("IOSrv.write_csv", [tableName, filePath]).then(function () {
	            dispatch({ type: WRITE_TABLE_SUCCESS });
	        }).otherwise(function (error) {
	            dispatch({ type: WRITE_TABLE_FAILURE, error: error });
	        });
	    };
	}
	
	function configIndyva(tableName) {
	    var rpc = _context2['default'].instance().rpc;
	    return function (dispatch) {
	        dispatch({ type: CONFIG_INDYVA_REQUEST });
	
	        return rpc.call("config_app", [{ dataset: tableName }]).then(function () {
	            dispatch({ type: CONFIG_INDYVA_SUCCESS });
	        }).otherwise(function (error) {
	            dispatch({ type: CONFIG_INDYVA_FAILURE, error: error });
	        });
	    };
	}

/***/ },
/* 320 */
/*!***********************************!*\
  !*** ../lib/indyva-js/context.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! when */ 321), __webpack_require__(/*! reconnecting-websocket */ 341), __webpack_require__(/*! ws-rpc */ 342), __webpack_require__(/*! hub */ 343)], __WEBPACK_AMD_DEFINE_RESULT__ = function (when, ReconnectingWebSocket, WsRpc, Hub) {
	
	  var Context = function Context(server, path, port) {
	    var self = this;
	
	    this.path = path || 'ws';
	    this.port = port || parseInt(window.location.port);
	    this.server = server || window.location.hostname;
	
	    this.session = null;
	  };
	
	  /// The server to connect to.
	  Context.prototype.server = window.location.hostname;
	  /// The port to connect to.
	  Context.prototype.port = window.location.port;
	  /// The path where the WS serever is listening
	  Context.prototype.path = 'ws';
	
	  /// The session name.
	  Context.prototype.session = null;
	
	  /// The installed instance
	  Context.prototype._instance = null;
	  /// WsRpc instance
	  Context.prototype._rpc = null;
	  /// WsRpc instance
	  Context.prototype._hub = null;
	
	  // Class method
	  Context.instance = function () {
	    if (Context.prototype._instance == null) Context.prototype._instance = new Context();
	    return Context.prototype._instance;
	  };
	  Context.prototype.install = function () {
	    if (Context.prototype._instance) throw new Error("Context already installed");
	    Context.prototype._instance = this;
	  };
	
	  /**
	   * The singleton creator of WsRpc
	   *
	   * @property rpc
	   * @return		 WsRpc instance
	   */
	  Object.defineProperty(Context.prototype, "rpc", {
	    get: function get() {
	      if (this._rpc === null) {
	        this._rpc = new WsRpc(this.server, this.path, this.port);
	        this._rpc.extend(this);
	      }
	      return this._rpc;
	    }
	  });
	
	  /**
	   * The singleton creator of Hub
	   *
	   * @property hub
	   * @return		 Hub instance
	   */
	  Object.defineProperty(Context.prototype, "hub", {
	    get: function get() {
	      if (this._hub === null) {
	        this._hub = new Hub(this.server, this.port + 1, this.rpc, this.session);
	      }
	      return this._hub;
	    }
	  });
	
	  /**
	   * Modifies in-place the request to add context information
	   * @fn modifyRequest
	   * @memberof Context
	   *
	   * @param request    The JSON-RPC request.
	   */
	  Context.prototype.modifyRequest = function (request) {
	    if (this.session === null) return;
	    var _context = { session: this.session };
	    if (Array.isArray(request.params)) {
	      request.params = {
	        _params: request.params,
	        _context: _context
	      };
	    } else {
	      request.params._context = _context;
	    }
	  };
	
	  /**
	   * Open a new session and include it in the Context so any later
	   * call will execute in the context of this session
	   * @fn openSession
	   * @memberof Context
	   *
	   * @param session    The session name.
	   */
	  Context.prototype.openSession = function (session) {
	    var self = this;
	    var promise = this.rpc.call('SessionSrv.open_session', [session]).then(function () {
	      self.session = session;
	    });
	    this.session = session;
	    return promise;
	  };
	
	  /**
	   * Open a new session and include it in the session so any later
	   * call will execute in the context of this session
	   * @fn closeSession
	   * @memberof Context
	   *
	   */
	  Context.prototype.closeSession = function () {
	    var self = this;
	    var promise = this.rpc.call('SessionSrv.close_session', [this.session]).then(function () {
	      self.session = null;
	    });
	    return promise;
	  };
	
	  /**
	   * Use a session including it in the Context so any later call
	   * will execute in the context of this session
	   * @fn closeSession
	   * @memberof Context
	   * @return isNew (Bool) Return if the session requested was
	   *                      already open in the server or if was
	   *                      created by this call.
	   */
	  Context.prototype.useSession = function (session) {
	    var self = this;
	    var promise = this.rpc.call('SessionSrv.use_session', [session]).then(function (isNew) {
	      self.session = session;
	      return isNew;
	    });
	    return promise;
	  };
	
	  return Context;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 321 */
/*!*************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/when.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	
	/**
	 * Promises/A+ and when() implementation
	 * when is part of the cujoJS family of libraries (http://cujojs.com/)
	 * @author Brian Cavalier
	 * @author John Hann
	 */
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var timed = __webpack_require__(/*! ./lib/decorators/timed */ 322);
		var array = __webpack_require__(/*! ./lib/decorators/array */ 327);
		var flow = __webpack_require__(/*! ./lib/decorators/flow */ 330);
		var fold = __webpack_require__(/*! ./lib/decorators/fold */ 331);
		var inspect = __webpack_require__(/*! ./lib/decorators/inspect */ 332);
		var generate = __webpack_require__(/*! ./lib/decorators/iterate */ 333);
		var progress = __webpack_require__(/*! ./lib/decorators/progress */ 334);
		var withThis = __webpack_require__(/*! ./lib/decorators/with */ 335);
		var unhandledRejection = __webpack_require__(/*! ./lib/decorators/unhandledRejection */ 336);
		var TimeoutError = __webpack_require__(/*! ./lib/TimeoutError */ 326);
	
		var Promise = [array, flow, fold, generate, progress,
			inspect, withThis, timed, unhandledRejection]
			.reduce(function(Promise, feature) {
				return feature(Promise);
			}, __webpack_require__(/*! ./lib/Promise */ 338));
	
		var apply = __webpack_require__(/*! ./lib/apply */ 329)(Promise);
	
		// Public API
	
		when.promise     = promise;              // Create a pending promise
		when.resolve     = Promise.resolve;      // Create a resolved promise
		when.reject      = Promise.reject;       // Create a rejected promise
	
		when.lift        = lift;                 // lift a function to return promises
		when['try']      = attempt;              // call a function and return a promise
		when.attempt     = attempt;              // alias for when.try
	
		when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
		when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	
		when.join        = join;                 // Join 2 or more promises
	
		when.all         = all;                  // Resolve a list of promises
		when.settle      = settle;               // Settle a list of promises
	
		when.any         = lift(Promise.any);    // One-winner race
		when.some        = lift(Promise.some);   // Multi-winner race
		when.race        = lift(Promise.race);   // First-to-settle race
	
		when.map         = map;                  // Array.map() for promises
		when.filter      = filter;               // Array.filter() for promises
		when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
		when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises
	
		when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable
	
		when.Promise     = Promise;              // Promise constructor
		when.defer       = defer;                // Create a {promise, resolve, reject} tuple
	
		// Error types
	
		when.TimeoutError = TimeoutError;
	
		/**
		 * Get a trusted promise for x, or by transforming x with onFulfilled
		 *
		 * @param {*} x
		 * @param {function?} onFulfilled callback to be called when x is
		 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
		 *   will be invoked immediately.
		 * @param {function?} onRejected callback to be called when x is
		 *   rejected.
		 * @param {function?} onProgress callback to be called when progress updates
		 *   are issued for x. @deprecated
		 * @returns {Promise} a new promise that will fulfill with the return
		 *   value of callback or errback or the completion value of promiseOrValue if
		 *   callback and/or errback is not supplied.
		 */
		function when(x, onFulfilled, onRejected, onProgress) {
			var p = Promise.resolve(x);
			if (arguments.length < 2) {
				return p;
			}
	
			return p.then(onFulfilled, onRejected, onProgress);
		}
	
		/**
		 * Creates a new promise whose fate is determined by resolver.
		 * @param {function} resolver function(resolve, reject, notify)
		 * @returns {Promise} promise whose fate is determine by resolver
		 */
		function promise(resolver) {
			return new Promise(resolver);
		}
	
		/**
		 * Lift the supplied function, creating a version of f that returns
		 * promises, and accepts promises as arguments.
		 * @param {function} f
		 * @returns {Function} version of f that returns promises
		 */
		function lift(f) {
			return function() {
				for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
					a[i] = arguments[i];
				}
				return apply(f, this, a);
			};
		}
	
		/**
		 * Call f in a future turn, with the supplied args, and return a promise
		 * for the result.
		 * @param {function} f
		 * @returns {Promise}
		 */
		function attempt(f /*, args... */) {
			/*jshint validthis:true */
			for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i+1];
			}
			return apply(f, this, a);
		}
	
		/**
		 * Creates a {promise, resolver} pair, either or both of which
		 * may be given out safely to consumers.
		 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
		 */
		function defer() {
			return new Deferred();
		}
	
		function Deferred() {
			var p = Promise._defer();
	
			function resolve(x) { p._handler.resolve(x); }
			function reject(x) { p._handler.reject(x); }
			function notify(x) { p._handler.notify(x); }
	
			this.promise = p;
			this.resolve = resolve;
			this.reject = reject;
			this.notify = notify;
			this.resolver = { resolve: resolve, reject: reject, notify: notify };
		}
	
		/**
		 * Determines if x is promise-like, i.e. a thenable object
		 * NOTE: Will return true for *any thenable object*, and isn't truly
		 * safe, since it may attempt to access the `then` property of x (i.e.
		 *  clever/malicious getters may do weird things)
		 * @param {*} x anything
		 * @returns {boolean} true if x is promise-like
		 */
		function isPromiseLike(x) {
			return x && typeof x.then === 'function';
		}
	
		/**
		 * Return a promise that will resolve only once all the supplied arguments
		 * have resolved. The resolution value of the returned promise will be an array
		 * containing the resolution values of each of the arguments.
		 * @param {...*} arguments may be a mix of promises and values
		 * @returns {Promise}
		 */
		function join(/* ...promises */) {
			return Promise.all(arguments);
		}
	
		/**
		 * Return a promise that will fulfill once all input promises have
		 * fulfilled, or reject when any one input promise rejects.
		 * @param {array|Promise} promises array (or promise for an array) of promises
		 * @returns {Promise}
		 */
		function all(promises) {
			return when(promises, Promise.all);
		}
	
		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will only reject if `promises` itself is a rejected promise.
		 * @param {array|Promise} promises array (or promise for an array) of promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return when(promises, Promise.settle);
		}
	
		/**
		 * Promise-aware array map function, similar to `Array.prototype.map()`,
		 * but input array may contain promises or values.
		 * @param {Array|Promise} promises array of anything, may contain promises and values
		 * @param {function(x:*, index:Number):*} mapFunc map function which may
		 *  return a promise or value
		 * @returns {Promise} promise that will fulfill with an array of mapped values
		 *  or reject if any input promise rejects.
		 */
		function map(promises, mapFunc) {
			return when(promises, function(promises) {
				return Promise.map(promises, mapFunc);
			});
		}
	
		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array|Promise} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			return when(promises, function(promises) {
				return Promise.filter(promises, predicate);
			});
		}
	
		return when;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(/*! !webpack amd define */ 325));


/***/ },
/* 322 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/timed.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var env = __webpack_require__(/*! ../env */ 323);
		var TimeoutError = __webpack_require__(/*! ../TimeoutError */ 326);
	
		function setTimeout(f, ms, x, y) {
			return env.setTimer(function() {
				f(x, y, ms);
			}, ms);
		}
	
		return function timed(Promise) {
			/**
			 * Return a new promise whose fulfillment value is revealed only
			 * after ms milliseconds
			 * @param {number} ms milliseconds
			 * @returns {Promise}
			 */
			Promise.prototype.delay = function(ms) {
				var p = this._beget();
				this._handler.fold(handleDelay, ms, void 0, p._handler);
				return p;
			};
	
			function handleDelay(ms, x, h) {
				setTimeout(resolveDelay, ms, x, h);
			}
	
			function resolveDelay(x, h) {
				h.resolve(x);
			}
	
			/**
			 * Return a new promise that rejects after ms milliseconds unless
			 * this promise fulfills earlier, in which case the returned promise
			 * fulfills with the same value.
			 * @param {number} ms milliseconds
			 * @param {Error|*=} reason optional rejection reason to use, defaults
			 *   to a TimeoutError if not provided
			 * @returns {Promise}
			 */
			Promise.prototype.timeout = function(ms, reason) {
				var p = this._beget();
				var h = p._handler;
	
				var t = setTimeout(onTimeout, ms, reason, p._handler);
	
				this._handler.visit(h,
					function onFulfill(x) {
						env.clearTimer(t);
						this.resolve(x); // this = h
					},
					function onReject(x) {
						env.clearTimer(t);
						this.reject(x); // this = h
					},
					h.notify);
	
				return p;
			};
	
			function onTimeout(reason, h, ms) {
				var e = typeof reason === 'undefined'
					? new TimeoutError('timed out after ' + ms + 'ms')
					: reason;
				h.reject(e);
			}
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 323 */
/*!****************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/env.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		/*jshint maxcomplexity:6*/
	
		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// setTimeout, and finally vertx, since its the only env that doesn't
		// have setTimeout
	
		var MutationObs;
		var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;
	
		// Default env
		var setTimer = function(f, ms) { return setTimeout(f, ms); };
		var clearTimer = function(t) { return clearTimeout(t); };
		var asap = function (f) { return capturedSetTimeout(f, 0); };
	
		// Detect specific env
		if (isNode()) { // Node
			asap = function (f) { return process.nextTick(f); };
	
		} else if (MutationObs = hasMutationObserver()) { // Modern browser
			asap = initMutationObserver(MutationObs);
	
		} else if (!capturedSetTimeout) { // vert.x
			var vertxRequire = require;
			var vertx = __webpack_require__(/*! vertx */ 324);
			setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
			clearTimer = vertx.cancelTimer;
			asap = vertx.runOnLoop || vertx.runOnContext;
		}
	
		return {
			setTimer: setTimer,
			clearTimer: clearTimer,
			asap: asap
		};
	
		function isNode () {
			return typeof process !== 'undefined' &&
				Object.prototype.toString.call(process) === '[object process]';
		}
	
		function hasMutationObserver () {
			return (typeof MutationObserver === 'function' && MutationObserver) ||
				(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
		}
	
		function initMutationObserver(MutationObserver) {
			var scheduled;
			var node = document.createTextNode('');
			var o = new MutationObserver(run);
			o.observe(node, { characterData: true });
	
			function run() {
				var f = scheduled;
				scheduled = void 0;
				f();
			}
	
			var i = 0;
			return function (f) {
				scheduled = f;
				node.data = (i ^= 1);
			};
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 324 */
/*!***********************!*\
  !*** ../lib/vertx.js ***!
  \***********************/
/***/ function(module, exports) {

	// This file fixes a problem with when.js while is used in node.
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 325 */
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 326 */
/*!*************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/TimeoutError.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		/**
		 * Custom error type for promises rejected by promise.timeout
		 * @param {string} message
		 * @constructor
		 */
		function TimeoutError (message) {
			Error.call(this);
			this.message = message;
			this.name = TimeoutError.name;
			if (typeof Error.captureStackTrace === 'function') {
				Error.captureStackTrace(this, TimeoutError);
			}
		}
	
		TimeoutError.prototype = Object.create(Error.prototype);
		TimeoutError.prototype.constructor = TimeoutError;
	
		return TimeoutError;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));

/***/ },
/* 327 */
/*!*****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/array.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var state = __webpack_require__(/*! ../state */ 328);
		var applier = __webpack_require__(/*! ../apply */ 329);
	
		return function array(Promise) {
	
			var applyFold = applier(Promise);
			var toPromise = Promise.resolve;
			var all = Promise.all;
	
			var ar = Array.prototype.reduce;
			var arr = Array.prototype.reduceRight;
			var slice = Array.prototype.slice;
	
			// Additional array combinators
	
			Promise.any = any;
			Promise.some = some;
			Promise.settle = settle;
	
			Promise.map = map;
			Promise.filter = filter;
			Promise.reduce = reduce;
			Promise.reduceRight = reduceRight;
	
			/**
			 * When this promise fulfills with an array, do
			 * onFulfilled.apply(void 0, array)
			 * @param {function} onFulfilled function to apply
			 * @returns {Promise} promise for the result of applying onFulfilled
			 */
			Promise.prototype.spread = function(onFulfilled) {
				return this.then(all).then(function(array) {
					return onFulfilled.apply(this, array);
				});
			};
	
			return Promise;
	
			/**
			 * One-winner competitive race.
			 * Return a promise that will fulfill when one of the promises
			 * in the input array fulfills, or will reject when all promises
			 * have rejected.
			 * @param {array} promises
			 * @returns {Promise} promise for the first fulfilled value
			 */
			function any(promises) {
				var p = Promise._defer();
				var resolver = p._handler;
				var l = promises.length>>>0;
	
				var pending = l;
				var errors = [];
	
				for (var h, x, i = 0; i < l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					h = Promise._handler(x);
					if(h.state() > 0) {
						resolver.become(h);
						Promise._visitRemaining(promises, i, h);
						break;
					} else {
						h.visit(resolver, handleFulfill, handleReject);
					}
				}
	
				if(pending === 0) {
					resolver.reject(new RangeError('any(): array must not be empty'));
				}
	
				return p;
	
				function handleFulfill(x) {
					/*jshint validthis:true*/
					errors = null;
					this.resolve(x); // this === resolver
				}
	
				function handleReject(e) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					errors.push(e);
					if(--pending === 0) {
						this.reject(errors);
					}
				}
			}
	
			/**
			 * N-winner competitive race
			 * Return a promise that will fulfill when n input promises have
			 * fulfilled, or will reject when it becomes impossible for n
			 * input promises to fulfill (ie when promises.length - n + 1
			 * have rejected)
			 * @param {array} promises
			 * @param {number} n
			 * @returns {Promise} promise for the earliest n fulfillment values
			 *
			 * @deprecated
			 */
			function some(promises, n) {
				/*jshint maxcomplexity:7*/
				var p = Promise._defer();
				var resolver = p._handler;
	
				var results = [];
				var errors = [];
	
				var l = promises.length>>>0;
				var nFulfill = 0;
				var nReject;
				var x, i; // reused in both for() loops
	
				// First pass: count actual array items
				for(i=0; i<l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						continue;
					}
					++nFulfill;
				}
	
				// Compute actual goals
				n = Math.max(n, 0);
				nReject = (nFulfill - n + 1);
				nFulfill = Math.min(n, nFulfill);
	
				if(n > nFulfill) {
					resolver.reject(new RangeError('some(): array must contain at least '
					+ n + ' item(s), but had ' + nFulfill));
				} else if(nFulfill === 0) {
					resolver.resolve(results);
				}
	
				// Second pass: observe each array item, make progress toward goals
				for(i=0; i<l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						continue;
					}
	
					Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
				}
	
				return p;
	
				function fulfill(x) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					results.push(x);
					if(--nFulfill === 0) {
						errors = null;
						this.resolve(results);
					}
				}
	
				function reject(e) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					errors.push(e);
					if(--nReject === 0) {
						results = null;
						this.reject(errors);
					}
				}
			}
	
			/**
			 * Apply f to the value of each promise in a list of promises
			 * and return a new list containing the results.
			 * @param {array} promises
			 * @param {function(x:*, index:Number):*} f mapping function
			 * @returns {Promise}
			 */
			function map(promises, f) {
				return Promise._traverse(f, promises);
			}
	
			/**
			 * Filter the provided array of promises using the provided predicate.  Input may
			 * contain promises and values
			 * @param {Array} promises array of promises and values
			 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
			 *  Must return truthy (or promise for truthy) for items to retain.
			 * @returns {Promise} promise that will fulfill with an array containing all items
			 *  for which predicate returned truthy.
			 */
			function filter(promises, predicate) {
				var a = slice.call(promises);
				return Promise._traverse(predicate, a).then(function(keep) {
					return filterSync(a, keep);
				});
			}
	
			function filterSync(promises, keep) {
				// Safe because we know all promises have fulfilled if we've made it this far
				var l = keep.length;
				var filtered = new Array(l);
				for(var i=0, j=0; i<l; ++i) {
					if(keep[i]) {
						filtered[j++] = Promise._handler(promises[i]).value;
					}
				}
				filtered.length = j;
				return filtered;
	
			}
	
			/**
			 * Return a promise that will always fulfill with an array containing
			 * the outcome states of all input promises.  The returned promise
			 * will never reject.
			 * @param {Array} promises
			 * @returns {Promise} promise for array of settled state descriptors
			 */
			function settle(promises) {
				return all(promises.map(settleOne));
			}
	
			function settleOne(p) {
				var h = Promise._handler(p);
				if(h.state() === 0) {
					return toPromise(p).then(state.fulfilled, state.rejected);
				}
	
				h._unreport();
				return state.inspect(h);
			}
	
			/**
			 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
			 * input may contain promises and/or values, and reduceFunc
			 * may return either a value or a promise, *and* initialValue may
			 * be a promise for the starting value.
			 * @param {Array|Promise} promises array or promise for an array of anything,
			 *      may contain a mix of promises and values.
			 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
			 * @returns {Promise} that will resolve to the final reduced value
			 */
			function reduce(promises, f /*, initialValue */) {
				return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
						: ar.call(promises, liftCombine(f));
			}
	
			/**
			 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
			 * input may contain promises and/or values, and reduceFunc
			 * may return either a value or a promise, *and* initialValue may
			 * be a promise for the starting value.
			 * @param {Array|Promise} promises array or promise for an array of anything,
			 *      may contain a mix of promises and values.
			 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
			 * @returns {Promise} that will resolve to the final reduced value
			 */
			function reduceRight(promises, f /*, initialValue */) {
				return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
						: arr.call(promises, liftCombine(f));
			}
	
			function liftCombine(f) {
				return function(z, x, i) {
					return applyFold(f, void 0, [z,x,i]);
				};
			}
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 328 */
/*!******************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/state.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return {
			pending: toPendingState,
			fulfilled: toFulfilledState,
			rejected: toRejectedState,
			inspect: inspect
		};
	
		function toPendingState() {
			return { state: 'pending' };
		}
	
		function toRejectedState(e) {
			return { state: 'rejected', reason: e };
		}
	
		function toFulfilledState(x) {
			return { state: 'fulfilled', value: x };
		}
	
		function inspect(handler) {
			var state = handler.state();
			return state === 0 ? toPendingState()
				 : state > 0   ? toFulfilledState(handler.value)
				               : toRejectedState(handler.value);
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 329 */
/*!******************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/apply.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		makeApply.tryCatchResolve = tryCatchResolve;
	
		return makeApply;
	
		function makeApply(Promise, call) {
			if(arguments.length < 2) {
				call = tryCatchResolve;
			}
	
			return apply;
	
			function apply(f, thisArg, args) {
				var p = Promise._defer();
				var l = args.length;
				var params = new Array(l);
				callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);
	
				return p;
			}
	
			function callAndResolve(c, h) {
				if(c.i < 0) {
					return call(c.f, c.thisArg, c.params, h);
				}
	
				var handler = Promise._handler(c.args[c.i]);
				handler.fold(callAndResolveNext, c, void 0, h);
			}
	
			function callAndResolveNext(c, x, h) {
				c.params[c.i] = x;
				c.i -= 1;
				callAndResolve(c, h);
			}
		}
	
		function tryCatchResolve(f, thisArg, args, resolver) {
			try {
				resolver.resolve(f.apply(thisArg, args));
			} catch(e) {
				resolver.reject(e);
			}
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));
	
	


/***/ },
/* 330 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/flow.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function flow(Promise) {
	
			var resolve = Promise.resolve;
			var reject = Promise.reject;
			var origCatch = Promise.prototype['catch'];
	
			/**
			 * Handle the ultimate fulfillment value or rejection reason, and assume
			 * responsibility for all errors.  If an error propagates out of result
			 * or handleFatalError, it will be rethrown to the host, resulting in a
			 * loud stack track on most platforms and a crash on some.
			 * @param {function?} onResult
			 * @param {function?} onError
			 * @returns {undefined}
			 */
			Promise.prototype.done = function(onResult, onError) {
				this._handler.visit(this._handler.receiver, onResult, onError);
			};
	
			/**
			 * Add Error-type and predicate matching to catch.  Examples:
			 * promise.catch(TypeError, handleTypeError)
			 *   .catch(predicate, handleMatchedErrors)
			 *   .catch(handleRemainingErrors)
			 * @param onRejected
			 * @returns {*}
			 */
			Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
				if (arguments.length < 2) {
					return origCatch.call(this, onRejected);
				}
	
				if(typeof onRejected !== 'function') {
					return this.ensure(rejectInvalidPredicate);
				}
	
				return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
			};
	
			/**
			 * Wraps the provided catch handler, so that it will only be called
			 * if the predicate evaluates truthy
			 * @param {?function} handler
			 * @param {function} predicate
			 * @returns {function} conditional catch handler
			 */
			function createCatchFilter(handler, predicate) {
				return function(e) {
					return evaluatePredicate(e, predicate)
						? handler.call(this, e)
						: reject(e);
				};
			}
	
			/**
			 * Ensures that onFulfilledOrRejected will be called regardless of whether
			 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
			 * receive the promises' value or reason.  Any returned value will be disregarded.
			 * onFulfilledOrRejected may throw or return a rejected promise to signal
			 * an additional error.
			 * @param {function} handler handler to be called regardless of
			 *  fulfillment or rejection
			 * @returns {Promise}
			 */
			Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
				if(typeof handler !== 'function') {
					return this;
				}
	
				return this.then(function(x) {
					return runSideEffect(handler, this, identity, x);
				}, function(e) {
					return runSideEffect(handler, this, reject, e);
				});
			};
	
			function runSideEffect (handler, thisArg, propagate, value) {
				var result = handler.call(thisArg);
				return maybeThenable(result)
					? propagateValue(result, propagate, value)
					: propagate(value);
			}
	
			function propagateValue (result, propagate, x) {
				return resolve(result).then(function () {
					return propagate(x);
				});
			}
	
			/**
			 * Recover from a failure by returning a defaultValue.  If defaultValue
			 * is a promise, it's fulfillment value will be used.  If defaultValue is
			 * a promise that rejects, the returned promise will reject with the
			 * same reason.
			 * @param {*} defaultValue
			 * @returns {Promise} new promise
			 */
			Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
				return this.then(void 0, function() {
					return defaultValue;
				});
			};
	
			/**
			 * Shortcut for .then(function() { return value; })
			 * @param  {*} value
			 * @return {Promise} a promise that:
			 *  - is fulfilled if value is not a promise, or
			 *  - if value is a promise, will fulfill with its value, or reject
			 *    with its reason.
			 */
			Promise.prototype['yield'] = function(value) {
				return this.then(function() {
					return value;
				});
			};
	
			/**
			 * Runs a side effect when this promise fulfills, without changing the
			 * fulfillment value.
			 * @param {function} onFulfilledSideEffect
			 * @returns {Promise}
			 */
			Promise.prototype.tap = function(onFulfilledSideEffect) {
				return this.then(onFulfilledSideEffect)['yield'](this);
			};
	
			return Promise;
		};
	
		function rejectInvalidPredicate() {
			throw new TypeError('catch predicate must be a function');
		}
	
		function evaluatePredicate(e, predicate) {
			return isError(predicate) ? e instanceof predicate : predicate(e);
		}
	
		function isError(predicate) {
			return predicate === Error
				|| (predicate != null && predicate.prototype instanceof Error);
		}
	
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}
	
		function identity(x) {
			return x;
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 331 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/fold.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	/** @author Jeff Escalante */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function fold(Promise) {
	
			Promise.prototype.fold = function(f, z) {
				var promise = this._beget();
	
				this._handler.fold(function(z, x, to) {
					Promise._handler(z).fold(function(x, z, to) {
						to.resolve(f.call(this, z, x));
					}, x, this, to);
				}, z, promise._handler.receiver, promise._handler);
	
				return promise;
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 332 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/inspect.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var inspect = __webpack_require__(/*! ../state */ 328).inspect;
	
		return function inspection(Promise) {
	
			Promise.prototype.inspect = function() {
				return inspect(Promise._handler(this));
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 333 */
/*!*******************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/iterate.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function generate(Promise) {
	
			var resolve = Promise.resolve;
	
			Promise.iterate = iterate;
			Promise.unfold = unfold;
	
			return Promise;
	
			/**
			 * @deprecated Use github.com/cujojs/most streams and most.iterate
			 * Generate a (potentially infinite) stream of promised values:
			 * x, f(x), f(f(x)), etc. until condition(x) returns true
			 * @param {function} f function to generate a new x from the previous x
			 * @param {function} condition function that, given the current x, returns
			 *  truthy when the iterate should stop
			 * @param {function} handler function to handle the value produced by f
			 * @param {*|Promise} x starting value, may be a promise
			 * @return {Promise} the result of the last call to f before
			 *  condition returns true
			 */
			function iterate(f, condition, handler, x) {
				return unfold(function(x) {
					return [x, f(x)];
				}, condition, handler, x);
			}
	
			/**
			 * @deprecated Use github.com/cujojs/most streams and most.unfold
			 * Generate a (potentially infinite) stream of promised values
			 * by applying handler(generator(seed)) iteratively until
			 * condition(seed) returns true.
			 * @param {function} unspool function that generates a [value, newSeed]
			 *  given a seed.
			 * @param {function} condition function that, given the current seed, returns
			 *  truthy when the unfold should stop
			 * @param {function} handler function to handle the value produced by unspool
			 * @param x {*|Promise} starting value, may be a promise
			 * @return {Promise} the result of the last value produced by unspool before
			 *  condition returns true
			 */
			function unfold(unspool, condition, handler, x) {
				return resolve(x).then(function(seed) {
					return resolve(condition(seed)).then(function(done) {
						return done ? seed : resolve(unspool(seed)).spread(next);
					});
				});
	
				function next(item, newSeed) {
					return resolve(handler(item)).then(function() {
						return unfold(unspool, condition, handler, newSeed);
					});
				}
			}
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 334 */
/*!********************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/progress.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function progress(Promise) {
	
			/**
			 * @deprecated
			 * Register a progress handler for this promise
			 * @param {function} onProgress
			 * @returns {Promise}
			 */
			Promise.prototype.progress = function(onProgress) {
				return this.then(void 0, void 0, onProgress);
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 335 */
/*!****************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/with.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function addWith(Promise) {
			/**
			 * Returns a promise whose handlers will be called with `this` set to
			 * the supplied receiver.  Subsequent promises derived from the
			 * returned promise will also have their handlers called with receiver
			 * as `this`. Calling `with` with undefined or no arguments will return
			 * a promise whose handlers will again be called in the usual Promises/A+
			 * way (no `this`) thus safely undoing any previous `with` in the
			 * promise chain.
			 *
			 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
			 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
			 *
			 * @param {object} receiver `this` value for all handlers attached to
			 *  the returned promise.
			 * @returns {Promise}
			 */
			Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
				var p = this._beget();
				var child = p._handler;
				child.receiver = receiver;
				this._handler.chain(child, receiver);
				return p;
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));
	


/***/ },
/* 336 */
/*!******************************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/decorators/unhandledRejection.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var setTimer = __webpack_require__(/*! ../env */ 323).setTimer;
		var format = __webpack_require__(/*! ../format */ 337);
	
		return function unhandledRejection(Promise) {
	
			var logError = noop;
			var logInfo = noop;
			var localConsole;
	
			if(typeof console !== 'undefined') {
				// Alias console to prevent things like uglify's drop_console option from
				// removing console.log/error. Unhandled rejections fall into the same
				// category as uncaught exceptions, and build tools shouldn't silence them.
				localConsole = console;
				logError = typeof localConsole.error !== 'undefined'
					? function (e) { localConsole.error(e); }
					: function (e) { localConsole.log(e); };
	
				logInfo = typeof localConsole.info !== 'undefined'
					? function (e) { localConsole.info(e); }
					: function (e) { localConsole.log(e); };
			}
	
			Promise.onPotentiallyUnhandledRejection = function(rejection) {
				enqueue(report, rejection);
			};
	
			Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
				enqueue(unreport, rejection);
			};
	
			Promise.onFatalRejection = function(rejection) {
				enqueue(throwit, rejection.value);
			};
	
			var tasks = [];
			var reported = [];
			var running = null;
	
			function report(r) {
				if(!r.handled) {
					reported.push(r);
					logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
				}
			}
	
			function unreport(r) {
				var i = reported.indexOf(r);
				if(i >= 0) {
					reported.splice(i, 1);
					logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
				}
			}
	
			function enqueue(f, x) {
				tasks.push(f, x);
				if(running === null) {
					running = setTimer(flush, 0);
				}
			}
	
			function flush() {
				running = null;
				while(tasks.length > 0) {
					tasks.shift()(tasks.shift());
				}
			}
	
			return Promise;
		};
	
		function throwit(e) {
			throw e;
		}
	
		function noop() {}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 337 */
/*!*******************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/format.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return {
			formatError: formatError,
			formatObject: formatObject,
			tryStringify: tryStringify
		};
	
		/**
		 * Format an error into a string.  If e is an Error and has a stack property,
		 * it's returned.  Otherwise, e is formatted using formatObject, with a
		 * warning added about e not being a proper Error.
		 * @param {*} e
		 * @returns {String} formatted string, suitable for output to developers
		 */
		function formatError(e) {
			var s = typeof e === 'object' && e !== null && e.stack ? e.stack : formatObject(e);
			return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
		}
	
		/**
		 * Format an object, detecting "plain" objects and running them through
		 * JSON.stringify if possible.
		 * @param {Object} o
		 * @returns {string}
		 */
		function formatObject(o) {
			var s = String(o);
			if(s === '[object Object]' && typeof JSON !== 'undefined') {
				s = tryStringify(o, s);
			}
			return s;
		}
	
		/**
		 * Try to return the result of JSON.stringify(x).  If that fails, return
		 * defaultValue
		 * @param {*} x
		 * @param {*} defaultValue
		 * @returns {String|*} JSON.stringify(x) or defaultValue
		 */
		function tryStringify(x, defaultValue) {
			try {
				return JSON.stringify(x);
			} catch(e) {
				return defaultValue;
			}
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 338 */
/*!********************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/Promise.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var makePromise = __webpack_require__(/*! ./makePromise */ 339);
		var Scheduler = __webpack_require__(/*! ./Scheduler */ 340);
		var async = __webpack_require__(/*! ./env */ 323).asap;
	
		return makePromise({
			scheduler: new Scheduler(async)
		});
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(/*! !webpack amd define */ 325));


/***/ },
/* 339 */
/*!************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/makePromise.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function makePromise(environment) {
	
			var tasks = environment.scheduler;
			var emitRejection = initEmitRejection();
	
			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};
	
			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}
	
			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();
	
				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}
	
				return handler;
	
				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}
	
				/**
				 * @deprecated
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}
	
			// Creation
	
			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;
	
			Promise._defer = defer;
			Promise._handler = getHandler;
	
			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}
	
			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}
	
			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}
	
			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}
	
			// Transformation and flow control
	
			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @param {function=} onProgress @deprecated progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
				var parent = this._handler;
				var state = parent.join().state();
	
				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}
	
				var p = this._beget();
				var child = p._handler;
	
				parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);
	
				return p;
			};
	
			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};
	
			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				return begetFrom(this._handler, this.constructor);
			};
	
			function begetFrom(parent, Promise) {
				var child = new Pending(parent.receiver, parent.join().context);
				return new Promise(Handler, child);
			}
	
			// Array combinators
	
			Promise.all = all;
			Promise.race = race;
			Promise._traverse = traverse;
	
			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				return traverseWith(snd, null, promises);
			}
	
			/**
			 * Array<Promise<X>> -> Promise<Array<f(X)>>
			 * @private
			 * @param {function} f function to apply to each promise's value
			 * @param {Array} promises array of promises
			 * @returns {Promise} promise for transformed values
			 */
			function traverse(f, promises) {
				return traverseWith(tryCatch2, f, promises);
			}
	
			function traverseWith(tryMap, f, promises) {
				var handler = typeof f === 'function' ? mapAt : settleAt;
	
				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);
	
				for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
					x = promises[i];
	
					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					traverseAt(promises, handler, i, x, resolver);
				}
	
				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}
	
				return new Promise(Handler, resolver);
	
				function mapAt(i, x, resolver) {
					if(!resolver.resolved) {
						traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
					}
				}
	
				function settleAt(i, x, resolver) {
					results[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(results));
					}
				}
			}
	
			function traverseAt(promises, handler, i, x, resolver) {
				if (maybeThenable(x)) {
					var h = getHandlerMaybeThenable(x);
					var s = h.state();
	
					if (s === 0) {
						h.fold(handler, i, void 0, resolver);
					} else if (s > 0) {
						handler(i, h.value, resolver);
					} else {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
					}
				} else {
					handler(i, x, resolver);
				}
			}
	
			Promise._visitRemaining = visitRemaining;
			function visitRemaining(promises, start, handler) {
				for(var i=start; i<promises.length; ++i) {
					markAsHandled(getHandler(promises[i]), handler);
				}
			}
	
			function markAsHandled(h, handler) {
				if(h === handler) {
					return;
				}
	
				var s = h.state();
				if(s === 0) {
					h.visit(h, void 0, h._unreport);
				} else if(s < 0) {
					h._unreport();
				}
			}
	
			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				if(typeof promises !== 'object' || promises === null) {
					return reject(new TypeError('non-iterable passed to race()'));
				}
	
				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				return promises.length === 0 ? never()
					 : promises.length === 1 ? resolve(promises[0])
					 : runRace(promises);
			}
	
			function runRace(promises) {
				var resolver = new Pending();
				var i, x, h;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x === void 0 && !(i in promises)) {
						continue;
					}
	
					h = getHandler(x);
					if(h.state() !== 0) {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
						break;
					} else {
						h.visit(resolver, resolver.resolve, resolver.reject);
					}
				}
				return new Promise(Handler, resolver);
			}
	
			// Promise internals
			// Below this, everything is @private
	
			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}
	
			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}
	
			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}
	
			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}
	
			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify // deprecated
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;
	
			Handler.prototype._state = 0;
	
			Handler.prototype.state = function() {
				return this._state;
			};
	
			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};
	
			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};
	
			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};
	
			Handler.prototype.fold = function(f, z, c, to) {
				this.when(new Fold(f, z, c, to));
			};
	
			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}
	
			inherit(Handler, FailIfRejected);
	
			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};
	
			var failIfRejected = new FailIfRejected();
	
			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);
	
				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}
	
			inherit(Handler, Pending);
	
			Pending.prototype._state = 0;
	
			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};
	
			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}
	
				this.become(new Rejected(x));
			};
	
			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}
	
				var h = this;
	
				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}
	
				return h;
			};
	
			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.handler;
				this.handler = this.handler.join();
				this.consumers = void 0;
	
				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};
	
			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}
	
				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}
	
				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};
	
			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};
	
			/**
			 * @deprecated
			 */
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};
	
			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};
	
			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};
	
			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};
	
			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}
	
			inherit(Handler, Async);
	
			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};
	
			Async.prototype._report = function(context) {
				this.join()._report(context);
			};
	
			Async.prototype._unreport = function() {
				this.join()._unreport();
			};
	
			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}
	
			inherit(Pending, Thenable);
	
			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}
	
			inherit(Handler, Fulfilled);
	
			Fulfilled.prototype._state = 1;
	
			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};
	
			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};
	
			var errorId = 0;
	
			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);
	
				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;
	
				this._report();
			}
	
			inherit(Handler, Rejected);
	
			Rejected.prototype._state = -1;
	
			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};
	
			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};
	
			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};
	
			Rejected.prototype._unreport = function() {
				if(this.handled) {
					return;
				}
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};
	
			Rejected.prototype.fail = function(context) {
				this.reported = true;
				emitRejection('unhandledRejection', this);
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};
	
			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}
	
			ReportTask.prototype.run = function() {
				if(!this.rejection.handled && !this.rejection.reported) {
					this.rejection.reported = true;
					emitRejection('unhandledRejection', this.rejection) ||
						Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};
	
			function UnreportTask(rejection) {
				this.rejection = rejection;
			}
	
			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					emitRejection('rejectionHandled', this.rejection) ||
						Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};
	
			// Unhandled rejection hooks
			// By default, everything is a noop
	
			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;
	
			// Errors and singletons
	
			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);
	
			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}
	
			// Task runners
	
			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}
	
			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};
	
			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}
	
			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}
	
				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};
	
			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}
	
			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);
	
				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};
	
			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}
	
			/**
			 * Fold a handler value with z
			 * @constructor
			 */
			function Fold(f, z, c, to) {
				this.f = f; this.z = z; this.c = c; this.to = to;
				this.resolver = failIfRejected;
				this.receiver = this;
			}
	
			Fold.prototype.fulfilled = function(x) {
				this.f.call(this.c, this.z, x, this.to);
			};
	
			Fold.prototype.rejected = function(x) {
				this.to.reject(x);
			};
	
			Fold.prototype.progress = function(x) {
				this.to.notify(x);
			};
	
			// Other helpers
	
			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}
	
			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}
	
			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}
	
			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}
	
			/**
			 * @deprecated
			 */
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}
	
				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}
	
			function tryCatch2(f, a, b) {
				try {
					return f(a, b);
				} catch(e) {
					return reject(e);
				}
			}
	
			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * @deprecated
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}
	
			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}
	
			function snd(x, y) {
				return y;
			}
	
			function noop() {}
	
			function initEmitRejection() {
				/*global process, self, CustomEvent*/
				if(typeof process !== 'undefined' && process !== null
					&& typeof process.emit === 'function') {
					// Returning falsy here means to call the default
					// onPotentiallyUnhandledRejection API.  This is safe even in
					// browserify since process.emit always returns falsy in browserify:
					// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
					return function(type, rejection) {
						return type === 'unhandledRejection'
							? process.emit(type, rejection.value, rejection)
							: process.emit(type, rejection);
					};
				} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
					return (function(noop, self, CustomEvent) {
						var hasCustomEvent = false;
						try {
							var ev = new CustomEvent('unhandledRejection');
							hasCustomEvent = ev instanceof CustomEvent;
						} catch (e) {}
	
						return !hasCustomEvent ? noop : function(type, rejection) {
							var ev = new CustomEvent(type, {
								detail: {
									reason: rejection.value,
									key: rejection
								},
								bubbles: false,
								cancelable: true
							});
	
							return !self.dispatchEvent(ev);
						};
					}(noop, self, CustomEvent));
				}
	
				return noop;
			}
	
			return Promise;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 340 */
/*!**********************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/when/lib/Scheduler.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.
	
		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._running = false;
	
			this._queue = this;
			this._queueLen = 0;
			this._afterQueue = {};
			this._afterQueueLen = 0;
	
			var self = this;
			this.drain = function() {
				self._drain();
			};
		}
	
		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._queue[this._queueLen++] = task;
			this.run();
		};
	
		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._afterQueue[this._afterQueueLen++] = task;
			this.run();
		};
	
		Scheduler.prototype.run = function() {
			if (!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};
	
		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			var i = 0;
			for (; i < this._queueLen; ++i) {
				this._queue[i].run();
				this._queue[i] = void 0;
			}
	
			this._queueLen = 0;
			this._running = false;
	
			for (i = 0; i < this._afterQueueLen; ++i) {
				this._afterQueue[i].run();
				this._afterQueue[i] = void 0;
			}
	
			this._afterQueueLen = 0;
		};
	
		return Scheduler;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(/*! !webpack amd define */ 325)));


/***/ },
/* 341 */
/*!**************************************************!*\
  !*** ../lib/indyva-js/reconnecting-websocket.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// MIT License:
	//
	// Copyright (c) 2010-2012, Joe Walnes
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.
	
	'use strict';
	
	!(function () {
	          /**
	           * This behaves like a WebSocket in every way, except if it fails to connect,
	           * or it gets disconnected, it will repeatedly poll until it succesfully connects
	           * again.
	           *
	           * It is API compatible, so when you have:
	           *   ws = new WebSocket('ws://....');
	           * you can replace with:
	           *   ws = new ReconnectingWebSocket('ws://....');
	           *
	           * The event stream will typically look like:
	           *  onconnecting
	           *  onopen
	           *  onmessage
	           *  onmessage
	           *  onclose // lost connection
	           *  onconnecting
	           *  onopen  // sometime later...
	           *  onmessage
	           *  onmessage
	           *  etc... 
	           *
	           * It is API compatible with the standard WebSocket API.
	           *
	           * Latest version: https://github.com/joewalnes/reconnecting-websocket/
	           * - Joe Walnes
	           */
	          var ReconnectingWebSocket = function ReconnectingWebSocket(url, protocols) {
	                    protocols = protocols || [];
	
	                    // These can be altered by calling code.
	                    this.debug = false;
	                    this.reconnectInterval = 1000;
	                    this.timeoutInterval = 2000;
	
	                    var self = this;
	                    var ws;
	                    var forcedClose = false;
	                    var timedOut = false;
	
	                    this.url = url;
	                    this.protocols = protocols;
	                    this.readyState = WebSocket.CONNECTING;
	                    this.URL = url; // Public API
	
	                    this.onopen = function (event) {};
	
	                    this.onclose = function (event) {};
	
	                    this.onconnecting = function (event) {};
	
	                    this.onmessage = function (event) {};
	
	                    this.onerror = function (event) {};
	
	                    function connect(reconnectAttempt) {
	                              ws = new WebSocket(url, protocols);
	
	                              self.onconnecting();
	                              if (self.debug || ReconnectingWebSocket.debugAll) {
	                                        console.debug('ReconnectingWebSocket', 'attempt-connect', url);
	                              }
	
	                              var localWs = ws;
	                              var timeout = setTimeout(function () {
	                                        if (self.debug || ReconnectingWebSocket.debugAll) {
	                                                  console.debug('ReconnectingWebSocket', 'connection-timeout', url);
	                                        }
	                                        timedOut = true;
	                                        localWs.close();
	                                        timedOut = false;
	                              }, self.timeoutInterval);
	
	                              ws.onopen = function (event) {
	                                        clearTimeout(timeout);
	                                        if (self.debug || ReconnectingWebSocket.debugAll) {
	                                                  console.debug('ReconnectingWebSocket', 'onopen', url);
	                                        }
	                                        self.readyState = WebSocket.OPEN;
	                                        reconnectAttempt = false;
	                                        self.onopen(event);
	                              };
	
	                              ws.onclose = function (event) {
	                                        clearTimeout(timeout);
	                                        ws = null;
	                                        if (forcedClose) {
	                                                  self.readyState = WebSocket.CLOSED;
	                                                  self.onclose(event);
	                                        } else {
	                                                  self.readyState = WebSocket.CONNECTING;
	                                                  self.onconnecting();
	                                                  if (!reconnectAttempt && !timedOut) {
	                                                            if (self.debug || ReconnectingWebSocket.debugAll) {
	                                                                      console.debug('ReconnectingWebSocket', 'onclose', url);
	                                                            }
	                                                            self.onclose(event);
	                                                  }
	                                                  setTimeout(function () {
	                                                            connect(true);
	                                                  }, self.reconnectInterval);
	                                        }
	                              };
	                              ws.onmessage = function (event) {
	                                        if (self.debug || ReconnectingWebSocket.debugAll) {
	                                                  console.debug('ReconnectingWebSocket', 'onmessage', url, event.data);
	                                        }
	                                        self.onmessage(event);
	                              };
	                              ws.onerror = function (event) {
	                                        if (self.debug || ReconnectingWebSocket.debugAll) {
	                                                  console.debug('ReconnectingWebSocket', 'onerror', url, event);
	                                        }
	                                        self.onerror(event);
	                              };
	                    }
	                    connect(url);
	
	                    this.send = function (data) {
	                              if (ws) {
	                                        if (self.debug || ReconnectingWebSocket.debugAll) {
	                                                  console.debug('ReconnectingWebSocket', 'send', url, data);
	                                        }
	                                        return ws.send(data);
	                              } else {
	                                        throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
	                              }
	                    };
	
	                    this.close = function () {
	                              forcedClose = true;
	                              if (ws) {
	                                        ws.close();
	                              }
	                    };
	
	                    /**
	                     * Additional public API method to refresh the connection if still open (close, re-open).
	                     * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
	                     */
	                    this.refresh = function () {
	                              if (ws) {
	                                        ws.close();
	                              }
	                    };
	          };
	
	          /**
	           * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
	           */
	          ReconnectingWebSocket.debugAll = false;
	
	          /**
	           * Compatibility with AMD and Requirejs
	           */
	          if (true) {
	                    console.debug("Requirejs found");
	                    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	                              return ReconnectingWebSocket;
	                    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	          } else if (typeof module === "object" && module.exports) {
	                    module.exports = ReconnectingWebSocket;
	          } else {
	                    this.ReconnectingWebSocket = ReconnectingWebSocket;
	          }
	
	          //return ReconnectingWebSocket;
	})();

/***/ },
/* 342 */
/*!**********************************!*\
  !*** ../lib/indyva-js/ws-rpc.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! when */ 321), __webpack_require__(/*! reconnecting-websocket */ 341)], __WEBPACK_AMD_DEFINE_RESULT__ = function (when, ReconnectingWebSocket) {
	
		var WsRpc = function WsRpc(server, path, port) {
			var self = this;
	
			this._out_queue = [];
			this._futures = {};
			this.ws = new ReconnectingWebSocket('ws://' + server + ':' + String(port) + '/' + path);
			this.ws.onmessage = function (event) {
				self._onmessage(event);
			};
			this.ws.onopen = function (event) {
				self._flush();
			};
		};
	
		/// Holding the WebSocket on default getsocket.
		WsRpc.prototype.ws = null;
		/// Object <id>: when.deferred
		WsRpc.prototype._futures = {};
		/// The next JSON-WsRpc request id.
		WsRpc.prototype._current_id = 1;
		/// The not ready queue
		WsRpc.prototype._out_queue = [];
		/// The list of extenders
		WsRpc.prototype._extenders = [];
	
		/**
	  * @fn call
	  * @memberof WsRpc
	  *
	  * @param method     The method to run on JSON-RPC server.
	  * @param params     The params; an array or object.
	  * @return		 A when.promise 
	  */
		WsRpc.prototype.call = function call(method, params) {
			// Construct the JSON-RPC 2.0 request.
			var request = {
				jsonrpc: '2.0',
				method: method,
				params: params,
				id: this._current_id++ // Increase the id counter to match request/response
			};
	
			this._extenders.forEach(function (extender) {
				extender.modifyRequest(request);
			});
	
			var deferred = when.defer();
			this._futures[request.id] = deferred;
	
			var request_json = JSON.stringify(request);
			this._send(request_json);
	
			return deferred.promise;
		};
	
		/**
	  * This is an extension point mechanism to add objects that can
	  * modify the request before sending it. The 'extenders' need to
	  * have a method named `modifyRequest` which accepts one param,
	  * the JSON-RPC request object.
	  * 
	  * @fn extend
	  * @memberof WsRpc
	  *
	  * @param extender    An object with a method `modifyRequest`
	  */
		WsRpc.prototype.extend = function (extender) {
			this._extenders.push(extender);
		};
	
		/**
	  * Internal method that sends a message through the Web Socket
	  * only if the connection is ready, otherwise the message is
	  * queued until the _flush method is called.
	  * 
	  * @fn _send
	  * @memberof WsRpc
	  *
	  * @param request_json     The JSON-RPC request.
	  */
		WsRpc.prototype._send = function (request_json) {
			if (this.ws.readyState == 1) {
				this.ws.send(request_json);
			} else {
				this._out_queue.push(request_json);
			}
		};
	
		WsRpc.prototype._flush = function () {
			var self = this;
			this._out_queue.forEach(function (request_json) {
				self.ws.send(request_json);
			});
			this._out_queue = [];
		};
	
		/**
	  * Internal handler for the websocket messages.  It determines if
	  * the message is a JSON-RPC response, and if so, tries to couple
	  * it with a given deferred. Otherwise, it falls back to given
	  * external onerror-handler, if any.
	  *
	  * @param event The websocket onmessage-event.
	  */
		WsRpc.prototype._onmessage = function (event) {
			// Check if this could be a JSON RPC message.
			try {
				var response = JSON.parse(event.data);
	
				if (typeof response === 'object' && 'jsonrpc' in response && response.jsonrpc === '2.0') {
	
					/// This is a bad response. Failure in the protocol
					if ('error' in response && response.id === null) {
						if (typeof this.onerror === 'function') {
							this.onerror(event);
						}
					} else if (this._futures[response.id]) {
						// Get the deferred.
						var deferred = this._futures[response.id];
						// Delete the deferred from the storage.
						delete this._futures[response.id];
	
						if ('result' in response) {
							// Resolve with result as parameter.
							deferred.resolve(response.result);
						} else if ('error' in response) {
							// Reject with the error object as parameter.
							deferred.reject(response.error);
						}
					}
	
					return;
				}
			} catch (err) {
				// Probably an error while parsing a non json-string as json. 
				// All real JSON-RPC cases are
				// handled above, and the fallback method is called below.
				console.log('*** Error no handled', err, this);
			}
			// This is not a JSON-RPC response.
			new Error('This is not a JSON-RPC response' + String(response));
		};
		return WsRpc;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 343 */
/*!*******************************!*\
  !*** ../lib/indyva-js/hub.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./reconnecting-websocket */ 341)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ReconnectingWebSocket) {
	
				var Hub = function Hub(server, port, rpc, gateway) {
							var self = this;
	
							this._subscriptions = {};
							this._rpc = rpc;
							this._gateway = gateway;
							this._rpc.call('HubSrv.new_gateway', [gateway, 'ws', port]).then(function (port) {
										self.ws = new ReconnectingWebSocket('ws://' + server + ':' + String(port) + '/hub/' + gateway);
										self.ws.onmessage = function (event) {
													self._onmessage(event);
										};
							});
	
							//this.ws.onopen = function(event) { self._onopen(); };
							//this.ws.onclose = function(event) { self._onclose(); };
				};
	
				/// Holding the WebSocket on default getsocket.
				Hub.prototype.ws = null;
				/// Object topic: callback
				Hub.prototype._subscriptions = {};
	
				Hub.prototype.publish = function (topic, msg) {
							return this._rpc.call('HubSrv.publish', [topic, msg]);
				};
	
				Hub.prototype._subscribe = function (topic, callback, only_once, context) {
							context = context || null;
							var new_topic = !Boolean(this._subscriptions[topic]);
							this._subscriptions[topic] = this._subscriptions[topic] || [];
							this._subscriptions[topic].push({ only_once: only_once || false,
										callback: callback,
										context: context });
							if (new_topic) {
										if (only_once) return this._rpc.call('HubSrv.subscribe_once', [this._gateway, topic]);else return this._rpc.call('HubSrv.subscribe', [this._gateway, topic]);
							}
	
							return true;
				};
	
				Hub.prototype.subscribe = function (topic, callback, context) {
							return this._subscribe(topic, callback, false, context);
				};
	
				Hub.prototype.subscribe_once = function (topic, callback, context) {
							return this._subscribe(topic, callback, true, context);
				};
	
				Hub.prototype.unsubscribe = function (topic, callback, context) {
							context = context || null;
							if (!(topic in this._subscriptions)) {
										throw new Error('There is no topic: "' + topic + '" to unsubscribe');
							}
	
							var subscriptions = this._subscriptions[topic];
							var i = 0,
							    length = subscriptions.length,
							    subs = null;
							for (; i < length; i++) {
										if (subscriptions[i].callback === callback && !context || subscriptions[i].context === context) {
													subscriptions.splice(i, 1);
	
													// Adjust counter and length for removed item
													i--;
													length--;
										}
							}
							if (callback === undefined || subscriptions.length == 0) {
										delete this._subscriptions[topic];
										return this._rpc.call('HubSrv.unsubscribe', [this._gateway, topic]);
							}
							return true;
				};
	
				/**
	    * Unsubscribe to everithing
	    * @ return: when.promise
	    */
				Hub.prototype.clear = function () {
							//	var deferred = when.defer();
							this._subscriptions = {};
							return this._rpc.call('HubSrv.clear', [this._gateway]);
				};
	
				Hub.prototype.internal_publish = function (topic, msg) {
							var subscriptions = this._subscriptions[topic] || [];
							var i = 0,
							    length = subscriptions.length,
							    subs = null;
							for (; i < length; i++) {
										subs = subscriptions[i];
										subs.callback.apply(subs.context, [topic, msg]);
										if (subs.only_once) this.unsubscribe(topic, subs.callback, subs.context);
							}
				};
	
				Hub.prototype._onmessage = function (event) {
							var data = JSON.parse(event.data);
	
							this.internal_publish(data.topic, data.msg);
				};
				return Hub;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 344 */
/*!******************!*\
  !*** ./card.jsx ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(/*! lodash */ 2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 67);
	
	var Card = _react2['default'].createClass({
	  displayName: 'Card',
	
	  PropTypes: {
	    onHeaderClick: _react.PropTypes.func.isRequired,
	    onAttrLabelChanged: _react.PropTypes.func.isRequired,
	    onAttrTypeChanged: _react.PropTypes.func.isRequired,
	    attrLabel: _react.PropTypes.string.isRequired,
	    attrType: _react.PropTypes.string.isRequired,
	    order: _react.PropTypes.number.isRequired,
	    expanded: _react.PropTypes.bool.isRequired
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !_lodash2['default'].isEqual(nextProps, this.props, function (x, y) {
	      if (_lodash2['default'].isFunction(x)) {
	        return true;
	      }
	    });
	  },
	  render: function render() {
	    var _this = this;
	
	    var props = this.props;
	
	    var cardClasses = _react2['default'].addons.classSet({
	      'card': true,
	      'expanded': this.props.expanded
	    });
	    var contentClasses = _react2['default'].addons.classSet({
	      'card-content': true,
	      'hidden': !this.props.expanded
	    });
	    return _react2['default'].createElement(
	      'div',
	      { className: cardClasses },
	      _react2['default'].createElement(
	        'div',
	        { className: 'btn btn-xs btn-default card-anchor card-move' },
	        _react2['default'].createElement('span', { className: 'icon glyphicon glyphicon-move' })
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'card-header', onClick: function (ev) {
	            _this.props.onHeaderClick(ev);
	          } },
	        _react2['default'].createElement(
	          'span',
	          { className: 'card-title' },
	          props.order + ".- " + props.attrLabel
	        ),
	        _react2['default'].createElement(
	          'span',
	          { className: 'pull-right text-muted' },
	          ' ',
	          _lodash2['default'].startCase(props.attrType.toLowerCase()),
	          '  '
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: contentClasses },
	        _react2['default'].createElement(
	          'form',
	          { className: 'form-horizontal', onSubmit: function (ev) {
	              ev.preventDefault();
	            } },
	          _react2['default'].createElement(_reactBootstrap.Input, { type: 'text', label: 'Name', labelClassName: 'col-xs-2', wrapperClassName: 'col-xs-10',
	            value: props.attrLabel, onChange: props.onAttrLabelChanged }),
	          _react2['default'].createElement(
	            _reactBootstrap.Input,
	            { type: 'select', label: 'Attribute Type', labelClassName: 'col-xs-2', wrapperClassName: 'col-xs-10',
	              value: props.attrType, onChange: props.onAttrTypeChanged },
	            _react2['default'].createElement(
	              'option',
	              { value: 'QUANTITATIVE' },
	              'Quantitative'
	            ),
	            _react2['default'].createElement(
	              'option',
	              { value: 'CATEGORICAL' },
	              'Categorical'
	            ),
	            _react2['default'].createElement(
	              'option',
	              { value: 'ORDINAL' },
	              'Ordinal'
	            )
	          )
	        )
	      )
	    );
	  }
	});
	
	exports['default'] = Card;
	module.exports = exports['default'];

/***/ },
/* 345 */
/*!*********************!*\
  !*** ./toolbar.jsx ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 67);
	
	var ToolBar = _react2['default'].createClass({
	    displayName: 'ToolBar',
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            startAnalysisEnabled: true
	        };
	    },
	    PropTypes: {
	        onUndoClick: _react.PropTypes.func.isRequired,
	        onRedoClick: _react.PropTypes.func.isRequired,
	        onStartAnalysisClick: _react.PropTypes.func.isRequired,
	        startAnalysisEnabled: _react.PropTypes.bool.isRequired
	    },
	    render: function render() {
	        var _this = this;
	
	        return _react2['default'].createElement(
	            _reactBootstrap.Navbar,
	            { brand: 'Lobby', fixedTop: true },
	            _react2['default'].createElement(
	                _reactBootstrap.Nav,
	                { navbar: true, right: true },
	                _react2['default'].createElement(
	                    _reactBootstrap.NavItem,
	                    { eventKey: 1, onClick: this.props.onUndoClick },
	                    _react2['default'].createElement('span', { className: 'glyphicon glyphicon-backward' }),
	                    ' ',
	                    _react2['default'].createElement(
	                        'span',
	                        null,
	                        'Undo'
	                    )
	                ),
	                _react2['default'].createElement(
	                    _reactBootstrap.NavItem,
	                    { eventKey: 2, onClick: this.props.onRedoClick },
	                    _react2['default'].createElement(
	                        'span',
	                        null,
	                        'Redo'
	                    ),
	                    ' ',
	                    _react2['default'].createElement('span', { className: 'glyphicon glyphicon-forward' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'navbar-form navbar-left' },
	                    _react2['default'].createElement(
	                        _reactBootstrap.Button,
	                        { bsStyle: 'primary',
	                            disabled: !this.props.startAnalysisEnabled,
	                            onClick: function () {
	                                if (_this.props.startAnalysisEnabled) _this.props.onStartAnalysisClick();
	                            } },
	                        'Start the Anlaysis'
	                    )
	                )
	            )
	        );
	    }
	});
	
	exports['default'] = ToolBar;
	module.exports = exports['default'];

/***/ },
/* 346 */
/*!********************!*\
  !*** ./loader.jsx ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 299);
	
	var _lodash = __webpack_require__(/*! lodash */ 2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _remote = __webpack_require__(/*! remote */ 45);
	
	var _remote2 = _interopRequireDefault(_remote);
	
	var _path = __webpack_require__(/*! path */ 347);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _context = __webpack_require__(/*! context */ 320);
	
	var _context2 = _interopRequireDefault(_context);
	
	var _fileDropper = __webpack_require__(/*! ./fileDropper */ 348);
	
	var _fileDropper2 = _interopRequireDefault(_fileDropper);
	
	var _actions = __webpack_require__(/*! ./actions */ 319);
	
	var fs = _remote2['default'].require('fs');
	
	var config = _remote2['default'].getGlobal('configuration');
	
	var Loader = (function (_React$Component) {
	    _inherits(Loader, _React$Component);
	
	    function Loader(props) {
	        _classCallCheck(this, Loader);
	
	        _get(Object.getPrototypeOf(Loader.prototype), 'constructor', this).call(this, props);
	        var argv = _remote2['default'].process.argv.slice(2);
	        if (argv.length !== 0) {
	            this.readTable(argv[0]);
	        }
	        console.log(this.props);
	    }
	
	    _createClass(Loader, [{
	        key: 'readTable',
	        value: function readTable(filePath) {
	            var _props = this.props;
	            var dispatch = _props.dispatch;
	            var history = _props.history;
	
	            var rpc = _context2['default'].instance().rpc;
	            var destination = _path2['default'].join(config.destinationPath, _path2['default'].basename(filePath));
	
	            try {
	                if (fs.lstatSync(destination).isFile) fs.unlinkSync(destination);
	            } catch (e) {}
	            fs.symlinkSync(filePath, destination);
	
	            dispatch((0, _actions.loadTable)("mainTable", destination)).then(function () {
	                history.pushState(history.state, "/editor");
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this = this;
	
	            return _react2['default'].createElement(
	                _fileDropper2['default'],
	                { onFileDrop: function (filePath) {
	                        _this.readTable(filePath);
	                    } },
	                _react2['default'].createElement(
	                    'span',
	                    null,
	                    ' Drop here a CSV file '
	                )
	            );
	        }
	    }]);
	
	    return Loader;
	})(_react2['default'].Component);
	
	exports['default'] = (0, _reactRedux.connect)(function (state) {
	    return state;
	})(Loader);
	module.exports = exports['default'];

/***/ },
/* 347 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 348 */
/*!*************************!*\
  !*** ./fileDropper.jsx ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 3);
	
	var _lodash = __webpack_require__(/*! lodash */ 2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var Loader = (function (_React$Component) {
	  _inherits(Loader, _React$Component);
	
	  function Loader(props) {
	    _classCallCheck(this, Loader);
	
	    _get(Object.getPrototypeOf(Loader.prototype), 'constructor', this).call(this, props);
	    this.state = { onTop: false };
	  }
	
	  _createClass(Loader, [{
	    key: 'onFileDrop',
	    value: function onFileDrop(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      var file = e.dataTransfer.files[0];
	      console.log('File you dragged here is', file.path);
	      this.props.onFileDrop(file.path);
	    }
	  }, {
	    key: 'dontHandle',
	    value: function dontHandle(e) {
	      e.stopPropagation();
	      e.preventDefault();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var borderColor = this.state.onTop ? "red" : "grey";
	
	      return _react2['default'].createElement(
	        'div',
	        {
	          draggable: 'true',
	          className: 'well',
	          style: { borderColor: borderColor, height: "50em" },
	          onDragOver: function (e) {
	            _this.setState({ onTop: true });_this.dontHandle(e);
	          },
	          onDragLeave: function (e) {
	            _this.setState({ onTop: false });_this.dontHandle(e);
	          },
	          onDragEnd: function (e) {
	            _this.setState({ onTop: false });_this.dontHandle(e);
	          },
	          onDrop: function (e) {
	            _this.onFileDrop(e);
	          } },
	        this.props.children
	      );
	    }
	  }]);
	
	  return Loader;
	})(_react2['default'].Component);
	
	exports['default'] = Loader;
	module.exports = exports['default'];

/***/ },
/* 349 */
/*!**********************!*\
  !*** ./launcher.jsx ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 299);
	
	var _lodash = __webpack_require__(/*! lodash */ 2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _remote = __webpack_require__(/*! remote */ 45);
	
	var _remote2 = _interopRequireDefault(_remote);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 67);
	
	var _path = __webpack_require__(/*! path */ 347);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _testedListItem = __webpack_require__(/*! ./testedListItem */ 350);
	
	var _testedListItem2 = _interopRequireDefault(_testedListItem);
	
	var _actions = __webpack_require__(/*! ./actions */ 319);
	
	var config = _remote2['default'].getGlobal('configuration');
	
	var Launcher = (function (_React$Component) {
	    _inherits(Launcher, _React$Component);
	
	    function Launcher(props) {
	        var _this = this;
	
	        _classCallCheck(this, Launcher);
	
	        _get(Object.getPrototypeOf(Launcher.prototype), 'constructor', this).call(this, props);
	        this._renameColumns(props)
	        //TODO: .then((x) => {this._renameCategoricalValues(props);})
	        .then(function () {
	            return _this._createFinalTable(props);
	        }).then(function () {
	            return _this._writeFinalTable(props);
	        }).then(function () {
	            return _this._configIndyva(props);
	        });
	    }
	
	    _createClass(Launcher, [{
	        key: '_renameColumns',
	        value: function _renameColumns(props) {
	            var namesMap = {};
	            _lodash2['default'].mapValues(props.attributes.present.attrsByName, function (x) {
	                if (x.name !== x.label) namesMap[x.name] = x.label;
	            });
	            return props.dispatch((0, _actions.renameColumns)(props.table.tableName, namesMap));
	        }
	    }, {
	        key: '_createFinalTable',
	        value: function _createFinalTable(props) {
	            var name = config.indyvaTableName;
	            var sourceTable = props.table.tableName;
	            var schema = {
	                dataset_type: "TABLE",
	                index: props.attributes.present.index,
	                attributes: _lodash2['default'].mapValues(props.attributes.present.attrsByName, function (attr) {
	                    return _lodash2['default'].omit(attr, ["label", "name"]);
	                }),
	                order: props.attributes.present.order
	            };
	            return props.dispatch((0, _actions.createNewTable)(config.indyvaTableName, sourceTable, schema));
	        }
	    }, {
	        key: '_writeFinalTable',
	        value: function _writeFinalTable(props) {
	            var filePath = _path2['default'].join(config.destinationPath, config.indyvaTableName + '.csv');
	            return props.dispatch((0, _actions.writeTable)(config.indyvaTableName, filePath));
	        }
	    }, {
	        key: '_configIndyva',
	        value: function _configIndyva(props) {
	            return props.dispatch((0, _actions.configIndyva)(config.indyvaTableName));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var renamingState = this.props.table.renamingState;
	            var categoricalValuesState = "waiting";
	            var finalTableState = this.props.table.creatingNewTableState;
	            var indyvaState = "waiting";
	
	            var ready = this.props.table.renamingState === "success" && this.props.table.creatingNewTableState === "success";
	            return _react2['default'].createElement(
	                'div',
	                { className: 'launcher col-sm-6 col-sm-offset-3' },
	                _react2['default'].createElement(
	                    _reactBootstrap.ListGroup,
	                    null,
	                    _react2['default'].createElement(
	                        _testedListItem2['default'],
	                        { testingState: renamingState },
	                        ' Rename Columns '
	                    ),
	                    _react2['default'].createElement(
	                        _testedListItem2['default'],
	                        { testingState: categoricalValuesState },
	                        ' Modify Categorical Values '
	                    ),
	                    _react2['default'].createElement(
	                        _testedListItem2['default'],
	                        { testingState: finalTableState },
	                        ' Prepare Final Table '
	                    ),
	                    _react2['default'].createElement(
	                        _testedListItem2['default'],
	                        { testingState: indyvaState },
	                        ' Prepare the Analysis Tools '
	                    )
	                ),
	                _react2['default'].createElement(
	                    _reactBootstrap.Button,
	                    { bsStyle: 'primary', block: true, disabled: !ready,
	                        onClick: function () {
	                            if (ready) {
	                                window.location = config.afterLobbyAppUrl;
	                            }
	                        } },
	                    'Launch'
	                )
	            );
	        }
	    }]);
	
	    return Launcher;
	})(_react2['default'].Component);
	
	exports['default'] = (0, _reactRedux.connect)(function (state) {
	    return state;
	})(Launcher);
	module.exports = exports['default'];

/***/ },
/* 350 */
/*!****************************!*\
  !*** ./testedListItem.jsx ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 67);
	
	var TestedListItem = (function (_React$Component) {
	    _inherits(TestedListItem, _React$Component);
	
	    function TestedListItem() {
	        _classCallCheck(this, TestedListItem);
	
	        _get(Object.getPrototypeOf(TestedListItem.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(TestedListItem, [{
	        key: 'render',
	        value: function render() {
	            var icon = "glyphicon glyphicon-";
	            var textStyle = null;
	            switch (this.props.testingState) {
	                case "success":
	                    icon += "ok-circle";
	                    textStyle = "success";
	                    break;
	                case "error":
	                    icon += "ban-circle";
	                    textStyle = "danger";
	                    break;
	                case "waiting":
	                    icon += "time";
	                    break;
	                default:
	                    icon = "";
	                    textStyle = null;
	                    console.warn("This testingState is not correct:", this.props.testingState);
	            }
	            return _react2['default'].createElement(
	                _reactBootstrap.ListGroupItem,
	                { bsStyle: textStyle },
	                _react2['default'].createElement('span', { className: icon }),
	                ' ',
	                _react2['default'].createElement(
	                    'span',
	                    null,
	                    this.props.children
	                )
	            );
	        }
	    }]);
	
	    return TestedListItem;
	})(_react2['default'].Component);
	
	exports['default'] = TestedListItem;
	module.exports = exports['default'];

/***/ },
/* 351 */
/*!*************************************************************************!*\
  !*** /home/crispamares/cbb/lobby/webapp/web/~/redux-thunk/lib/index.js ***!
  \*************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = thunkMiddleware;
	
	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;
	
	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 352 */
/*!*********************!*\
  !*** ./reducers.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _redux = __webpack_require__(/*! redux */ 307);
	
	var _lodash = __webpack_require__(/*! lodash */ 2);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _actions = __webpack_require__(/*! ./actions */ 319);
	
	var _reduxUndo = __webpack_require__(/*! redux-undo */ 318);
	
	var _reduxUndo2 = _interopRequireDefault(_reduxUndo);
	
	// {
	//     attributes: {
	//         attrsByName: {},
	//         order: [],
	//         index: ''
	//     }
	// }
	
	function attributes(state, action) {
	    if (state === undefined) state = {};
	
	    switch (action.type) {
	        case _actions.SET_ATTR_LABEL:
	            return _lodash2['default'].merge({}, state, { attrsByName: _defineProperty({}, action.attr, { label: action.label }) });
	        case _actions.SET_ATTR_TYPE:
	            return _lodash2['default'].merge({}, state, { attrsByName: _defineProperty({}, action.attr, { attribute_type: action.attrType }) });
	        case _actions.SET_ORDER:
	            return _lodash2['default'].assign({}, state, { order: [].concat(_toConsumableArray(action.order)) });
	        case _actions.FILL_FROM_SCHEMA:
	            var attributes = _lodash2['default'].cloneDeep(action.schema.attributes);
	            _lodash2['default'].forOwn(attributes, function (attr, key) {
	                attr.name = key;attr.label = key;
	            });
	            return _lodash2['default'].assign({}, state, { attrsByName: attributes, order: _lodash2['default'].keys(attributes), index: action.schema.index });
	        default:
	            return state;
	    }
	}
	
	function cards(state, action) {
	    if (state === undefined) state = {};
	
	    switch (action.type) {
	        case _actions.TOGGLE_CARD_EXPANSION:
	            return _lodash2['default'].assign({}, state, _defineProperty({}, action.cardKey, { expanded: !state[action.cardKey]['expanded'] }));
	        case _actions.INIT_CARDS:
	            var expandedByDefault = false;
	            var names = _lodash2['default'].keys(action.attributes);
	            return _lodash2['default'].zipObject(names, _lodash2['default'].fill(Array(names.length), { 'expanded': expandedByDefault }));
	        default:
	            return state;
	    }
	}
	
	function table(state, action) {
	    if (state === undefined) state = {};
	
	    switch (action.type) {
	        case _actions.RENAME_COLUMNS_REQUEST:
	            return _lodash2['default'].assign({}, state, { renamingState: "waiting" });
	        case _actions.RENAME_COLUMNS_FAILURE:
	            return _lodash2['default'].assign({}, state, { renamingState: "error" });
	        case _actions.RENAME_COLUMNS_SUCCESS:
	            return _lodash2['default'].assign({}, state, { renamingState: "success" });
	        case _actions.CREATE_NEW_TABLE_REQUEST:
	            return _lodash2['default'].assign({}, state, { creatingNewTableState: "waiting" });
	        case _actions.CREATE_NEW_TABLE_FAILURE:
	            return _lodash2['default'].assign({}, state, { creatingNewTableState: "error" });
	        case _actions.CREATE_NEW_TABLE_SUCCESS:
	            return _lodash2['default'].assign({}, state, { creatingNewTableState: "success" });
	        default:
	            return state;
	    }
	}
	
	var editorReducer = (0, _redux.combineReducers)({
	    table: table,
	    attributes: (0, _reduxUndo2['default'])(attributes, { filter: (0, _reduxUndo.excludeAction)(_actions.SET_ATTR_LABEL) }),
	    cards: (0, _reduxUndo2['default'])(cards)
	});
	exports['default'] = editorReducer;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map