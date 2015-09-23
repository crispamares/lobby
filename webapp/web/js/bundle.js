/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(2);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _reactRouter = __webpack_require__(3);

	var _remote = __webpack_require__(45);

	var _remote2 = _interopRequireDefault(_remote);

	var _path = __webpack_require__(46);

	var _path2 = _interopRequireDefault(_path);

	var _falcor = __webpack_require__(48);

	var _falcor2 = _interopRequireDefault(_falcor);

	var _storage = __webpack_require__(47);

	var _fileDropper = __webpack_require__(201);

	var _fileDropper2 = _interopRequireDefault(_fileDropper);

	// ----------------------------------------------------------
	//  Setup indyva's conection
	// ----------------------------------------------------------

	var _context = __webpack_require__(202);

	var _context2 = _interopRequireDefault(_context);

	var fs = _remote2['default'].require('fs');

	var context = new _context2['default']('localhost', 'ws', 19000);
	context.install();
	var session = 's' + String(Math.round(Math.random() * 100000));
	context.openSession(session);

	var rpc = context.rpc;
	var hub = context.hub;

	var dataSource = new _falcor2['default'].Model({ cache: {} }).asDataSource();

	var model = new _falcor2['default'].Model({ source: dataSource });

	window.model = dataSource;

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
	        { className: 'row' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'col-sm-12' },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return App;
	})(_react2['default'].Component);

	var Loader = _react2['default'].createClass({
	  displayName: 'Loader',

	  readTable: function readTable(filePath) {
	    var _this = this;

	    var destination = _path2['default'].join("/tmp", _path2['default'].basename(filePath));
	    try {
	      if (fs.lstatSync(destination).isFile) fs.unlinkSync(destination);
	    } catch (e) {}
	    fs.symlinkSync(filePath, destination);

	    rpc.call("IOSrv.read_csv", ["userTable", destination]).then(function (table) {
	      return rpc.call("TableSrv.schema", [table]);
	    }).then(function (schema) {
	      (0, _storage.fillModelFromSchema)(dataSource, schema).then(function (d) {
	        console.log("setted", d);
	      }, function (e) {
	        console.error(e);
	      });
	      console.log("SCHEMA", schema); // setState(SCHEMA) or
	      _this.props.history.pushState(_this.props.history.state, "/editor");
	    }).otherwise(function (error) {
	      console.error("puteeeeeeee", error);
	    });
	  },

	  render: function render() {
	    return _react2['default'].createElement(_fileDropper2['default'], { onFileDrop: this.readTable });
	  }
	});

	var Editor = _react2['default'].createClass({
	  displayName: 'Editor',

	  getInitialState: function getInitialState() {
	    return { attributes: {} };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this2 = this;

	    model.get('index.name').subscribe(function (data) {
	      console.log(data);_this2.setState({ attributes: data });
	    });
	  },
	  render: function render() {
	    return _react2['default'].createElement(
	      'pre',
	      null,
	      JSON.stringify(this.state.attributes, null, 4)
	      // _.map(_.values(this.state.attributes), (attr, i) => { return (<li key={i}> {attr.name} </li>); } )

	    );
	  }
	});

	_react2['default'].render(_react2['default'].createElement(
	  _reactRouter.Router,
	  null,
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: Loader }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'editor', component: Editor })
	  )
	), document.getElementById('content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* components */
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Router2 = __webpack_require__(4);

	var _Router3 = _interopRequireDefault(_Router2);

	exports.Router = _Router3['default'];

	var _Link2 = __webpack_require__(36);

	var _Link3 = _interopRequireDefault(_Link2);

	exports.Link = _Link3['default'];

	/* components (configuration) */

	var _IndexRoute2 = __webpack_require__(37);

	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

	exports.IndexRoute = _IndexRoute3['default'];

	var _Redirect2 = __webpack_require__(38);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	exports.Redirect = _Redirect3['default'];

	var _Route2 = __webpack_require__(39);

	var _Route3 = _interopRequireDefault(_Route2);

	exports.Route = _Route3['default'];

	/* mixins */

	var _History2 = __webpack_require__(40);

	var _History3 = _interopRequireDefault(_History2);

	exports.History = _History3['default'];

	var _Lifecycle2 = __webpack_require__(41);

	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

	exports.Lifecycle = _Lifecycle3['default'];

	var _RouteContext2 = __webpack_require__(42);

	var _RouteContext3 = _interopRequireDefault(_RouteContext2);

	exports.RouteContext = _RouteContext3['default'];

	/* utils */

	var _useRoutes2 = __webpack_require__(23);

	var _useRoutes3 = _interopRequireDefault(_useRoutes2);

	exports.useRoutes = _useRoutes3['default'];

	var _RouteUtils = __webpack_require__(19);

	exports.createRoutes = _RouteUtils.createRoutes;

	var _RoutingContext2 = __webpack_require__(20);

	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

	exports.RoutingContext = _RoutingContext3['default'];

	var _PropTypes2 = __webpack_require__(35);

	var _PropTypes3 = _interopRequireDefault(_PropTypes2);

	exports.PropTypes = _PropTypes3['default'];

	var _match2 = __webpack_require__(43);

	var _match3 = _interopRequireDefault(_match2);

	exports.match = _match3['default'];

	var _Router4 = _interopRequireDefault(_Router2);

	exports['default'] = _Router4['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _historyLibCreateHashHistory = __webpack_require__(6);

	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

	var _RouteUtils = __webpack_require__(19);

	var _RoutingContext = __webpack_require__(20);

	var _RoutingContext2 = _interopRequireDefault(_RoutingContext);

	var _useRoutes = __webpack_require__(23);

	var _useRoutes2 = _interopRequireDefault(_useRoutes);

	var _PropTypes = __webpack_require__(35);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(8);

	var _ExecutionEnvironment = __webpack_require__(9);

	var _DOMUtils = __webpack_require__(10);

	var _DOMStateStorage = __webpack_require__(11);

	var _createDOMHistory = __webpack_require__(12);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	var _createLocation = __webpack_require__(18);

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
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 10 */
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(9);

	var _DOMUtils = __webpack_require__(10);

	var _createHistory = __webpack_require__(13);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _deepEqual = __webpack_require__(14);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _AsyncUtils = __webpack_require__(17);

	var _Actions = __webpack_require__(8);

	var _createLocation = __webpack_require__(18);

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
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(15);
	var isArguments = __webpack_require__(16);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _Actions = __webpack_require__(8);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(5);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _getRouteParams = __webpack_require__(21);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(22);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(7);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _historyLibActions = __webpack_require__(8);

	var _historyLibUseQueries = __webpack_require__(24);

	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);

	var _historyLibCreateLocation = __webpack_require__(18);

	var _historyLibCreateLocation2 = _interopRequireDefault(_historyLibCreateLocation);

	var _computeChangedRoutes2 = __webpack_require__(29);

	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

	var _TransitionUtils = __webpack_require__(30);

	var _isActive2 = __webpack_require__(32);

	var _isActive3 = _interopRequireDefault(_isActive2);

	var _getComponents = __webpack_require__(33);

	var _getComponents2 = _interopRequireDefault(_getComponents);

	var _matchRoutes = __webpack_require__(34);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _qs = __webpack_require__(25);

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
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Stringify = __webpack_require__(26);
	var Parse = __webpack_require__(28);


	// Declare internals

	var internals = {};


	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(27);


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
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(27);


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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(22);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runLeaveHooks = runLeaveHooks;

	var _AsyncUtils = __webpack_require__(31);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(22);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _AsyncUtils = __webpack_require__(31);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _AsyncUtils = __webpack_require__(31);

	var _PatternUtils = __webpack_require__(22);

	var _RouteUtils = __webpack_require__(19);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.falsy = falsy;

	var _react = __webpack_require__(1);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(5);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _RouteUtils = __webpack_require__(19);

	var _PropTypes = __webpack_require__(35);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(19);

	var _PatternUtils = __webpack_require__(22);

	var _PropTypes = __webpack_require__(35);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(19);

	var _PropTypes = __webpack_require__(35);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PropTypes = __webpack_require__(35);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(7);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = match;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _historyLibCreateMemoryHistory = __webpack_require__(44);

	var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

	var _useRoutes = __webpack_require__(23);

	var _useRoutes2 = _interopRequireDefault(_useRoutes);

	var _RouteUtils = __webpack_require__(19);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(7);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(8);

	var _createLocation = __webpack_require__(18);

	var _createLocation2 = _interopRequireDefault(_createLocation);

	var _createHistory = __webpack_require__(13);

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
/***/ function(module, exports) {

	module.exports = require("remote");

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _falcor = __webpack_require__(48);

	var _falcor2 = _interopRequireDefault(_falcor);

	var _lodash = __webpack_require__(2);

	var _lodash2 = _interopRequireDefault(_lodash);

	var $ref = _falcor2["default"].Model.ref;
	var $atom = _falcor2["default"].Model.atom;

	var fillModelFromSchema = function fillModelFromSchema(model, schema) {
	  _lodash2["default"].forOwn(schema.attributes, function (attr, key) {
	    attr.name = key;
	  });

	  return model.set({
	    paths: ['attributes'],
	    jsonGraph: {
	      attributes: schema.attribute,
	      order: _lodash2["default"].map(_lodash2["default"].keys(schema.attributes), function (v) {
	        return $ref(['attributes', v]);
	      }),
	      index: $ref(['attributes', schema.index])
	    }
	  }
	  // {path: 'attributes', value: schema.attributes},
	  // {path: 'order'     , value: _.map(_.keys(schema.attributes), (v) => {return $ref(['attributes', v]);} )},
	  // {path: 'index'     , value: [$ref(['attributes', schema.index])]}
	  );
	};
	exports.fillModelFromSchema = fillModelFromSchema;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function falcor(opts) {
	    return new falcor.Model(opts);
	}

	if (typeof Promise === "function") {
	    falcor.Promise = Promise;
	} else {
	    falcor.Promise = __webpack_require__(49);
	}

	module.exports = falcor;

	falcor.Model = __webpack_require__(59);


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(50)


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(51);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(57);


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var asap = __webpack_require__(52);

	function noop() {}

	// States:
	//
	// 0 - pending
	// 1 - fulfilled with _value
	// 2 - rejected with _value
	// 3 - adopted the state of another promise, _value
	//
	// once the state is no longer pending (0) it is immutable

	// All `_` prefixed properties will be reduced to `_{random number}`
	// at build time to obfuscate them and discourage their use.
	// We don't use symbols or Object.defineProperty to fully hide them
	// because the performance isn't good enough.


	// to avoid using try/catch inside critical functions, we
	// extract them to here.
	var LAST_ERROR = null;
	var IS_ERROR = {};
	function getThen(obj) {
	  try {
	    return obj.then;
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	function tryCallOne(fn, a) {
	  try {
	    return fn(a);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	function tryCallTwo(fn, a, b) {
	  try {
	    fn(a, b);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	module.exports = Promise;

	function Promise(fn) {
	  if (typeof this !== 'object') {
	    throw new TypeError('Promises must be constructed via new');
	  }
	  if (typeof fn !== 'function') {
	    throw new TypeError('not a function');
	  }
	  this._37 = 0;
	  this._12 = null;
	  this._59 = [];
	  if (fn === noop) return;
	  doResolve(fn, this);
	}
	Promise._99 = noop;

	Promise.prototype.then = function(onFulfilled, onRejected) {
	  if (this.constructor !== Promise) {
	    return safeThen(this, onFulfilled, onRejected);
	  }
	  var res = new Promise(noop);
	  handle(this, new Handler(onFulfilled, onRejected, res));
	  return res;
	};

	function safeThen(self, onFulfilled, onRejected) {
	  return new self.constructor(function (resolve, reject) {
	    var res = new Promise(noop);
	    res.then(resolve, reject);
	    handle(self, new Handler(onFulfilled, onRejected, res));
	  });
	};
	function handle(self, deferred) {
	  while (self._37 === 3) {
	    self = self._12;
	  }
	  if (self._37 === 0) {
	    self._59.push(deferred);
	    return;
	  }
	  asap(function() {
	    var cb = self._37 === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      if (self._37 === 1) {
	        resolve(deferred.promise, self._12);
	      } else {
	        reject(deferred.promise, self._12);
	      }
	      return;
	    }
	    var ret = tryCallOne(cb, self._12);
	    if (ret === IS_ERROR) {
	      reject(deferred.promise, LAST_ERROR);
	    } else {
	      resolve(deferred.promise, ret);
	    }
	  });
	}
	function resolve(self, newValue) {
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {
	    return reject(
	      self,
	      new TypeError('A promise cannot be resolved with itself.')
	    );
	  }
	  if (
	    newValue &&
	    (typeof newValue === 'object' || typeof newValue === 'function')
	  ) {
	    var then = getThen(newValue);
	    if (then === IS_ERROR) {
	      return reject(self, LAST_ERROR);
	    }
	    if (
	      then === self.then &&
	      newValue instanceof Promise
	    ) {
	      self._37 = 3;
	      self._12 = newValue;
	      finale(self);
	      return;
	    } else if (typeof then === 'function') {
	      doResolve(then.bind(newValue), self);
	      return;
	    }
	  }
	  self._37 = 1;
	  self._12 = newValue;
	  finale(self);
	}

	function reject(self, newValue) {
	  self._37 = 2;
	  self._12 = newValue;
	  finale(self);
	}
	function finale(self) {
	  for (var i = 0; i < self._59.length; i++) {
	    handle(self, self._59[i]);
	  }
	  self._59 = null;
	}

	function Handler(onFulfilled, onRejected, promise){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, promise) {
	  var done = false;
	  var res = tryCallTwo(fn, function (value) {
	    if (done) return;
	    done = true;
	    resolve(promise, value);
	  }, function (reason) {
	    if (done) return;
	    done = true;
	    reject(promise, reason);
	  })
	  if (!done && res === IS_ERROR) {
	    done = true;
	    reject(promise, LAST_ERROR);
	  }
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var domain; // The domain module is executed on demand
	var hasSetImmediate = typeof setImmediate === "function";

	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including network IO events in Node.js.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Avoids a function call
	    queue[queue.length] = task;
	}

	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory excaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;

	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}

	rawAsap.requestFlush = requestFlush;
	function requestFlush() {
	    // Ensure flushing is not bound to any domain.
	    // It is not sufficient to exit the domain, because domains exist on a stack.
	    // To execute code outside of any domain, the following dance is necessary.
	    var parentDomain = process.domain;
	    if (parentDomain) {
	        if (!domain) {
	            // Lazy execute the domain module.
	            // Only employed if the user elects to use domains.
	            domain = __webpack_require__(53);
	        }
	        domain.active = process.domain = null;
	    }

	    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
	    // cannot handle recursion.
	    // `requestFlush` will only be called recursively from `asap.js`, to resume
	    // flushing after an error is thrown into a domain.
	    // Conveniently, `setImmediate` was introduced in the same version
	    // `process.nextTick` started throwing recursion errors.
	    if (flushing && hasSetImmediate) {
	        setImmediate(flush);
	    } else {
	        process.nextTick(flush);
	    }

	    if (parentDomain) {
	        domain.active = process.domain = parentDomain;
	    }
	}


/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("domain");

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(51);

	module.exports = Promise;
	Promise.prototype.done = function (onFulfilled, onRejected) {
	  var self = arguments.length ? this.then.apply(this, arguments) : this;
	  self.then(null, function (err) {
	    setTimeout(function () {
	      throw err;
	    }, 0);
	  });
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(51);

	module.exports = Promise;
	Promise.prototype['finally'] = function (f) {
	  return this.then(function (value) {
	    return Promise.resolve(f()).then(function () {
	      return value;
	    });
	  }, function (err) {
	    return Promise.resolve(f()).then(function () {
	      throw err;
	    });
	  });
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//This file contains the ES6 extensions to the core Promises/A+ API

	var Promise = __webpack_require__(51);

	module.exports = Promise;

	/* Static Functions */

	var TRUE = valuePromise(true);
	var FALSE = valuePromise(false);
	var NULL = valuePromise(null);
	var UNDEFINED = valuePromise(undefined);
	var ZERO = valuePromise(0);
	var EMPTYSTRING = valuePromise('');

	function valuePromise(value) {
	  var p = new Promise(Promise._99);
	  p._37 = 1;
	  p._12 = value;
	  return p;
	}
	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value;

	  if (value === null) return NULL;
	  if (value === undefined) return UNDEFINED;
	  if (value === true) return TRUE;
	  if (value === false) return FALSE;
	  if (value === 0) return ZERO;
	  if (value === '') return EMPTYSTRING;

	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then;
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value));
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex);
	      });
	    }
	  }
	  return valuePromise(value);
	};

	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);

	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(i, val) {
	      if (val && (typeof val === 'object' || typeof val === 'function')) {
	        if (val instanceof Promise && val.then === Promise.prototype.then) {
	          while (val._37 === 3) {
	            val = val._12;
	          }
	          if (val._37 === 1) return res(i, val._12);
	          if (val._37 === 2) reject(val._12);
	          val.then(function (val) {
	            res(i, val);
	          }, reject);
	          return;
	        } else {
	          var then = val.then;
	          if (typeof then === 'function') {
	            var p = new Promise(then.bind(val));
	            p.then(function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          }
	        }
	      }
	      args[i] = val;
	      if (--remaining === 0) {
	        resolve(args);
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};

	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
	    reject(value);
	  });
	};

	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    });
	  });
	};

	/* Prototype Methods */

	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// This file contains then/promise specific extensions that are only useful
	// for node.js interop

	var Promise = __webpack_require__(51);
	var asap = __webpack_require__(58);

	module.exports = Promise;

	/* Static Functions */

	Promise.denodeify = function (fn, argumentCount) {
	  argumentCount = argumentCount || Infinity;
	  return function () {
	    var self = this;
	    var args = Array.prototype.slice.call(arguments, 0,
	        argumentCount > 0 ? argumentCount : 0);
	    return new Promise(function (resolve, reject) {
	      args.push(function (err, res) {
	        if (err) reject(err);
	        else resolve(res);
	      })
	      var res = fn.apply(self, args);
	      if (res &&
	        (
	          typeof res === 'object' ||
	          typeof res === 'function'
	        ) &&
	        typeof res.then === 'function'
	      ) {
	        resolve(res);
	      }
	    })
	  }
	}
	Promise.nodeify = function (fn) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback =
	      typeof args[args.length - 1] === 'function' ? args.pop() : null;
	    var ctx = this;
	    try {
	      return fn.apply(this, arguments).nodeify(callback, ctx);
	    } catch (ex) {
	      if (callback === null || typeof callback == 'undefined') {
	        return new Promise(function (resolve, reject) {
	          reject(ex);
	        });
	      } else {
	        asap(function () {
	          callback.call(ctx, ex);
	        })
	      }
	    }
	  }
	}

	Promise.prototype.nodeify = function (callback, ctx) {
	  if (typeof callback != 'function') return this;

	  this.then(function (value) {
	    asap(function () {
	      callback.call(ctx, null, value);
	    });
	  }, function (err) {
	    asap(function () {
	      callback.call(ctx, err);
	    });
	  });
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var rawAsap = __webpack_require__(52);
	var freeTasks = [];

	/**
	 * Calls a task as soon as possible after returning, in its own event, with
	 * priority over IO events. An exception thrown in a task can be handled by
	 * `process.on("uncaughtException") or `domain.on("error")`, but will otherwise
	 * crash the process. If the error is handled, all subsequent tasks will
	 * resume.
	 *
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawTask.domain = process.domain;
	    rawAsap(rawTask);
	}

	function RawTask() {
	    this.task = null;
	    this.domain = null;
	}

	RawTask.prototype.call = function () {
	    if (this.domain) {
	        this.domain.enter();
	    }
	    var threw = true;
	    try {
	        this.task.call();
	        threw = false;
	        // If the task throws an exception (presumably) Node.js restores the
	        // domain stack for the next event.
	        if (this.domain) {
	            this.domain.exit();
	        }
	    } finally {
	        // We use try/finally and a threw flag to avoid messing up stack traces
	        // when we catch and release errors.
	        if (threw) {
	            // In Node.js, uncaught exceptions are considered fatal errors.
	            // Re-throw them to interrupt flushing!
	            // Ensure that flushing continues if an uncaught exception is
	            // suppressed listening process.on("uncaughtException") or
	            // domain.on("error").
	            rawAsap.requestFlush();
	        }
	        // If the task threw an error, we do not want to exit the domain here.
	        // Exiting the domain would prevent the domain from catching the error.
	        this.task = null;
	        this.domain = null;
	        freeTasks.push(this);
	    }
	};



/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var ModelRoot = __webpack_require__(60);
	var ModelDataSourceAdapter = __webpack_require__(67);

	var RequestQueue = __webpack_require__(68);
	var ModelResponse = __webpack_require__(155);
	var SetResponse = __webpack_require__(158);
	var CallResponse = __webpack_require__(182);
	var InvalidateResponse = __webpack_require__(183);

	var ASAPScheduler = __webpack_require__(184);
	var TimeoutScheduler = __webpack_require__(185);
	var ImmediateScheduler = __webpack_require__(64);

	var arrayClone = __webpack_require__(177);
	var arraySlice = __webpack_require__(153);

	var collectLru = __webpack_require__(174);
	var pathSyntax = __webpack_require__(114);

	var getSize = __webpack_require__(109);
	var isObject = __webpack_require__(63);
	var isFunction = __webpack_require__(61);
	var isPrimitive = __webpack_require__(101);
	var isJSONEnvelope = __webpack_require__(179);
	var isJSONGraphEnvelope = __webpack_require__(180);

	var setCache = __webpack_require__(186);
	var setJSONGraphs = __webpack_require__(83);
	var jsong = __webpack_require__(113);
	var ID = 0;
	var validateInput = __webpack_require__(187);
	var noOp = function() {};
	var getCache = __webpack_require__(188);
	var get = __webpack_require__(161);
	var SET_VALID_INPUT = {
	    pathValue: true,
	    pathSyntax: true,
	    json: true,
	    jsonGraph: true
	};
	var GET_VALID_INPUT = __webpack_require__(189);

	module.exports = Model;

	Model.ref = jsong.ref;
	Model.atom = jsong.atom;
	Model.error = jsong.error;
	Model.pathValue = jsong.pathValue;
	/**
	 * This callback is invoked when the Model's cache is changed.
	 * @callback Model~onChange
	 */

	 /**
	 * This function is invoked on every JSONGraph Error retrieved from the DataSource. This function allows Error objects to be transformed before being stored in the Model's cache.
	 * @callback Model~errorSelector
	 * @param {Object} jsonGraphError - the JSONGraph Error object to transform before it is stored in the Model's cache.
	 * @returns {Object} the JSONGraph Error object to store in the Model cache.
	 */

	 /**
	 * This function is invoked every time a value in the Model cache is about to be replaced with a new value. If the function returns true, the existing value is replaced with a new value and the version flag on all of the value's ancestors in the tree are incremented.
	 * @callback Model~comparator
	 * @param {Object} existingValue - the current value in the Model cache.
	 * @param {Object} newValue - the value about to be set into the Model cache.
	 * @returns {Boolean} the Boolean value indicating whether the new value and the existing value are equal.
	 */

	/**
	 * A Model object is used to execute commands against a {@link JSONGraph} object. {@link Model}s can work with a local JSONGraph cache, or it can work with a remote {@link JSONGraph} object through a {@link DataSource}.
	 * @constructor
	 * @param {?Object} options - a set of options to customize behavior
	 * @param {?DataSource} options.source - a data source to retrieve and manage the {@link JSONGraph}
	 * @param {?JSONGraph} options.cache - initial state of the {@link JSONGraph}
	 * @param {?number} options.maxSize - the maximum size of the cache
	 * @param {?number} options.collectRatio - the ratio of the maximum size to collect when the maxSize is exceeded
	 * @param {?Model~errorSelector} options.errorSelector - a function used to translate errors before they are returned
	 * @param {?Model~onChange} options.onChange - a function called whenever the Model's cache is changed
	 * @param {?Model~comparator} options.comparator - a function called whenever a value in the Model's cache is about to be replaced with a new value.
	 */
	function Model(o) {

	    var options = o || {};
	    this._root = options._root || new ModelRoot(options);
	    this._path = options.path || options._path || [];
	    this._scheduler = options.scheduler || options._scheduler || new ImmediateScheduler();
	    this._source = options.source || options._source;
	    this._request = options.request || options._request || new RequestQueue(this, this._scheduler);
	    this._ID = ID++;

	    if (typeof options.maxSize === "number") {
	        this._maxSize = options.maxSize;
	    } else {
	        this._maxSize = options._maxSize || Model.prototype._maxSize;
	    }

	    if (typeof options.collectRatio === "number") {
	        this._collectRatio = options.collectRatio;
	    } else {
	        this._collectRatio = options._collectRatio || Model.prototype._collectRatio;
	    }

	    if (options.boxed || options.hasOwnProperty("_boxed")) {
	        this._boxed = options.boxed || options._boxed;
	    }

	    if (options.materialized || options.hasOwnProperty("_materialized")) {
	        this._materialized = options.materialized || options._materialized;
	    }

	    if (typeof options.treatErrorsAsValues === "boolean") {
	        this._treatErrorsAsValues = options.treatErrorsAsValues;
	    } else if (options.hasOwnProperty("_treatErrorsAsValues")) {
	        this._treatErrorsAsValues = options._treatErrorsAsValues;
	    }

	    if (options.cache) {
	        this.setCache(options.cache);
	    }
	}

	Model.prototype.constructor = Model;

	Model.prototype._materialized = false;
	Model.prototype._boxed = false;
	Model.prototype._progressive = false;
	Model.prototype._treatErrorsAsValues = false;
	Model.prototype._maxSize = Math.pow(2, 53) - 1;
	Model.prototype._collectRatio = 0.75;

	/**
	 * The get method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model}. The get method loads each value into a JSON object and returns in a ModelResponse.
	 * @function
	 * @param {...PathSet} path - the path(s) to retrieve
	 * @return {ModelResponse.<JSONEnvelope>} - the requested data as JSON
	 */
	Model.prototype.get = __webpack_require__(190);

	/**
	 * The get method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model}. The get method loads each value into a JSON object and returns in a ModelResponse.
	 * @function
	 * @private
	 * @param {Array.<PathSet>} paths - the path(s) to retrieve
	 * @return {ModelResponse.<JSONEnvelope>} - the requested data as JSON
	 */
	Model.prototype._getWithPaths = __webpack_require__(191);

	/**
	 * Sets the value at one or more places in the JSONGraph model. The set method accepts one or more {@link PathValue}s, each of which is a combination of a location in the document and the value to place there.  In addition to accepting  {@link PathValue}s, the set method also returns the values after the set operation is complete.
	 * @function
	 * @return {ModelResponse.<JSON>} - an {@link Observable} stream containing the values in the JSONGraph model after the set was attempted
	 */
	Model.prototype.set = function set() {
	    var out = validateInput(arguments, SET_VALID_INPUT, "set");
	    if (out !== true) {
	        return new ModelResponse(function(o) {
	            o.onError(out);
	        });
	    }
	    return this._set.apply(this, arguments);
	};

	/**
	 * The preload method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model} and loads them into the Model cache.
	 * @function
	 * @param {...PathSet} path - the path(s) to retrieve
	 * @return {ModelResponse.<Object>} - a ModelResponse that completes when the data has been loaded into the cache.
	 */
	Model.prototype.preload = function preload() {
	    var out = validateInput(arguments, GET_VALID_INPUT, "preload");
	    if (out !== true) {
	        return new ModelResponse(function(o) {
	            o.onError(out);
	        });
	    }
	    var args = Array.prototype.slice.call(arguments);
	    var self = this;
	    return new ModelResponse(function(obs) {
	        return self.get.apply(self, args).subscribe(function() {
	        }, function(err) {
	            obs.onError(err);
	        }, function() {
	            obs.onCompleted();
	        });
	    });
	};

	Model.prototype._set = function _set() {
	    var args;
	    var argsIdx = -1;
	    var argsLen = arguments.length;
	    var selector = arguments[argsLen - 1];
	    if (isFunction(selector)) {
	        argsLen = argsLen - 1;
	    } else {
	        selector = void 0;
	    }
	    args = new Array(argsLen);
	    while (++argsIdx < argsLen) {
	        args[argsIdx] = arguments[argsIdx];
	    }
	    return SetResponse.create(this, args, selector);
	};

	/**
	 * Invokes a function in the JSON Graph.
	 * @function
	 * @param {Path} functionPath - the path to the function to invoke
	 * @param {Array.<Object>} args - the arguments to pass to the function
	 * @param {Array.<PathSet>} refPaths - the paths to retrieve from the JSON Graph References in the message returned from the function
	 * @param {Array.<PathSet>} thisPaths - the paths to retrieve from function's this object after successful function execution
	 * @returns {ModelResponse.<JSONEnvelope> - a JSONEnvelope contains the values returned from the function
	 */
	Model.prototype.call = function call() {
	    var args;
	    var argsIdx = -1;
	    var argsLen = arguments.length;
	    args = new Array(argsLen);
	    while (++argsIdx < argsLen) {
	        var arg = arguments[argsIdx];
	        args[argsIdx] = arg;
	        var argType = typeof arg;
	        if (argsIdx > 1 && !Array.isArray(arg) ||
	            argsIdx === 0 && !Array.isArray(arg) && argType !== "string" ||
	            argsIdx === 1 && !Array.isArray(arg) && !isPrimitive(arg)) {
	            /* eslint-disable no-loop-func */
	            return new ModelResponse(function(o) {
	                o.onError(new Error("Invalid argument"));
	            });
	            /* eslint-enable no-loop-func */
	        }
	    }

	    return CallResponse.create(this, args);
	};

	/**
	 * The invalidate method synchronously removes several {@link Path}s or {@link PathSet}s from a {@link Model} cache.
	 * @function
	 * @param {...PathSet} path - the  paths to remove from the {@link Model}'s cache.
	 */
	Model.prototype.invalidate = function invalidate() {
	    var args;
	    var argsIdx = -1;
	    var argsLen = arguments.length;
	    var selector = arguments[argsLen - 1];
	    args = new Array(argsLen);
	    while (++argsIdx < argsLen) {
	        args[argsIdx] = pathSyntax.fromPath(arguments[argsIdx]);
	        if (typeof args[argsIdx] !== "object") {
	            throw new Error("Invalid argument");
	        }
	    }

	    // creates the obs, subscribes and will throw the errors if encountered.
	    InvalidateResponse.
	        create(this, args, selector).
	        subscribe(noOp, function(e) {
	            throw e;
	        });
	};

	/**
	 * Returns a new {@link Model} bound to a location within the {@link JSONGraph}. The bound location is never a {@link Reference}: any {@link Reference}s encountered while resolving the bound {@link Path} are always replaced with the {@link Reference}s target value. For subsequent operations on the {@link Model}, all paths will be evaluated relative to the bound path. Deref allows you to:
	 * - Expose only a fragment of the {@link JSONGraph} to components, rather than the entire graph
	 * - Hide the location of a {@link JSONGraph} fragment from components
	 * - Optimize for executing multiple operations and path looksup at/below the same location in the {@link JSONGraph}
	 * @method
	 * @param {Path} derefPath - the path to the object that the new Model should refer to
	 * @param {...PathSet} relativePathsToPreload - paths (relative to the dereference path) to preload before Model is created
	 * @return {Observable.<Model>} - an Observable stream with a single value, the dereferenced {@link Model}, or an empty stream if nothing is found at the path
	 * @example
	var model = new falcor.Model({
	  cache: {
	    users: [
	      { $type: "ref", value: ["usersById", 32] }
	    ],
	    usersById: {
	      32: {
		name: "Steve",
	        surname: "McGuire"
	      }
	    }
	  }
	});
	model.deref(["users", 0], "name").subscribe(function(userModel){
	  console.log(userModel.getPath());
	});

	// prints ["usersById", 32] because userModel refers to target of reference at ["users", 0]
	 */
	Model.prototype.deref = __webpack_require__(192);

	/**
	 * Get data for a single {@link Path}.
	 * @param {Path} path - the path to retrieve
	 * @return {Observable.<*>} - the value for the path
	 * @example
	 var model = new falcor.Model({source: new falcor.HttpDataSource("/model.json") });

	 model.
	     getValue('user.name').
	     subscribe(function(name) {
	         console.log(name);
	     });

	 // The code above prints "Jim" to the console.
	 */
	Model.prototype.getValue = __webpack_require__(193);

	/**
	 * Set value for a single {@link Path}.
	 * @param {Path} path - the path to set
	 * @param {Object} value - the value to set
	 * @return {Observable.<*>} - the value for the path
	 * @example
	 var model = new falcor.Model({source: new falcor.HttpDataSource("/model.json") });

	 model.
	     setValue('user.name', 'Jim').
	     subscribe(function(name) {
	         console.log(name);
	     });

	 // The code above prints "Jim" to the console.
	 */
	Model.prototype.setValue = __webpack_require__(194);

	// TODO: Does not throw if given a PathSet rather than a Path, not sure if it should or not.
	// TODO: Doc not accurate? I was able to invoke directly against the Model, perhaps because I don't have a data source?
	// TODO: Not clear on what it means to "retrieve objects in addition to JSONGraph values"
	/**
	 * Synchronously retrieves a single path from the local {@link Model} only and will not retrieve missing paths from the {@link DataSource}. This method can only be invoked when the {@link Model} does not have a {@link DataSource} or from within a selector function. See {@link Model.prototype.get}. The getValueSync method differs from the asynchronous get methods (ex. get, getValues) in that it can be used to retrieve objects in addition to JSONGraph values.
	 * @method
	 * @private
	 * @arg {Path} path - the path to retrieve
	 * @return {*} - the value for the specified path
	 */
	Model.prototype._getValueSync = __webpack_require__(195);

	Model.prototype._setValueSync = __webpack_require__(196);

	Model.prototype._derefSync = __webpack_require__(197);

	/**
	 * Set the local cache to a {@link JSONGraph} fragment. This method can be a useful way of mocking a remote document, or restoring the local cache from a previously stored state.
	 * @param {JSONGraph} jsonGraph - the {@link JSONGraph} fragment to use as the local cache
	 */
	Model.prototype.setCache = function modelSetCache(cacheOrJSONGraphEnvelope) {
	    var cache = this._root.cache;
	    if (cacheOrJSONGraphEnvelope !== cache) {
	        var modelRoot = this._root;
	        var boundPath = this._path;
	        this._path = [];
	        this._root.cache = {};
	        if (typeof cache !== "undefined") {
	            collectLru(modelRoot, modelRoot.expired, getSize(cache), 0);
	        }
	        if (isJSONGraphEnvelope(cacheOrJSONGraphEnvelope)) {
	            setJSONGraphs(this, [cacheOrJSONGraphEnvelope]);
	        } else if (isJSONEnvelope(cacheOrJSONGraphEnvelope)) {
	            setCache(this, [cacheOrJSONGraphEnvelope]);
	        } else if (isObject(cacheOrJSONGraphEnvelope)) {
	            setCache(this, [{ json: cacheOrJSONGraphEnvelope }]);
	        }
	        this._path = boundPath;
	    } else if (typeof cache === "undefined") {
	        this._root.cache = {};
	    }
	    return this;
	};

	/**
	 * Get the local {@link JSONGraph} cache. This method can be a useful to store the state of the cache.
	 * @param {...Array.<PathSet>} [pathSets] - The path(s) to retrieve. If no paths are specified, the entire {@link JSONGraph} is returned.
	 * @return {JSONGraph} all of the {@link JSONGraph} data in the {@link Model} cache.
	 * @example
	 // Storing the boxshot of the first 10 titles in the first 10 genreLists to local storage.
	 localStorage.setItem('cache', JSON.stringify(model.getCache("genreLists[0...10][0...10].boxshot")));
	 */
	Model.prototype.getCache = function _getCache() {
	    var paths = arraySlice(arguments);
	    if (paths.length === 0) {
	        return getCache(this._root.cache);
	    }

	    var result = [{}];
	    var path = this._path;
	    get.getWithPathsAsJSONGraph(this, paths, result);
	    this._path = path;
	    return result[0].jsonGraph;
	};

	/**
	 * Retrieves a number which is incremented every single time a value is changed underneath the Model or the object at an optionally-provided Path beneath the Model.
	 * @param {Path?} path - a path at which to retrieve the version number
	 * @return {Number} a version number which changes whenever a value is changed underneath the Model or provided Path
	 */
	Model.prototype.getVersion = function getVersion(pathArg) {
	    var path = pathArg && pathSyntax.fromPath(pathArg) || [];
	    if (Array.isArray(path) === false) {
	        throw new Error("Model#getVersion must be called with an Array path.");
	    }
	    if (this._path.length) {
	        path = this._path.concat(path);
	    }
	    return this._getVersion(this, path);
	};

	Model.prototype._syncCheck = function syncCheck(name) {
	    if (Boolean(this._source) && this._root.syncRefCount <= 0 && this._root.unsafeMode === false) {
	        throw new Error("Model#" + name + " may only be called within the context of a request selector.");
	    }
	    return true;
	};

	/* eslint-disable guard-for-in */
	Model.prototype._clone = function cloneModel(opts) {
	    var clone = new Model(this);
	    for (var key in opts) {
	        var value = opts[key];
	        if (value === "delete") {
	            delete clone[key];
	        } else {
	            clone[key] = value;
	        }
	    }
	    clone.setCache = void 0;
	    return clone;
	};
	/* eslint-enable */

	/**
	 * Returns a clone of the {@link Model} that enables batching. Within the configured time period, paths for get operations are collected and sent to the {@link DataSource} in a batch. Batching can be more efficient if the {@link DataSource} access the network, potentially reducing the number of HTTP requests to the server.
	 * @param {?Scheduler|number} schedulerOrDelay - Either a {@link Scheduler} that determines when to send a batch to the {@link DataSource}, or the number in milliseconds to collect a batch before sending to the {@link DataSource}. If this parameter is omitted, then batch collection ends at the end of the next tick.
	 * @return {Model} a Model which schedules a batch of get requests to the DataSource.
	 */
	Model.prototype.batch = function batch(schedulerOrDelayArg) {
	    var schedulerOrDelay = schedulerOrDelayArg;
	    if (typeof schedulerOrDelay === "number") {
	        schedulerOrDelay = new TimeoutScheduler(Math.round(Math.abs(schedulerOrDelay)));
	    } else if (!schedulerOrDelay || !schedulerOrDelay.schedule) {
	        schedulerOrDelay = new ASAPScheduler();
	    }
	    var clone = this._clone();
	    clone._request = new RequestQueue(clone, schedulerOrDelay);

	    return clone;
	};

	/**
	 * Returns a clone of the {@link Model} that disables batching. This is the default mode. Each get operation will be executed on the {@link DataSource} separately.
	 * @name unbatch
	 * @memberof Model.prototype
	 * @function
	 * @return {Model} a {@link Model} that batches requests of the same type and sends them to the data source together
	 */
	Model.prototype.unbatch = function unbatch() {
	    var clone = this._clone();
	    clone._request = new RequestQueue(clone, new ImmediateScheduler());
	    return clone;
	};

	/**
	 * Returns a clone of the {@link Model} that treats errors as values. Errors will be reported in the same callback used to report data. Errors will appear as objects in responses, rather than being sent to the {@link Observable~onErrorCallback} callback of the {@link ModelResponse}.
	 * @return {Model}
	 */
	Model.prototype.treatErrorsAsValues = function treatErrorsAsValues() {
	    return this._clone({
	        _treatErrorsAsValues: true
	    });
	};

	/**
	 * Adapts a Model to the {@link DataSource} interface.
	 * @return {DataSource}
	 * @example
	var model =
	    new falcor.Model({
	        cache: {
	            user: {
	                name: "Steve",
	                surname: "McGuire"
	            }
	        }
	    }),
	    proxyModel = new falcor.Model({ source: model.asDataSource() });

	// Prints "Steve"
	proxyModel.getValue("user.name").
	    then(function(name) {
	        console.log(name);
	    });
	 */
	Model.prototype.asDataSource = function asDataSource() {
	    return new ModelDataSourceAdapter(this);
	};

	Model.prototype._materialize = function materialize() {
	    return this._clone({
	        _materialized: true
	    });
	};

	Model.prototype._dematerialize = function dematerialize() {
	    return this._clone({
	        _materialized: "delete"
	    });
	};

	/**
	 * Returns a clone of the {@link Model} that boxes values returning the wrapper ({@link Atom}, {@link Reference}, or {@link Error}), rather than the value inside it. This allows any metadata attached to the wrapper to be inspected.
	 * @return {Model}
	 */
	Model.prototype.boxValues = function boxValues() {
	    return this._clone({
	        _boxed: true
	    });
	};

	/**
	 * Returns a clone of the {@link Model} that unboxes values, returning the value inside of the wrapper ({@link Atom}, {@link Reference}, or {@link Error}), rather than the wrapper itself. This is the default mode.
	 * @return {Model}
	 */
	Model.prototype.unboxValues = function unboxValues() {
	    return this._clone({
	        _boxed: "delete"
	    });
	};

	/**
	 * Returns a clone of the {@link Model} that only uses the local {@link JSONGraph} and never uses a {@link DataSource} to retrieve missing paths.
	 * @return {Model}
	 */
	Model.prototype.withoutDataSource = function withoutDataSource() {
	    return this._clone({
	        _source: "delete"
	    });
	};

	Model.prototype.toJSON = function toJSON() {
	    return {
	        $type: "ref",
	        value: this._path
	    };
	};

	/**
	 * Returns the {@link Path} to the object within the JSON Graph that this Model references.
	 * @return {Path}
	 * @example
	var model = new falcor.Model({
	  cache: {
	    users: [
	      { $type: "ref", value: ["usersById", 32] }
	    ],
	    usersById: {
	      32: {
		name: "Steve",
	        surname: "McGuire"
	      }
	    }
	  }
	});
	model.deref(["users", 0], "name").subscribe(function(userModel){
	  console.log(userModel.getPath());
	});

	// prints ["usersById", 32] because userModel refers to target of reference at ["users", 0]
	 */
	Model.prototype.getPath = function getPath() {
	    return arrayClone(this._path);
	};

	Model.prototype._getBoundValue = __webpack_require__(137);
	Model.prototype._getVersion = __webpack_require__(198);
	Model.prototype._getValueSync = __webpack_require__(138);

	Model.prototype._getPathValuesAsPathMap = get.getWithPathsAsPathMap;
	Model.prototype._getPathValuesAsJSONG = get.getWithPathsAsJSONGraph;

	Model.prototype._setPathValuesAsJSON = __webpack_require__(136);
	Model.prototype._setPathValuesAsJSONG = __webpack_require__(136);
	Model.prototype._setPathValuesAsPathMap = __webpack_require__(136);
	Model.prototype._setPathValuesAsValues = __webpack_require__(136);

	Model.prototype._setPathMapsAsJSON = __webpack_require__(186);
	Model.prototype._setPathMapsAsJSONG = __webpack_require__(186);
	Model.prototype._setPathMapsAsPathMap = __webpack_require__(186);
	Model.prototype._setPathMapsAsValues = __webpack_require__(186);

	Model.prototype._setJSONGsAsJSON = __webpack_require__(83);
	Model.prototype._setJSONGsAsJSONG = __webpack_require__(83);
	Model.prototype._setJSONGsAsPathMap = __webpack_require__(83);
	Model.prototype._setJSONGsAsValues = __webpack_require__(83);

	Model.prototype._setCache = __webpack_require__(186);

	Model.prototype._invalidatePathValuesAsJSON = __webpack_require__(199);
	Model.prototype._invalidatePathMapsAsJSON = __webpack_require__(200);


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(61);
	var hasOwn = __webpack_require__(62);
	var ImmediateScheduler = __webpack_require__(64);

	function ModelRoot(o) {

	    var options = o || {};

	    this.syncRefCount = 0;
	    this.expired = options.expired || [];
	    this.unsafeMode = options.unsafeMode || false;
	    this.collectionScheduler = options.collectionScheduler || new ImmediateScheduler();
	    this.cache = {};

	    if (isFunction(options.comparator)) {
	        this.comparator = options.comparator;
	    }

	    if (isFunction(options.errorSelector)) {
	        this.errorSelector = options.errorSelector;
	    }

	    if (isFunction(options.onChange)) {
	        this.onChange = options.onChange;
	    }
	}

	ModelRoot.prototype.errorSelector = function errorSelector(x, y) {
	    return y;
	};
	ModelRoot.prototype.comparator = function comparator(a, b) {
	    if (hasOwn(a, "value") && hasOwn(b, "value")) {
	        return a.value === b.value;
	    }
	    return a === b;
	};

	module.exports = ModelRoot;


/***/ },
/* 61 */
/***/ function(module, exports) {

	var functionTypeof = "function";

	module.exports = function isFunction(func) {
	    return Boolean(func) && typeof func === functionTypeof;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(63);
	var hasOwn = Object.prototype.hasOwnProperty;

	module.exports = function(obj, prop) {
	  return isObject(obj) && hasOwn.call(obj, prop);
	};


/***/ },
/* 63 */
/***/ function(module, exports) {

	var objTypeof = "object";
	module.exports = function isObject(value) {
	    return value !== null && typeof value === objTypeof;
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var Disposable = Rx.Disposable;

	function ImmediateScheduler() {}

	ImmediateScheduler.prototype.schedule = function schedule(action) {
	    action();
	    return Disposable.empty;
	};

	ImmediateScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
	    action(this, state);
	    return Disposable.empty;
	};

	module.exports = ImmediateScheduler;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

	;(function (undefined) {

	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };

	  var root = (objectTypes[typeof window] && window) || this,
	    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
	    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
	    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
	    freeGlobal = objectTypes[typeof global] && global;

	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    root = freeGlobal;
	  }

	  var Rx = {
	      internals: {},
	      config: {
	        Promise: root.Promise
	      },
	      helpers: { }
	  };

	  // Defaults
	  var noop = Rx.helpers.noop = function () { },
	    notDefined = Rx.helpers.notDefined = function (x) { return typeof x === 'undefined'; },
	    identity = Rx.helpers.identity = function (x) { return x; },
	    pluck = Rx.helpers.pluck = function (property) { return function (x) { return x[property]; }; },
	    just = Rx.helpers.just = function (value) { return function () { return value; }; },
	    defaultNow = Rx.helpers.defaultNow = Date.now,
	    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },
	    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },
	    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },
	    defaultError = Rx.helpers.defaultError = function (err) { throw err; },
	    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function'; },
	    asArray = Rx.helpers.asArray = function () { return Array.prototype.slice.call(arguments); },
	    not = Rx.helpers.not = function (a) { return !a; },
	    isFunction = Rx.helpers.isFunction = (function () {

	      var isFn = function (value) {
	        return typeof value == 'function' || false;
	      }

	      // fallback for older versions of Chrome and Safari
	      if (isFn(/x/)) {
	        isFn = function(value) {
	          return typeof value == 'function' && toString.call(value) == '[object Function]';
	        };
	      }

	      return isFn;
	    }());

	  function cloneArray(arr) { for(var a = [], i = 0, len = arr.length; i < len; i++) { a.push(arr[i]); } return a;}

	  Rx.config.longStackSupport = false;
	  var hasStacks = false;
	  try {
	    throw new Error();
	  } catch (e) {
	    hasStacks = !!e.stack;
	  }

	  // All code after this point will be filtered from stack traces reported by RxJS
	  var rStartingLine = captureLine(), rFileName;

	  var STACK_JUMP_SEPARATOR = "From previous event:";

	  function makeStackTraceLong(error, observable) {
	      // If possible, transform the error stack trace by removing Node and RxJS
	      // cruft, then concatenating with the stack trace of `observable`.
	      if (hasStacks &&
	          observable.stack &&
	          typeof error === "object" &&
	          error !== null &&
	          error.stack &&
	          error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	      ) {
	        var stacks = [];
	        for (var o = observable; !!o; o = o.source) {
	          if (o.stack) {
	            stacks.unshift(o.stack);
	          }
	        }
	        stacks.unshift(error.stack);

	        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
	        error.stack = filterStackString(concatedStacks);
	    }
	  }

	  function filterStackString(stackString) {
	    var lines = stackString.split("\n"),
	        desiredLines = [];
	    for (var i = 0, len = lines.length; i < len; i++) {
	      var line = lines[i];

	      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	        desiredLines.push(line);
	      }
	    }
	    return desiredLines.join("\n");
	  }

	  function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
	    if (!fileNameAndLineNumber) {
	      return false;
	    }
	    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];

	    return fileName === rFileName &&
	      lineNumber >= rStartingLine &&
	      lineNumber <= rEndingLine;
	  }

	  function isNodeFrame(stackLine) {
	    return stackLine.indexOf("(module.js:") !== -1 ||
	      stackLine.indexOf("(node.js:") !== -1;
	  }

	  function captureLine() {
	    if (!hasStacks) { return; }

	    try {
	      throw new Error();
	    } catch (e) {
	      var lines = e.stack.split("\n");
	      var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
	      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	      if (!fileNameAndLineNumber) { return; }

	      rFileName = fileNameAndLineNumber[0];
	      return fileNameAndLineNumber[1];
	    }
	  }

	  function getFileNameAndLineNumber(stackLine) {
	    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) { return [attempt1[1], Number(attempt1[2])]; }

	    // Anonymous functions: "at filename:lineNumber:columnNumber"
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) { return [attempt2[1], Number(attempt2[2])]; }

	    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) { return [attempt3[1], Number(attempt3[2])]; }
	  }

	  var EmptyError = Rx.EmptyError = function() {
	    this.message = 'Sequence contains no elements.';
	    Error.call(this);
	  };
	  EmptyError.prototype = Error.prototype;

	  var ObjectDisposedError = Rx.ObjectDisposedError = function() {
	    this.message = 'Object has been disposed';
	    Error.call(this);
	  };
	  ObjectDisposedError.prototype = Error.prototype;

	  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
	    this.message = 'Argument out of range';
	    Error.call(this);
	  };
	  ArgumentOutOfRangeError.prototype = Error.prototype;

	  var NotSupportedError = Rx.NotSupportedError = function (message) {
	    this.message = message || 'This operation is not supported';
	    Error.call(this);
	  };
	  NotSupportedError.prototype = Error.prototype;

	  var NotImplementedError = Rx.NotImplementedError = function (message) {
	    this.message = message || 'This operation is not implemented';
	    Error.call(this);
	  };
	  NotImplementedError.prototype = Error.prototype;

	  var notImplemented = Rx.helpers.notImplemented = function () {
	    throw new NotImplementedError();
	  };

	  var notSupported = Rx.helpers.notSupported = function () {
	    throw new NotSupportedError();
	  };

	  // Shim in iterator support
	  var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) ||
	    '_es6shim_iterator_';
	  // Bug for mozilla version
	  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
	    $iterator$ = '@@iterator';
	  }

	  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };

	  var isIterable = Rx.helpers.isIterable = function (o) {
	    return o[$iterator$] !== undefined;
	  }

	  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
	    return o && o.length !== undefined;
	  }

	  Rx.helpers.iterator = $iterator$;

	  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
	    if (typeof thisArg === 'undefined') { return func; }
	    switch(argCount) {
	      case 0:
	        return function() {
	          return func.call(thisArg)
	        };
	      case 1:
	        return function(arg) {
	          return func.call(thisArg, arg);
	        }
	      case 2:
	        return function(value, index) {
	          return func.call(thisArg, value, index);
	        };
	      case 3:
	        return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	    }

	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  };

	  /** Used to determine if values are of the language type Object */
	  var dontEnums = ['toString',
	    'toLocaleString',
	    'valueOf',
	    'hasOwnProperty',
	    'isPrototypeOf',
	    'propertyIsEnumerable',
	    'constructor'],
	  dontEnumsLength = dontEnums.length;

	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	    arrayClass = '[object Array]',
	    boolClass = '[object Boolean]',
	    dateClass = '[object Date]',
	    errorClass = '[object Error]',
	    funcClass = '[object Function]',
	    numberClass = '[object Number]',
	    objectClass = '[object Object]',
	    regexpClass = '[object RegExp]',
	    stringClass = '[object String]';

	  var toString = Object.prototype.toString,
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    supportsArgsClass = toString.call(arguments) == argsClass, // For less <IE9 && FF<4
	    supportNodeClass,
	    errorProto = Error.prototype,
	    objectProto = Object.prototype,
	    stringProto = String.prototype,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	  try {
	    supportNodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
	  } catch (e) {
	    supportNodeClass = true;
	  }

	  var nonEnumProps = {};
	  nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	  nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
	  nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
	  nonEnumProps[objectClass] = { 'constructor': true };

	  var support = {};
	  (function () {
	    var ctor = function() { this.x = 1; },
	      props = [];

	    ctor.prototype = { 'valueOf': 1, 'y': 1 };
	    for (var key in new ctor) { props.push(key); }
	    for (key in arguments) { }

	    // Detect if `name` or `message` properties of `Error.prototype` are enumerable by default.
	    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

	    // Detect if `prototype` properties are enumerable by default.
	    support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

	    // Detect if `arguments` object indexes are non-enumerable
	    support.nonEnumArgs = key != 0;

	    // Detect if properties shadowing those on `Object.prototype` are non-enumerable.
	    support.nonEnumShadows = !/valueOf/.test(props);
	  }(1));

	  var isObject = Rx.internals.isObject = function(value) {
	    var type = typeof value;
	    return value && (type == 'function' || type == 'object') || false;
	  };

	  function keysIn(object) {
	    var result = [];
	    if (!isObject(object)) {
	      return result;
	    }
	    if (support.nonEnumArgs && object.length && isArguments(object)) {
	      object = slice.call(object);
	    }
	    var skipProto = support.enumPrototypes && typeof object == 'function',
	        skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error);

	    for (var key in object) {
	      if (!(skipProto && key == 'prototype') &&
	          !(skipErrorProps && (key == 'message' || key == 'name'))) {
	        result.push(key);
	      }
	    }

	    if (support.nonEnumShadows && object !== objectProto) {
	      var ctor = object.constructor,
	          index = -1,
	          length = dontEnumsLength;

	      if (object === (ctor && ctor.prototype)) {
	        var className = object === stringProto ? stringClass : object === errorProto ? errorClass : toString.call(object),
	            nonEnum = nonEnumProps[className];
	      }
	      while (++index < length) {
	        key = dontEnums[index];
	        if (!(nonEnum && nonEnum[key]) && hasOwnProperty.call(object, key)) {
	          result.push(key);
	        }
	      }
	    }
	    return result;
	  }

	  function internalFor(object, callback, keysFunc) {
	    var index = -1,
	      props = keysFunc(object),
	      length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      if (callback(object[key], key, object) === false) {
	        break;
	      }
	    }
	    return object;
	  }

	  function internalForIn(object, callback) {
	    return internalFor(object, callback, keysIn);
	  }

	  function isNode(value) {
	    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
	    // methods that are `typeof` "string" and still can coerce nodes to strings
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  }

	  var isArguments = function(value) {
	    return (value && typeof value == 'object') ? toString.call(value) == argsClass : false;
	  }

	  // fallback for browsers that can't detect `arguments` objects by [[Class]]
	  if (!supportsArgsClass) {
	    isArguments = function(value) {
	      return (value && typeof value == 'object') ? hasOwnProperty.call(value, 'callee') : false;
	    };
	  }

	  var isEqual = Rx.internals.isEqual = function (x, y) {
	    return deepEquals(x, y, [], []);
	  };

	  /** @private
	   * Used for deep comparison
	   **/
	  function deepEquals(a, b, stackA, stackB) {
	    // exit early for identical values
	    if (a === b) {
	      // treat `+0` vs. `-0` as not equal
	      return a !== 0 || (1 / a == 1 / b);
	    }

	    var type = typeof a,
	        otherType = typeof b;

	    // exit early for unlike primitive values
	    if (a === a && (a == null || b == null ||
	        (type != 'function' && type != 'object' && otherType != 'function' && otherType != 'object'))) {
	      return false;
	    }

	    // compare [[Class]] names
	    var className = toString.call(a),
	        otherClass = toString.call(b);

	    if (className == argsClass) {
	      className = objectClass;
	    }
	    if (otherClass == argsClass) {
	      otherClass = objectClass;
	    }
	    if (className != otherClass) {
	      return false;
	    }
	    switch (className) {
	      case boolClass:
	      case dateClass:
	        // coerce dates and booleans to numbers, dates to milliseconds and booleans
	        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
	        return +a == +b;

	      case numberClass:
	        // treat `NaN` vs. `NaN` as equal
	        return (a != +a) ?
	          b != +b :
	          // but treat `-0` vs. `+0` as not equal
	          (a == 0 ? (1 / a == 1 / b) : a == +b);

	      case regexpClass:
	      case stringClass:
	        // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
	        // treat string primitives and their corresponding object instances as equal
	        return a == String(b);
	    }
	    var isArr = className == arrayClass;
	    if (!isArr) {

	      // exit for functions and DOM nodes
	      if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
	        return false;
	      }
	      // in older versions of Opera, `arguments` objects have `Array` constructors
	      var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
	          ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

	      // non `Object` object instances with different constructors are not equal
	      if (ctorA != ctorB &&
	            !(hasOwnProperty.call(a, 'constructor') && hasOwnProperty.call(b, 'constructor')) &&
	            !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
	            ('constructor' in a && 'constructor' in b)
	          ) {
	        return false;
	      }
	    }
	    // assume cyclic structures are equal
	    // the algorithm for detecting cyclic structures is adapted from ES 5.1
	    // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
	    var initedStack = !stackA;
	    stackA || (stackA = []);
	    stackB || (stackB = []);

	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == a) {
	        return stackB[length] == b;
	      }
	    }
	    var size = 0;
	    var result = true;

	    // add `a` and `b` to the stack of traversed objects
	    stackA.push(a);
	    stackB.push(b);

	    // recursively compare objects and arrays (susceptible to call stack limits)
	    if (isArr) {
	      // compare lengths to determine if a deep comparison is necessary
	      length = a.length;
	      size = b.length;
	      result = size == length;

	      if (result) {
	        // deep compare the contents, ignoring non-numeric properties
	        while (size--) {
	          var index = length,
	              value = b[size];

	          if (!(result = deepEquals(a[size], value, stackA, stackB))) {
	            break;
	          }
	        }
	      }
	    }
	    else {
	      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	      // which, in this case, is more costly
	      internalForIn(b, function(value, key, b) {
	        if (hasOwnProperty.call(b, key)) {
	          // count the number of properties.
	          size++;
	          // deep compare each property value.
	          return (result = hasOwnProperty.call(a, key) && deepEquals(a[key], value, stackA, stackB));
	        }
	      });

	      if (result) {
	        // ensure both objects have the same number of properties
	        internalForIn(a, function(value, key, a) {
	          if (hasOwnProperty.call(a, key)) {
	            // `size` will be `-1` if `a` has more properties than `b`
	            return (result = --size > -1);
	          }
	        });
	      }
	    }
	    stackA.pop();
	    stackB.pop();

	    return result;
	  }

	  var hasProp = {}.hasOwnProperty,
	      slice = Array.prototype.slice;

	  var inherits = this.inherits = Rx.internals.inherits = function (child, parent) {
	    function __() { this.constructor = child; }
	    __.prototype = parent.prototype;
	    child.prototype = new __();
	  };

	  var addProperties = Rx.internals.addProperties = function (obj) {
	    for(var sources = [], i = 1, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
	    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
	      var source = sources[idx];
	      for (var prop in source) {
	        obj[prop] = source[prop];
	      }
	    }
	  };

	  // Rx Utils
	  var addRef = Rx.internals.addRef = function (xs, r) {
	    return new AnonymousObservable(function (observer) {
	      return new CompositeDisposable(r.getDisposable(), xs.subscribe(observer));
	    });
	  };

	  function arrayInitialize(count, factory) {
	    var a = new Array(count);
	    for (var i = 0; i < count; i++) {
	      a[i] = factory();
	    }
	    return a;
	  }

	  var errorObj = {e: {}};
	  var tryCatchTarget;
	  function tryCatcher() {
	    try {
	      return tryCatchTarget.apply(this, arguments);
	    } catch (e) {
	      errorObj.e = e;
	      return errorObj;
	    }
	  }
	  function tryCatch(fn) {
	    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
	    tryCatchTarget = fn;
	    return tryCatcher;
	  }
	  function thrower(e) {
	    throw e;
	  }

	  // Collections
	  function IndexedItem(id, value) {
	    this.id = id;
	    this.value = value;
	  }

	  IndexedItem.prototype.compareTo = function (other) {
	    var c = this.value.compareTo(other.value);
	    c === 0 && (c = this.id - other.id);
	    return c;
	  };

	  // Priority Queue for Scheduling
	  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
	    this.items = new Array(capacity);
	    this.length = 0;
	  };

	  var priorityProto = PriorityQueue.prototype;
	  priorityProto.isHigherPriority = function (left, right) {
	    return this.items[left].compareTo(this.items[right]) < 0;
	  };

	  priorityProto.percolate = function (index) {
	    if (index >= this.length || index < 0) { return; }
	    var parent = index - 1 >> 1;
	    if (parent < 0 || parent === index) { return; }
	    if (this.isHigherPriority(index, parent)) {
	      var temp = this.items[index];
	      this.items[index] = this.items[parent];
	      this.items[parent] = temp;
	      this.percolate(parent);
	    }
	  };

	  priorityProto.heapify = function (index) {
	    +index || (index = 0);
	    if (index >= this.length || index < 0) { return; }
	    var left = 2 * index + 1,
	        right = 2 * index + 2,
	        first = index;
	    if (left < this.length && this.isHigherPriority(left, first)) {
	      first = left;
	    }
	    if (right < this.length && this.isHigherPriority(right, first)) {
	      first = right;
	    }
	    if (first !== index) {
	      var temp = this.items[index];
	      this.items[index] = this.items[first];
	      this.items[first] = temp;
	      this.heapify(first);
	    }
	  };

	  priorityProto.peek = function () { return this.items[0].value; };

	  priorityProto.removeAt = function (index) {
	    this.items[index] = this.items[--this.length];
	    this.items[this.length] = undefined;
	    this.heapify();
	  };

	  priorityProto.dequeue = function () {
	    var result = this.peek();
	    this.removeAt(0);
	    return result;
	  };

	  priorityProto.enqueue = function (item) {
	    var index = this.length++;
	    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
	    this.percolate(index);
	  };

	  priorityProto.remove = function (item) {
	    for (var i = 0; i < this.length; i++) {
	      if (this.items[i].value === item) {
	        this.removeAt(i);
	        return true;
	      }
	    }
	    return false;
	  };
	  PriorityQueue.count = 0;

	  /**
	   * Represents a group of disposable resources that are disposed together.
	   * @constructor
	   */
	  var CompositeDisposable = Rx.CompositeDisposable = function () {
	    var args = [], i, len;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	      len = args.length;
	    } else {
	      len = arguments.length;
	      args = new Array(len);
	      for(i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    for(i = 0; i < len; i++) {
	      if (!isDisposable(args[i])) { throw new TypeError('Not a disposable'); }
	    }
	    this.disposables = args;
	    this.isDisposed = false;
	    this.length = args.length;
	  };

	  var CompositeDisposablePrototype = CompositeDisposable.prototype;

	  /**
	   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
	   * @param {Mixed} item Disposable to add.
	   */
	  CompositeDisposablePrototype.add = function (item) {
	    if (this.isDisposed) {
	      item.dispose();
	    } else {
	      this.disposables.push(item);
	      this.length++;
	    }
	  };

	  /**
	   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
	   * @param {Mixed} item Disposable to remove.
	   * @returns {Boolean} true if found; false otherwise.
	   */
	  CompositeDisposablePrototype.remove = function (item) {
	    var shouldDispose = false;
	    if (!this.isDisposed) {
	      var idx = this.disposables.indexOf(item);
	      if (idx !== -1) {
	        shouldDispose = true;
	        this.disposables.splice(idx, 1);
	        this.length--;
	        item.dispose();
	      }
	    }
	    return shouldDispose;
	  };

	  /**
	   *  Disposes all disposables in the group and removes them from the group.
	   */
	  CompositeDisposablePrototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var len = this.disposables.length, currentDisposables = new Array(len);
	      for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
	      this.disposables = [];
	      this.length = 0;

	      for (i = 0; i < len; i++) {
	        currentDisposables[i].dispose();
	      }
	    }
	  };

	  /**
	   * Provides a set of static methods for creating Disposables.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   */
	  var Disposable = Rx.Disposable = function (action) {
	    this.isDisposed = false;
	    this.action = action || noop;
	  };

	  /** Performs the task of cleaning up resources. */
	  Disposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.action();
	      this.isDisposed = true;
	    }
	  };

	  /**
	   * Creates a disposable object that invokes the specified action when disposed.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   * @return {Disposable} The disposable object that runs the given action upon disposal.
	   */
	  var disposableCreate = Disposable.create = function (action) { return new Disposable(action); };

	  /**
	   * Gets the disposable that does nothing when disposed.
	   */
	  var disposableEmpty = Disposable.empty = { dispose: noop };

	  /**
	   * Validates whether the given object is a disposable
	   * @param {Object} Object to test whether it has a dispose method
	   * @returns {Boolean} true if a disposable object, else false.
	   */
	  var isDisposable = Disposable.isDisposable = function (d) {
	    return d && isFunction(d.dispose);
	  };

	  var checkDisposed = Disposable.checkDisposed = function (disposable) {
	    if (disposable.isDisposed) { throw new ObjectDisposedError(); }
	  };

	  // Single assignment
	  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SingleAssignmentDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
	    if (this.current) { throw new Error('Disposable has already been assigned'); }
	    var shouldDispose = this.isDisposed;
	    !shouldDispose && (this.current = value);
	    shouldDispose && value && value.dispose();
	  };
	  SingleAssignmentDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	    }
	    old && old.dispose();
	  };

	  // Multiple assignment disposable
	  var SerialDisposable = Rx.SerialDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SerialDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SerialDisposable.prototype.setDisposable = function (value) {
	    var shouldDispose = this.isDisposed;
	    if (!shouldDispose) {
	      var old = this.current;
	      this.current = value;
	    }
	    old && old.dispose();
	    shouldDispose && value && value.dispose();
	  };
	  SerialDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	    }
	    old && old.dispose();
	  };

	  /**
	   * Represents a disposable resource that only disposes its underlying disposable resource when all dependent disposable objects have been disposed.
	   */
	  var RefCountDisposable = Rx.RefCountDisposable = (function () {

	    function InnerDisposable(disposable) {
	      this.disposable = disposable;
	      this.disposable.count++;
	      this.isInnerDisposed = false;
	    }

	    InnerDisposable.prototype.dispose = function () {
	      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
	        this.isInnerDisposed = true;
	        this.disposable.count--;
	        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
	          this.disposable.isDisposed = true;
	          this.disposable.underlyingDisposable.dispose();
	        }
	      }
	    };

	    /**
	     * Initializes a new instance of the RefCountDisposable with the specified disposable.
	     * @constructor
	     * @param {Disposable} disposable Underlying disposable.
	      */
	    function RefCountDisposable(disposable) {
	      this.underlyingDisposable = disposable;
	      this.isDisposed = false;
	      this.isPrimaryDisposed = false;
	      this.count = 0;
	    }

	    /**
	     * Disposes the underlying disposable only when all dependent disposables have been disposed
	     */
	    RefCountDisposable.prototype.dispose = function () {
	      if (!this.isDisposed && !this.isPrimaryDisposed) {
	        this.isPrimaryDisposed = true;
	        if (this.count === 0) {
	          this.isDisposed = true;
	          this.underlyingDisposable.dispose();
	        }
	      }
	    };

	    /**
	     * Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
	     * @returns {Disposable} A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.
	     */
	    RefCountDisposable.prototype.getDisposable = function () {
	      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
	    };

	    return RefCountDisposable;
	  })();

	  function ScheduledDisposable(scheduler, disposable) {
	    this.scheduler = scheduler;
	    this.disposable = disposable;
	    this.isDisposed = false;
	  }

	  function scheduleItem(s, self) {
	    if (!self.isDisposed) {
	      self.isDisposed = true;
	      self.disposable.dispose();
	    }
	  }

	  ScheduledDisposable.prototype.dispose = function () {
	    this.scheduler.scheduleWithState(this, scheduleItem);
	  };

	  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
	    this.scheduler = scheduler;
	    this.state = state;
	    this.action = action;
	    this.dueTime = dueTime;
	    this.comparer = comparer || defaultSubComparer;
	    this.disposable = new SingleAssignmentDisposable();
	  }

	  ScheduledItem.prototype.invoke = function () {
	    this.disposable.setDisposable(this.invokeCore());
	  };

	  ScheduledItem.prototype.compareTo = function (other) {
	    return this.comparer(this.dueTime, other.dueTime);
	  };

	  ScheduledItem.prototype.isCancelled = function () {
	    return this.disposable.isDisposed;
	  };

	  ScheduledItem.prototype.invokeCore = function () {
	    return this.action(this.scheduler, this.state);
	  };

	  /** Provides a set of static properties to access commonly used schedulers. */
	  var Scheduler = Rx.Scheduler = (function () {

	    function Scheduler(now, schedule, scheduleRelative, scheduleAbsolute) {
	      this.now = now;
	      this._schedule = schedule;
	      this._scheduleRelative = scheduleRelative;
	      this._scheduleAbsolute = scheduleAbsolute;
	    }

	    /** Determines whether the given object is a scheduler */
	    Scheduler.isScheduler = function (s) {
	      return s instanceof Scheduler;
	    }

	    function invokeAction(scheduler, action) {
	      action();
	      return disposableEmpty;
	    }

	    var schedulerProto = Scheduler.prototype;

	    /**
	     * Schedules an action to be executed.
	     * @param {Function} action Action to execute.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.schedule = function (action) {
	      return this._schedule(action, invokeAction);
	    };

	    /**
	     * Schedules an action to be executed.
	     * @param state State passed to the action to be executed.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithState = function (state, action) {
	      return this._schedule(state, action);
	    };

	    /**
	     * Schedules an action to be executed after the specified relative due time.
	     * @param {Function} action Action to execute.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithRelative = function (dueTime, action) {
	      return this._scheduleRelative(action, dueTime, invokeAction);
	    };

	    /**
	     * Schedules an action to be executed after dueTime.
	     * @param state State passed to the action to be executed.
	     * @param {Function} action Action to be executed.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithRelativeAndState = function (state, dueTime, action) {
	      return this._scheduleRelative(state, dueTime, action);
	    };

	    /**
	     * Schedules an action to be executed at the specified absolute due time.
	     * @param {Function} action Action to execute.
	     * @param {Number} dueTime Absolute time at which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	      */
	    schedulerProto.scheduleWithAbsolute = function (dueTime, action) {
	      return this._scheduleAbsolute(action, dueTime, invokeAction);
	    };

	    /**
	     * Schedules an action to be executed at dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to be executed.
	     * @param {Number}dueTime Absolute time at which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithAbsoluteAndState = function (state, dueTime, action) {
	      return this._scheduleAbsolute(state, dueTime, action);
	    };

	    /** Gets the current time according to the local machine's system clock. */
	    Scheduler.now = defaultNow;

	    /**
	     * Normalizes the specified TimeSpan value to a positive value.
	     * @param {Number} timeSpan The time span value to normalize.
	     * @returns {Number} The specified TimeSpan value if it is zero or positive; otherwise, 0
	     */
	    Scheduler.normalize = function (timeSpan) {
	      timeSpan < 0 && (timeSpan = 0);
	      return timeSpan;
	    };

	    return Scheduler;
	  }());

	  var normalizeTime = Scheduler.normalize, isScheduler = Scheduler.isScheduler;

	  (function (schedulerProto) {

	    function invokeRecImmediate(scheduler, pair) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();

	      function recursiveAction(state1) {
	        action(state1, function (state2) {
	          var isAdded = false, isDone = false,
	          d = scheduler.scheduleWithState(state2, function (scheduler1, state3) {
	            if (isAdded) {
	              group.remove(d);
	            } else {
	              isDone = true;
	            }
	            recursiveAction(state3);
	            return disposableEmpty;
	          });
	          if (!isDone) {
	            group.add(d);
	            isAdded = true;
	          }
	        });
	      }
	      recursiveAction(state);
	      return group;
	    }

	    function invokeRecDate(scheduler, pair, method) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();
	      function recursiveAction(state1) {
	        action(state1, function (state2, dueTime1) {
	          var isAdded = false, isDone = false,
	          d = scheduler[method](state2, dueTime1, function (scheduler1, state3) {
	            if (isAdded) {
	              group.remove(d);
	            } else {
	              isDone = true;
	            }
	            recursiveAction(state3);
	            return disposableEmpty;
	          });
	          if (!isDone) {
	            group.add(d);
	            isAdded = true;
	          }
	        });
	      };
	      recursiveAction(state);
	      return group;
	    }

	    function scheduleInnerRecursive(action, self) {
	      action(function(dt) { self(action, dt); });
	    }

	    /**
	     * Schedules an action to be executed recursively.
	     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursive = function (action) {
	      return this.scheduleRecursiveWithState(action, scheduleInnerRecursive);
	    };

	    /**
	     * Schedules an action to be executed recursively.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithState = function (state, action) {
	      return this.scheduleWithState([state, action], invokeRecImmediate);
	    };

	    /**
	     * Schedules an action to be executed recursively after a specified relative due time.
	     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified relative time.
	     * @param {Number}dueTime Relative time after which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithRelative = function (dueTime, action) {
	      return this.scheduleRecursiveWithRelativeAndState(action, dueTime, scheduleInnerRecursive);
	    };

	    /**
	     * Schedules an action to be executed recursively after a specified relative due time.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
	     * @param {Number}dueTime Relative time after which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithRelativeAndState = function (state, dueTime, action) {
	      return this._scheduleRelative([state, action], dueTime, function (s, p) {
	        return invokeRecDate(s, p, 'scheduleWithRelativeAndState');
	      });
	    };

	    /**
	     * Schedules an action to be executed recursively at a specified absolute due time.
	     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified absolute time.
	     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithAbsolute = function (dueTime, action) {
	      return this.scheduleRecursiveWithAbsoluteAndState(action, dueTime, scheduleInnerRecursive);
	    };

	    /**
	     * Schedules an action to be executed recursively at a specified absolute due time.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
	     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithAbsoluteAndState = function (state, dueTime, action) {
	      return this._scheduleAbsolute([state, action], dueTime, function (s, p) {
	        return invokeRecDate(s, p, 'scheduleWithAbsoluteAndState');
	      });
	    };
	  }(Scheduler.prototype));

	  (function (schedulerProto) {

	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    Scheduler.prototype.schedulePeriodic = function (period, action) {
	      return this.schedulePeriodicWithState(null, period, action);
	    };

	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
	     * @param {Mixed} state Initial state passed to the action upon the first iteration.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed, potentially updating the state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    Scheduler.prototype.schedulePeriodicWithState = function(state, period, action) {
	      if (typeof root.setInterval === 'undefined') { throw new NotSupportedError(); }
	      period = normalizeTime(period);
	      var s = state, id = root.setInterval(function () { s = action(s); }, period);
	      return disposableCreate(function () { root.clearInterval(id); });
	    };

	  }(Scheduler.prototype));

	  (function (schedulerProto) {
	    /**
	     * Returns a scheduler that wraps the original scheduler, adding exception handling for scheduled actions.
	     * @param {Function} handler Handler that's run if an exception is caught. The exception will be rethrown if the handler returns false.
	     * @returns {Scheduler} Wrapper around the original scheduler, enforcing exception handling.
	     */
	    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
	      return new CatchScheduler(this, handler);
	    };
	  }(Scheduler.prototype));

	  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function () {
	    function tick(command, recurse) {
	      recurse(0, this._period);
	      try {
	        this._state = this._action(this._state);
	      } catch (e) {
	        this._cancel.dispose();
	        throw e;
	      }
	    }

	    function SchedulePeriodicRecursive(scheduler, state, period, action) {
	      this._scheduler = scheduler;
	      this._state = state;
	      this._period = period;
	      this._action = action;
	    }

	    SchedulePeriodicRecursive.prototype.start = function () {
	      var d = new SingleAssignmentDisposable();
	      this._cancel = d;
	      d.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, tick.bind(this)));

	      return d;
	    };

	    return SchedulePeriodicRecursive;
	  }());

	  /** Gets a scheduler that schedules work immediately on the current thread. */
	  var immediateScheduler = Scheduler.immediate = (function () {
	    function scheduleNow(state, action) { return action(this, state); }
	    return new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
	  }());

	  /**
	   * Gets a scheduler that schedules work as soon as possible on the current thread.
	   */
	  var currentThreadScheduler = Scheduler.currentThread = (function () {
	    var queue;

	    function runTrampoline () {
	      while (queue.length > 0) {
	        var item = queue.dequeue();
	        !item.isCancelled() && item.invoke();
	      }
	    }

	    function scheduleNow(state, action) {
	      var si = new ScheduledItem(this, state, action, this.now());

	      if (!queue) {
	        queue = new PriorityQueue(4);
	        queue.enqueue(si);

	        var result = tryCatch(runTrampoline)();
	        queue = null;
	        if (result === errorObj) { return thrower(result.e); }
	      } else {
	        queue.enqueue(si);
	      }
	      return si.disposable;
	    }

	    var currentScheduler = new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
	    currentScheduler.scheduleRequired = function () { return !queue; };

	    return currentScheduler;
	  }());

	  var scheduleMethod, clearMethod;

	  var localTimer = (function () {
	    var localSetTimeout, localClearTimeout = noop;
	    if (!!root.setTimeout) {
	      localSetTimeout = root.setTimeout;
	      localClearTimeout = root.clearTimeout;
	    } else if (!!root.WScript) {
	      localSetTimeout = function (fn, time) {
	        root.WScript.Sleep(time);
	        fn();
	      };
	    } else {
	      throw new NotSupportedError();
	    }

	    return {
	      setTimeout: localSetTimeout,
	      clearTimeout: localClearTimeout
	    };
	  }());
	  var localSetTimeout = localTimer.setTimeout,
	    localClearTimeout = localTimer.clearTimeout;

	  (function () {

	    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false;

	    clearMethod = function (handle) {
	      delete tasksByHandle[handle];
	    };

	    function runTask(handle) {
	      if (currentlyRunning) {
	        localSetTimeout(function () { runTask(handle) }, 0);
	      } else {
	        var task = tasksByHandle[handle];
	        if (task) {
	          currentlyRunning = true;
	          var result = tryCatch(task)();
	          clearMethod(handle);
	          currentlyRunning = false;
	          if (result === errorObj) { return thrower(result.e); }
	        }
	      }
	    }

	    var reNative = RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );

	    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
	      !reNative.test(setImmediate) && setImmediate;

	    function postMessageSupported () {
	      // Ensure not in a worker
	      if (!root.postMessage || root.importScripts) { return false; }
	      var isAsync = false, oldHandler = root.onmessage;
	      // Test for async
	      root.onmessage = function () { isAsync = true; };
	      root.postMessage('', '*');
	      root.onmessage = oldHandler;

	      return isAsync;
	    }

	    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
	    if (isFunction(setImmediate)) {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        setImmediate(function () { runTask(id); });

	        return id;
	      };
	    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        process.nextTick(function () { runTask(id); });

	        return id;
	      };
	    } else if (postMessageSupported()) {
	      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();

	      function onGlobalPostMessage(event) {
	        // Only if we're a match to avoid any other global events
	        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
	          runTask(event.data.substring(MSG_PREFIX.length));
	        }
	      }

	      if (root.addEventListener) {
	        root.addEventListener('message', onGlobalPostMessage, false);
	      } else if (root.attachEvent) {
	        root.attachEvent('onmessage', onGlobalPostMessage);
	      } else {
	        root.onmessage = onGlobalPostMessage;
	      }

	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        root.postMessage(MSG_PREFIX + currentId, '*');
	        return id;
	      };
	    } else if (!!root.MessageChannel) {
	      var channel = new root.MessageChannel();

	      channel.port1.onmessage = function (e) { runTask(e.data); };

	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        channel.port2.postMessage(id);
	        return id;
	      };
	    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {

	      scheduleMethod = function (action) {
	        var scriptElement = root.document.createElement('script');
	        var id = nextHandle++;
	        tasksByHandle[id] = action;

	        scriptElement.onreadystatechange = function () {
	          runTask(id);
	          scriptElement.onreadystatechange = null;
	          scriptElement.parentNode.removeChild(scriptElement);
	          scriptElement = null;
	        };
	        root.document.documentElement.appendChild(scriptElement);
	        return id;
	      };

	    } else {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        localSetTimeout(function () {
	          runTask(id);
	        }, 0);

	        return id;
	      };
	    }
	  }());

	  /**
	   * Gets a scheduler that schedules work via a timed callback based upon platform.
	   */
	  var timeoutScheduler = Scheduler.timeout = Scheduler['default'] = (function () {

	    function scheduleNow(state, action) {
	      var scheduler = this, disposable = new SingleAssignmentDisposable();
	      var id = scheduleMethod(function () {
	        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
	      });
	      return new CompositeDisposable(disposable, disposableCreate(function () {
	        clearMethod(id);
	      }));
	    }

	    function scheduleRelative(state, dueTime, action) {
	      var scheduler = this, dt = Scheduler.normalize(dueTime), disposable = new SingleAssignmentDisposable();
	      if (dt === 0) { return scheduler.scheduleWithState(state, action); }
	      var id = localSetTimeout(function () {
	        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
	      }, dt);
	      return new CompositeDisposable(disposable, disposableCreate(function () {
	        localClearTimeout(id);
	      }));
	    }

	    function scheduleAbsolute(state, dueTime, action) {
	      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
	    }

	    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);
	  })();

	  var CatchScheduler = (function (__super__) {

	    function scheduleNow(state, action) {
	      return this._scheduler.scheduleWithState(state, this._wrap(action));
	    }

	    function scheduleRelative(state, dueTime, action) {
	      return this._scheduler.scheduleWithRelativeAndState(state, dueTime, this._wrap(action));
	    }

	    function scheduleAbsolute(state, dueTime, action) {
	      return this._scheduler.scheduleWithAbsoluteAndState(state, dueTime, this._wrap(action));
	    }

	    inherits(CatchScheduler, __super__);

	    function CatchScheduler(scheduler, handler) {
	      this._scheduler = scheduler;
	      this._handler = handler;
	      this._recursiveOriginal = null;
	      this._recursiveWrapper = null;
	      __super__.call(this, this._scheduler.now.bind(this._scheduler), scheduleNow, scheduleRelative, scheduleAbsolute);
	    }

	    CatchScheduler.prototype._clone = function (scheduler) {
	        return new CatchScheduler(scheduler, this._handler);
	    };

	    CatchScheduler.prototype._wrap = function (action) {
	      var parent = this;
	      return function (self, state) {
	        try {
	          return action(parent._getRecursiveWrapper(self), state);
	        } catch (e) {
	          if (!parent._handler(e)) { throw e; }
	          return disposableEmpty;
	        }
	      };
	    };

	    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
	      if (this._recursiveOriginal !== scheduler) {
	        this._recursiveOriginal = scheduler;
	        var wrapper = this._clone(scheduler);
	        wrapper._recursiveOriginal = scheduler;
	        wrapper._recursiveWrapper = wrapper;
	        this._recursiveWrapper = wrapper;
	      }
	      return this._recursiveWrapper;
	    };

	    CatchScheduler.prototype.schedulePeriodicWithState = function (state, period, action) {
	      var self = this, failed = false, d = new SingleAssignmentDisposable();

	      d.setDisposable(this._scheduler.schedulePeriodicWithState(state, period, function (state1) {
	        if (failed) { return null; }
	        try {
	          return action(state1);
	        } catch (e) {
	          failed = true;
	          if (!self._handler(e)) { throw e; }
	          d.dispose();
	          return null;
	        }
	      }));

	      return d;
	    };

	    return CatchScheduler;
	  }(Scheduler));

	  /**
	   *  Represents a notification to an observer.
	   */
	  var Notification = Rx.Notification = (function () {
	    function Notification(kind, value, exception, accept, acceptObservable, toString) {
	      this.kind = kind;
	      this.value = value;
	      this.exception = exception;
	      this._accept = accept;
	      this._acceptObservable = acceptObservable;
	      this.toString = toString;
	    }

	    /**
	     * Invokes the delegate corresponding to the notification or the observer's method corresponding to the notification and returns the produced result.
	     *
	     * @memberOf Notification
	     * @param {Any} observerOrOnNext Delegate to invoke for an OnNext notification or Observer to invoke the notification on..
	     * @param {Function} onError Delegate to invoke for an OnError notification.
	     * @param {Function} onCompleted Delegate to invoke for an OnCompleted notification.
	     * @returns {Any} Result produced by the observation.
	     */
	    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
	      return observerOrOnNext && typeof observerOrOnNext === 'object' ?
	        this._acceptObservable(observerOrOnNext) :
	        this._accept(observerOrOnNext, onError, onCompleted);
	    };

	    /**
	     * Returns an observable sequence with a single notification.
	     *
	     * @memberOf Notifications
	     * @param {Scheduler} [scheduler] Scheduler to send out the notification calls on.
	     * @returns {Observable} The observable sequence that surfaces the behavior of the notification upon subscription.
	     */
	    Notification.prototype.toObservable = function (scheduler) {
	      var self = this;
	      isScheduler(scheduler) || (scheduler = immediateScheduler);
	      return new AnonymousObservable(function (observer) {
	        return scheduler.scheduleWithState(self, function (_, notification) {
	          notification._acceptObservable(observer);
	          notification.kind === 'N' && observer.onCompleted();
	        });
	      });
	    };

	    return Notification;
	  })();

	  /**
	   * Creates an object that represents an OnNext notification to an observer.
	   * @param {Any} value The value contained in the notification.
	   * @returns {Notification} The OnNext notification containing the value.
	   */
	  var notificationCreateOnNext = Notification.createOnNext = (function () {
	      function _accept(onNext) { return onNext(this.value); }
	      function _acceptObservable(observer) { return observer.onNext(this.value); }
	      function toString() { return 'OnNext(' + this.value + ')'; }

	      return function (value) {
	        return new Notification('N', value, null, _accept, _acceptObservable, toString);
	      };
	  }());

	  /**
	   * Creates an object that represents an OnError notification to an observer.
	   * @param {Any} error The exception contained in the notification.
	   * @returns {Notification} The OnError notification containing the exception.
	   */
	  var notificationCreateOnError = Notification.createOnError = (function () {
	    function _accept (onNext, onError) { return onError(this.exception); }
	    function _acceptObservable(observer) { return observer.onError(this.exception); }
	    function toString () { return 'OnError(' + this.exception + ')'; }

	    return function (e) {
	      return new Notification('E', null, e, _accept, _acceptObservable, toString);
	    };
	  }());

	  /**
	   * Creates an object that represents an OnCompleted notification to an observer.
	   * @returns {Notification} The OnCompleted notification.
	   */
	  var notificationCreateOnCompleted = Notification.createOnCompleted = (function () {
	    function _accept (onNext, onError, onCompleted) { return onCompleted(); }
	    function _acceptObservable(observer) { return observer.onCompleted(); }
	    function toString () { return 'OnCompleted()'; }

	    return function () {
	      return new Notification('C', null, null, _accept, _acceptObservable, toString);
	    };
	  }());

	  /**
	   * Supports push-style iteration over an observable sequence.
	   */
	  var Observer = Rx.Observer = function () { };

	  /**
	   *  Creates a notification callback from an observer.
	   * @returns The action that forwards its input notification to the underlying observer.
	   */
	  Observer.prototype.toNotifier = function () {
	    var observer = this;
	    return function (n) { return n.accept(observer); };
	  };

	  /**
	   *  Hides the identity of an observer.
	   * @returns An observer that hides the identity of the specified observer.
	   */
	  Observer.prototype.asObserver = function () {
	    return new AnonymousObserver(this.onNext.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
	  };

	  /**
	   *  Checks access to the observer for grammar violations. This includes checking for multiple OnError or OnCompleted calls, as well as reentrancy in any of the observer methods.
	   *  If a violation is detected, an Error is thrown from the offending observer method call.
	   * @returns An observer that checks callbacks invocations against the observer grammar and, if the checks pass, forwards those to the specified observer.
	   */
	  Observer.prototype.checked = function () { return new CheckedObserver(this); };

	  /**
	   *  Creates an observer from the specified OnNext, along with optional OnError, and OnCompleted actions.
	   * @param {Function} [onNext] Observer's OnNext action implementation.
	   * @param {Function} [onError] Observer's OnError action implementation.
	   * @param {Function} [onCompleted] Observer's OnCompleted action implementation.
	   * @returns {Observer} The observer object implemented using the given actions.
	   */
	  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
	    onNext || (onNext = noop);
	    onError || (onError = defaultError);
	    onCompleted || (onCompleted = noop);
	    return new AnonymousObserver(onNext, onError, onCompleted);
	  };

	  /**
	   *  Creates an observer from a notification callback.
	   *
	   * @static
	   * @memberOf Observer
	   * @param {Function} handler Action that handles a notification.
	   * @returns The observer object that invokes the specified handler using a notification corresponding to each message it receives.
	   */
	  Observer.fromNotifier = function (handler, thisArg) {
	    return new AnonymousObserver(function (x) {
	      return handler.call(thisArg, notificationCreateOnNext(x));
	    }, function (e) {
	      return handler.call(thisArg, notificationCreateOnError(e));
	    }, function () {
	      return handler.call(thisArg, notificationCreateOnCompleted());
	    });
	  };

	  /**
	   * Schedules the invocation of observer methods on the given scheduler.
	   * @param {Scheduler} scheduler Scheduler to schedule observer messages on.
	   * @returns {Observer} Observer whose messages are scheduled on the given scheduler.
	   */
	  Observer.prototype.notifyOn = function (scheduler) {
	    return new ObserveOnObserver(scheduler, this);
	  };

	  Observer.prototype.makeSafe = function(disposable) {
	    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
	  };

	  /**
	   * Abstract base class for implementations of the Observer class.
	   * This base class enforces the grammar of observers where OnError and OnCompleted are terminal messages.
	   */
	  var AbstractObserver = Rx.internals.AbstractObserver = (function (__super__) {
	    inherits(AbstractObserver, __super__);

	    /**
	     * Creates a new observer in a non-stopped state.
	     */
	    function AbstractObserver() {
	      this.isStopped = false;
	      __super__.call(this);
	    }

	    // Must be implemented by other observers
	    AbstractObserver.prototype.next = notImplemented;
	    AbstractObserver.prototype.error = notImplemented;
	    AbstractObserver.prototype.completed = notImplemented;

	    /**
	     * Notifies the observer of a new element in the sequence.
	     * @param {Any} value Next element in the sequence.
	     */
	    AbstractObserver.prototype.onNext = function (value) {
	      if (!this.isStopped) { this.next(value); }
	    };

	    /**
	     * Notifies the observer that an exception has occurred.
	     * @param {Any} error The error that has occurred.
	     */
	    AbstractObserver.prototype.onError = function (error) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(error);
	      }
	    };

	    /**
	     * Notifies the observer of the end of the sequence.
	     */
	    AbstractObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.completed();
	      }
	    };

	    /**
	     * Disposes the observer, causing it to transition to the stopped state.
	     */
	    AbstractObserver.prototype.dispose = function () {
	      this.isStopped = true;
	    };

	    AbstractObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(e);
	        return true;
	      }

	      return false;
	    };

	    return AbstractObserver;
	  }(Observer));

	  /**
	   * Class to create an Observer instance from delegate-based implementations of the on* methods.
	   */
	  var AnonymousObserver = Rx.AnonymousObserver = (function (__super__) {
	    inherits(AnonymousObserver, __super__);

	    /**
	     * Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
	     * @param {Any} onNext Observer's OnNext action implementation.
	     * @param {Any} onError Observer's OnError action implementation.
	     * @param {Any} onCompleted Observer's OnCompleted action implementation.
	     */
	    function AnonymousObserver(onNext, onError, onCompleted) {
	      __super__.call(this);
	      this._onNext = onNext;
	      this._onError = onError;
	      this._onCompleted = onCompleted;
	    }

	    /**
	     * Calls the onNext action.
	     * @param {Any} value Next element in the sequence.
	     */
	    AnonymousObserver.prototype.next = function (value) {
	      this._onNext(value);
	    };

	    /**
	     * Calls the onError action.
	     * @param {Any} error The error that has occurred.
	     */
	    AnonymousObserver.prototype.error = function (error) {
	      this._onError(error);
	    };

	    /**
	     *  Calls the onCompleted action.
	     */
	    AnonymousObserver.prototype.completed = function () {
	      this._onCompleted();
	    };

	    return AnonymousObserver;
	  }(AbstractObserver));

	  var CheckedObserver = (function (__super__) {
	    inherits(CheckedObserver, __super__);

	    function CheckedObserver(observer) {
	      __super__.call(this);
	      this._observer = observer;
	      this._state = 0; // 0 - idle, 1 - busy, 2 - done
	    }

	    var CheckedObserverPrototype = CheckedObserver.prototype;

	    CheckedObserverPrototype.onNext = function (value) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onNext).call(this._observer, value);
	      this._state = 0;
	      res === errorObj && thrower(res.e);
	    };

	    CheckedObserverPrototype.onError = function (err) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onError).call(this._observer, err);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };

	    CheckedObserverPrototype.onCompleted = function () {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onCompleted).call(this._observer);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };

	    CheckedObserverPrototype.checkAccess = function () {
	      if (this._state === 1) { throw new Error('Re-entrancy detected'); }
	      if (this._state === 2) { throw new Error('Observer completed'); }
	      if (this._state === 0) { this._state = 1; }
	    };

	    return CheckedObserver;
	  }(Observer));

	  var ScheduledObserver = Rx.internals.ScheduledObserver = (function (__super__) {
	    inherits(ScheduledObserver, __super__);

	    function ScheduledObserver(scheduler, observer) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.observer = observer;
	      this.isAcquired = false;
	      this.hasFaulted = false;
	      this.queue = [];
	      this.disposable = new SerialDisposable();
	    }

	    ScheduledObserver.prototype.next = function (value) {
	      var self = this;
	      this.queue.push(function () { self.observer.onNext(value); });
	    };

	    ScheduledObserver.prototype.error = function (e) {
	      var self = this;
	      this.queue.push(function () { self.observer.onError(e); });
	    };

	    ScheduledObserver.prototype.completed = function () {
	      var self = this;
	      this.queue.push(function () { self.observer.onCompleted(); });
	    };

	    ScheduledObserver.prototype.ensureActive = function () {
	      var isOwner = false, parent = this;
	      if (!this.hasFaulted && this.queue.length > 0) {
	        isOwner = !this.isAcquired;
	        this.isAcquired = true;
	      }
	      if (isOwner) {
	        this.disposable.setDisposable(this.scheduler.scheduleRecursive(function (self) {
	          var work;
	          if (parent.queue.length > 0) {
	            work = parent.queue.shift();
	          } else {
	            parent.isAcquired = false;
	            return;
	          }
	          try {
	            work();
	          } catch (ex) {
	            parent.queue = [];
	            parent.hasFaulted = true;
	            throw ex;
	          }
	          self();
	        }));
	      }
	    };

	    ScheduledObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.disposable.dispose();
	    };

	    return ScheduledObserver;
	  }(AbstractObserver));

	  var ObserveOnObserver = (function (__super__) {
	    inherits(ObserveOnObserver, __super__);

	    function ObserveOnObserver(scheduler, observer, cancel) {
	      __super__.call(this, scheduler, observer);
	      this._cancel = cancel;
	    }

	    ObserveOnObserver.prototype.next = function (value) {
	      __super__.prototype.next.call(this, value);
	      this.ensureActive();
	    };

	    ObserveOnObserver.prototype.error = function (e) {
	      __super__.prototype.error.call(this, e);
	      this.ensureActive();
	    };

	    ObserveOnObserver.prototype.completed = function () {
	      __super__.prototype.completed.call(this);
	      this.ensureActive();
	    };

	    ObserveOnObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this._cancel && this._cancel.dispose();
	      this._cancel = null;
	    };

	    return ObserveOnObserver;
	  })(ScheduledObserver);

	  var observableProto;

	  /**
	   * Represents a push-style collection.
	   */
	  var Observable = Rx.Observable = (function () {

	    function Observable(subscribe) {
	      if (Rx.config.longStackSupport && hasStacks) {
	        try {
	          throw new Error();
	        } catch (e) {
	          this.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
	        }

	        var self = this;
	        this._subscribe = function (observer) {
	          var oldOnError = observer.onError.bind(observer);

	          observer.onError = function (err) {
	            makeStackTraceLong(err, self);
	            oldOnError(err);
	          };

	          return subscribe.call(self, observer);
	        };
	      } else {
	        this._subscribe = subscribe;
	      }
	    }

	    observableProto = Observable.prototype;

	    /**
	     *  Subscribes an observer to the observable sequence.
	     *  @param {Mixed} [observerOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
	     *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
	     *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
	     *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribe = observableProto.forEach = function (observerOrOnNext, onError, onCompleted) {
	      return this._subscribe(typeof observerOrOnNext === 'object' ?
	        observerOrOnNext :
	        observerCreate(observerOrOnNext, onError, onCompleted));
	    };

	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onNext The function to invoke on each element in the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnNext = function (onNext, thisArg) {
	      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));
	    };

	    /**
	     * Subscribes to an exceptional condition in the sequence with an optional "this" argument.
	     * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnError = function (onError, thisArg) {
	      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));
	    };

	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
	      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));
	    };

	    return Observable;
	  })();

	  var ObservableBase = Rx.ObservableBase = (function (__super__) {
	    inherits(ObservableBase, __super__);

	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }

	    function setDisposable(s, state) {
	      var ado = state[0], self = state[1];
	      var sub = tryCatch(self.subscribeCore).call(self, ado);

	      if (sub === errorObj) {
	        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
	      }
	      ado.setDisposable(fixSubscriber(sub));
	    }

	    function subscribe(observer) {
	      var ado = new AutoDetachObserver(observer), state = [ado, this];

	      if (currentThreadScheduler.scheduleRequired()) {
	        currentThreadScheduler.scheduleWithState(state, setDisposable);
	      } else {
	        setDisposable(null, state);
	      }
	      return ado;
	    }

	    function ObservableBase() {
	      __super__.call(this, subscribe);
	    }

	    ObservableBase.prototype.subscribeCore = notImplemented;

	    return ObservableBase;
	  }(Observable));

	  var Enumerable = Rx.internals.Enumerable = function () { };

	  var ConcatEnumerableObservable = (function(__super__) {
	    inherits(ConcatEnumerableObservable, __super__);
	    function ConcatEnumerableObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }
	    
	    ConcatEnumerableObservable.prototype.subscribeCore = function (o) {
	      var isDisposed, subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursiveWithState(this.sources[$iterator$](), function (e, self) {
	        if (isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }

	        if (currentItem.done) {
	          return o.onCompleted();
	        }

	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(currentValue.subscribe(new InnerObserver(o, self, e)));
	      });

	      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    };
	    
	    function InnerObserver(o, s, e) {
	      this.o = o;
	      this.s = s;
	      this.e = e;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.o.onNext(x); } };
	    InnerObserver.prototype.onError = function (err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.s(this.e);
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	        return true;
	      }
	      return false;
	    };
	    
	    return ConcatEnumerableObservable;
	  }(ObservableBase));

	  Enumerable.prototype.concat = function () {
	    return new ConcatEnumerableObservable(this);
	  };
	  
	  var CatchErrorObservable = (function(__super__) {
	    inherits(CatchErrorObservable, __super__);
	    function CatchErrorObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }
	    
	    CatchErrorObservable.prototype.subscribeCore = function (o) {
	      var e = this.sources[$iterator$]();

	      var isDisposed, subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursiveWithState(null, function (lastException, self) {
	        if (isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }

	        if (currentItem.done) {
	          return lastException !== null ? o.onError(lastException) : o.onCompleted();
	        }

	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(currentValue.subscribe(
	          function(x) { o.onNext(x); },
	          self,
	          function() { o.onCompleted(); }));
	      });
	      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    };
	    
	    return CatchErrorObservable;
	  }(ObservableBase));

	  Enumerable.prototype.catchError = function () {
	    return new CatchErrorObservable(this);
	  };

	  Enumerable.prototype.catchErrorWhen = function (notificationHandler) {
	    var sources = this;
	    return new AnonymousObservable(function (o) {
	      var exceptions = new Subject(),
	        notifier = new Subject(),
	        handled = notificationHandler(exceptions),
	        notificationDisposable = handled.subscribe(notifier);

	      var e = sources[$iterator$]();

	      var isDisposed,
	        lastException,
	        subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursive(function (self) {
	        if (isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }

	        if (currentItem.done) {
	          if (lastException) {
	            o.onError(lastException);
	          } else {
	            o.onCompleted();
	          }
	          return;
	        }

	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	        var outer = new SingleAssignmentDisposable();
	        var inner = new SingleAssignmentDisposable();
	        subscription.setDisposable(new CompositeDisposable(inner, outer));
	        outer.setDisposable(currentValue.subscribe(
	          function(x) { o.onNext(x); },
	          function (exn) {
	            inner.setDisposable(notifier.subscribe(self, function(ex) {
	              o.onError(ex);
	            }, function() {
	              o.onCompleted();
	            }));

	            exceptions.onNext(exn);
	          },
	          function() { o.onCompleted(); }));
	      });

	      return new CompositeDisposable(notificationDisposable, subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    });
	  };
	  
	  var RepeatEnumerable = (function (__super__) {
	    inherits(RepeatEnumerable, __super__);
	    
	    function RepeatEnumerable(v, c) {
	      this.v = v;
	      this.c = c == null ? -1 : c;
	    }
	    RepeatEnumerable.prototype[$iterator$] = function () {
	      return new RepeatEnumerator(this); 
	    };
	    
	    function RepeatEnumerator(p) {
	      this.v = p.v;
	      this.l = p.c;
	    }
	    RepeatEnumerator.prototype.next = function () {
	      if (this.l === 0) { return doneEnumerator; }
	      if (this.l > 0) { this.l--; }
	      return { done: false, value: this.v }; 
	    };
	    
	    return RepeatEnumerable;
	  }(Enumerable));

	  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
	    return new RepeatEnumerable(value, repeatCount);
	  };
	  
	  var OfEnumerable = (function(__super__) {
	    inherits(OfEnumerable, __super__);
	    function OfEnumerable(s, fn, thisArg) {
	      this.s = s;
	      this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
	    }
	    OfEnumerable.prototype[$iterator$] = function () {
	      return new OfEnumerator(this);
	    };
	    
	    function OfEnumerator(p) {
	      this.i = -1;
	      this.s = p.s;
	      this.l = this.s.length;
	      this.fn = p.fn;
	    }
	    OfEnumerator.prototype.next = function () {
	     return ++this.i < this.l ?
	       { done: false, value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s) } :
	       doneEnumerator; 
	    };
	    
	    return OfEnumerable;
	  }(Enumerable));

	  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
	    return new OfEnumerable(source, selector, thisArg);
	  };

	   /**
	   *  Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
	   *
	   *  This only invokes observer callbacks on a scheduler. In case the subscription and/or unsubscription actions have side-effects
	   *  that require to be run on a scheduler, use subscribeOn.
	   *
	   *  @param {Scheduler} scheduler Scheduler to notify observers on.
	   *  @returns {Observable} The source sequence whose observations happen on the specified scheduler.
	   */
	  observableProto.observeOn = function (scheduler) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      return source.subscribe(new ObserveOnObserver(scheduler, observer));
	    }, source);
	  };

	   /**
	   *  Wraps the source sequence in order to run its subscription and unsubscription logic on the specified scheduler. This operation is not commonly used;
	   *  see the remarks section for more information on the distinction between subscribeOn and observeOn.

	   *  This only performs the side-effects of subscription and unsubscription on the specified scheduler. In order to invoke observer
	   *  callbacks on a scheduler, use observeOn.

	   *  @param {Scheduler} scheduler Scheduler to perform subscription and unsubscription actions on.
	   *  @returns {Observable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
	   */
	  observableProto.subscribeOn = function (scheduler) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var m = new SingleAssignmentDisposable(), d = new SerialDisposable();
	      d.setDisposable(m);
	      m.setDisposable(scheduler.schedule(function () {
	        d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(observer)));
	      }));
	      return d;
	    }, source);
	  };

		var FromPromiseObservable = (function(__super__) {
			inherits(FromPromiseObservable, __super__);
			function FromPromiseObservable(p) {
				this.p = p;
				__super__.call(this);
			}
			
			FromPromiseObservable.prototype.subscribeCore = function(o) {
				this.p.then(function (data) {
					o.onNext(data);
					o.onCompleted();
				}, function (err) { o.onError(err); });
				return disposableEmpty;	
			};
			
			return FromPromiseObservable;
		}(ObservableBase));	 
		 
		 /**
		 * Converts a Promise to an Observable sequence
		 * @param {Promise} An ES6 Compliant promise.
		 * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
		 */
		var observableFromPromise = Observable.fromPromise = function (promise) {
			return new FromPromiseObservable(promise);
		};
	  /*
	   * Converts an existing observable sequence to an ES6 Compatible Promise
	   * @example
	   * var promise = Rx.Observable.return(42).toPromise(RSVP.Promise);
	   *
	   * // With config
	   * Rx.config.Promise = RSVP.Promise;
	   * var promise = Rx.Observable.return(42).toPromise();
	   * @param {Function} [promiseCtor] The constructor of the promise. If not provided, it looks for it in Rx.config.Promise.
	   * @returns {Promise} An ES6 compatible promise with the last value from the observable sequence.
	   */
	  observableProto.toPromise = function (promiseCtor) {
	    promiseCtor || (promiseCtor = Rx.config.Promise);
	    if (!promiseCtor) { throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise'); }
	    var source = this;
	    return new promiseCtor(function (resolve, reject) {
	      // No cancellation can be done
	      var value, hasValue = false;
	      source.subscribe(function (v) {
	        value = v;
	        hasValue = true;
	      }, reject, function () {
	        hasValue && resolve(value);
	      });
	    });
	  };

	  var ToArrayObservable = (function(__super__) {
	    inherits(ToArrayObservable, __super__);
	    function ToArrayObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    ToArrayObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };

	    function InnerObserver(o) {
	      this.o = o;
	      this.a = [];
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.a.push(x); } };
	    InnerObserver.prototype.onError = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onNext(this.a);
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	 
	      return false;
	    };

	    return ToArrayObservable;
	  }(ObservableBase));

	  /**
	  * Creates an array from an observable sequence.
	  * @returns {Observable} An observable sequence containing a single element with a list containing all the elements of the source sequence.
	  */
	  observableProto.toArray = function () {
	    return new ToArrayObservable(this);
	  };

	  /**
	   *  Creates an observable sequence from a specified subscribe method implementation.
	   * @example
	   *  var res = Rx.Observable.create(function (observer) { return function () { } );
	   *  var res = Rx.Observable.create(function (observer) { return Rx.Disposable.empty; } );
	   *  var res = Rx.Observable.create(function (observer) { } );
	   * @param {Function} subscribe Implementation of the resulting observable sequence's subscribe method, returning a function that will be wrapped in a Disposable.
	   * @returns {Observable} The observable sequence with the specified implementation for the Subscribe method.
	   */
	  Observable.create = Observable.createWithDisposable = function (subscribe, parent) {
	    return new AnonymousObservable(subscribe, parent);
	  };

	  /**
	   *  Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.
	   *
	   * @example
	   *  var res = Rx.Observable.defer(function () { return Rx.Observable.fromArray([1,2,3]); });
	   * @param {Function} observableFactory Observable factory function to invoke for each observer that subscribes to the resulting sequence or Promise.
	   * @returns {Observable} An observable sequence whose observers trigger an invocation of the given observable factory function.
	   */
	  var observableDefer = Observable.defer = function (observableFactory) {
	    return new AnonymousObservable(function (observer) {
	      var result;
	      try {
	        result = observableFactory();
	      } catch (e) {
	        return observableThrow(e).subscribe(observer);
	      }
	      isPromise(result) && (result = observableFromPromise(result));
	      return result.subscribe(observer);
	    });
	  };

	  var EmptyObservable = (function(__super__) {
	    inherits(EmptyObservable, __super__);
	    function EmptyObservable(scheduler) {
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    EmptyObservable.prototype.subscribeCore = function (observer) {
	      var sink = new EmptySink(observer, this);
	      return sink.run();
	    };

	    function EmptySink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }

	    function scheduleItem(s, state) {
	      state.onCompleted();
	    }

	    EmptySink.prototype.run = function () {
	      return this.parent.scheduler.scheduleWithState(this.observer, scheduleItem);
	    };

	    return EmptyObservable;
	  }(ObservableBase));

	  /**
	   *  Returns an empty observable sequence, using the specified scheduler to send out the single OnCompleted message.
	   *
	   * @example
	   *  var res = Rx.Observable.empty();
	   *  var res = Rx.Observable.empty(Rx.Scheduler.timeout);
	   * @param {Scheduler} [scheduler] Scheduler to send the termination call on.
	   * @returns {Observable} An observable sequence with no elements.
	   */
	  var observableEmpty = Observable.empty = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new EmptyObservable(scheduler);
	  };

	  var FromObservable = (function(__super__) {
	    inherits(FromObservable, __super__);
	    function FromObservable(iterable, mapper, scheduler) {
	      this.iterable = iterable;
	      this.mapper = mapper;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    FromObservable.prototype.subscribeCore = function (observer) {
	      var sink = new FromSink(observer, this);
	      return sink.run();
	    };

	    return FromObservable;
	  }(ObservableBase));

	  var FromSink = (function () {
	    function FromSink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }

	    FromSink.prototype.run = function () {
	      var list = Object(this.parent.iterable),
	          it = getIterable(list),
	          observer = this.observer,
	          mapper = this.parent.mapper;

	      function loopRecursive(i, recurse) {
	        try {
	          var next = it.next();
	        } catch (e) {
	          return observer.onError(e);
	        }
	        if (next.done) {
	          return observer.onCompleted();
	        }

	        var result = next.value;

	        if (mapper) {
	          try {
	            result = mapper(result, i);
	          } catch (e) {
	            return observer.onError(e);
	          }
	        }

	        observer.onNext(result);
	        recurse(i + 1);
	      }

	      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	    };

	    return FromSink;
	  }());

	  var maxSafeInteger = Math.pow(2, 53) - 1;

	  function StringIterable(str) {
	    this._s = s;
	  }

	  StringIterable.prototype[$iterator$] = function () {
	    return new StringIterator(this._s);
	  };

	  function StringIterator(str) {
	    this._s = s;
	    this._l = s.length;
	    this._i = 0;
	  }

	  StringIterator.prototype[$iterator$] = function () {
	    return this;
	  };

	  StringIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
	  };

	  function ArrayIterable(a) {
	    this._a = a;
	  }

	  ArrayIterable.prototype[$iterator$] = function () {
	    return new ArrayIterator(this._a);
	  };

	  function ArrayIterator(a) {
	    this._a = a;
	    this._l = toLength(a);
	    this._i = 0;
	  }

	  ArrayIterator.prototype[$iterator$] = function () {
	    return this;
	  };

	  ArrayIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
	  };

	  function numberIsFinite(value) {
	    return typeof value === 'number' && root.isFinite(value);
	  }

	  function isNan(n) {
	    return n !== n;
	  }

	  function getIterable(o) {
	    var i = o[$iterator$], it;
	    if (!i && typeof o === 'string') {
	      it = new StringIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i && o.length !== undefined) {
	      it = new ArrayIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i) { throw new TypeError('Object is not iterable'); }
	    return o[$iterator$]();
	  }

	  function sign(value) {
	    var number = +value;
	    if (number === 0) { return number; }
	    if (isNaN(number)) { return number; }
	    return number < 0 ? -1 : 1;
	  }

	  function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) { return 0; }
	    if (len === 0 || !numberIsFinite(len)) { return len; }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) { return 0; }
	    if (len > maxSafeInteger) { return maxSafeInteger; }
	    return len;
	  }

	  /**
	  * This method creates a new Observable sequence from an array-like or iterable object.
	  * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
	  * @param {Function} [mapFn] Map function to call on every element of the array.
	  * @param {Any} [thisArg] The context to use calling the mapFn if provided.
	  * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
	  */
	  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
	    if (iterable == null) {
	      throw new Error('iterable cannot be null.')
	    }
	    if (mapFn && !isFunction(mapFn)) {
	      throw new Error('mapFn when provided must be a function');
	    }
	    if (mapFn) {
	      var mapper = bindCallback(mapFn, thisArg, 2);
	    }
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromObservable(iterable, mapper, scheduler);
	  }

	  var FromArrayObservable = (function(__super__) {
	    inherits(FromArrayObservable, __super__);
	    function FromArrayObservable(args, scheduler) {
	      this.args = args;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    FromArrayObservable.prototype.subscribeCore = function (observer) {
	      var sink = new FromArraySink(observer, this);
	      return sink.run();
	    };

	    return FromArrayObservable;
	  }(ObservableBase));

	  function FromArraySink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }

	  FromArraySink.prototype.run = function () {
	    var observer = this.observer, args = this.parent.args, len = args.length;
	    function loopRecursive(i, recurse) {
	      if (i < len) {
	        observer.onNext(args[i]);
	        recurse(i + 1);
	      } else {
	        observer.onCompleted();
	      }
	    }

	    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	  };

	  /**
	  *  Converts an array to an observable sequence, using an optional scheduler to enumerate the array.
	  * @deprecated use Observable.from or Observable.of
	  * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given enumerable sequence.
	  */
	  var observableFromArray = Observable.fromArray = function (array, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler)
	  };

	  /**
	   *  Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
	   *
	   * @example
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; });
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; }, Rx.Scheduler.timeout);
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Scheduler} [scheduler] Scheduler on which to run the generator loop. If not provided, defaults to Scheduler.currentThread.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new AnonymousObservable(function (o) {
	      var first = true;
	      return scheduler.scheduleRecursiveWithState(initialState, function (state, self) {
	        var hasResult, result;
	        try {
	          if (first) {
	            first = false;
	          } else {
	            state = iterate(state);
	          }
	          hasResult = condition(state);
	          hasResult && (result = resultSelector(state));
	        } catch (e) {
	          return o.onError(e);
	        }
	        if (hasResult) {
	          o.onNext(result);
	          self(state);
	        } else {
	          o.onCompleted();
	        }
	      });
	    });
	  };

	  var NeverObservable = (function(__super__) {
	    inherits(NeverObservable, __super__);
	    function NeverObservable() {
	      __super__.call(this);
	    }

	    NeverObservable.prototype.subscribeCore = function (observer) {
	      return disposableEmpty;
	    };

	    return NeverObservable;
	  }(ObservableBase));

	  /**
	   * Returns a non-terminating observable sequence, which can be used to denote an infinite duration (e.g. when using reactive joins).
	   * @returns {Observable} An observable sequence whose observers will never get called.
	   */
	  var observableNever = Observable.never = function () {
	    return new NeverObservable();
	  };

	  function observableOf (scheduler, array) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler);
	  }

	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.of = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return new FromArrayObservable(args, currentThreadScheduler);
	  };

	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @param {Scheduler} scheduler A scheduler to use for scheduling the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.ofWithScheduler = function (scheduler) {
	    var len = arguments.length, args = new Array(len - 1);
	    for(var i = 1; i < len; i++) { args[i - 1] = arguments[i]; }
	    return new FromArrayObservable(args, scheduler);
	  };

	  var PairsObservable = (function(__super__) {
	    inherits(PairsObservable, __super__);
	    function PairsObservable(obj, scheduler) {
	      this.obj = obj;
	      this.keys = Object.keys(obj);
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    PairsObservable.prototype.subscribeCore = function (observer) {
	      var sink = new PairsSink(observer, this);
	      return sink.run();
	    };

	    return PairsObservable;
	  }(ObservableBase));

	  function PairsSink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }

	  PairsSink.prototype.run = function () {
	    var observer = this.observer, obj = this.parent.obj, keys = this.parent.keys, len = keys.length;
	    function loopRecursive(i, recurse) {
	      if (i < len) {
	        var key = keys[i];
	        observer.onNext([key, obj[key]]);
	        recurse(i + 1);
	      } else {
	        observer.onCompleted();
	      }
	    }

	    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	  };

	  /**
	   * Convert an object into an observable sequence of [key, value] pairs.
	   * @param {Object} obj The object to inspect.
	   * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	   * @returns {Observable} An observable sequence of [key, value] pairs from the object.
	   */
	  Observable.pairs = function (obj, scheduler) {
	    scheduler || (scheduler = currentThreadScheduler);
	    return new PairsObservable(obj, scheduler);
	  };

	    var RangeObservable = (function(__super__) {
	    inherits(RangeObservable, __super__);
	    function RangeObservable(start, count, scheduler) {
	      this.start = start;
	      this.rangeCount = count;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    RangeObservable.prototype.subscribeCore = function (observer) {
	      var sink = new RangeSink(observer, this);
	      return sink.run();
	    };

	    return RangeObservable;
	  }(ObservableBase));

	  var RangeSink = (function () {
	    function RangeSink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }

	    RangeSink.prototype.run = function () {
	      var start = this.parent.start, count = this.parent.rangeCount, observer = this.observer;
	      function loopRecursive(i, recurse) {
	        if (i < count) {
	          observer.onNext(start + i);
	          recurse(i + 1);
	        } else {
	          observer.onCompleted();
	        }
	      }

	      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	    };

	    return RangeSink;
	  }());

	  /**
	  *  Generates an observable sequence of integral numbers within a specified range, using the specified scheduler to send out observer messages.
	  * @param {Number} start The value of the first integer in the sequence.
	  * @param {Number} count The number of sequential integers to generate.
	  * @param {Scheduler} [scheduler] Scheduler to run the generator loop on. If not specified, defaults to Scheduler.currentThread.
	  * @returns {Observable} An observable sequence that contains a range of sequential integral numbers.
	  */
	  Observable.range = function (start, count, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RangeObservable(start, count, scheduler);
	  };

	  var RepeatObservable = (function(__super__) {
	    inherits(RepeatObservable, __super__);
	    function RepeatObservable(value, repeatCount, scheduler) {
	      this.value = value;
	      this.repeatCount = repeatCount == null ? -1 : repeatCount;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    RepeatObservable.prototype.subscribeCore = function (observer) {
	      var sink = new RepeatSink(observer, this);
	      return sink.run();
	    };

	    return RepeatObservable;
	  }(ObservableBase));

	  function RepeatSink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }

	  RepeatSink.prototype.run = function () {
	    var observer = this.observer, value = this.parent.value;
	    function loopRecursive(i, recurse) {
	      if (i === -1 || i > 0) {
	        observer.onNext(value);
	        i > 0 && i--;
	      }
	      if (i === 0) { return observer.onCompleted(); }
	      recurse(i);
	    }

	    return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount, loopRecursive);
	  };

	  /**
	   *  Generates an observable sequence that repeats the given element the specified number of times, using the specified scheduler to send out observer messages.
	   * @param {Mixed} value Element to repeat.
	   * @param {Number} repeatCount [Optiona] Number of times to repeat the element. If not specified, repeats indefinitely.
	   * @param {Scheduler} scheduler Scheduler to run the producer loop on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence that repeats the given element the specified number of times.
	   */
	  Observable.repeat = function (value, repeatCount, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RepeatObservable(value, repeatCount, scheduler);
	  };

	  var JustObservable = (function(__super__) {
	    inherits(JustObservable, __super__);
	    function JustObservable(value, scheduler) {
	      this.value = value;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    JustObservable.prototype.subscribeCore = function (observer) {
	      var sink = new JustSink(observer, this);
	      return sink.run();
	    };

	    function JustSink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }

	    function scheduleItem(s, state) {
	      var value = state[0], observer = state[1];
	      observer.onNext(value);
	      observer.onCompleted();
	    }

	    JustSink.prototype.run = function () {
	      return this.parent.scheduler.scheduleWithState([this.parent.value, this.observer], scheduleItem);
	    };

	    return JustObservable;
	  }(ObservableBase));

	  /**
	   *  Returns an observable sequence that contains a single element, using the specified scheduler to send out observer messages.
	   *  There is an alias called 'just' or browsers <IE9.
	   * @param {Mixed} value Single element in the resulting observable sequence.
	   * @param {Scheduler} scheduler Scheduler to send the single element on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence containing the single specified element.
	   */
	  var observableReturn = Observable['return'] = Observable.just = Observable.returnValue = function (value, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new JustObservable(value, scheduler);
	  };

	  var ThrowObservable = (function(__super__) {
	    inherits(ThrowObservable, __super__);
	    function ThrowObservable(error, scheduler) {
	      this.error = error;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    ThrowObservable.prototype.subscribeCore = function (o) {
	      var sink = new ThrowSink(o, this);
	      return sink.run();
	    };

	    function ThrowSink(o, p) {
	      this.o = o;
	      this.p = p;
	    }

	    function scheduleItem(s, state) {
	      var e = state[0], o = state[1];
	      o.onError(e);
	    }

	    ThrowSink.prototype.run = function () {
	      return this.p.scheduler.scheduleWithState([this.p.error, this.o], scheduleItem);
	    };

	    return ThrowObservable;
	  }(ObservableBase));

	  /**
	   *  Returns an observable sequence that terminates with an exception, using the specified scheduler to send out the single onError message.
	   *  There is an alias to this method called 'throwError' for browsers <IE9.
	   * @param {Mixed} error An object used for the sequence's termination.
	   * @param {Scheduler} scheduler Scheduler to send the exceptional termination call on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} The observable sequence that terminates exceptionally with the specified exception object.
	   */
	  var observableThrow = Observable['throw'] = Observable.throwError = Observable.throwException = function (error, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new ThrowObservable(error, scheduler);
	  };

	  /**
	   * Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
	   * @param {Function} resourceFactory Factory function to obtain a resource object.
	   * @param {Function} observableFactory Factory function to obtain an observable sequence that depends on the obtained resource.
	   * @returns {Observable} An observable sequence whose lifetime controls the lifetime of the dependent resource object.
	   */
	  Observable.using = function (resourceFactory, observableFactory) {
	    return new AnonymousObservable(function (observer) {
	      var disposable = disposableEmpty, resource, source;
	      try {
	        resource = resourceFactory();
	        resource && (disposable = resource);
	        source = observableFactory(resource);
	      } catch (exception) {
	        return new CompositeDisposable(observableThrow(exception).subscribe(observer), disposable);
	      }
	      return new CompositeDisposable(source.subscribe(observer), disposable);
	    });
	  };

	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   * @param {Observable} rightSource Second observable sequence or Promise.
	   * @returns {Observable} {Observable} An observable sequence that surfaces either of the given sequences, whichever reacted first.
	   */
	  observableProto.amb = function (rightSource) {
	    var leftSource = this;
	    return new AnonymousObservable(function (observer) {
	      var choice,
	        leftChoice = 'L', rightChoice = 'R',
	        leftSubscription = new SingleAssignmentDisposable(),
	        rightSubscription = new SingleAssignmentDisposable();

	      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));

	      function choiceL() {
	        if (!choice) {
	          choice = leftChoice;
	          rightSubscription.dispose();
	        }
	      }

	      function choiceR() {
	        if (!choice) {
	          choice = rightChoice;
	          leftSubscription.dispose();
	        }
	      }

	      leftSubscription.setDisposable(leftSource.subscribe(function (left) {
	        choiceL();
	        choice === leftChoice && observer.onNext(left);
	      }, function (err) {
	        choiceL();
	        choice === leftChoice && observer.onError(err);
	      }, function () {
	        choiceL();
	        choice === leftChoice && observer.onCompleted();
	      }));

	      rightSubscription.setDisposable(rightSource.subscribe(function (right) {
	        choiceR();
	        choice === rightChoice && observer.onNext(right);
	      }, function (err) {
	        choiceR();
	        choice === rightChoice && observer.onError(err);
	      }, function () {
	        choiceR();
	        choice === rightChoice && observer.onCompleted();
	      }));

	      return new CompositeDisposable(leftSubscription, rightSubscription);
	    });
	  };

	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   *
	   * @example
	   * var = Rx.Observable.amb(xs, ys, zs);
	   * @returns {Observable} An observable sequence that surfaces any of the given sequences, whichever reacted first.
	   */
	  Observable.amb = function () {
	    var acc = observableNever(), items = [];
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
	    }

	    function func(previous, current) {
	      return previous.amb(current);
	    }
	    for (var i = 0, len = items.length; i < len; i++) {
	      acc = func(acc, items[i]);
	    }
	    return acc;
	  };

	  function observableCatchHandler(source, handler) {
	    return new AnonymousObservable(function (o) {
	      var d1 = new SingleAssignmentDisposable(), subscription = new SerialDisposable();
	      subscription.setDisposable(d1);
	      d1.setDisposable(source.subscribe(function (x) { o.onNext(x); }, function (e) {
	        try {
	          var result = handler(e);
	        } catch (ex) {
	          return o.onError(ex);
	        }
	        isPromise(result) && (result = observableFromPromise(result));

	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(result.subscribe(o));
	      }, function (x) { o.onCompleted(x); }));

	      return subscription;
	    }, source);
	  }

	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @example
	   * 1 - xs.catchException(ys)
	   * 2 - xs.catchException(function (ex) { return ys(ex); })
	   * @param {Mixed} handlerOrSecond Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.
	   * @returns {Observable} An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.
	   */
	  observableProto['catch'] = observableProto.catchError = observableProto.catchException = function (handlerOrSecond) {
	    return typeof handlerOrSecond === 'function' ?
	      observableCatchHandler(this, handlerOrSecond) :
	      observableCatch([this, handlerOrSecond]);
	  };

	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @param {Array | Arguments} args Arguments or an array to use as the next sequence if an error occurs.
	   * @returns {Observable} An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
	   */
	  var observableCatch = Observable.catchError = Observable['catch'] = Observable.catchException = function () {
	    var items = [];
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
	    }
	    return enumerableOf(items).catchError();
	  };

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	   * This can be in the form of an argument list of observables or an array.
	   *
	   * @example
	   * 1 - obs = observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	   * 2 - obs = observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args[0].unshift(this);
	    } else {
	      args.unshift(this);
	    }
	    return combineLatest.apply(this, args);
	  };

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	   *
	   * @example
	   * 1 - obs = Rx.Observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	   * 2 - obs = Rx.Observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  var combineLatest = Observable.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = args.pop();
	    Array.isArray(args[0]) && (args = args[0]);

	    return new AnonymousObservable(function (o) {
	      var n = args.length,
	        falseFactory = function () { return false; },
	        hasValue = arrayInitialize(n, falseFactory),
	        hasValueAll = false,
	        isDone = arrayInitialize(n, falseFactory),
	        values = new Array(n);

	      function next(i) {
	        hasValue[i] = true;
	        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
	          try {
	            var res = resultSelector.apply(null, values);
	          } catch (e) {
	            return o.onError(e);
	          }
	          o.onNext(res);
	        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	          o.onCompleted();
	        }
	      }

	      function done (i) {
	        isDone[i] = true;
	        isDone.every(identity) && o.onCompleted();
	      }

	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          var source = args[i], sad = new SingleAssignmentDisposable();
	          isPromise(source) && (source = observableFromPromise(source));
	          sad.setDisposable(source.subscribe(function (x) {
	              values[i] = x;
	              next(i);
	            },
	            function(e) { o.onError(e); },
	            function () { done(i); }
	          ));
	          subscriptions[i] = sad;
	        }(idx));
	      }

	      return new CompositeDisposable(subscriptions);
	    }, this);
	  };

	  /**
	   * Concatenates all the observable sequences.  This takes in either an array or variable arguments to concatenate.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  observableProto.concat = function () {
	    for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    args.unshift(this);
	    return observableConcat.apply(null, args);
	  };

		var ConcatObservable = (function(__super__) {
			inherits(ConcatObservable, __super__);
			function ConcatObservable(sources) {
				this.sources = sources;
				__super__.call(this);
			}
			
			ConcatObservable.prototype.subscribeCore = function(o) {
	      var sink = new ConcatSink(this.sources, o);
	      return sink.run();
			};
	    
	    function ConcatSink(sources, o) {
	      this.sources = sources;
	      this.o = o;
	    }
	    ConcatSink.prototype.run = function () {
	      var isDisposed, subscription = new SerialDisposable(), sources = this.sources, length = sources.length, o = this.o;
	      var cancelable = immediateScheduler.scheduleRecursiveWithState(0, function (i, self) {
	        if (isDisposed) { return; }
	        if (i === length) {
						return o.onCompleted();
					}
		
	        // Check if promise
	        var currentValue = sources[i];
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(currentValue.subscribe(
	          function (x) { o.onNext(x); },
	          function (e) { o.onError(e); },
	          function () { self(i + 1); }
	        ));
	      });

	      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    };
	    
			
			return ConcatObservable;
		}(ObservableBase));
	  
	  /**
	   * Concatenates all the observable sequences.
	   * @param {Array | Arguments} args Arguments or an array to concat to the observable sequence.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  var observableConcat = Observable.concat = function () {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      args = new Array(arguments.length);
	      for(var i = 0, len = arguments.length; i < len; i++) { args[i] = arguments[i]; }
	    }
	    return new ConcatObservable(args);
	  };

	  /**
	   * Concatenates an observable sequence of observable sequences.
	   * @returns {Observable} An observable sequence that contains the elements of each observed inner sequence, in sequential order.
	   */
	  observableProto.concatAll = observableProto.concatObservable = function () {
	    return this.merge(1);
	  };

	  var MergeObservable = (function (__super__) {
	    inherits(MergeObservable, __super__);

	    function MergeObservable(source, maxConcurrent) {
	      this.source = source;
	      this.maxConcurrent = maxConcurrent;
	      __super__.call(this);
	    }

	    MergeObservable.prototype.subscribeCore = function(observer) {
	      var g = new CompositeDisposable();
	      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
	      return g;
	    };

	    return MergeObservable;

	  }(ObservableBase));

	  var MergeObserver = (function () {
	    function MergeObserver(o, max, g) {
	      this.o = o;
	      this.max = max;
	      this.g = g;
	      this.done = false;
	      this.q = [];
	      this.activeCount = 0;
	      this.isStopped = false;
	    }
	    MergeObserver.prototype.handleSubscribe = function (xs) {
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);
	      isPromise(xs) && (xs = observableFromPromise(xs));
	      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
	    };
	    MergeObserver.prototype.onNext = function (innerSource) {
	      if (this.isStopped) { return; }
	        if(this.activeCount < this.max) {
	          this.activeCount++;
	          this.handleSubscribe(innerSource);
	        } else {
	          this.q.push(innerSource);
	        }
	      };
	      MergeObserver.prototype.onError = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.o.onError(e);
	        }
	      };
	      MergeObserver.prototype.onCompleted = function () {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.done = true;
	          this.activeCount === 0 && this.o.onCompleted();
	        }
	      };
	      MergeObserver.prototype.dispose = function() { this.isStopped = true; };
	      MergeObserver.prototype.fail = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.o.onError(e);
	          return true;
	        }

	        return false;
	      };

	      function InnerObserver(parent, sad) {
	        this.parent = parent;
	        this.sad = sad;
	        this.isStopped = false;
	      }
	      InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.parent.o.onNext(x); } };
	      InnerObserver.prototype.onError = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.parent.o.onError(e);
	        }
	      };
	      InnerObserver.prototype.onCompleted = function () {
	        if(!this.isStopped) {
	          this.isStopped = true;
	          var parent = this.parent;
	          parent.g.remove(this.sad);
	          if (parent.q.length > 0) {
	            parent.handleSubscribe(parent.q.shift());
	          } else {
	            parent.activeCount--;
	            parent.done && parent.activeCount === 0 && parent.o.onCompleted();
	          }
	        }
	      };
	      InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	      InnerObserver.prototype.fail = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.parent.o.onError(e);
	          return true;
	        }

	        return false;
	      };

	      return MergeObserver;
	  }());





	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
	  * Or merges two observable sequences into a single observable sequence.
	  *
	  * @example
	  * 1 - merged = sources.merge(1);
	  * 2 - merged = source.merge(otherSource);
	  * @param {Mixed} [maxConcurrentOrOther] Maximum number of inner observable sequences being subscribed to concurrently or the second observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.merge = function (maxConcurrentOrOther) {
	    return typeof maxConcurrentOrOther !== 'number' ?
	      observableMerge(this, maxConcurrentOrOther) :
	      new MergeObservable(this, maxConcurrentOrOther);
	  };

	  /**
	   * Merges all the observable sequences into a single observable sequence.
	   * The scheduler is optional and if not specified, the immediate scheduler is used.
	   * @returns {Observable} The observable sequence that merges the elements of the observable sequences.
	   */
	  var observableMerge = Observable.merge = function () {
	    var scheduler, sources = [], i, len = arguments.length;
	    if (!arguments[0]) {
	      scheduler = immediateScheduler;
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else if (isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else {
	      scheduler = immediateScheduler;
	      for(i = 0; i < len; i++) { sources.push(arguments[i]); }
	    }
	    if (Array.isArray(sources[0])) {
	      sources = sources[0];
	    }
	    return observableOf(scheduler, sources).mergeAll();
	  };

	  var CompositeError = Rx.CompositeError = function(errors) {
	    this.name = "NotImplementedError";
	    this.innerErrors = errors;
	    this.message = 'This contains multiple errors. Check the innerErrors';
	    Error.call(this);
	  }
	  CompositeError.prototype = Error.prototype;

	  /**
	  * Flattens an Observable that emits Observables into one Observable, in a way that allows an Observer to
	  * receive all successfully emitted items from all of the source Observables without being interrupted by
	  * an error notification from one of them.
	  *
	  * This behaves like Observable.prototype.mergeAll except that if any of the merged Observables notify of an
	  * error via the Observer's onError, mergeDelayError will refrain from propagating that
	  * error notification until all of the merged Observables have finished emitting items.
	  * @param {Array | Arguments} args Arguments or an array to merge.
	  * @returns {Observable} an Observable that emits all of the items emitted by the Observables emitted by the Observable
	  */
	  Observable.mergeDelayError = function() {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      var len = arguments.length;
	      args = new Array(len);
	      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    var source = observableOf(null, args);

	    return new AnonymousObservable(function (o) {
	      var group = new CompositeDisposable(),
	        m = new SingleAssignmentDisposable(),
	        isStopped = false,
	        errors = [];

	      function setCompletion() {
	        if (errors.length === 0) {
	          o.onCompleted();
	        } else if (errors.length === 1) {
	          o.onError(errors[0]);
	        } else {
	          o.onError(new CompositeError(errors));
	        }
	      }

	      group.add(m);

	      m.setDisposable(source.subscribe(
	        function (innerSource) {
	          var innerSubscription = new SingleAssignmentDisposable();
	          group.add(innerSubscription);

	          // Check for promises support
	          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

	          innerSubscription.setDisposable(innerSource.subscribe(
	            function (x) { o.onNext(x); },
	            function (e) {
	              errors.push(e);
	              group.remove(innerSubscription);
	              isStopped && group.length === 1 && setCompletion();
	            },
	            function () {
	              group.remove(innerSubscription);
	              isStopped && group.length === 1 && setCompletion();
	          }));
	        },
	        function (e) {
	          errors.push(e);
	          isStopped = true;
	          group.length === 1 && setCompletion();
	        },
	        function () {
	          isStopped = true;
	          group.length === 1 && setCompletion();
	        }));
	      return group;
	    });
	  };

	  var MergeAllObservable = (function (__super__) {
	    inherits(MergeAllObservable, __super__);

	    function MergeAllObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    MergeAllObservable.prototype.subscribeCore = function (observer) {
	      var g = new CompositeDisposable(), m = new SingleAssignmentDisposable();
	      g.add(m);
	      m.setDisposable(this.source.subscribe(new MergeAllObserver(observer, g)));
	      return g;
	    };
	    
	    function MergeAllObserver(o, g) {
	      this.o = o;
	      this.g = g;
	      this.isStopped = false;
	      this.done = false;
	    }
	    MergeAllObserver.prototype.onNext = function(innerSource) {
	      if(this.isStopped) { return; }
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);

	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

	      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, this.g, sad)));
	    };
	    MergeAllObserver.prototype.onError = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	      }
	    };
	    MergeAllObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.done = true;
	        this.g.length === 1 && this.o.onCompleted();
	      }
	    };
	    MergeAllObserver.prototype.dispose = function() { this.isStopped = true; };
	    MergeAllObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }

	      return false;
	    };

	    function InnerObserver(parent, g, sad) {
	      this.parent = parent;
	      this.g = g;
	      this.sad = sad;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) { if (!this.isStopped) { this.parent.o.onNext(x); } };
	    InnerObserver.prototype.onError = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.parent.o.onError(e);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        var parent = this.parent;
	        this.isStopped = true;
	        parent.g.remove(this.sad);
	        parent.done && parent.g.length === 1 && parent.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.parent.o.onError(e);
	        return true;
	      }

	      return false;
	    };

	    return MergeAllObservable;
	  }(ObservableBase));

	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.mergeAll = observableProto.mergeObservable = function () {
	    return new MergeAllObservable(this);
	  };

	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   * @param {Observable} second Second observable sequence used to produce results after the first sequence terminates.
	   * @returns {Observable} An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.
	   */
	  observableProto.onErrorResumeNext = function (second) {
	    if (!second) { throw new Error('Second observable is required'); }
	    return onErrorResumeNext([this, second]);
	  };

	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   *
	   * @example
	   * 1 - res = Rx.Observable.onErrorResumeNext(xs, ys, zs);
	   * 1 - res = Rx.Observable.onErrorResumeNext([xs, ys, zs]);
	   * @returns {Observable} An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
	   */
	  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
	    var sources = [];
	    if (Array.isArray(arguments[0])) {
	      sources = arguments[0];
	    } else {
	      for(var i = 0, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
	    }
	    return new AnonymousObservable(function (observer) {
	      var pos = 0, subscription = new SerialDisposable(),
	      cancelable = immediateScheduler.scheduleRecursive(function (self) {
	        var current, d;
	        if (pos < sources.length) {
	          current = sources[pos++];
	          isPromise(current) && (current = observableFromPromise(current));
	          d = new SingleAssignmentDisposable();
	          subscription.setDisposable(d);
	          d.setDisposable(current.subscribe(observer.onNext.bind(observer), self, self));
	        } else {
	          observer.onCompleted();
	        }
	      });
	      return new CompositeDisposable(subscription, cancelable);
	    });
	  };

	  /**
	   * Returns the values from the source observable sequence only after the other observable sequence produces a value.
	   * @param {Observable | Promise} other The observable sequence or Promise that triggers propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.
	   */
	  observableProto.skipUntil = function (other) {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var isOpen = false;
	      var disposables = new CompositeDisposable(source.subscribe(function (left) {
	        isOpen && o.onNext(left);
	      }, function (e) { o.onError(e); }, function () {
	        isOpen && o.onCompleted();
	      }));

	      isPromise(other) && (other = observableFromPromise(other));

	      var rightSubscription = new SingleAssignmentDisposable();
	      disposables.add(rightSubscription);
	      rightSubscription.setDisposable(other.subscribe(function () {
	        isOpen = true;
	        rightSubscription.dispose();
	      }, function (e) { o.onError(e); }, function () {
	        rightSubscription.dispose();
	      }));

	      return disposables;
	    }, source);
	  };

	  var SwitchObservable = (function(__super__) {
	    inherits(SwitchObservable, __super__);
	    function SwitchObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    SwitchObservable.prototype.subscribeCore = function (o) {
	      var inner = new SerialDisposable(), s = this.source.subscribe(new SwitchObserver(o, inner));
	      return new CompositeDisposable(s, inner);
	    };

	    function SwitchObserver(o, inner) {
	      this.o = o;
	      this.inner = inner;
	      this.stopped = false;
	      this.latest = 0;
	      this.hasLatest = false;
	      this.isStopped = false;
	    }
	    SwitchObserver.prototype.onNext = function (innerSource) {
	      if (this.isStopped) { return; }
	      var d = new SingleAssignmentDisposable(), id = ++this.latest;
	      this.hasLatest = true;
	      this.inner.setDisposable(d);
	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	      d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
	    };
	    SwitchObserver.prototype.onError = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	      }
	    };
	    SwitchObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.stopped = true;
	        !this.hasLatest && this.o.onCompleted();
	      }
	    };
	    SwitchObserver.prototype.dispose = function () { this.isStopped = true; };
	    SwitchObserver.prototype.fail = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };

	    function InnerObserver(parent, id) {
	      this.parent = parent;
	      this.id = id;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      this.parent.latest === this.id && this.parent.o.onNext(x);
	    };
	    InnerObserver.prototype.onError = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.parent.latest === this.id && this.parent.o.onError(e);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        if (this.parent.latest === this.id) {
	          this.parent.hasLatest = false;
	          this.parent.isStopped && this.parent.o.onCompleted();
	        }
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
	    InnerObserver.prototype.fail = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.parent.o.onError(e);
	        return true;
	      }
	      return false;
	    };

	    return SwitchObservable;
	  }(ObservableBase));

	  /**
	  * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
	  * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
	  */
	  observableProto['switch'] = observableProto.switchLatest = function () {
	    return new SwitchObservable(this);
	  };

	  var TakeUntilObservable = (function(__super__) {
	    inherits(TakeUntilObservable, __super__);

	    function TakeUntilObservable(source, other) {
	      this.source = source;
	      this.other = isPromise(other) ? observableFromPromise(other) : other;
	      __super__.call(this);
	    }

	    TakeUntilObservable.prototype.subscribeCore = function(o) {
	      return new CompositeDisposable(
	        this.source.subscribe(o),
	        this.other.subscribe(new InnerObserver(o))
	      );
	    };

	    function InnerObserver(o) {
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      this.o.onCompleted();
	    };
	    InnerObserver.prototype.onError = function (err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      !this.isStopped && (this.isStopped = true);
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };

	    return TakeUntilObservable;
	  }(ObservableBase));

	  /**
	   * Returns the values from the source observable sequence until the other observable sequence produces a value.
	   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
	   */
	  observableProto.takeUntil = function (other) {
	    return new TakeUntilObservable(this, other);
	  };

	  function falseFactory() { return false; }

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.withLatestFrom = function () {
	    var len = arguments.length, args = new Array(len)
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = args.pop(), source = this;
	    Array.isArray(args[0]) && (args = args[0]);

	    return new AnonymousObservable(function (observer) {
	      var n = args.length,
	        hasValue = arrayInitialize(n, falseFactory),
	        hasValueAll = false,
	        values = new Array(n);

	      var subscriptions = new Array(n + 1);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          var other = args[i], sad = new SingleAssignmentDisposable();
	          isPromise(other) && (other = observableFromPromise(other));
	          sad.setDisposable(other.subscribe(function (x) {
	            values[i] = x;
	            hasValue[i] = true;
	            hasValueAll = hasValue.every(identity);
	          }, function (e) { observer.onError(e); }, noop));
	          subscriptions[i] = sad;
	        }(idx));
	      }

	      var sad = new SingleAssignmentDisposable();
	      sad.setDisposable(source.subscribe(function (x) {
	        var allValues = [x].concat(values);
	        if (!hasValueAll) { return; }
	        var res = tryCatch(resultSelector).apply(null, allValues);
	        if (res === errorObj) { return observer.onError(res.e); }
	        observer.onNext(res);
	      }, function (e) { observer.onError(e); }, function () {
	        observer.onCompleted();
	      }));
	      subscriptions[n] = sad;

	      return new CompositeDisposable(subscriptions);
	    }, this);
	  };

	  function zipArray(second, resultSelector) {
	    var first = this;
	    return new AnonymousObservable(function (o) {
	      var index = 0, len = second.length;
	      return first.subscribe(function (left) {
	        if (index < len) {
	          var right = second[index++], res = tryCatch(resultSelector)(left, right);
	          if (res === errorObj) { return o.onError(res.e); }
	          o.onNext(res);
	        } else {
	          o.onCompleted();
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, first);
	  }

	  function falseFactory() { return false; }
	  function emptyArrayFactory() { return []; }

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
	   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
	   */
	  observableProto.zip = function () {
	    if (Array.isArray(arguments[0])) { return zipArray.apply(this, arguments); }
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

	    var parent = this, resultSelector = args.pop();
	    args.unshift(parent);
	    return new AnonymousObservable(function (o) {
	      var n = args.length,
	        queues = arrayInitialize(n, emptyArrayFactory),
	        isDone = arrayInitialize(n, falseFactory);

	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          var source = args[i], sad = new SingleAssignmentDisposable();
	          isPromise(source) && (source = observableFromPromise(source));
	          sad.setDisposable(source.subscribe(function (x) {
	            queues[i].push(x);
	            if (queues.every(function (x) { return x.length > 0; })) {
	              var queuedValues = queues.map(function (x) { return x.shift(); }),
	                  res = tryCatch(resultSelector).apply(parent, queuedValues);
	              if (res === errorObj) { return o.onError(res.e); }
	              o.onNext(res);
	            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	              o.onCompleted();
	            }
	          }, function (e) { o.onError(e); }, function () {
	            isDone[i] = true;
	            isDone.every(identity) && o.onCompleted();
	          }));
	          subscriptions[i] = sad;
	        })(idx);
	      }

	      return new CompositeDisposable(subscriptions);
	    }, parent);
	  };

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
	   * @param arguments Observable sources.
	   * @param {Function} resultSelector Function to invoke for each series of elements at corresponding indexes in the sources.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  Observable.zip = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var first = args.shift();
	    return first.zip.apply(first, args);
	  };

	  function falseFactory() { return false; }
	  function arrayFactory() { return []; }

	  /**
	   * Merges the specified observable sequences into one observable sequence by emitting a list with the elements of the observable sequences at corresponding indexes.
	   * @param arguments Observable sources.
	   * @returns {Observable} An observable sequence containing lists of elements at corresponding indexes.
	   */
	  Observable.zipArray = function () {
	    var sources;
	    if (Array.isArray(arguments[0])) {
	      sources = arguments[0];
	    } else {
	      var len = arguments.length;
	      sources = new Array(len);
	      for(var i = 0; i < len; i++) { sources[i] = arguments[i]; }
	    }
	    return new AnonymousObservable(function (o) {
	      var n = sources.length,
	        queues = arrayInitialize(n, arrayFactory),
	        isDone = arrayInitialize(n, falseFactory);

	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          subscriptions[i] = new SingleAssignmentDisposable();
	          subscriptions[i].setDisposable(sources[i].subscribe(function (x) {
	            queues[i].push(x);
	            if (queues.every(function (x) { return x.length > 0; })) {
	              var res = queues.map(function (x) { return x.shift(); });
	              o.onNext(res);
	            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	              return o.onCompleted();
	            }
	          }, function (e) { o.onError(e); }, function () {
	            isDone[i] = true;
	            isDone.every(identity) && o.onCompleted();
	          }));
	        })(idx);
	      }

	      return new CompositeDisposable(subscriptions);
	    });
	  };

	  /**
	   *  Hides the identity of an observable sequence.
	   * @returns {Observable} An observable sequence that hides the identity of the source sequence.
	   */
	  observableProto.asObservable = function () {
	    var source = this;
	    return new AnonymousObservable(function (o) { return source.subscribe(o); }, source);
	  };

	  /**
	   *  Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
	   *
	   * @example
	   *  var res = xs.bufferWithCount(10);
	   *  var res = xs.bufferWithCount(10, 1);
	   * @param {Number} count Length of each buffer.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive buffers. If not provided, defaults to the count.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithCount = function (count, skip) {
	    if (typeof skip !== 'number') {
	      skip = count;
	    }
	    return this.windowWithCount(count, skip).selectMany(function (x) {
	      return x.toArray();
	    }).where(function (x) {
	      return x.length > 0;
	    });
	  };

	  /**
	   * Dematerializes the explicit notification values of an observable sequence as implicit notifications.
	   * @returns {Observable} An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.
	   */
	  observableProto.dematerialize = function () {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(function (x) { return x.accept(o); }, function(e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, this);
	  };

	  /**
	   *  Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.
	   *
	   *  var obs = observable.distinctUntilChanged();
	   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; });
	   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; }, function (x, y) { return x === y; });
	   *
	   * @param {Function} [keySelector] A function to compute the comparison key for each element. If not provided, it projects the value.
	   * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
	   * @returns {Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
	   */
	  observableProto.distinctUntilChanged = function (keySelector, comparer) {
	    var source = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var hasCurrentKey = false, currentKey;
	      return source.subscribe(function (value) {
	        var key = value;
	        if (keySelector) {
	          key = tryCatch(keySelector)(value);
	          if (key === errorObj) { return o.onError(key.e); }
	        }
	        if (hasCurrentKey) {
	          var comparerEquals = tryCatch(comparer)(currentKey, key);
	          if (comparerEquals === errorObj) { return o.onError(comparerEquals.e); }
	        }
	        if (!hasCurrentKey || !comparerEquals) {
	          hasCurrentKey = true;
	          currentKey = key;
	          o.onNext(value);
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, this);
	  };

	  var TapObservable = (function(__super__) {
	    inherits(TapObservable,__super__);
	    function TapObservable(source, observerOrOnNext, onError, onCompleted) {
	      this.source = source;
	      this.t = !observerOrOnNext || isFunction(observerOrOnNext) ?
	        observerCreate(observerOrOnNext || noop, onError || noop, onCompleted || noop) :
	        observerOrOnNext;
	      __super__.call(this);
	    }

	    TapObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o, this.t));
	    };

	    function InnerObserver(o, t) {
	      this.o = o;
	      this.t = t;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function(x) {
	      if (this.isStopped) { return; }
	      var res = tryCatch(this.t.onNext).call(this.t, x);
	      if (res === errorObj) { this.o.onError(res.e); }
	      this.o.onNext(x);
	    };
	    InnerObserver.prototype.onError = function(err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        var res = tryCatch(this.t.onError).call(this.t, err);
	        if (res === errorObj) { return this.o.onError(res.e); }
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function() {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        var res = tryCatch(this.t.onCompleted).call(this.t);
	        if (res === errorObj) { return this.o.onError(res.e); }
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };

	    return TapObservable;
	  }(ObservableBase));

	  /**
	  *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an o.
	  * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
	    return new TapObservable(this, observerOrOnNext, onError, onCompleted);
	  };

	  /**
	  *  Invokes an action for each element in the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onNext Action to invoke for each element in the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
	    return this.tap(typeof thisArg !== 'undefined' ? function (x) { onNext.call(thisArg, x); } : onNext);
	  };

	  /**
	  *  Invokes an action upon exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onError Action to invoke upon exceptional termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
	    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) { onError.call(thisArg, e); } : onError);
	  };

	  /**
	  *  Invokes an action upon graceful termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onCompleted Action to invoke upon graceful termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
	    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () { onCompleted.call(thisArg); } : onCompleted);
	  };

	  /**
	   *  Invokes a specified action after the source observable sequence terminates gracefully or exceptionally.
	   * @param {Function} finallyAction Action to invoke after the source observable sequence terminates.
	   * @returns {Observable} Source sequence with the action-invoking termination behavior applied.
	   */
	  observableProto['finally'] = observableProto.ensure = function (action) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var subscription;
	      try {
	        subscription = source.subscribe(observer);
	      } catch (e) {
	        action();
	        throw e;
	      }
	      return disposableCreate(function () {
	        try {
	          subscription.dispose();
	        } catch (e) {
	          throw e;
	        } finally {
	          action();
	        }
	      });
	    }, this);
	  };

	  /**
	   * @deprecated use #finally or #ensure instead.
	   */
	  observableProto.finallyAction = function (action) {
	    //deprecate('finallyAction', 'finally or ensure');
	    return this.ensure(action);
	  };

	  var IgnoreElementsObservable = (function(__super__) {
	    inherits(IgnoreElementsObservable, __super__);

	    function IgnoreElementsObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    IgnoreElementsObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };

	    function InnerObserver(o) {
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = noop;
	    InnerObserver.prototype.onError = function (err) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.observer.onError(e);
	        return true;
	      }

	      return false;
	    };

	    return IgnoreElementsObservable;
	  }(ObservableBase));

	  /**
	   *  Ignores all elements in an observable sequence leaving only the termination messages.
	   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
	   */
	  observableProto.ignoreElements = function () {
	    return new IgnoreElementsObservable(this);
	  };

	  /**
	   *  Materializes the implicit notifications of an observable sequence as explicit notification values.
	   * @returns {Observable} An observable sequence containing the materialized notification values from the source sequence.
	   */
	  observableProto.materialize = function () {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      return source.subscribe(function (value) {
	        observer.onNext(notificationCreateOnNext(value));
	      }, function (e) {
	        observer.onNext(notificationCreateOnError(e));
	        observer.onCompleted();
	      }, function () {
	        observer.onNext(notificationCreateOnCompleted());
	        observer.onCompleted();
	      });
	    }, source);
	  };

	  /**
	   *  Repeats the observable sequence a specified number of times. If the repeat count is not specified, the sequence repeats indefinitely.
	   * @param {Number} [repeatCount]  Number of times to repeat the sequence. If not provided, repeats the sequence indefinitely.
	   * @returns {Observable} The observable sequence producing the elements of the given sequence repeatedly.
	   */
	  observableProto.repeat = function (repeatCount) {
	    return enumerableRepeat(this, repeatCount).concat();
	  };

	  /**
	   *  Repeats the source observable sequence the specified number of times or until it successfully terminates. If the retry count is not specified, it retries indefinitely.
	   *  Note if you encounter an error and want it to retry once, then you must use .retry(2);
	   *
	   * @example
	   *  var res = retried = retry.repeat();
	   *  var res = retried = retry.repeat(2);
	   * @param {Number} [retryCount]  Number of times to retry the sequence. If not provided, retry the sequence indefinitely.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retry = function (retryCount) {
	    return enumerableRepeat(this, retryCount).catchError();
	  };

	  /**
	   *  Repeats the source observable sequence upon error each time the notifier emits or until it successfully terminates. 
	   *  if the notifier completes, the observable sequence completes.
	   *
	   * @example
	   *  var timer = Observable.timer(500);
	   *  var source = observable.retryWhen(timer);
	   * @param {Observable} [notifier] An observable that triggers the retries or completes the observable with onNext or onCompleted respectively.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retryWhen = function (notifier) {
	    return enumerableRepeat(this).catchErrorWhen(notifier);
	  };
	  var ScanObservable = (function(__super__) {
	    inherits(ScanObservable, __super__);
	    function ScanObservable(source, accumulator, hasSeed, seed) {
	      this.source = source;
	      this.accumulator = accumulator;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }

	    ScanObservable.prototype.subscribeCore = function(observer) {
	      return this.source.subscribe(new ScanObserver(observer,this));
	    };

	    return ScanObservable;
	  }(ObservableBase));

	  function ScanObserver(observer, parent) {
	    this.observer = observer;
	    this.accumulator = parent.accumulator;
	    this.hasSeed = parent.hasSeed;
	    this.seed = parent.seed;
	    this.hasAccumulation = false;
	    this.accumulation = null;
	    this.hasValue = false;
	    this.isStopped = false;
	  }
	  ScanObserver.prototype.onNext = function (x) {
	    if (this.isStopped) { return; }
	    !this.hasValue && (this.hasValue = true);
	    try {
	      if (this.hasAccumulation) {
	        this.accumulation = this.accumulator(this.accumulation, x);
	      } else {
	        this.accumulation = this.hasSeed ? this.accumulator(this.seed, x) : x;
	        this.hasAccumulation = true;
	      }
	    } catch (e) {
	      return this.observer.onError(e);
	    }
	    this.observer.onNext(this.accumulation);
	  };
	  ScanObserver.prototype.onError = function (e) { 
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	    }
	  };
	  ScanObserver.prototype.onCompleted = function () {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      !this.hasValue && this.hasSeed && this.observer.onNext(this.seed);
	      this.observer.onCompleted();
	    }
	  };
	  ScanObserver.prototype.dispose = function() { this.isStopped = true; };
	  ScanObserver.prototype.fail = function (e) {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	      return true;
	    }
	    return false;
	  };

	  /**
	  *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
	  *  For aggregation behavior with no intermediate results, see Observable.aggregate.
	  * @param {Mixed} [seed] The initial accumulator value.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @returns {Observable} An observable sequence containing the accumulated values.
	  */
	  observableProto.scan = function () {
	    var hasSeed = false, seed, accumulator, source = this;
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[0];
	      accumulator = arguments[1];
	    } else {
	      accumulator = arguments[0];
	    }
	    return new ScanObservable(this, accumulator, hasSeed, seed);
	  };

	  /**
	   *  Bypasses a specified number of elements at the end of an observable sequence.
	   * @description
	   *  This operator accumulates a queue with a length enough to store the first `count` elements. As more elements are
	   *  received, elements are taken from the front of the queue and produced on the result sequence. This causes elements to be delayed.
	   * @param count Number of elements to bypass at the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the source sequence elements except for the bypassed ones at the end.
	   */
	  observableProto.skipLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        q.push(x);
	        q.length > count && o.onNext(q.shift());
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };

	  /**
	   *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
	   *  @example
	   *  var res = source.startWith(1, 2, 3);
	   *  var res = source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
	   * @param {Arguments} args The specified values to prepend to the observable sequence
	   * @returns {Observable} The source sequence prepended with the specified values.
	   */
	  observableProto.startWith = function () {
	    var values, scheduler, start = 0;
	    if (!!arguments.length && isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      start = 1;
	    } else {
	      scheduler = immediateScheduler;
	    }
	    for(var args = [], i = start, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    return enumerableOf([observableFromArray(args, scheduler), this]).concat();
	  };

	  /**
	   *  Returns a specified number of contiguous elements from the end of an observable sequence.
	   * @description
	   *  This operator accumulates a buffer with a length enough to store elements count elements. Upon completion of
	   *  the source sequence, this buffer is drained on the result sequence. This causes the elements to be delayed.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        q.push(x);
	        q.length > count && q.shift();
	      }, function (e) { o.onError(e); }, function () {
	        while (q.length > 0) { o.onNext(q.shift()); }
	        o.onCompleted();
	      });
	    }, source);
	  };

	  /**
	   *  Returns an array with the specified number of contiguous elements from the end of an observable sequence.
	   *
	   * @description
	   *  This operator accumulates a buffer with a length enough to store count elements. Upon completion of the
	   *  source sequence, this buffer is produced on the result sequence.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing a single array with the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLastBuffer = function (count) {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        q.push(x);
	        q.length > count && q.shift();
	      }, function (e) { o.onError(e); }, function () {
	        o.onNext(q);
	        o.onCompleted();
	      });
	    }, source);
	  };

	  /**
	   *  Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
	   *
	   *  var res = xs.windowWithCount(10);
	   *  var res = xs.windowWithCount(10, 1);
	   * @param {Number} count Length of each window.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive windows. If not specified, defaults to the count.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithCount = function (count, skip) {
	    var source = this;
	    +count || (count = 0);
	    Math.abs(count) === Infinity && (count = 0);
	    if (count <= 0) { throw new ArgumentOutOfRangeError(); }
	    skip == null && (skip = count);
	    +skip || (skip = 0);
	    Math.abs(skip) === Infinity && (skip = 0);

	    if (skip <= 0) { throw new ArgumentOutOfRangeError(); }
	    return new AnonymousObservable(function (observer) {
	      var m = new SingleAssignmentDisposable(),
	        refCountDisposable = new RefCountDisposable(m),
	        n = 0,
	        q = [];

	      function createWindow () {
	        var s = new Subject();
	        q.push(s);
	        observer.onNext(addRef(s, refCountDisposable));
	      }

	      createWindow();

	      m.setDisposable(source.subscribe(
	        function (x) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
	          var c = n - count + 1;
	          c >= 0 && c % skip === 0 && q.shift().onCompleted();
	          ++n % skip === 0 && createWindow();
	        },
	        function (e) {
	          while (q.length > 0) { q.shift().onError(e); }
	          observer.onError(e);
	        },
	        function () {
	          while (q.length > 0) { q.shift().onCompleted(); }
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };

	  function concatMap(source, selector, thisArg) {
	    var selectorFunc = bindCallback(selector, thisArg, 3);
	    return source.map(function (x, i) {
	      var result = selectorFunc(x, i, source);
	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
	      return result;
	    }).concatAll();
	  }

	  /**
	   *  One of the Following:
	   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   * @example
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); });
	   *  Or:
	   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
	   *
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
	   *  Or:
	   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   *  var res = source.concatMap(Rx.Observable.fromArray([1,2,3]));
	   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the
	   * source sequence onto which could be either an observable or Promise.
	   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
	   */
	  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
	    if (isFunction(selector) && isFunction(resultSelector)) {
	      return this.concatMap(function (x, i) {
	        var selectorResult = selector(x, i);
	        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
	        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

	        return selectorResult.map(function (y, i2) {
	          return resultSelector(x, y, i, i2);
	        });
	      });
	    }
	    return isFunction(selector) ?
	      concatMap(this, selector, thisArg) :
	      concatMap(this, function () { return selector; });
	  };

	  /**
	   * Projects each notification of an observable sequence to an observable sequence and concats the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
	    var source = this,
	        onNextFunc = bindCallback(onNext, thisArg, 2),
	        onErrorFunc = bindCallback(onError, thisArg, 1),
	        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
	    return new AnonymousObservable(function (observer) {
	      var index = 0;
	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNextFunc(x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onErrorFunc(err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompletedFunc();
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, this).concatAll();
	  };

	    /**
	     *  Returns the elements of the specified sequence or the specified value in a singleton sequence if the sequence is empty.
	     *
	     *  var res = obs = xs.defaultIfEmpty();
	     *  2 - obs = xs.defaultIfEmpty(false);
	     *
	     * @memberOf Observable#
	     * @param defaultValue The value to return if the sequence is empty. If not provided, this defaults to null.
	     * @returns {Observable} An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.
	     */
	    observableProto.defaultIfEmpty = function (defaultValue) {
	      var source = this;
	      defaultValue === undefined && (defaultValue = null);
	      return new AnonymousObservable(function (observer) {
	        var found = false;
	        return source.subscribe(function (x) {
	          found = true;
	          observer.onNext(x);
	        },
	        function (e) { observer.onError(e); }, 
	        function () {
	          !found && observer.onNext(defaultValue);
	          observer.onCompleted();
	        });
	      }, source);
	    };

	  // Swap out for Array.findIndex
	  function arrayIndexOfComparer(array, item, comparer) {
	    for (var i = 0, len = array.length; i < len; i++) {
	      if (comparer(array[i], item)) { return i; }
	    }
	    return -1;
	  }

	  function HashSet(comparer) {
	    this.comparer = comparer;
	    this.set = [];
	  }
	  HashSet.prototype.push = function(value) {
	    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
	    retValue && this.set.push(value);
	    return retValue;
	  };

	  /**
	   *  Returns an observable sequence that contains only distinct elements according to the keySelector and the comparer.
	   *  Usage of this operator should be considered carefully due to the maintenance of an internal lookup structure which can grow large.
	   *
	   * @example
	   *  var res = obs = xs.distinct();
	   *  2 - obs = xs.distinct(function (x) { return x.id; });
	   *  2 - obs = xs.distinct(function (x) { return x.id; }, function (a,b) { return a === b; });
	   * @param {Function} [keySelector]  A function to compute the comparison key for each element.
	   * @param {Function} [comparer]  Used to compare items in the collection.
	   * @returns {Observable} An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.
	   */
	  observableProto.distinct = function (keySelector, comparer) {
	    var source = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var hashSet = new HashSet(comparer);
	      return source.subscribe(function (x) {
	        var key = x;

	        if (keySelector) {
	          try {
	            key = keySelector(x);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	        }
	        hashSet.push(key) && o.onNext(x);
	      },
	      function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, this);
	  };

	  var MapObservable = (function (__super__) {
	    inherits(MapObservable, __super__);

	    function MapObservable(source, selector, thisArg) {
	      this.source = source;
	      this.selector = bindCallback(selector, thisArg, 3);
	      __super__.call(this);
	    }
	    
	    function innerMap(selector, self) {
	      return function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); }
	    }

	    MapObservable.prototype.internalMap = function (selector, thisArg) {
	      return new MapObservable(this.source, innerMap(selector, this), thisArg);
	    };

	    MapObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.selector, this));
	    };
	    
	    function InnerObserver(o, selector, source) {
	      this.o = o;
	      this.selector = selector;
	      this.source = source;
	      this.i = 0;
	      this.isStopped = false;
	    }
	  
	    InnerObserver.prototype.onNext = function(x) {
	      if (this.isStopped) { return; }
	      var result = tryCatch(this.selector)(x, this.i++, this.source);
	      if (result === errorObj) {
	        return this.o.onError(result.e);
	      }
	      this.o.onNext(result);
	    };
	    InnerObserver.prototype.onError = function (e) {
	      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	  
	      return false;
	    };

	    return MapObservable;

	  }(ObservableBase));

	  /**
	  * Projects each element of an observable sequence into a new form by incorporating the element's index.
	  * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
	  */
	  observableProto.map = observableProto.select = function (selector, thisArg) {
	    var selectorFn = typeof selector === 'function' ? selector : function () { return selector; };
	    return this instanceof MapObservable ?
	      this.internalMap(selectorFn, thisArg) :
	      new MapObservable(this, selectorFn, thisArg);
	  };

	  /**
	   * Retrieves the value of a specified nested property from all elements in
	   * the Observable sequence.
	   * @param {Arguments} arguments The nested properties to pluck.
	   * @returns {Observable} Returns a new Observable sequence of property values.
	   */
	  observableProto.pluck = function () {
	    var args = arguments, len = arguments.length;
	    if (len === 0) { throw new Error('List of properties cannot be empty.'); }
	    return this.map(function (x) {
	      var currentProp = x;
	      for (var i = 0; i < len; i++) {
	        var p = currentProp[args[i]];
	        if (typeof p !== 'undefined') {
	          currentProp = p;
	        } else {
	          return undefined;
	        }
	      }
	      return currentProp;
	    });
	  };

	  /**
	   * Projects each notification of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var index = 0;

	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNext.call(thisArg, x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onError.call(thisArg, err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompleted.call(thisArg);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, source).mergeAll();
	  };

	  function flatMap(source, selector, thisArg) {
	    var selectorFunc = bindCallback(selector, thisArg, 3);
	    return source.map(function (x, i) {
	      var result = selectorFunc(x, i, source);
	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
	      return result;
	    }).mergeAll();
	  }

	  /**
	   *  One of the Following:
	   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   * @example
	   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); });
	   *  Or:
	   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
	   *
	   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
	   *  Or:
	   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   *  var res = source.selectMany(Rx.Observable.fromArray([1,2,3]));
	   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the source sequence onto which could be either an observable or Promise.
	   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
	   */
	  observableProto.selectMany = observableProto.flatMap = function (selector, resultSelector, thisArg) {
	    if (isFunction(selector) && isFunction(resultSelector)) {
	      return this.flatMap(function (x, i) {
	        var selectorResult = selector(x, i);
	        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
	        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

	        return selectorResult.map(function (y, i2) {
	          return resultSelector(x, y, i, i2);
	        });
	      }, thisArg);
	    }
	    return isFunction(selector) ?
	      flatMap(this, selector, thisArg) :
	      flatMap(this, function () { return selector; });
	  };

	  /**
	   *  Projects each element of an observable sequence into a new sequence of observable sequences by incorporating the element's index and then
	   *  transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
	   * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source producing an Observable of Observable sequences
	   *  and that at any point in time produces the elements of the most recent inner observable sequence that has been received.
	   */
	  observableProto.selectSwitch = observableProto.flatMapLatest = observableProto.switchMap = function (selector, thisArg) {
	    return this.select(selector, thisArg).switchLatest();
	  };

	  var SkipObservable = (function(__super__) {
	    inherits(SkipObservable, __super__);
	    function SkipObservable(source, count) {
	      this.source = source;
	      this.skipCount = count;
	      __super__.call(this);
	    }
	    
	    SkipObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.skipCount));
	    };
	    
	    function InnerObserver(o, c) {
	      this.c = c;
	      this.r = c;
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      if (this.r <= 0) { 
	        this.o.onNext(x);
	      } else {
	        this.r--;
	      }
	    };
	    InnerObserver.prototype.onError = function(e) {
	      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); }
	    };
	    InnerObserver.prototype.onCompleted = function() {
	      if (!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function(e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	    
	    return SkipObservable;
	  }(ObservableBase));  
	  
	  /**
	   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
	   * @param {Number} count The number of elements to skip before returning the remaining elements.
	   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
	   */
	  observableProto.skip = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    return new SkipObservable(this, count);
	  };
	  /**
	   *  Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.
	   *  The element's index is used in the logic of the predicate function.
	   *
	   *  var res = source.skipWhile(function (value) { return value < 10; });
	   *  var res = source.skipWhile(function (value, index) { return value < 10 || index < 10; });
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
	   */
	  observableProto.skipWhile = function (predicate, thisArg) {
	    var source = this,
	        callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      var i = 0, running = false;
	      return source.subscribe(function (x) {
	        if (!running) {
	          try {
	            running = !callback(x, i++, source);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	        }
	        running && o.onNext(x);
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };

	  /**
	   *  Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0).
	   *
	   *  var res = source.take(5);
	   *  var res = source.take(0, Rx.Scheduler.timeout);
	   * @param {Number} count The number of elements to return.
	   * @param {Scheduler} [scheduler] Scheduler used to produce an OnCompleted message in case <paramref name="count count</paramref> is set to 0.
	   * @returns {Observable} An observable sequence that contains the specified number of elements from the start of the input sequence.
	   */
	  observableProto.take = function (count, scheduler) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    if (count === 0) { return observableEmpty(scheduler); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var remaining = count;
	      return source.subscribe(function (x) {
	        if (remaining-- > 0) {
	          o.onNext(x);
	          remaining <= 0 && o.onCompleted();
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };

	  /**
	   *  Returns elements from an observable sequence as long as a specified condition is true.
	   *  The element's index is used in the logic of the predicate function.
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.
	   */
	  observableProto.takeWhile = function (predicate, thisArg) {
	    var source = this,
	        callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      var i = 0, running = true;
	      return source.subscribe(function (x) {
	        if (running) {
	          try {
	            running = callback(x, i++, source);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	          if (running) {
	            o.onNext(x);
	          } else {
	            o.onCompleted();
	          }
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };

	  var FilterObservable = (function (__super__) {
	    inherits(FilterObservable, __super__);

	    function FilterObservable(source, predicate, thisArg) {
	      this.source = source;
	      this.predicate = bindCallback(predicate, thisArg, 3);
	      __super__.call(this);
	    }

	    FilterObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.predicate, this));
	    };
	    
	    function innerPredicate(predicate, self) {
	      return function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }
	    }

	    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
	      return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
	    };
	    
	    function InnerObserver(o, predicate, source) {
	      this.o = o;
	      this.predicate = predicate;
	      this.source = source;
	      this.i = 0;
	      this.isStopped = false;
	    }
	  
	    InnerObserver.prototype.onNext = function(x) {
	      if (this.isStopped) { return; }
	      var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
	      if (shouldYield === errorObj) {
	        return this.o.onError(shouldYield.e);
	      }
	      shouldYield && this.o.onNext(x);
	    };
	    InnerObserver.prototype.onError = function (e) {
	      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };

	    return FilterObservable;

	  }(ObservableBase));

	  /**
	  *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
	  * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
	  */
	  observableProto.filter = observableProto.where = function (predicate, thisArg) {
	    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) :
	      new FilterObservable(this, predicate, thisArg);
	  };

	  /**
	   * Executes a transducer to transform the observable sequence
	   * @param {Transducer} transducer A transducer to execute
	   * @returns {Observable} An Observable sequence containing the results from the transducer.
	   */
	  observableProto.transduce = function(transducer) {
	    var source = this;

	    function transformForObserver(o) {
	      return {
	        '@@transducer/init': function() {
	          return o;
	        },
	        '@@transducer/step': function(obs, input) {
	          return obs.onNext(input);
	        },
	        '@@transducer/result': function(obs) {
	          return obs.onCompleted();
	        }
	      };
	    }

	    return new AnonymousObservable(function(o) {
	      var xform = transducer(transformForObserver(o));
	      return source.subscribe(
	        function(v) {
	          try {
	            xform['@@transducer/step'](o, v);
	          } catch (e) {
	            o.onError(e);
	          }
	        },
	        function (e) { o.onError(e); },
	        function() { xform['@@transducer/result'](o); }
	      );
	    }, source);
	  };

	  var AnonymousObservable = Rx.AnonymousObservable = (function (__super__) {
	    inherits(AnonymousObservable, __super__);

	    // Fix subscriber to check for undefined or function returned to decorate as Disposable
	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }

	    function setDisposable(s, state) {
	      var ado = state[0], subscribe = state[1];
	      var sub = tryCatch(subscribe)(ado);

	      if (sub === errorObj) {
	        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
	      }
	      ado.setDisposable(fixSubscriber(sub));
	    }

	    function AnonymousObservable(subscribe, parent) {
	      this.source = parent;

	      function s(observer) {
	        var ado = new AutoDetachObserver(observer), state = [ado, subscribe];

	        if (currentThreadScheduler.scheduleRequired()) {
	          currentThreadScheduler.scheduleWithState(state, setDisposable);
	        } else {
	          setDisposable(null, state);
	        }
	        return ado;
	      }

	      __super__.call(this, s);
	    }

	    return AnonymousObservable;

	  }(Observable));

	  var AutoDetachObserver = (function (__super__) {
	    inherits(AutoDetachObserver, __super__);

	    function AutoDetachObserver(observer) {
	      __super__.call(this);
	      this.observer = observer;
	      this.m = new SingleAssignmentDisposable();
	    }

	    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;

	    AutoDetachObserverPrototype.next = function (value) {
	      var result = tryCatch(this.observer.onNext).call(this.observer, value);
	      if (result === errorObj) {
	        this.dispose();
	        thrower(result.e);
	      }
	    };

	    AutoDetachObserverPrototype.error = function (err) {
	      var result = tryCatch(this.observer.onError).call(this.observer, err);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };

	    AutoDetachObserverPrototype.completed = function () {
	      var result = tryCatch(this.observer.onCompleted).call(this.observer);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };

	    AutoDetachObserverPrototype.setDisposable = function (value) { this.m.setDisposable(value); };
	    AutoDetachObserverPrototype.getDisposable = function () { return this.m.getDisposable(); };

	    AutoDetachObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.m.dispose();
	    };

	    return AutoDetachObserver;
	  }(AbstractObserver));

	  var InnerSubscription = function (subject, observer) {
	    this.subject = subject;
	    this.observer = observer;
	  };

	  InnerSubscription.prototype.dispose = function () {
	    if (!this.subject.isDisposed && this.observer !== null) {
	      var idx = this.subject.observers.indexOf(this.observer);
	      this.subject.observers.splice(idx, 1);
	      this.observer = null;
	    }
	  };

	  /**
	   *  Represents an object that is both an observable sequence as well as an observer.
	   *  Each notification is broadcasted to all subscribed observers.
	   */
	  var Subject = Rx.Subject = (function (__super__) {
	    function subscribe(observer) {
	      checkDisposed(this);
	      if (!this.isStopped) {
	        this.observers.push(observer);
	        return new InnerSubscription(this, observer);
	      }
	      if (this.hasError) {
	        observer.onError(this.error);
	        return disposableEmpty;
	      }
	      observer.onCompleted();
	      return disposableEmpty;
	    }

	    inherits(Subject, __super__);

	    /**
	     * Creates a subject.
	     */
	    function Subject() {
	      __super__.call(this, subscribe);
	      this.isDisposed = false,
	      this.isStopped = false,
	      this.observers = [];
	      this.hasError = false;
	    }

	    addProperties(Subject.prototype, Observer.prototype, {
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () { return this.observers.length > 0; },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onCompleted();
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.error = error;
	          this.hasError = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onNext(value);
	          }
	        }
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	      }
	    });

	    /**
	     * Creates a subject from the specified observer and observable.
	     * @param {Observer} observer The observer used to send messages to the subject.
	     * @param {Observable} observable The observable used to subscribe to messages sent from the subject.
	     * @returns {Subject} Subject implemented using the given observer and observable.
	     */
	    Subject.create = function (observer, observable) {
	      return new AnonymousSubject(observer, observable);
	    };

	    return Subject;
	  }(Observable));

	  /**
	   *  Represents the result of an asynchronous operation.
	   *  The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
	   */
	  var AsyncSubject = Rx.AsyncSubject = (function (__super__) {

	    function subscribe(observer) {
	      checkDisposed(this);

	      if (!this.isStopped) {
	        this.observers.push(observer);
	        return new InnerSubscription(this, observer);
	      }

	      if (this.hasError) {
	        observer.onError(this.error);
	      } else if (this.hasValue) {
	        observer.onNext(this.value);
	        observer.onCompleted();
	      } else {
	        observer.onCompleted();
	      }

	      return disposableEmpty;
	    }

	    inherits(AsyncSubject, __super__);

	    /**
	     * Creates a subject that can only receive one value and that value is cached for all future observations.
	     * @constructor
	     */
	    function AsyncSubject() {
	      __super__.call(this, subscribe);

	      this.isDisposed = false;
	      this.isStopped = false;
	      this.hasValue = false;
	      this.observers = [];
	      this.hasError = false;
	    }

	    addProperties(AsyncSubject.prototype, Observer, {
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () {
	        checkDisposed(this);
	        return this.observers.length > 0;
	      },
	      /**
	       * Notifies all subscribed observers about the end of the sequence, also causing the last received value to be sent out (if any).
	       */
	      onCompleted: function () {
	        var i, len;
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          var os = cloneArray(this.observers), len = os.length;

	          if (this.hasValue) {
	            for (i = 0; i < len; i++) {
	              var o = os[i];
	              o.onNext(this.value);
	              o.onCompleted();
	            }
	          } else {
	            for (i = 0; i < len; i++) {
	              os[i].onCompleted();
	            }
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the error.
	       * @param {Mixed} error The Error to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.hasError = true;
	          this.error = error;

	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Sends a value to the subject. The last value received before successful termination will be sent to all subscribed and future observers.
	       * @param {Mixed} value The value to store in the subject.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.value = value;
	        this.hasValue = true;
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	        this.exception = null;
	        this.value = null;
	      }
	    });

	    return AsyncSubject;
	  }(Observable));

	  var AnonymousSubject = Rx.AnonymousSubject = (function (__super__) {
	    inherits(AnonymousSubject, __super__);

	    function subscribe(observer) {
	      return this.observable.subscribe(observer);
	    }

	    function AnonymousSubject(observer, observable) {
	      this.observer = observer;
	      this.observable = observable;
	      __super__.call(this, subscribe);
	    }

	    addProperties(AnonymousSubject.prototype, Observer.prototype, {
	      onCompleted: function () {
	        this.observer.onCompleted();
	      },
	      onError: function (error) {
	        this.observer.onError(error);
	      },
	      onNext: function (value) {
	        this.observer.onNext(value);
	      }
	    });

	    return AnonymousSubject;
	  }(Observable));

	  if (true) {
	    root.Rx = Rx;

	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Rx;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = Rx).Rx = Rx;
	    } else {
	      freeExports.Rx = Rx;
	    }
	  } else {
	    // in a browser or Rhino
	    root.Rx = Rx;
	  }

	  // All code before this point will be filtered from stack traces.
	  var rEndingLine = captureLine();

	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 67 */
/***/ function(module, exports) {

	function ModelDataSourceAdapter(model) {
	    this._model = model._materialize().boxValues().treatErrorsAsValues();
	}

	ModelDataSourceAdapter.prototype.get = function get(pathSets) {
	    return this._model.get.apply(this._model, pathSets)._toJSONG();
	};

	ModelDataSourceAdapter.prototype.set = function set(jsongResponse) {
	    return this._model.set(jsongResponse)._toJSONG();
	};

	ModelDataSourceAdapter.prototype.call = function call(path, args, suffixes, paths) {
	    var params = [path, args, suffixes].concat(paths);
	    return this._model.call.apply(this._model, params)._toJSONG();
	};

	module.exports = ModelDataSourceAdapter;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var RequestQueue = __webpack_require__(69);
	var RequestQueueV2 = __webpack_require__(149);

	function RequestQueueRx(model, scheduler) {
	    this.model = model;
	    this.scheduler = scheduler;
	    this.requests = this._requests = [];
	}

	// RX MONKEY PATCH
	RequestQueueRx.prototype.get = RequestQueueV2.prototype.get;
	RequestQueueRx.prototype.removeRequest = RequestQueueV2.prototype.removeRequest;

	RequestQueueRx.prototype.set = RequestQueue.prototype.set;
	RequestQueueRx.prototype.call = RequestQueue.prototype.call;

	module.exports = RequestQueueRx;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	
	var SetRequest = __webpack_require__(70);

	var prefix = __webpack_require__(85);
	var getType = __webpack_require__(148);
	var isObject = __webpack_require__(63);
	var falcorPathUtils = __webpack_require__(73);

	/* eslint-disable no-labels block-scoped-var */
	function RequestQueue(model, scheduler) {
	    this.total = 0;
	    this.model = model;
	    this.requests = [];
	    this.scheduler = scheduler;
	}

	RequestQueue.prototype.set = function setRequest(jsonGraphEnvelope) {
	    jsonGraphEnvelope.paths = falcorPathUtils.collapse(jsonGraphEnvelope.paths);
	    return SetRequest.create(this.model, jsonGraphEnvelope);
	};

	RequestQueue.prototype._remove = function removeRequest(request) {
	    var requests = this.requests;
	    var index = requests.indexOf(request);
	    if (index !== -1) {
	        requests.splice(index, 1);
	    }
	};

	RequestQueue.prototype.distributePaths = function distributePathsAcrossRequests(paths, requests, RequestType) {

	    var model = this.model;
	    var pathsIndex = -1;
	    var pathsCount = paths.length;

	    var requestIndex = -1;
	    var requestCount = requests.length;
	    var participatingRequests = [];
	    var pendingRequest;
	    var request;

	    insertPath: while (++pathsIndex < pathsCount) {

	        var path = paths[pathsIndex];

	        requestIndex = -1;

	        while (++requestIndex < requestCount) {
	            request = requests[requestIndex];
	            if (request.insertPath(path, request.pending)) {
	                participatingRequests[requestIndex] = request;
	                continue insertPath;
	            }
	        }

	        if (!pendingRequest) {
	            pendingRequest = RequestType.create(this, model, this.total++);
	            requests[requestIndex] = pendingRequest;
	            participatingRequests[requestCount++] = pendingRequest;
	        }

	        pendingRequest.insertPath(path, false);
	    }

	    var pathRequests = [];
	    var pathRequestsIndex = -1;

	    requestIndex = -1;

	    while (++requestIndex < requestCount) {
	        request = participatingRequests[requestIndex];
	        if (request != null) {
	            pathRequests[++pathRequestsIndex] = request;
	        }
	    }

	    return pathRequests;
	};

	RequestQueue.prototype.mergeJSONGraphs = function mergeJSONGraphs(aggregate, response) {

	    var depth = 0;
	    var contexts = [];
	    var messages = [];
	    var keystack = [];
	    var latestIndex = aggregate.index;
	    var responseIndex = response.index;

	    aggregate.index = Math.max(latestIndex, responseIndex);

	    contexts[-1] = aggregate.jsonGraph || {};
	    messages[-1] = response.jsonGraph || {};

	    recursing: while (depth > -1) {

	        var context = contexts[depth - 1];
	        var message = messages[depth - 1];
	        var keys = keystack[depth - 1] || (keystack[depth - 1] = Object.keys(message));

	        while (keys.length > 0) {

	            var key = keys.pop();

	            if (key[0] === prefix) {
	                continue;
	            }

	            if (context.hasOwnProperty(key)) {
	                var node = context[key];
	                var nodeType = getType(node);
	                var messageNode = message[key];
	                var messageType = getType(messageNode);
	                if (isObject(node) && isObject(messageNode) && !nodeType && !messageType) {
	                    contexts[depth] = node;
	                    messages[depth] = messageNode;
	                    depth += 1;
	                    continue recursing;
	                } else if (responseIndex > latestIndex) {
	                    context[key] = messageNode;
	                }
	            } else {
	                context[key] = message[key];
	            }
	        }

	        depth -= 1;
	    }

	    return aggregate;
	};
	/* eslint-enable */

	module.exports = RequestQueue;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var Observer = Rx.Observer;

	var Request = __webpack_require__(71);

	var arrayMap = __webpack_require__(82);

	var setJSONGraphs = __webpack_require__(83);
	var setPathValues = __webpack_require__(136);

	var emptyArray = new Array(0);

	function SetRequest() {
	    Request.call(this);
	}

	SetRequest.create = function create(model, jsonGraphEnvelope) {
	    var request = new SetRequest();
	    request.model = model;
	    request.jsonGraphEnvelope = jsonGraphEnvelope;
	    return request;
	};

	SetRequest.prototype = Object.create(Request.prototype);
	SetRequest.prototype.constructor = SetRequest;

	SetRequest.prototype.method = "set";
	SetRequest.prototype.insertPath = function() {
	    return false;
	};
	SetRequest.prototype.removePath = function() {
	    return 0;
	};

	SetRequest.prototype.getSourceArgs = function getSourceArgs() {
	    return this.jsonGraphEnvelope;
	};

	SetRequest.prototype.getSourceObserver = function getSourceObserver(observer) {

	    var model = this.model;
	    var bound = model._path;
	    var paths = this.jsonGraphEnvelope.paths;
	    var modelRoot = model._root;
	    var errorSelector = modelRoot.errorSelector;
	    var comparator = modelRoot.comparator;

	    return Request.prototype.getSourceObserver.call(this, Observer.create(
	        function onNext(jsonGraphEnvelope) {

	            model._path = emptyArray;

	            var successfulPaths = setJSONGraphs(model, [{
	                paths: paths,
	                jsonGraph: jsonGraphEnvelope.jsonGraph
	            }], null, errorSelector, comparator);

	            jsonGraphEnvelope.paths = successfulPaths[1];

	            model._path = bound;

	            observer.onNext(jsonGraphEnvelope);
	        },
	        function onError(error) {

	            model._path = emptyArray;

	            setPathValues(model, arrayMap(paths, function(path) {
	                return {
	                    path: path,
	                    value: error
	                };
	            }), null, errorSelector, comparator);

	            model._path = bound;

	            observer.onError(error);
	        },
	        function onCompleted() {
	            observer.onCompleted();
	        }
	    ));
	};

	module.exports = SetRequest;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var Observer = Rx.Observer;
	var Observable = Rx.Observable;
	var Disposable = Rx.Disposable;
	var SerialDisposable = Rx.SerialDisposable;
	var CompositeDisposable = Rx.CompositeDisposable;
	var InvalidSourceError = __webpack_require__(72);

	var falcorPathUtils = __webpack_require__(73);
	var iterateKeySet = falcorPathUtils.iterateKeySet;

	function Request() {
	    this.length = 0;
	    this.pending = false;
	    this.pathmaps = [];
	    Observable.call(this, this._subscribe);
	}

	Request.create = function create(queue, model, index) {
	    var request = new this();
	    request.queue = queue;
	    request.model = model;
	    request.index = index;
	    return request;
	};

	Request.prototype = Object.create(Observable.prototype);

	Request.prototype.constructor = Request;

	Request.prototype.insertPath = function insertPathIntoRequest(path, union, parentArg, indexArg, countArg) {

	    var index = indexArg || 0;
	    var count = countArg || path.length - 1;
	    var parent = parentArg || this.pathmaps[count + 1] || (this.pathmaps[count + 1] = Object.create(null));

	    if (parent === void 0 || parent === null) {
	        return false;
	    }

	    var key, node;
	    var keySet = path[index];
	    var iteratorNote = {};
	    key = iterateKeySet(keySet, iteratorNote);

	    // Determines if the key needs to go through permutation or not.
	    // All object based keys require this.

	    do {
	        node = parent[key];
	        if (index < count) {
	            if (node == null) {
	                if (union) {
	                    return false;
	                }
	                node = parent[key] = Object.create(null);
	            }
	            if (this.insertPath(path, union, node, index + 1, count) === false) {
	                return false;
	            }
	        } else {
	            parent[key] = (node || 0) + 1;
	            this.length += 1;
	        }

	        if (!iteratorNote.done) {
	            key = iterateKeySet(keySet, iteratorNote);
	        }
	    } while (!iteratorNote.done);

	    return true;
	};

	/* eslint-disable guard-for-in */
	Request.prototype.removePath = function removePathFromRequest(path, parentArg, indexArg, countArg) {

	    var index = indexArg || 0;
	    var count = countArg || path.length - 1;
	    var parent = parentArg || this.pathmaps[count + 1];

	    if (parent === void 0 || parent === null) {
	        return true;
	    }

	    var key, node, deleted = 0;
	    var keySet = path[index];
	    var iteratorNote = {};

	    key = iterateKeySet(keySet, iteratorNote);
	    do {
	        node = parent[key];
	        if (node === void 0 || node === null) {
	            continue;
	        } else if (index < count) {
	            deleted += this.removePath(path, node, index + 1, count);
	            var emptyNodeKey = void 0;
	            for (emptyNodeKey in node) {
	                break;
	            }
	            if (emptyNodeKey === void 0) {
	                delete parent[key];
	            }
	        } else {
	            node = parent[key] = (node || 1) - 1;
	            if (node === 0) {
	                delete parent[key];
	            }
	            deleted += 1;
	            this.length -= 1;
	        }

	        if (!iteratorNote.done) {
	            key = iterateKeySet(keySet, iteratorNote);
	        }
	    } while (!iteratorNote.done);

	    return deleted;
	};
	/* eslint-enable */

	Request.prototype.getSourceObserver = function getSourceObserver(observer) {
	    var request = this;
	    return Observer.create(
	        function onNext(envelope) {
	            envelope.jsonGraph = envelope.jsonGraph ||
	                envelope.jsong ||
	                envelope.values ||
	                envelope.value;
	            envelope.index = request.index;
	            observer.onNext(envelope);
	        },
	        function onError(e) {
	            observer.onError(e);
	        },
	        function onCompleted() {
	            observer.onCompleted();
	        });
	};

	Request.prototype._subscribe = function _subscribe(observer) {

	    var request = this;
	    var queue = this.queue;

	    request.pending = true;

	    var isDisposed = false;
	    var sourceSubscription = new SerialDisposable();
	    var queueDisposable = Disposable.create(function() {
	        if (!isDisposed) {
	            isDisposed = true;
	            if (queue) {
	                queue._remove(request);
	            }
	        }
	    });

	    var disposables = new CompositeDisposable(sourceSubscription, queueDisposable);

	    try {
	        sourceSubscription.setDisposable(
	            this.model._source[this.method](this.getSourceArgs())
	            .subscribe(this.getSourceObserver(observer)));
	    } catch (e) {

	        // We need a way to communicate out to the rest of the world that
	        // this error needs to continue its propagation.
	        throw new InvalidSourceError(e);
	    }

	    return disposables;
	};

	module.exports = Request;


/***/ },
/* 72 */
/***/ function(module, exports) {

	var NAME = "InvalidSourceError";
	/**
	 * InvalidSourceError happens when a dataSource syncronously throws
	 * an exception during a get/set/call operation.
	 *
	 * @param {Error} error - The error that was thrown.
	 * @private
	 */
	function InvalidSourceError(error) {
	    this.message = "An exception was thrown when making a request.";
	    this.stack = (new Error()).stack;
	    this.innerError = error;
	}

	// instanceof will be an error, but stack will be correct because its defined
	// in the constructor.
	InvalidSourceError.prototype = new Error();
	InvalidSourceError.prototype.name = NAME;
	InvalidSourceError.name = NAME;
	InvalidSourceError.is = function(e) {
	    return e && e.name === NAME;
	};

	module.exports = InvalidSourceError;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    iterateKeySet: __webpack_require__(74),
	    toTree: __webpack_require__(75),
	    toTreeWithUnion: __webpack_require__(76),
	    pathsComplementFromTree: __webpack_require__(77),
	    pathsComplementFromLengthTree: __webpack_require__(79),
	    hasIntersection: __webpack_require__(78),
	    toPaths: __webpack_require__(80),
	    collapse: __webpack_require__(81)
	};


/***/ },
/* 74 */
/***/ function(module, exports) {

	var isArray = Array.isArray;

	/**
	 * Takes in a keySet and a note attempts to iterate over it.
	 * If the value is a primitive, the key will be returned and the note will
	 * be marked done
	 * If the value is an object, then each value of the range will be returned
	 * and when finished the note will be marked done.
	 * If the value is an array, each value will be iterated over, if any of the
	 * inner values are ranges, those will be iterated over.  When fully done,
	 * the note will be marked done.
	 *
	 * @param {Object|Array|String|Number} keySet -
	 * @param {Object} note - The non filled note
	 * @returns {String|Number|undefined} - The current iteration value.
	 * If undefined, then the keySet is empty
	 * @public
	 */
	module.exports = function iterateKeySet(keySet, note) {
	    if (note.isArray === undefined) {
	        initializeNote(keySet, note);
	    }

	    // Array iteration
	    if (note.isArray) {
	        var nextValue;

	        // Cycle through the array and pluck out the next value.
	        do {
	            if (note.loaded && note.rangeOffset > note.to) {
	                ++note.arrayOffset;
	                note.loaded = false;
	            }

	            var idx = note.arrayOffset, length = keySet.length;
	            if (idx >= length) {
	                note.done = true;
	                break;
	            }

	            var el = keySet[note.arrayOffset];
	            var type = typeof el;

	            // Inner range iteration.
	            if (type === 'object') {
	                if (!note.loaded) {
	                    initializeRange(el, note);
	                }

	                // Empty to/from
	                if (note.empty) {
	                    continue;
	                }

	                nextValue = note.rangeOffset++;
	            }

	            // Primitive iteration in array.
	            else {
	                ++note.arrayOffset;
	                nextValue = el;
	            }
	        } while (nextValue === undefined);

	        return nextValue;
	    }

	    // Range iteration
	    else if (note.isObject) {
	        if (!note.loaded) {
	            initializeRange(keySet, note);
	        }
	        if (note.rangeOffset > note.to) {
	            note.done = true;
	            return undefined;
	        }

	        return note.rangeOffset++;
	    }

	    // Primitive value
	    else {
	        note.done = true;
	        return keySet;
	    }
	};

	function initializeRange(key, memo) {
	    var from = memo.from = key.from || 0;
	    var to = memo.to = key.to ||
	        (typeof key.length === 'number' &&
	        memo.from + key.length - 1 || 0);
	    memo.rangeOffset = memo.from;
	    memo.loaded = true;
	    if (from > to) {
	        memo.empty = true;
	    }
	}

	function initializeNote(key, note) {
	    note.done = false;
	    var isObject = note.isObject = !!(key && typeof key === 'object');
	    note.isArray = isObject && isArray(key);
	    note.arrayOffset = 0;
	}


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var iterateKeySet = __webpack_require__(74);
	var isArray = Array.isArray;

	/**
	 * @param {Array} paths -
	 * @returns {Object} -
	 */
	module.exports = function toTree(paths) {
	    return paths.reduce(function(acc, path) {
	        innerToTree(acc, path, 0);
	        return acc;
	    }, {});
	};

	function innerToTree(seed, path, depth) {

	    var keySet = path[depth];
	    var iteratorNote = {};
	    var key;
	    var nextDepth = depth + 1;

	    key = iterateKeySet(keySet, iteratorNote);

	    do {

	        var next = seed[key];
	        if (!next) {
	            if (nextDepth === path.length) {
	                seed[key] = null;
	            } else {
	                next = seed[key] = {};
	            }
	        }

	        if (nextDepth < path.length) {
	            innerToTree(next, path, nextDepth);
	        }

	        if (!iteratorNote.done) {
	            key = iterateKeySet(keySet, iteratorNote);
	        }
	    } while (!iteratorNote.done);
	}



/***/ },
/* 76 */
/***/ function(module, exports) {

	

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var hasIntersection = __webpack_require__(78);

	/**
	 * Compares the paths passed in with the tree.  Any of the paths that are in
	 * the tree will be stripped from the paths.
	 *
	 * **Does not mutate** the incoming paths object.
	 * **Proper subset** only matching.
	 *
	 * @param {Array} paths - A list of paths (complex or simple) to strip the
	 * intersection
	 * @param {Object} tree -
	 * @public
	 */
	module.exports = function pathsComplementFromTree(paths, tree) {
	    var out = [];
	    var outLength = -1;

	    for (var i = 0, len = paths.length; i < len; ++i) {
	        // If this does not intersect then add it to the output.
	        if (!hasIntersection(tree, paths[i], 0)) {
	            out[++outLength] = paths[i];
	        }
	    }
	    return out;
	};



/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var iterateKeySet = __webpack_require__(74);

	/**
	 * Tests to see if the intersection should be stripped from the
	 * total paths.  The only way this happens currently is if the entirety
	 * of the path is contained in the tree.
	 * @private
	 */
	module.exports = function hasIntersection(tree, path, depth) {
	    var current = tree;
	    var intersects = true;

	    // Continue iteratively going down a path until a complex key is
	    // encountered, then recurse.
	    for (;intersects && depth < path.length; ++depth) {
	        var key = path[depth];
	        var keyType = typeof key;

	        // We have to iterate key set
	        if (key && keyType === 'object') {
	            var note = {};
	            var innerKey = iterateKeySet(key, note);
	            var nextDepth = depth + 1;

	            // Loop through the innerKeys setting the intersects flag
	            // to each result.  Break out on false.
	            do {
	                var next = current[innerKey];
	                intersects = next !== undefined;

	                if (intersects) {
	                    intersects = hasIntersection(next, path, nextDepth);
	                }
	                innerKey = iterateKeySet(key, note);
	            } while (intersects && !note.done);

	            // Since we recursed, we shall not pass any further!
	            break;
	        }

	        // Its a simple key, just move forward with the testing.
	        current = current[key];
	        intersects = current !== undefined;
	    }

	    return intersects;
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var hasIntersection = __webpack_require__(78);

	/**
	 * Compares the paths passed in with the tree.  Any of the paths that are in
	 * the tree will be stripped from the paths.
	 *
	 * **Does not mutate** the incoming paths object.
	 * **Proper subset** only matching.
	 *
	 * @param {Array} paths - A list of paths (complex or simple) to strip the
	 * intersection
	 * @param {Object} tree -
	 * @public
	 */
	module.exports = function pathsComplementFromLengthTree(paths, tree) {
	    var out = [];
	    var outLength = -1;

	    for (var i = 0, len = paths.length; i < len; ++i) {
	        // If this does not intersect then add it to the output.
	        var path = paths[i];
	        if (!hasIntersection(tree[path.length], path, 0)) {
	            out[++outLength] = path;
	        }
	    }
	    return out;
	};



/***/ },
/* 80 */
/***/ function(module, exports) {

	var isArray = Array.isArray;
	var typeOfObject = "object";

	/* jshint forin: false */
	module.exports = function toPaths(lengths) {
	    var pathmap;
	    var allPaths = [];
	    var allPathsLength = 0;
	    for (var length in lengths) {
	        if (isNumber(length) && isObject(pathmap = lengths[length])) {
	            var paths = collapsePathMap(pathmap, 0, parseInt(length, 10)).sets;
	            var pathsIndex = -1;
	            var pathsCount = paths.length;
	            while (++pathsIndex < pathsCount) {
	                allPaths[allPathsLength++] = collapsePathSetIndexes(paths[pathsIndex]);
	            }
	        }
	    }
	    return allPaths;
	};

	function isObject(value) {
	    return value !== null && typeof value === typeOfObject;
	}

	function collapsePathMap(pathmap, depth, length) {

	    var key;
	    var code = getHashCode(String(depth));
	    var subs = Object.create(null);

	    var codes = [];
	    var codesIndex = -1;
	    var codesCount = 0;

	    var pathsets = [];
	    var pathsetsCount = 0;

	    var subPath, subCode,
	        subKeys, subKeysIndex, subKeysCount,
	        subSets, subSetsIndex, subSetsCount,
	        pathset, pathsetIndex, pathsetCount,
	        firstSubKey, pathsetClone;

	    subKeys = [];
	    subKeysIndex = -1;

	    if (depth < length - 1) {

	        subKeysCount = getSortedKeys(pathmap, subKeys);

	        while (++subKeysIndex < subKeysCount) {
	            key = subKeys[subKeysIndex];
	            subPath = collapsePathMap(pathmap[key], depth + 1, length);
	            subCode = subPath.code;
	            if(subs[subCode]) {
	                subPath = subs[subCode];
	            } else {
	                codes[codesCount++] = subCode;
	                subPath = subs[subCode] = {
	                    keys: [],
	                    sets: subPath.sets
	                };
	            }
	            code = getHashCode(code + key + subCode);

	            isNumber(key) &&
	                subPath.keys.push(parseInt(key, 10)) ||
	                subPath.keys.push(key);
	        }

	        while(++codesIndex < codesCount) {

	            key = codes[codesIndex];
	            subPath = subs[key];
	            subKeys = subPath.keys;
	            subKeysCount = subKeys.length;

	            if (subKeysCount > 0) {

	                subSets = subPath.sets;
	                subSetsIndex = -1;
	                subSetsCount = subSets.length;
	                firstSubKey = subKeys[0];

	                while (++subSetsIndex < subSetsCount) {

	                    pathset = subSets[subSetsIndex];
	                    pathsetIndex = -1;
	                    pathsetCount = pathset.length;
	                    pathsetClone = new Array(pathsetCount + 1);
	                    pathsetClone[0] = subKeysCount > 1 && subKeys || firstSubKey;

	                    while (++pathsetIndex < pathsetCount) {
	                        pathsetClone[pathsetIndex + 1] = pathset[pathsetIndex];
	                    }

	                    pathsets[pathsetsCount++] = pathsetClone;
	                }
	            }
	        }
	    } else {
	        subKeysCount = getSortedKeys(pathmap, subKeys);
	        if (subKeysCount > 1) {
	            pathsets[pathsetsCount++] = [subKeys];
	        } else {
	            pathsets[pathsetsCount++] = subKeys;
	        }
	        while (++subKeysIndex < subKeysCount) {
	            code = getHashCode(code + subKeys[subKeysIndex]);
	        }
	    }

	    return {
	        code: code,
	        sets: pathsets
	    };
	}

	function collapsePathSetIndexes(pathset) {

	    var keysetIndex = -1;
	    var keysetCount = pathset.length;

	    while (++keysetIndex < keysetCount) {
	        var keyset = pathset[keysetIndex];
	        if (isArray(keyset)) {
	            pathset[keysetIndex] = collapseIndex(keyset);
	        }
	    }

	    return pathset;
	}

	/**
	 * Collapse range indexers, e.g. when there is a continuous
	 * range in an array, turn it into an object instead:
	 *
	 * [1,2,3,4,5,6] => {"from":1, "to":6}
	 *
	 * @private
	 */
	function collapseIndex(keyset) {

	    // Do we need to dedupe an indexer keyset if they're duplicate consecutive integers?
	    // var hash = {};
	    var keyIndex = -1;
	    var keyCount = keyset.length - 1;
	    var isSparseRange = keyCount > 0;

	    while (++keyIndex <= keyCount) {

	        var key = keyset[keyIndex];

	        if (!isNumber(key) /* || hash[key] === true*/ ) {
	            isSparseRange = false;
	            break;
	        }
	        // hash[key] = true;
	        // Cast number indexes to integers.
	        keyset[keyIndex] = parseInt(key, 10);
	    }

	    if (isSparseRange === true) {

	        keyset.sort(sortListAscending);

	        var from = keyset[0];
	        var to = keyset[keyCount];

	        // If we re-introduce deduped integer indexers, change this comparson to "===".
	        if (to - from <= keyCount) {
	            return {
	                from: from,
	                to: to
	            };
	        }
	    }

	    return keyset;
	}

	function sortListAscending(a, b) {
	    return a - b;
	}

	/* jshint forin: false */
	function getSortedKeys(map, keys, sort) {
	    var len = 0;
	    for (var key in map) {
	        keys[len++] = key;
	    }
	    if (len > 1) {
	        keys.sort(sort);
	    }
	    return len;
	}

	function getHashCode(key) {
	    var code = 5381;
	    var index = -1;
	    var count = key.length;
	    while (++index < count) {
	        code = (code << 5) + code + key.charCodeAt(index);
	    }
	    return String(code);
	}

	/**
	 * Return true if argument is a number or can be cast to a number
	 * @private
	 */
	function isNumber(val) {
	    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
	    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	    // subtraction forces infinities to NaN
	    // adding 1 corrects loss of precision from parseFloat (#15100)
	    return !isArray(val) && (val - parseFloat(val) + 1) >= 0;
	}



/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var toPaths = __webpack_require__(80);
	var toTree = __webpack_require__(75);

	module.exports = function collapse(paths) {
	    var collapseMap = paths.
	        reduce(function(acc, path) {
	            var len = path.length;
	            if (!acc[len]) {
	                acc[len] = [];
	            }
	            acc[len].push(path);
	            return acc;
	        }, {});

	    Object.
	        keys(collapseMap).
	        forEach(function(collapseKey) {
	            collapseMap[collapseKey] = toTree(collapseMap[collapseKey]);
	        });

	    return toPaths(collapseMap);
	};


/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = function arrayMap(array, selector) {
	    var i = -1;
	    var n = array.length;
	    var array2 = new Array(n);
	    while (++i < n) {
	        array2[i] = selector(array[i], i, array);
	    }
	    return array2;
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __ref = __webpack_require__(86);
	var __context = __webpack_require__(87);
	var __version = __webpack_require__(88);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	var $ref = __webpack_require__(91);

	var promote = __webpack_require__(92);
	var isExpired = __webpack_require__(98);
	var isFunction = __webpack_require__(61);
	var isPrimitive = __webpack_require__(101);
	var expireNode = __webpack_require__(102);
	var iterateKeySet = __webpack_require__(73).iterateKeySet;
	var incrementVersion = __webpack_require__(105);
	var mergeJSONGraphNode = __webpack_require__(106);

	/**
	 * Merges a list of JSON Graph Envelopes into a cache JSON Graph.
	 * @function
	 * @param {Object} model - the Model for which to insert the PathValues.
	 * @param {Array.<PathValue>} jsonGraphEnvelopes - the PathValues to set.
	 * @return {Array.<Path>} - a list of optimized paths for the successfully set values.
	 */

	module.exports = function setJSONGraphs(model, jsonGraphEnvelopes, x, errorSelector, comparator) {

	    var modelRoot = model._root;
	    var lru = modelRoot;
	    var expired = modelRoot.expired;
	    var version = incrementVersion();
	    var cache = modelRoot.cache;
	    var initialVersion = cache[__version];

	    var requestedPath = [];
	    var optimizedPath = [];
	    var requestedPaths = [];
	    var optimizedPaths = [];
	    var jsonGraphEnvelopeIndex = -1;
	    var jsonGraphEnvelopeCount = jsonGraphEnvelopes.length;

	    while (++jsonGraphEnvelopeIndex < jsonGraphEnvelopeCount) {

	        var jsonGraphEnvelope = jsonGraphEnvelopes[jsonGraphEnvelopeIndex];
	        var paths = jsonGraphEnvelope.paths;
	        var jsonGraph = jsonGraphEnvelope.jsonGraph;

	        var pathIndex = -1;
	        var pathCount = paths.length;

	        while (++pathIndex < pathCount) {

	            var path = paths[pathIndex];
	            optimizedPath.index = 0;

	            setJSONGraphPathSet(
	                path, 0,
	                cache, cache, cache,
	                jsonGraph, jsonGraph, jsonGraph,
	                requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	                version, expired, lru, comparator, errorSelector
	            );
	        }
	    }

	    var newVersion = cache[__version];
	    var rootChangeHandler = modelRoot.onChange;

	    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
	        rootChangeHandler();
	    }

	    return [requestedPaths, optimizedPaths];
	};

	/* eslint-disable no-constant-condition */
	function setJSONGraphPathSet(
	    path, depth, root, parent, node,
	    messageRoot, messageParent, message,
	    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var note = {};
	    var branch = depth < path.length - 1;
	    var keySet = path[depth];
	    var key = iterateKeySet(keySet, note);
	    var optimizedIndex = optimizedPath.index;

	    do {
	        var results = setNode(
	            root, parent, node, messageRoot, messageParent, message,
	            key, branch, false, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector
	        );
	        requestedPath[depth] = key;
	        requestedPath.index = depth;
	        optimizedPath[optimizedPath.index++] = key;
	        var nextNode = results[0];
	        var nextParent = results[1];
	        if (nextNode) {
	            if (branch) {
	                setJSONGraphPathSet(
	                    path, depth + 1, root, nextParent, nextNode,
	                    messageRoot, results[3], results[2],
	                    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	                    version, expired, lru, comparator, errorSelector
	                );
	            } else {
	                promote(lru, nextNode);
	                requestedPaths.push(requestedPath.slice(0, requestedPath.index + 1));
	                optimizedPaths.push(optimizedPath.slice(0, optimizedPath.index));
	            }
	        }
	        key = iterateKeySet(keySet, note);
	        if (note.done) {
	            break;
	        }
	        optimizedPath.index = optimizedIndex;
	    } while (true);
	}
	/* eslint-enable */

	function setReference(
	    root, node, messageRoot, message, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var reference = node.value;
	    optimizedPath.splice(0, optimizedPath.length);
	    optimizedPath.push.apply(optimizedPath, reference);

	    if (isExpired(node)) {
	        optimizedPath.index = reference.length;
	        expireNode(node, expired, lru);
	        return [undefined, root, message, messageRoot];
	    }

	    promote(lru, node);

	    var index = 0;
	    var container = node;
	    var count = reference.length - 1;
	    var parent = node = root;
	    var messageParent = message = messageRoot;

	    do {
	        var key = reference[index];
	        var branch = index < count;
	        var results = setNode(
	            root, parent, node, messageRoot, messageParent, message,
	            key, branch, true, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector
	        );
	        node = results[0];
	        if (isPrimitive(node)) {
	            optimizedPath.index = index;
	            return results;
	        }
	        parent = results[1];
	        message = results[2];
	        messageParent = results[3];
	    } while (index++ < count);

	    optimizedPath.index = index;

	    if (container[__context] !== node) {
	        var backRefs = node[__refsLength] || 0;
	        node[__refsLength] = backRefs + 1;
	        node[__ref + backRefs] = container;
	        container[__context] = node;
	        container[__refIndex] = backRefs;
	    }

	    return [node, parent, message, messageParent];
	}

	function setNode(
	    root, parent, node, messageRoot, messageParent, message,
	    key, branch, reference, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var type = node.$type;

	    while (type === $ref) {

	        var results = setReference(
	            root, node, messageRoot, message, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector
	        );

	        node = results[0];

	        if (isPrimitive(node)) {
	            return results;
	        }

	        parent = results[1];
	        message = results[2];
	        messageParent = results[3];
	        type = node.$type;
	    }

	    if (type !== void 0) {
	        return [node, parent, message, messageParent];
	    }

	    if (key == null) {
	        if (branch) {
	            throw new Error("`null` is not allowed in branch key positions.");
	        } else if (node) {
	            key = node[__key];
	        }
	    } else {
	        parent = node;
	        messageParent = message;
	        node = parent[key];
	        message = messageParent && messageParent[key];
	    }

	    node = mergeJSONGraphNode(
	        parent, node, message, key, requestedPath, optimizedPath,
	        version, expired, lru, comparator, errorSelector
	    );

	    return [node, parent, message, messageParent];
	}


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "key";


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * http://en.wikipedia.org/wiki/Delimiter#ASCIIDelimitedText
	 * record separator character.
	 */
	module.exports = String.fromCharCode(30);


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "ref";


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "context";


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "version";


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "ref-index";


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "refs-length";


/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = "ref";


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var $expiresNever = __webpack_require__(93);
	var __head = __webpack_require__(94);
	var __tail = __webpack_require__(95);
	var __next = __webpack_require__(96);
	var __prev = __webpack_require__(97);

	var isObject = __webpack_require__(63);

	module.exports = function lruPromote(root, node) {

	    if (isObject(node) && (node.$expires !== $expiresNever)) {

	        var head = root[__head],
	            tail = root[__tail],
	            next = node[__next],
	            prev = node[__prev];

	        if (node !== head) {

	            if (next != null && typeof next === "object") {
	                next[__prev] = prev;
	            }

	            if (prev != null && typeof prev === "object") {
	                prev[__next] = next;
	            }

	            next = head;

	            if (head != null && typeof head === "object") {
	                head[__prev] = node;
	            }

	            root[__head] = root[__next] = head = node;
	            head[__next] = next;
	            head[__prev] = void 0;
	        }

	        if (tail == null || node === tail) {
	            root[__tail] = root[__prev] = tail = prev || node;
	        }
	    }
	    return node;
	};


/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = 1;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "head";


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "tail";


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "next";


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "prev";


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(99);
	var $now = __webpack_require__(100);
	var $never = __webpack_require__(93);

	module.exports = function isAlreadyExpired(node) {
	    var exp = node.$expires;
	    return (exp != null) && (
	        exp !== $never) && (
	        exp !== $now) && (
	        exp < now());
	};


/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = Date.now;


/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = 0;


/***/ },
/* 101 */
/***/ function(module, exports) {

	var objTypeof = "object";
	module.exports = function isPrimitive(value) {
	    return value == null || typeof value !== objTypeof;
	};


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var splice = __webpack_require__(103);
	var __invalidated = __webpack_require__(104);

	module.exports = function expireNode(node, expired, lru) {
	    if (!node[__invalidated]) {
	        node[__invalidated] = true;
	        expired.push(node);
	        splice(lru, node);
	    }
	    return node;
	};


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var __head = __webpack_require__(94);
	var __tail = __webpack_require__(95);
	var __next = __webpack_require__(96);
	var __prev = __webpack_require__(97);

	module.exports = function lruSplice(root, node) {

	    var head = root[__head],
	        tail = root[__tail],
	        next = node[__next],
	        prev = node[__prev];

	    if (next != null && typeof next === "object") {
	        next[__prev] = prev;
	    }

	    if (prev != null && typeof prev === "object") {
	        prev[__next] = next;
	    }

	    if (node === head) {
	        root[__head] = root[__next] = next;
	    }

	    if (node === tail) {
	        root[__tail] = root[__prev] = prev;
	    }

	    node[__next] = node[__prev] = void 0;
	    head = tail = next = prev = void 0;
	};


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "invalidated";


/***/ },
/* 105 */
/***/ function(module, exports) {

	var version = 1;
	module.exports = function incrementVersion() {
	    return version++;
	};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __parent = __webpack_require__(107);

	var $ref = __webpack_require__(91);
	var $error = __webpack_require__(108);
	var getSize = __webpack_require__(109);
	var getTimestamp = __webpack_require__(110);
	var isObject = __webpack_require__(63);
	var isExpired = __webpack_require__(111);
	var isFunction = __webpack_require__(61);

	var promote = __webpack_require__(92);
	var wrapNode = __webpack_require__(112);
	var insertNode = __webpack_require__(127);
	var expireNode = __webpack_require__(102);
	var replaceNode = __webpack_require__(128);
	var updateNodeAncestors = __webpack_require__(134);

	module.exports = function mergeJSONGraphNode(
	    parent, node, message, key, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var sizeOffset;

	    var cType, mType,
	        cIsObject, mIsObject,
	        cTimestamp, mTimestamp;

	    // If the cache and message are the same, we can probably return early:
	    // - If they're both nullsy,
	    //   - If null then the node needs to be wrapped in an atom and inserted.
	    //     This happens from whole branch merging when a leaf is just a null value
	    //     instead of being wrapped in an atom.
	    //   - If undefined then return null (previous behavior).
	    // - If they're both branches, return the branch.
	    // - If they're both edges, continue below.
	    if (node === message) {

	        // There should not be undefined values.  Those should always be
	        // wrapped in an $atom
	        if (message === null) {
	            node = wrapNode(message, undefined, message);
	            parent = updateNodeAncestors(parent, -node.$size, lru, version);
	            node = insertNode(node, parent, key);
	            promote(lru, node);
	            return node;
	        }

	        // The messange and cache are both undefined, therefore return null.
	        else if (message === undefined) {
	            return message;
	        }

	        else {
	            cIsObject = isObject(node);
	            if (cIsObject) {
	                // Is the cache node a branch? If so, return the cache branch.
	                cType = node.$type;
	                if (cType == null) {
	                    // Has the branch been introduced to the cache yet? If not,
	                    // give it a parent and key.
	                    if (node[__parent] == null) {
	                        node[__key] = key;
	                        node[__parent] = parent;
	                    }
	                    return node;
	                }
	            }
	        }
	    } else {
	        cIsObject = isObject(node);
	        if (cIsObject) {
	            cType = node.$type;
	        }
	    }

	    // If the cache isn't a reference, we might be able to return early.
	    if (cType !== $ref) {
	        mIsObject = isObject(message);
	        if (mIsObject) {
	            mType = message.$type;
	        }
	        if (cIsObject && !cType) {
	            // If the cache is a branch and the message is empty or
	            // also a branch, continue with the cache branch.
	            if (message == null || (mIsObject && !mType)) {
	                return node;
	            }
	        }
	    }
	    // If the cache is a reference, we might not need to replace it.
	    else {
	        // If the cache is a reference, but the message is empty, leave the cache alone...
	        if (message == null) {
	            // ...unless the cache is an expired reference. In that case, expire
	            // the cache node and return undefined.
	            if (isExpired(node)) {
	                expireNode(node, expired, lru);
	                return void 0;
	            }
	            return node;
	        }
	        mIsObject = isObject(message);
	        if (mIsObject) {
	            mType = message.$type;
	            // If the cache and the message are both references,
	            // check if we need to replace the cache reference.
	            if (mType === $ref) {
	                if (node === message) {
	                    // If the cache and message are the same reference,
	                    // we performed a whole-branch merge of one of the
	                    // grandparents. If we've previously graphed this
	                    // reference, break early. Otherwise, continue to
	                    // leaf insertion below.
	                    if (node[__parent] != null) {
	                        return node;
	                    }
	                } else {

	                    cTimestamp = node.$timestamp;
	                    mTimestamp = message.$timestamp;

	                    // - If either the cache or message reference is expired,
	                    //   replace the cache reference with the message.
	                    // - If neither of the references are expired, compare their
	                    //   timestamps. If either of them don't have a timestamp,
	                    //   or the message's timestamp is newer, replace the cache
	                    //   reference with the message reference.
	                    // - If the message reference is older than the cache
	                    //   reference, short-circuit.
	                    if (!isExpired(node) && !isExpired(message) && mTimestamp < cTimestamp) {
	                        return void 0;
	                    }
	                }
	            }
	        }
	    }

	    // If the cache is a leaf but the message is a branch, merge the branch over the leaf.
	    if (cType && mIsObject && !mType) {
	        return insertNode(replaceNode(node, message, parent, key, lru), parent, key);
	    }
	    // If the message is a sentinel or primitive, insert it into the cache.
	    else if (mType || !mIsObject) {
	        // If the cache and the message are the same value, we branch-merged one
	        // of the message's ancestors. If this is the first time we've seen this
	        // leaf, give the message a $size and $type, attach its graph pointers,
	        // and update the cache sizes and versions.
	        if (mType && node === message) {
	            if (node[__parent] == null) {
	                node = wrapNode(node, cType, node.value);
	                parent = updateNodeAncestors(parent, -node.$size, lru, version);
	                node = insertNode(node, parent, key, version);
	            }
	        }
	        // If the cache and message are different, or the message is a
	        // primitive, replace the cache with the message value. If the message
	        // is a sentinel, clone and maintain its type. If the message is a
	        // primitive value, wrap it in an atom.
	        else {
	            var isDistinct = true;
	            // If the cache is a branch, but the message is a leaf, replace the
	            // cache branch with the message leaf.
	            if (cType || !cIsObject) {
	                // Compare the current cache value with the new value. If either of
	                // them don't have a timestamp, or the message's timestamp is newer,
	                // replace the cache value with the message value. If a comparator
	                // is specified, the comparator takes precedence over timestamps.
	                //
	                // Comparing either Number or undefined to undefined always results in false.
	                isDistinct = (getTimestamp(message) < getTimestamp(node)) === false;
	                // If at least one of the cache/message are sentinels, compare them.
	                if ((cType || mType) && isFunction(comparator)) {
	                    isDistinct = !comparator(node, message, optimizedPath.slice(0, optimizedPath.index));
	                }
	            }
	            if (isDistinct) {
	                message = wrapNode(message, mType, mType ? message.value : message);

	                if (mType === $error && isFunction(errorSelector)) {
	                    message = errorSelector(requestedPath.slice(0, requestedPath.index), message);
	                }

	                sizeOffset = getSize(node) - getSize(message);
	                node = replaceNode(node, message, parent, key, lru);
	                parent = updateNodeAncestors(parent, sizeOffset, lru, version);
	                node = insertNode(node, parent, key, version);
	            }
	        }

	        // Promote the message edge in the LRU.
	        if (isExpired(node)) {
	            expireNode(node, expired, lru);
	        } else {
	            promote(lru, node);
	        }
	    }
	    else if (node == null) {
	        node = insertNode(message, parent, key);
	    }

	    return node;
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85) + "parent";


/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "error";


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(63);
	module.exports = function getSize(node) {
	    return isObject(node) && node.$size || 0;
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(63);
	module.exports = function getTimestamp(node) {
	    return isObject(node) && node.$timestamp || undefined;
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(99);
	var $now = __webpack_require__(100);
	var $never = __webpack_require__(93);

	module.exports = function isExpired(node) {
	    var exp = node.$expires;
	    return (exp != null) && (
	        exp !== $never ) && (
	        exp === $now || exp < now());
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var jsong = __webpack_require__(113);
	var $atom = jsong.atom;

	var now = __webpack_require__(99);
	var expiresNow = __webpack_require__(100);

	var __modelCreated = __webpack_require__(124);

	var atomSize = 50;

	var clone = __webpack_require__(125);
	var isArray = Array.isArray;
	var getSize = __webpack_require__(109);
	var getExpires = __webpack_require__(126);

	module.exports = function wrapNode(nodeArg, typeArg, value) {

	    var size = 0;
	    var node = nodeArg;
	    var type = typeArg;

	    if (type) {
	        node = clone(node);
	        size = getSize(node);
	        node.$type = type;
	    } else {
	        node = $atom(value);
	        type = node.$type;
	        node[__modelCreated] = true;
	    }

	    if (value == null) {
	        size = atomSize + 1;
	    } else if (size == null || size <= 0) {
	        switch (typeof value) {
	            case "object":
	                if (isArray(value)) {
	                    size = atomSize + value.length;
	                } else {
	                    size = atomSize + 1;
	                }
	                break;
	            case "string":
	                size = atomSize + value.length;
	                break;
	            default:
	                size = atomSize + 1;
	                break;
	        }
	    }

	    var expires = getExpires(node);

	    if (typeof expires === "number" && expires < expiresNow) {
	        node.$expires = now() + (expires * -1);
	    }

	    node.$size = size;

	    return node;
	};


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var pathSyntax = __webpack_require__(114);

	function sentinel(type, value, props) {
	    var copy = Object.create(null);
	    if (props != null) {
	        for(var key in props) {
	            copy[key] = props[key];
	        }
	        
	        copy["$type"] = type;
	        copy.value = value;
	        return copy;
	    }
	    else {
	        return { $type: type, value: value };
	    }    
	}

	module.exports = {
	    ref: function ref(path, props) {
	        return sentinel("ref", pathSyntax.fromPath(path), props);
	    },
	    atom: function atom(value, props) {
	        return sentinel("atom", value, props);        
	    },
	    undefined: function() {
	        return sentinel("atom");
	    },    
	    error: function error(errorValue, props) {
	        return sentinel("error", errorValue, props);        
	    },
	    pathValue: function pathValue(path, value) {
	        return { path: pathSyntax.fromPath(path), value: value };
	    },
	    pathInvalidation: function pathInvalidation(path) {
	        return { path: pathSyntax.fromPath(path), invalidated: true };
	    }    
	};


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var Tokenizer = __webpack_require__(115);
	var head = __webpack_require__(117);
	var RoutedTokens = __webpack_require__(123);

	var parser = function parser(string, extendedRules) {
	    return head(new Tokenizer(string, extendedRules));
	};

	module.exports = parser;

	// Constructs the paths from paths / pathValues that have strings.
	// If it does not have a string, just moves the value into the return
	// results.
	parser.fromPathsOrPathValues = function(paths, ext) {
	    if (!paths) {
	        return [];
	    }

	    var out = [];
	    for (i = 0, len = paths.length; i < len; i++) {

	        // Is the path a string
	        if (typeof paths[i] === 'string') {
	            out[i] = parser(paths[i], ext);
	        }

	        // is the path a path value with a string value.
	        else if (typeof paths[i].path === 'string') {
	            out[i] = {
	                path: parser(paths[i].path, ext), value: paths[i].value
	            };
	        }

	        // just copy it over.
	        else {
	            out[i] = paths[i];
	        }
	    }

	    return out;
	};

	// If the argument is a string, this with convert, else just return
	// the path provided.
	parser.fromPath = function(path, ext) {
	    if (!path) {
	        return [];
	    }

	    if (typeof path === 'string') {
	        return parser(path, ext);
	    }

	    return path;
	};

	// Potential routed tokens.
	parser.RoutedTokens = RoutedTokens;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var TokenTypes = __webpack_require__(116);
	var DOT_SEPARATOR = '.';
	var COMMA_SEPARATOR = ',';
	var OPENING_BRACKET = '[';
	var CLOSING_BRACKET = ']';
	var OPENING_BRACE = '{';
	var CLOSING_BRACE = '}';
	var COLON = ':';
	var ESCAPE = '\\';
	var DOUBLE_OUOTES = '"';
	var SINGE_OUOTES = "'";
	var SPACE = " ";
	var SPECIAL_CHARACTERS = '\\\'"[]., ';
	var EXT_SPECIAL_CHARACTERS = '\\{}\'"[]., :';

	var Tokenizer = module.exports = function(string, ext) {
	    this._string = string;
	    this._idx = -1;
	    this._extended = ext;
	    this.parseString = '';
	};

	Tokenizer.prototype = {
	    /**
	     * grabs the next token either from the peek operation or generates the
	     * next token.
	     */
	    next: function() {
	        var nextToken = this._nextToken ?
	            this._nextToken : getNext(this._string, this._idx, this._extended);

	        this._idx = nextToken.idx;
	        this._nextToken = false;
	        this.parseString += nextToken.token.token;

	        return nextToken.token;
	    },

	    /**
	     * will peak but not increment the tokenizer
	     */
	    peek: function() {
	        var nextToken = this._nextToken ?
	            this._nextToken : getNext(this._string, this._idx, this._extended);
	        this._nextToken = nextToken;

	        return nextToken.token;
	    }
	};

	Tokenizer.toNumber = function toNumber(x) {
	    if (!isNaN(+x)) {
	        return +x;
	    }
	    return NaN;
	};

	function toOutput(token, type, done) {
	    return {
	        token: token,
	        done: done,
	        type: type
	    };
	}

	function getNext(string, idx, ext) {
	    var output = false;
	    var token = '';
	    var specialChars = ext ?
	        EXT_SPECIAL_CHARACTERS : SPECIAL_CHARACTERS;
	    do {

	        done = idx + 1 >= string.length;
	        if (done) {
	            break;
	        }

	        // we have to peek at the next token
	        var character = string[idx + 1];

	        if (character !== undefined &&
	            specialChars.indexOf(character) === -1) {

	            token += character;
	            ++idx;
	            continue;
	        }

	        // The token to delimiting character transition.
	        else if (token.length) {
	            break;
	        }

	        ++idx;
	        var type;
	        switch (character) {
	            case DOT_SEPARATOR:
	                type = TokenTypes.dotSeparator;
	                break;
	            case COMMA_SEPARATOR:
	                type = TokenTypes.commaSeparator;
	                break;
	            case OPENING_BRACKET:
	                type = TokenTypes.openingBracket;
	                break;
	            case CLOSING_BRACKET:
	                type = TokenTypes.closingBracket;
	                break;
	            case OPENING_BRACE:
	                type = TokenTypes.openingBrace;
	                break;
	            case CLOSING_BRACE:
	                type = TokenTypes.closingBrace;
	                break;
	            case SPACE:
	                type = TokenTypes.space;
	                break;
	            case DOUBLE_OUOTES:
	            case SINGE_OUOTES:
	                type = TokenTypes.quote;
	                break;
	            case ESCAPE:
	                type = TokenTypes.escape;
	                break;
	            case COLON:
	                type = TokenTypes.colon;
	                break;
	            default:
	                type = TokenTypes.unknown;
	                break;
	        }
	        output = toOutput(character, type, false);
	        break;
	    } while (!done);

	    if (!output && token.length) {
	        output = toOutput(token, TokenTypes.token, false);
	    }

	    if (!output) {
	        output = {done: true};
	    }

	    return {
	        token: output,
	        idx: idx
	    };
	}




/***/ },
/* 116 */
/***/ function(module, exports) {

	var TokenTypes = {
	    token: 'token',
	    dotSeparator: '.',
	    commaSeparator: ',',
	    openingBracket: '[',
	    closingBracket: ']',
	    openingBrace: '{',
	    closingBrace: '}',
	    escape: '\\',
	    space: ' ',
	    colon: ':',
	    quote: 'quote',
	    unknown: 'unknown'
	};

	module.exports = TokenTypes;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var TokenTypes = __webpack_require__(116);
	var E = __webpack_require__(118);
	var indexer = __webpack_require__(119);

	/**
	 * The top level of the parse tree.  This returns the generated path
	 * from the tokenizer.
	 */
	module.exports = function head(tokenizer) {
	    var token = tokenizer.next();
	    var state = {};
	    var out = [];

	    while (!token.done) {

	        switch (token.type) {
	            case TokenTypes.token:
	                var first = +token.token[0];
	                if (!isNaN(first)) {
	                    E.throwError(E.invalidIdentifier, tokenizer);
	                }
	                out[out.length] = token.token;
	                break;

	            // dotSeparators at the top level have no meaning
	            case TokenTypes.dotSeparator:
	                if (out.length === 0) {
	                    E.throwError(E.unexpectedToken, tokenizer);
	                }
	                break;

	            // Spaces do nothing.
	            case TokenTypes.space:
	                // NOTE: Spaces at the top level are allowed.
	                // titlesById  .summary is a valid path.
	                break;


	            // Its time to decend the parse tree.
	            case TokenTypes.openingBracket:
	                indexer(tokenizer, token, state, out);
	                break;

	            default:
	                E.throwError(E.unexpectedToken, tokenizer);
	                break;
	        }

	        // Keep cycling through the tokenizer.
	        token = tokenizer.next();
	    }

	    if (out.length === 0) {
	        E.throwError(E.invalidPath, tokenizer);
	    }

	    return out;
	};



/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = {
	    indexer: {
	        nested: 'Indexers cannot be nested.',
	        needQuotes: 'unquoted indexers must be numeric.',
	        empty: 'cannot have empty indexers.',
	        leadingDot: 'Indexers cannot have leading dots.',
	        leadingComma: 'Indexers cannot have leading comma.',
	        requiresComma: 'Indexers require commas between indexer args.',
	        routedTokens: 'Only one token can be used per indexer when specifying routed tokens.'
	    },
	    range: {
	        precedingNaN: 'ranges must be preceded by numbers.',
	        suceedingNaN: 'ranges must be suceeded by numbers.'
	    },
	    routed: {
	        invalid: 'Invalid routed token.  only integers|ranges|keys are supported.'
	    },
	    quote: {
	        empty: 'cannot have empty quoted keys.',
	        illegalEscape: 'Invalid escape character.  Only quotes are escapable.'
	    },
	    unexpectedToken: 'Unexpected token.',
	    invalidIdentifier: 'Invalid Identifier.',
	    invalidPath: 'Please provide a valid path.',
	    throwError: function(err, tokenizer, token) {
	        if (token) {
	            throw err + ' -- ' + tokenizer.parseString + ' with next token: ' + token;
	        }
	        throw err + ' -- ' + tokenizer.parseString;
	    }
	};



/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var TokenTypes = __webpack_require__(116);
	var E = __webpack_require__(118);
	var idxE = E.indexer;
	var range = __webpack_require__(120);
	var quote = __webpack_require__(121);
	var routed = __webpack_require__(122);

	/**
	 * The indexer is all the logic that happens in between
	 * the '[', opening bracket, and ']' closing bracket.
	 */
	module.exports = function indexer(tokenizer, openingToken, state, out) {
	    var token = tokenizer.next();
	    var done = false;
	    var allowedMaxLength = 1;
	    var routedIndexer = false;

	    // State variables
	    state.indexer = [];

	    while (!token.done) {

	        switch (token.type) {
	            case TokenTypes.token:
	            case TokenTypes.quote:

	                // ensures that token adders are properly delimited.
	                if (state.indexer.length === allowedMaxLength) {
	                    E.throwError(idxE.requiresComma, tokenizer);
	                }
	                break;
	        }

	        switch (token.type) {
	            // Extended syntax case
	            case TokenTypes.openingBrace:
	                routedIndexer = true;
	                routed(tokenizer, token, state, out);
	                break;


	            case TokenTypes.token:
	                var t = +token.token;
	                if (isNaN(t)) {
	                    E.throwError(idxE.needQuotes, tokenizer);
	                }
	                state.indexer[state.indexer.length] = t;
	                break;

	            // dotSeparators at the top level have no meaning
	            case TokenTypes.dotSeparator:
	                if (!state.indexer.length) {
	                    E.throwError(idxE.leadingDot, tokenizer);
	                }
	                range(tokenizer, token, state, out);
	                break;

	            // Spaces do nothing.
	            case TokenTypes.space:
	                break;

	            case TokenTypes.closingBracket:
	                done = true;
	                break;


	            // The quotes require their own tree due to what can be in it.
	            case TokenTypes.quote:
	                quote(tokenizer, token, state, out);
	                break;


	            // Its time to decend the parse tree.
	            case TokenTypes.openingBracket:
	                E.throwError(idxE.nested, tokenizer);
	                break;

	            case TokenTypes.commaSeparator:
	                ++allowedMaxLength;
	                break;

	            default:
	                E.throwError(E.unexpectedToken, tokenizer);
	                break;
	        }

	        // If done, leave loop
	        if (done) {
	            break;
	        }

	        // Keep cycling through the tokenizer.
	        token = tokenizer.next();
	    }

	    if (state.indexer.length === 0) {
	        E.throwError(idxE.empty, tokenizer);
	    }

	    if (state.indexer.length > 1 && routedIndexer) {
	        E.throwError(idxE.routedTokens, tokenizer);
	    }

	    // Remember, if an array of 1, keySets will be generated.
	    if (state.indexer.length === 1) {
	        state.indexer = state.indexer[0];
	    }

	    out[out.length] = state.indexer;

	    // Clean state.
	    state.indexer = undefined;
	};



/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var Tokenizer = __webpack_require__(115);
	var TokenTypes = __webpack_require__(116);
	var E = __webpack_require__(118);

	/**
	 * The indexer is all the logic that happens in between
	 * the '[', opening bracket, and ']' closing bracket.
	 */
	module.exports = function range(tokenizer, openingToken, state, out) {
	    var token = tokenizer.peek();
	    var dotCount = 1;
	    var done = false;
	    var inclusive = true;

	    // Grab the last token off the stack.  Must be an integer.
	    var idx = state.indexer.length - 1;
	    var from = Tokenizer.toNumber(state.indexer[idx]);
	    var to;

	    if (isNaN(from)) {
	        E.throwError(E.range.precedingNaN, tokenizer);
	    }

	    // Why is number checking so difficult in javascript.

	    while (!done && !token.done) {

	        switch (token.type) {

	            // dotSeparators at the top level have no meaning
	            case TokenTypes.dotSeparator:
	                if (dotCount === 3) {
	                    E.throwError(E.unexpectedToken, tokenizer);
	                }
	                ++dotCount;

	                if (dotCount === 3) {
	                    inclusive = false;
	                }
	                break;

	            case TokenTypes.token:
	                // move the tokenizer forward and save to.
	                to = Tokenizer.toNumber(tokenizer.next().token);

	                // throw potential error.
	                if (isNaN(to)) {
	                    E.throwError(E.range.suceedingNaN, tokenizer);
	                }

	                done = true;
	                break;

	            default:
	                done = true;
	                break;
	        }

	        // Keep cycling through the tokenizer.  But ranges have to peek
	        // before they go to the next token since there is no 'terminating'
	        // character.
	        if (!done) {
	            tokenizer.next();

	            // go to the next token without consuming.
	            token = tokenizer.peek();
	        }

	        // break and remove state information.
	        else {
	            break;
	        }
	    }

	    state.indexer[idx] = {from: from, to: inclusive ? to : to - 1};
	};



/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var TokenTypes = __webpack_require__(116);
	var E = __webpack_require__(118);
	var quoteE = E.quote;

	/**
	 * quote is all the parse tree in between quotes.  This includes the only
	 * escaping logic.
	 *
	 * parse-tree:
	 * <opening-quote>(.|(<escape><opening-quote>))*<opening-quote>
	 */
	module.exports = function quote(tokenizer, openingToken, state, out) {
	    var token = tokenizer.next();
	    var innerToken = '';
	    var openingQuote = openingToken.token;
	    var escaping = false;
	    var done = false;

	    while (!token.done) {

	        switch (token.type) {
	            case TokenTypes.token:
	            case TokenTypes.space:

	            case TokenTypes.dotSeparator:
	            case TokenTypes.commaSeparator:

	            case TokenTypes.openingBracket:
	            case TokenTypes.closingBracket:
	            case TokenTypes.openingBrace:
	            case TokenTypes.closingBrace:
	                if (escaping) {
	                    E.throwError(quoteE.illegalEscape, tokenizer);
	                }

	                innerToken += token.token;
	                break;


	            case TokenTypes.quote:
	                // the simple case.  We are escaping
	                if (escaping) {
	                    innerToken += token.token;
	                    escaping = false;
	                }

	                // its not a quote that is the opening quote
	                else if (token.token !== openingQuote) {
	                    innerToken += token.token;
	                }

	                // last thing left.  Its a quote that is the opening quote
	                // therefore we must produce the inner token of the indexer.
	                else {
	                    done = true;
	                }

	                break;
	            case TokenTypes.escape:
	                escaping = true;
	                break;

	            default:
	                E.throwError(E.unexpectedToken, tokenizer);
	        }

	        // If done, leave loop
	        if (done) {
	            break;
	        }

	        // Keep cycling through the tokenizer.
	        token = tokenizer.next();
	    }

	    if (innerToken.length === 0) {
	        E.throwError(quoteE.empty, tokenizer);
	    }

	    state.indexer[state.indexer.length] = innerToken;
	};



/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var TokenTypes = __webpack_require__(116);
	var RoutedTokens = __webpack_require__(123);
	var E = __webpack_require__(118);
	var routedE = E.routed;

	/**
	 * The routing logic.
	 *
	 * parse-tree:
	 * <opening-brace><routed-token>(:<token>)<closing-brace>
	 */
	module.exports = function routed(tokenizer, openingToken, state, out) {
	    var routeToken = tokenizer.next();
	    var named = false;
	    var name = '';

	    // ensure the routed token is a valid ident.
	    switch (routeToken.token) {
	        case RoutedTokens.integers:
	        case RoutedTokens.ranges:
	        case RoutedTokens.keys:
	            //valid
	            break;
	        default:
	            E.throwError(routedE.invalid, tokenizer);
	            break;
	    }

	    // Now its time for colon or ending brace.
	    var next = tokenizer.next();

	    // we are parsing a named identifier.
	    if (next.type === TokenTypes.colon) {
	        named = true;

	        // Get the token name.
	        next = tokenizer.next();
	        if (next.type !== TokenTypes.token) {
	            E.throwError(routedE.invalid, tokenizer);
	        }
	        name = next.token;

	        // move to the closing brace.
	        next = tokenizer.next();
	    }

	    // must close with a brace.

	    if (next.type === TokenTypes.closingBrace) {
	        var outputToken = {
	            type: routeToken.token,
	            named: named,
	            name: name
	        };
	        state.indexer[state.indexer.length] = outputToken;
	    }

	    // closing brace expected
	    else {
	        E.throwError(routedE.invalid, tokenizer);
	    }

	};



/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = {
	    integers: 'integers',
	    ranges: 'ranges',
	    keys: 'keys'
	};


/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = "$modelCreated";


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var prefix = __webpack_require__(85);
	var hasOwn = __webpack_require__(62);
	var isArray = Array.isArray;
	var isObject = __webpack_require__(63);

	module.exports = function clone(value) {
	    var dest = value;
	    if (isObject(dest)) {
	        dest = isArray(value) ? [] : {};
	        var src = value;
	        for (var key in src) {
	            if (key[0] === prefix || !hasOwn(src, key)) {
	                continue;
	            }
	            dest[key] = src[key];
	        }
	    }
	    return dest;
	};


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(63);
	module.exports = function getSize(node) {
	    return isObject(node) && node.$expires || undefined;
	};


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __parent = __webpack_require__(107);
	var __version = __webpack_require__(88);

	module.exports = function insertNode(node, parent, key, version) {
	    node[__key] = key;
	    node[__parent] = parent;
	    node[__version] = version;
	    parent[key] = node;
	    return node;
	};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(63);
	var transferBackReferences = __webpack_require__(129);
	var removeNodeAndDescendants = __webpack_require__(130);

	module.exports = function replaceNode(node, replacement, parent, key, lru) {
	    if (node === replacement) {
	        return node;
	    } else if (isObject(node)) {
	        transferBackReferences(node, replacement);
	        removeNodeAndDescendants(node, parent, key, lru);
	    }
	    parent[key] = replacement;
	    return replacement;
	};


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __ref = __webpack_require__(86);
	var __context = __webpack_require__(87);
	var __refsLength = __webpack_require__(90);

	module.exports = function transferBackReferences(fromNode, destNode) {
	    var fromNodeRefsLength = fromNode[__refsLength] || 0,
	        destNodeRefsLength = destNode[__refsLength] || 0,
	        i = -1;
	    while (++i < fromNodeRefsLength) {
	        var ref = fromNode[__ref + i];
	        if (ref !== void 0) {
	            ref[__context] = destNode;
	            destNode[__ref + (destNodeRefsLength + i)] = ref;
	            fromNode[__ref + i] = void 0;
	        }
	    }
	    destNode[__refsLength] = fromNodeRefsLength + destNodeRefsLength;
	    fromNode[__refsLength] = void 0;
	    return destNode;
	};


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(62);
	var prefix = __webpack_require__(85);
	var removeNode = __webpack_require__(131);

	module.exports = function removeNodeAndDescendants(node, parent, key, lru) {
	    if (removeNode(node, parent, key, lru)) {
	        if (node.$type == null) {
	            for (var key2 in node) {
	                if (key2[0] !== prefix && key2[0] !== "$" && hasOwn(node, key2)) {
	                    removeNodeAndDescendants(node[key2], node, key2, lru);
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var $ref = __webpack_require__(91);
	var __parent = __webpack_require__(107);
	var splice = __webpack_require__(103);
	var isObject = __webpack_require__(63);
	var unlinkBackReferences = __webpack_require__(132);
	var unlinkForwardReference = __webpack_require__(133);

	module.exports = function removeNode(node, parent, key, lru) {
	    if (isObject(node)) {
	        var type = node.$type;
	        if (Boolean(type)) {
	            if (type === $ref) {
	                unlinkForwardReference(node);
	            }
	            splice(lru, node);
	        }
	        unlinkBackReferences(node);
	        parent[key] = node[__parent] = void 0;
	        return true;
	    }
	    return false;
	};


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var __ref = __webpack_require__(86);
	var __context = __webpack_require__(87);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	module.exports = function unlinkBackReferences(node) {
	    var i = -1, n = node[__refsLength] || 0;
	    while (++i < n) {
	        var ref = node[__ref + i];
	        if (ref != null) {
	            ref[__context] = ref[__refIndex] = node[__ref + i] = void 0;
	        }
	    }
	    node[__refsLength] = void 0;
	    return node;
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __ref = __webpack_require__(86);
	var __context = __webpack_require__(87);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	module.exports = function unlinkForwardReference(reference) {
	    var destination = reference[__context];
	    if (destination) {
	        var i = (reference[__refIndex] || 0) - 1,
	            n = (destination[__refsLength] || 0) - 1;
	        while (++i <= n) {
	            destination[__ref + i] = destination[__ref + (i + 1)];
	        }
	        destination[__refsLength] = n;
	        reference[__refIndex] = reference[__context] = destination = void 0;
	    }
	    return reference;
	};


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __version = __webpack_require__(88);
	var __parent = __webpack_require__(107);
	var removeNode = __webpack_require__(131);
	var updateBackReferenceVersions = __webpack_require__(135);

	module.exports = function updateNodeAncestors(nodeArg, offset, lru, version) {
	    var child = nodeArg;
	    do {
	        var node = child[__parent];
	        var size = child.$size = (child.$size || 0) - offset;
	        if (size <= 0 && node != null) {
	            removeNode(child, node, child[__key], lru);
	        } else if (child[__version] !== version) {
	            updateBackReferenceVersions(child, version);
	        }
	        child = node;
	    } while (child);
	    return nodeArg;
	};


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var __ref = __webpack_require__(86);
	var __parent = __webpack_require__(107);
	var __version = __webpack_require__(88);
	var __refsLength = __webpack_require__(90);

	module.exports = function updateBackReferenceVersions(nodeArg, version) {
	    var stack = [nodeArg];
	    var count = 0;
	    do {
	        var node = stack[count--];
	        if (node && node[__version] !== version) {
	            node[__version] = version;
	            stack[count++] = node[__parent];
	            var i = -1;
	            var n = node[__refsLength] || 0;
	            while (++i < n) {
	                stack[count++] = node[__ref + i];
	            }
	        }
	    } while (count > -1);
	    return nodeArg;
	};


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __ref = __webpack_require__(86);
	var __parent = __webpack_require__(107);
	var __context = __webpack_require__(87);
	var __version = __webpack_require__(88);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	var $ref = __webpack_require__(91);

	var getBoundValue = __webpack_require__(137);

	var promote = __webpack_require__(92);
	var isExpired = __webpack_require__(111);
	var isFunction = __webpack_require__(61);
	var isPrimitive = __webpack_require__(101);
	var expireNode = __webpack_require__(102);
	var iterateKeySet = __webpack_require__(73).iterateKeySet;
	var incrementVersion = __webpack_require__(105);
	var mergeValueOrInsertBranch = __webpack_require__(147);

	/**
	 * Sets a list of PathValues into a JSON Graph.
	 * @function
	 * @param {Object} model - the Model for which to insert the PathValues.
	 * @param {Array.<PathValue>} pathValues - the PathValues to set.
	 * @return {Array.<Path>} - a list of optimized paths for the successfully set values.
	 */

	module.exports = function setPathValues(model, pathValues, x, errorSelector, comparator) {

	    var modelRoot = model._root;
	    var lru = modelRoot;
	    var expired = modelRoot.expired;
	    var version = incrementVersion();
	    var bound = model._path;
	    var cache = modelRoot.cache;
	    var node = bound.length ? getBoundValue(model, bound).value : cache;
	    var parent = node[__parent] || cache;
	    var initialVersion = cache[__version];

	    var requestedPath = [];
	    var requestedPaths = [];
	    var optimizedPaths = [];
	    var optimizedIndex = bound.length;
	    var pathValueIndex = -1;
	    var pathValueCount = pathValues.length;

	    while (++pathValueIndex < pathValueCount) {

	        var pathValue = pathValues[pathValueIndex];
	        var path = pathValue.path;
	        var value = pathValue.value;
	        var optimizedPath = bound.slice(0);
	        optimizedPath.index = optimizedIndex;

	        setPathSet(
	            value, path, 0, cache, parent, node,
	            requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector
	        );
	    }

	    var newVersion = cache[__version];
	    var rootChangeHandler = modelRoot.onChange;

	    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
	        rootChangeHandler();
	    }

	    return [requestedPaths, optimizedPaths];
	};

	/* eslint-disable no-constant-condition */
	function setPathSet(
	    value, path, depth, root, parent, node,
	    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var note = {};
	    var branch = depth < path.length - 1;
	    var keySet = path[depth];
	    var key = iterateKeySet(keySet, note);
	    var optimizedIndex = optimizedPath.index;

	    do {
	        var results = setNode(
	            root, parent, node, key, value,
	            branch, false, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector
	        );
	        requestedPath[depth] = key;
	        requestedPath.index = depth;
	        optimizedPath[optimizedPath.index++] = key;
	        var nextNode = results[0];
	        var nextParent = results[1];
	        if (nextNode) {
	            if (branch) {
	                setPathSet(
	                    value, path, depth + 1,
	                    root, nextParent, nextNode,
	                    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	                    version, expired, lru, comparator, errorSelector
	                );
	            } else {
	                promote(lru, nextNode);
	                requestedPaths.push(requestedPath.slice(0, requestedPath.index + 1));
	                optimizedPaths.push(optimizedPath.slice(0, optimizedPath.index));
	            }
	        }
	        key = iterateKeySet(keySet, note);
	        if (note.done) {
	            break;
	        }
	        optimizedPath.index = optimizedIndex;
	    } while (true);
	}
	/* eslint-enable */

	function setReference(
	    value, root, node, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var reference = node.value;
	    optimizedPath.splice(0, optimizedPath.length);
	    optimizedPath.push.apply(optimizedPath, reference);

	    if (isExpired(node)) {
	        optimizedPath.index = reference.length;
	        expireNode(node, expired, lru);
	        return [undefined, root];
	    }

	    promote(lru, node);

	    var container = node;
	    var parent = root;

	    node = node[__context];

	    if (node != null) {
	        parent = node[__parent] || root;
	        optimizedPath.index = reference.length;
	    } else {

	        var index = 0;
	        var count = reference.length - 1;

	        parent = node = root;

	        do {
	            var key = reference[index];
	            var branch = index < count;
	            var results = setNode(
	                root, parent, node, key, value,
	                branch, true, requestedPath, optimizedPath,
	                version, expired, lru, comparator, errorSelector
	            );
	            node = results[0];
	            if (isPrimitive(node)) {
	                optimizedPath.index = index;
	                return results;
	            }
	            parent = results[1];
	        } while (index++ < count);

	        optimizedPath.index = index;

	        if (container[__context] !== node) {
	            var backRefs = node[__refsLength] || 0;
	            node[__refsLength] = backRefs + 1;
	            node[__ref + backRefs] = container;
	            container[__context] = node;
	            container[__refIndex] = backRefs;
	        }
	    }

	    return [node, parent];
	}

	function setNode(
	    root, parent, node, key, value,
	    branch, reference, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var type = node.$type;

	    while (type === $ref) {

	        var results = setReference(
	            value, root, node, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector
	        );

	        node = results[0];

	        if (isPrimitive(node)) {
	            return results;
	        }

	        parent = results[1];
	        type = node.$type;
	    }

	    if (type !== void 0) {
	        return [node, parent];
	    }

	    if (key == null) {
	        if (branch) {
	            throw new Error("`null` is not allowed in branch key positions.");
	        } else if (node) {
	            key = node[__key];
	        }
	    } else {
	        parent = node;
	        node = parent[key];
	    }

	    node = mergeValueOrInsertBranch(
	        parent, node, key, value,
	        branch, reference, requestedPath, optimizedPath,
	        version, expired, lru, comparator, errorSelector
	    );

	    return [node, parent];
	}


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var getValueSync = __webpack_require__(138);
	var InvalidModelError = __webpack_require__(146);

	module.exports = function getBoundValue(model, pathArg) {

	    var path = pathArg;
	    var boundPath = pathArg;
	    var boxed, materialized,
	        treatErrorsAsValues,
	        value, shorted, found;

	    boxed = model._boxed;
	    materialized = model._materialized;
	    treatErrorsAsValues = model._treatErrorsAsValues;

	    model._boxed = true;
	    model._materialized = true;
	    model._treatErrorsAsValues = true;

	    value = getValueSync(model, path.concat(null), true);

	    model._boxed = boxed;
	    model._materialized = materialized;
	    model._treatErrorsAsValues = treatErrorsAsValues;

	    path = value.optimizedPath;
	    shorted = value.shorted;
	    found = value.found;
	    value = value.value;

	    while (path.length && path[path.length - 1] === null) {
	        path.pop();
	    }

	    if (found && shorted) {
	        throw new InvalidModelError(boundPath, path);
	    }

	    return {
	        path: path,
	        value: value,
	        shorted: shorted,
	        found: found
	    };
	};


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var followReference = __webpack_require__(139);
	var clone = __webpack_require__(143);
	var isExpired = __webpack_require__(145);
	var promote = __webpack_require__(142).promote;
	var $ref = __webpack_require__(91);
	var $atom = __webpack_require__(144);
	var $error = __webpack_require__(108);

	module.exports = function getValueSync(model, simplePath, noClone) {
	    var root = model._root.cache;
	    var len = simplePath.length;
	    var optimizedPath = [];
	    var shorted = false, shouldShort = false;
	    var depth = 0;
	    var key, i, next = root, curr = root, out = root, type, ref, refNode;
	    var found = true;

	    while (next && depth < len) {
	        key = simplePath[depth++];
	        if (key !== null) {
	            next = curr[key];
	            optimizedPath[optimizedPath.length] = key;
	        }

	        if (!next) {
	            out = void 0;
	            shorted = true;
	            found = false;
	            break;
	        }

	        type = next.$type;

	        // Up to the last key we follow references
	        if (depth < len) {
	            if (type === $ref) {
	                ref = followReference(model, root, root, next, next.value);
	                refNode = ref[0];

	                // The next node is also set to undefined because nothing
	                // could be found, this reference points to nothing, so
	                // nothing must be returned.
	                if (!refNode) {
	                    out = void 0;
	                    next = void 0;
	                    break;
	                }
	                type = refNode.$type;
	                next = refNode;
	                optimizedPath = ref[1].slice(0);
	            }

	            if (type) {
	                break;
	            }
	        }
	        // If there is a value, then we have great success, else, report an undefined.
	        else {
	            out = next;
	        }
	        curr = next;
	    }

	    if (depth < len) {
	        // Unfortunately, if all that follows are nulls, then we have not shorted.
	        for (i = depth; i < len; ++i) {
	            if (simplePath[depth] !== null) {
	                shouldShort = true;
	                break;
	            }
	        }
	        // if we should short or report value.  Values are reported on nulls.
	        if (shouldShort) {
	            shorted = true;
	            out = void 0;
	        } else {
	            out = next;
	        }

	        for (i = depth; i < len; ++i) {
	            optimizedPath[optimizedPath.length] = simplePath[i];
	        }
	    }

	    // promotes if not expired
	    if (out && type) {
	        if (isExpired(out)) {
	            out = void 0;
	        } else {
	            promote(model, out);
	        }
	    }

	    // if (out && out.$type === $error && !model._treatErrorsAsValues) {
	    if (out && type === $error && !model._treatErrorsAsValues) {
	        throw {
	            path: depth === len ? simplePath : simplePath.slice(0, depth),
	            value: out.value
	        };
	    } else if (out && model._boxed) {
	        out = Boolean(type) && !noClone ? clone(out) : out;
	    } else if (!out && model._materialized) {
	        out = {$type: $atom};
	    } else if (out) {
	        out = out.value;
	    }

	    return {
	        value: out,
	        shorted: shorted,
	        optimizedPath: optimizedPath,
	        found: found
	    };
	};


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var hardLink = __webpack_require__(140);
	var createHardlink = hardLink.create;
	var onValue = __webpack_require__(141);
	var isExpired = __webpack_require__(145);
	var $ref = __webpack_require__(91);
	var __context = __webpack_require__(87);
	var promote = __webpack_require__(142).promote;

	/* eslint-disable no-constant-condition */
	function followReference(model, root, nodeArg, referenceContainerArg,
	                         referenceArg, seed, isJSONG) {

	    var node = nodeArg;
	    var reference = referenceArg;
	    var referenceContainer = referenceContainerArg;
	    var depth = 0;
	    var k, next;

	    while (true) {
	        if (depth === 0 && referenceContainer[__context]) {
	            depth = reference.length;
	            next = referenceContainer[__context];
	        } else {
	            k = reference[depth++];
	            next = node[k];
	        }
	        if (next) {
	            var type = next.$type;
	            var value = type && next.value || next;

	            if (depth < reference.length) {
	                if (type) {
	                    node = next;
	                    break;
	                }

	                node = next;
	                continue;
	            }

	            // We need to report a value or follow another reference.
	            else {

	                node = next;

	                if (type && isExpired(next)) {
	                    break;
	                }

	                if (!referenceContainer[__context]) {
	                    createHardlink(referenceContainer, next);
	                }

	                // Restart the reference follower.
	                if (type === $ref) {
	                    if (isJSONG) {
	                        onValue(model, next, seed, null, null, null,
	                                reference, reference.length, isJSONG);
	                    } else {
	                        promote(model, next);
	                    }

	                    depth = 0;
	                    reference = value;
	                    referenceContainer = next;
	                    node = root;
	                    continue;
	                }

	                break;
	            }
	        } else {
	            node = void 0;
	        }
	        break;
	    }


	    if (depth < reference.length && node !== void 0) {
	        var ref = [];
	        for (var i = 0; i < depth; i++) {
	            ref[i] = reference[i];
	        }
	        reference = ref;
	    }

	    return [node, reference];
	}
	/* eslint-enable */

	module.exports = followReference;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var __ref = __webpack_require__(86);
	var __context = __webpack_require__(87);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	function createHardlink(from, to) {

	    // create a back reference
	    var backRefs = to[__refsLength] || 0;
	    to[__ref + backRefs] = from;
	    to[__refsLength] = backRefs + 1;

	    // create a hard reference
	    from[__refIndex] = backRefs;
	    from[__context] = to;
	}

	function removeHardlink(cacheObject) {
	    var context = cacheObject[__context];
	    if (context) {
	        var idx = cacheObject[__refIndex];
	        var len = context[__refsLength];

	        while (idx < len) {
	            context[__ref + idx] = context[__ref + idx + 1];
	            ++idx;
	        }

	        context[__refsLength] = len - 1;
	        cacheObject[__context] = void 0;
	        cacheObject[__refIndex] = void 0;
	    }
	}

	module.exports = {
	    create: createHardlink,
	    remove: removeHardlink
	};


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var lru = __webpack_require__(142);
	var clone = __webpack_require__(143);
	var promote = lru.promote;
	var $ref = __webpack_require__(91);
	var $atom = __webpack_require__(144);
	var $error = __webpack_require__(108);
	var $modelCreated = __webpack_require__(124);

	module.exports = function onValue(model, node, seed, depth, outerResults,
	                                  requestedPath, optimizedPath, optimizedLength,
	                                  isJSONG, fromReference) {
	    // Preload
	    if (!seed) {
	        return;
	    }

	    var i, len, k, key, curr, prev, prevK;
	    var materialized = false, valueNode;

	    if (node) {
	        promote(model, node);
	    }

	    if (!node || node.value === undefined) {
	        materialized = model._materialized;
	    }

	    // materialized
	    if (materialized) {
	        valueNode = {$type: $atom};
	    }

	    // Boxed Mode will clone the node.
	    else if (model._boxed) {
	        valueNode = clone(node);
	    }

	    // JSONG always clones the node.
	    else if (node.$type === $ref || node.$type === $error) {
	        if (isJSONG) {
	            valueNode = clone(node);
	        } else {
	            valueNode = node.value;
	        }
	    }

	    else if (isJSONG) {
	        var isObject = node.value && typeof node.value === "object";
	        var isUserCreatedNode = !node[$modelCreated];
	        if (isObject || isUserCreatedNode) {
	            valueNode = clone(node);
	        } else {
	            valueNode = node.value;
	        }
	    }

	    else {
	        valueNode = node.value;
	    }

	    if (outerResults) {
	        outerResults.hasValue = true;
	    }

	    if (isJSONG) {
	        curr = seed.jsonGraph;
	        if (!curr) {
	            curr = seed.jsonGraph = {};
	            seed.paths = [];
	        }
	        for (i = 0, len = optimizedLength - 1; i < len; i++) {
	            key = optimizedPath[i];

	            if (!curr[key]) {
	                curr[key] = {};
	            }
	            curr = curr[key];
	        }

	        // assign the last
	        key = optimizedPath[i];

	        // TODO: Special case? do string comparisons make big difference?
	        curr[key] = materialized ? {$type: $atom} : valueNode;
	        if (requestedPath) {
	            seed.paths.push(requestedPath.slice(0, depth));
	        }
	    }

	    // The output is pathMap and the depth is 0.  It is just a
	    // value report it as the found JSON
	    else if (depth === 0) {
	        seed.json = valueNode;
	    }

	    // The output is pathMap but we need to build the pathMap before
	    // reporting the value.
	    else {
	        curr = seed.json;
	        if (!curr) {
	            curr = seed.json = {};
	        }
	        for (i = 0; i < depth - 1; i++) {
	            k = requestedPath[i];
	            if (!curr[k]) {
	                curr[k] = {};
	            }
	            prev = curr;
	            prevK = k;
	            curr = curr[k];
	        }
	        k = requestedPath[i];
	        if (k !== null) {
	            curr[k] = valueNode;
	        } else {
	            prev[prevK] = valueNode;
	        }
	    }
	};


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __head = __webpack_require__(94);
	var __tail = __webpack_require__(95);
	var __next = __webpack_require__(96);
	var __prev = __webpack_require__(97);
	var __invalidated = __webpack_require__(104);

	// [H] -> Next -> ... -> [T]
	// [T] -> Prev -> ... -> [H]
	function lruPromote(model, object) {
	    var root = model._root;
	    var head = root[__head];
	    if (head === object) {
	        return;
	    }

	    // The item always exist in the cache since to get anything in the
	    // cache it first must go through set.
	    var prev = object[__prev];
	    var next = object[__next];
	    if (next) {
	        next[__prev] = prev;
	    }
	    if (prev) {
	        prev[__next] = next;
	    }
	    object[__prev] = void 0;

	    // Insert into head position
	    root[__head] = object;
	    object[__next] = head;
	    head[__prev] = object;
	}

	function lruSplice(model, object) {
	    var root = model._root;

	    // Its in the cache.  Splice out.
	    var prev = object[__prev];
	    var next = object[__next];
	    if (next) {
	        next[__prev] = prev;
	    }
	    if (prev) {
	        prev[__next] = next;
	    }
	    object[__prev] = void 0;

	    if (object === root[__head]) {
	        root[__head] = void 0;
	    }
	    if (object === root[__tail]) {
	        root[__tail] = void 0;
	    }
	    object[__invalidated] = true;
	    root.expired.push(object);
	}

	module.exports = {
	    promote: lruPromote,
	    splice: lruSplice
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// Copies the node
	var prefix = __webpack_require__(85);

	module.exports = function clone(node) {
	    var outValue, i, len;
	    var keys = Object.keys(node);
	    outValue = {};
	    for (i = 0, len = keys.length; i < len; i++) {
	        var k = keys[i];
	        if (k[0] === prefix) {
	            continue;
	        }
	        outValue[k] = node[k];
	    }
	    return outValue;
	};



/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = "atom";


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(99);
	module.exports = function isExpired(node) {
	    var $expires = node.$expires === void 0 && -1 || node.$expires;
	    return $expires !== -1 && $expires !== 1 && ($expires === 0 || $expires < now());
	};


/***/ },
/* 146 */
/***/ function(module, exports) {

	var NAME = "InvalidModelError";
	var MESSAGE = "The boundPath of the model is not valid since a value or error was found before the path end.";
	/**
	 * An InvalidModelError can only happen when a user binds, whether sync
	 * or async to shorted value.  See the unit tests for examples.
	 *
	 * @param {String} message
	 * @private
	 */
	function InvalidModelError(boundPath, shortedPath) {
	    this.message = MESSAGE;
	    this.stack = (new Error()).stack;
	    this.boundPath = boundPath;
	    this.shortedPath = shortedPath;
	}

	// instanceof will be an error, but stack will be correct because its defined in the constructor.
	InvalidModelError.prototype = new Error();
	InvalidModelError.prototype.name = NAME;
	InvalidModelError.name = NAME;
	InvalidModelError.message = MESSAGE;

	module.exports = InvalidModelError;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var $ref = __webpack_require__(91);
	var $error = __webpack_require__(108);
	var getType = __webpack_require__(148);
	var getSize = __webpack_require__(109);
	var getTimestamp = __webpack_require__(110);

	var isExpired = __webpack_require__(111);
	var isPrimitive = __webpack_require__(101);
	var isFunction = __webpack_require__(61);

	var wrapNode = __webpack_require__(112);
	var expireNode = __webpack_require__(102);
	var insertNode = __webpack_require__(127);
	var replaceNode = __webpack_require__(128);
	var updateNodeAncestors = __webpack_require__(134);
	var updateBackReferenceVersions = __webpack_require__(135);

	module.exports = function mergeValueOrInsertBranch(
	    parent, node, key, value,
	    branch, reference, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var type = getType(node, reference);

	    if (branch || reference) {
	        if (type && isExpired(node)) {
	            type = "expired";
	            expireNode(node, expired, lru);
	        }
	        if ((type && type !== $ref) || isPrimitive(node)) {
	            node = replaceNode(node, {}, parent, key, lru);
	            node = insertNode(node, parent, key, version);
	            node = updateBackReferenceVersions(node, version);
	        }
	    } else {
	        var message = value;
	        var mType = getType(message);
	        // Compare the current cache value with the new value. If either of
	        // them don't have a timestamp, or the message's timestamp is newer,
	        // replace the cache value with the message value. If a comparator
	        // is specified, the comparator takes precedence over timestamps.
	        //
	        // Comparing either Number or undefined to undefined always results in false.
	        var isDistinct = (getTimestamp(message) < getTimestamp(node)) === false;
	        // If at least one of the cache/message are sentinels, compare them.
	        if ((type || mType) && isFunction(comparator)) {
	            isDistinct = !comparator(node, message, optimizedPath.slice(0, optimizedPath.index));
	        }
	        if (isDistinct) {

	            message = wrapNode(message, mType, mType ? message.value : message);

	            if (mType === $error && isFunction(errorSelector)) {
	                message = errorSelector(requestedPath.slice(0, requestedPath.index), message);
	            }

	            var sizeOffset = getSize(node) - getSize(message);

	            node = replaceNode(node, message, parent, key, lru);
	            parent = updateNodeAncestors(parent, sizeOffset, lru, version);
	            node = insertNode(node, parent, key, version);
	        }
	    }

	    return node;
	};


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(63);

	module.exports = function getType(node, anyType) {
	    var type = isObject(node) && node.$type || void 0;
	    if (anyType && type) {
	        return "branch";
	    }
	    return type;
	};


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var RequestTypes = __webpack_require__(150);
	var GetRequest = __webpack_require__(151);

	/**
	 * The request queue is responsible for queuing the operations to
	 * the model"s dataSource.
	 *
	 * @param {Model} model -
	 * @param {Scheduler} scheduler -
	 */
	function RequestQueueV2(model, scheduler) {
	    this.model = model;
	    this.scheduler = scheduler;
	    this.requests = this._requests = [];
	}

	RequestQueueV2.prototype = {
	    /**
	     * Sets the scheduler, but will not affect any current requests.
	     */
	    setScheduler: function(scheduler) {
	        this.scheduler = scheduler;
	    },

	    /**
	     * Creates a get request to the dataSource.  Depending on the current
	     * scheduler is how the getRequest will be flushed.
	     * @param {Array} requestedPaths -
	     * @param {Array} optimizedPaths -
	     * @param {Function} cb -
	     */
	    get: function(requestedPaths, optimizedPaths, cb) {
	        var self = this;
	        var disposables = [];
	        var count = 0;
	        var requests = self._requests;
	        var i, len;
	        var oRemainingPaths = optimizedPaths;
	        var rRemainingPaths = requestedPaths;
	        var disposed = false;
	        var request;

	        for (i = 0, len = requests.length; i < len; ++i) {
	            request = requests[i];
	            if (request.type !== RequestTypes.GetRequest) {
	                continue;
	            }

	            // The request has been sent, attempt to jump on the request
	            // if possible.
	            if (request.sent) {
	                var results = request.add(
	                    rRemainingPaths, oRemainingPaths, refCountCallback);

	                // Checks to see if the results were successfully inserted
	                // into the outgoing results.  Then our paths will be reduced
	                // to the complement.
	                if (results[0]) {
	                    rRemainingPaths = results[1];
	                    oRemainingPaths = results[2];
	                    disposables[disposables.length] = results[3];
	                    ++count;
	                }
	            }

	            // If there is a non sent request, then we can batch and leave.
	            else {
	                request.batch(
	                    rRemainingPaths, oRemainingPaths, refCountCallback);
	                oRemainingPaths = [];
	                rRemainingPaths = [];
	                ++count;
	            }

	            // If there are no more remaining paths then exit the loop.
	            if (!oRemainingPaths.length) {
	                break;
	            }
	        }

	        // After going through all the available requests if there are more
	        // paths to process then a new request must be made.
	        if (oRemainingPaths.length) {
	            request = new GetRequest(self.scheduler, self);
	            requests[requests.length] = request;
	            ++count;
	            var disposable = request.batch(
	                rRemainingPaths, oRemainingPaths, refCountCallback);
	            disposables[disposables.length] = disposable;
	        }

	        // This is a simple refCount callback.
	        function refCountCallback() {
	            if (disposed) {
	                return;
	            }

	            --count;

	            // If the count becomes 0, then its time to notify the
	            // listener that the request is done.
	            if (count === 0) {
	                cb();
	            }
	        }

	        // When disposing the request all of the outbound requests will be
	        // disposed of.
	        return function() {
	            if (disposed || count === 0) {
	                return;
	            }

	            disposed = true;
	            var length = disposables.length;
	            for (var idx = 0; idx < length; ++idx) {
	                disposables[idx]();
	            }
	        };
	    },

	    /**
	     * Removes the request from the request
	     */
	    removeRequest: function(request) {
	        var requests = this._requests;
	        var i = requests.length;
	        while (--i >= 0) {
	            if (requests[i].id === request.id) {
	                requests.splice(i, 1);
	                break;
	            }
	        }
	    }
	};

	module.exports = RequestQueueV2;


/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = {
	    GetRequest: "GET"
	};


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var complement = __webpack_require__(152);
	var flushGetRequest = __webpack_require__(154);
	var REQUEST_ID = 0;
	var GetRequestType = __webpack_require__(150).GetRequest;
	var setJSONGraphs = __webpack_require__(83);
	var setPathValues = __webpack_require__(136);
	var $error = __webpack_require__(108);
	var emptyArray = [];

	/**
	 * Creates a new GetRequest.  This GetRequest takes a scheduler and
	 * the request queue.  Once the scheduler fires, all batched requests
	 * will be sent to the server.  Upon request completion, the data is
	 * merged back into the cache and all callbacks are notified.
	 *
	 * @param {Scheduler} scheduler -
	 * @param {RequestQueueV2} requestQueue -
	 */
	var GetRequestV2 = function(scheduler, requestQueue) {
	    this.sent = false;
	    this.scheduled = false;
	    this.requestQueue = requestQueue;
	    this.id = ++REQUEST_ID;
	    this.type = GetRequestType;

	    this._scheduler = scheduler;
	    this._pathMap = {};
	    this._optimizedPaths = [];
	    this._requestedPaths = [];
	    this._callbacks = [];
	    this._count = 0;
	    this._disposable = null;
	    this._collapsed = null;
	    this._disposed = false;
	};

	GetRequestV2.prototype = {
	    /**
	     * batches the paths that are passed in.  Once the request is complete,
	     * all callbacks will be called and the request will be removed from
	     * parent queue.
	     * @param {Array} requestedPaths -
	     * @param {Array} optimizedPaths -
	     * @param {Function} callback -
	     */
	    batch: function(requestedPaths, optimizedPaths, callback) {
	        var self = this;
	        var oPaths = self._optimizedPaths;
	        var rPaths = self._requestedPaths;
	        var callbacks = self._callbacks;
	        var idx = oPaths.length;

	        // If its not sent, simply add it to the requested paths
	        // and callbacks.
	        oPaths[idx] = optimizedPaths;
	        rPaths[idx] = requestedPaths;
	        callbacks[idx] = callback;
	        ++self._count;

	        // If it has not been scheduled, then schedule the action
	        if (!self.scheduled) {
	            self.scheduled = true;

	            self._disposable = self._scheduler.schedule(function() {
	                flushGetRequest(self, oPaths, function(err, data) {
	                    self.requestQueue.removeRequest(self);
	                    self._disposed = true;

	                    // If there is at least one callback remaining, then
	                    // callback the callbacks.
	                    if (self._count) {
	                        self._merge(rPaths, err, data);

	                        // Call the callbacks.  The first one inserts all the
	                        // data so that the rest do not have consider if their
	                        // data is present or not.
	                        for (var i = 0, len = callbacks.length; i < len; ++i) {
	                            var fn = callbacks[i];
	                            if (fn) {
	                                fn(err, data);
	                            }
	                        }
	                    }
	                });
	            });
	        }

	        // Disposes this batched request.  This does not mean that the
	        // entire request has been disposed, but just the local one, if all
	        // requests are disposed, then the outer disposable will be removed.
	        return createDisposable(self, idx);
	    },

	    /**
	     * Attempts to add paths to the outgoing request.  If there are added
	     * paths then the request callback will be added to the callback list.
	     *
	     * @returns {Array} - the remaining paths in the request.
	     */
	    add: function(requested, optimized, callback) {
	        // uses the length tree complement calculator.
	        var self = this;
	        var complementTuple = complement(requested, optimized, self._pathMap);
	        var optimizedComplement;
	        var requestedComplement;

	        if (complementTuple) {
	            requestedComplement = complementTuple[2];
	            optimizedComplement = complementTuple[1];
	        } else {
	            requestedComplement = requested;
	            optimizedComplement = optimized;
	        }

	        var inserted = false;
	        var disposable = false;

	        // If the out paths is less than the passed in paths, then there
	        // has been an intersection and the complement has been returned.
	        // Therefore, this can be deduped across requests.
	        if (optimizedComplement.length < optimized.length) {
	            inserted = true;
	            var idx = self._callbacks.length;
	            self._callbacks[idx] = callback;
	            self._requestedPaths[idx] = complementTuple[0];
	            self._optimizedPaths[idx] = [];
	            ++self._count;

	            disposable = createDisposable(self, idx);
	        }

	        return [inserted, requestedComplement, optimizedComplement, disposable];
	    },

	    /**
	     * merges the response into the model"s cache.
	     */
	    _merge: function(requested, err, data) {
	        var self = this;
	        var model = self.requestQueue.model;
	        var modelRoot = model._root;
	        var errorSelector = modelRoot.errorSelector;
	        var comparator = modelRoot.comparator;
	        var boundPath = model._path;

	        model._path = emptyArray;

	        // flatten all the requested paths, adds them to the
	        var nextPaths = flattenRequestedPaths(requested);

	        // Insert errors in every requested position.
	        if (err) {
	            var error = err;

	            // Converts errors to objects, a more friendly storage
	            // of errors.
	            if (error instanceof Error) {
	                error = {
	                    message: error.message
	                };
	            }

	            // Not all errors are value $types.
	            if (!error.$type) {
	                error = {
	                    $type: $error,
	                    value: error
	                };
	            }

	            var pathValues = nextPaths.map(function(x) {
	                return {
	                    path: x,
	                    value: error
	                };
	            });
	            setPathValues(model, pathValues, null, errorSelector, comparator);
	        }

	        // Insert the jsonGraph from the dataSource.
	        else {
	            setJSONGraphs(model, [{
	                paths: nextPaths,
	                jsonGraph: data.jsonGraph
	            }], null, errorSelector, comparator);
	        }

	        // return the model"s boundPath
	        model._path = boundPath;
	    }
	};

	// Creates a more efficient closure of the things that are
	// needed.  So the request and the idx.  Also prevents code
	// duplication.
	function createDisposable(request, idx) {
	    var disposed = false;
	    return function() {
	        if (disposed || request._disposed) {
	            return;
	        }

	        disposed = true;
	        request._callbacks[idx] = null;
	        request._optimizedPaths[idx] = [];
	        request._requestedPaths[idx] = [];

	        // If there are no more requests, then dispose all of the request.
	        var count = --request._count;
	        if (count === 0 && !request.sent) {
	            request._disposable.dispose();
	            request.requestQueue.removeRequest(request);
	        }
	    };
	}

	function flattenRequestedPaths(requested) {
	    var out = [];
	    var outLen = -1;
	    for (var i = 0, len = requested.length; i < len; ++i) {
	        var paths = requested[i];
	        for (var j = 0, innerLen = paths.length; j < innerLen; ++j) {
	            out[++outLen] = paths[j];
	        }
	    }
	    return out;
	}

	module.exports = GetRequestV2;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var hasIntersection = __webpack_require__(73).hasIntersection;
	var arraySlice = __webpack_require__(153);

	/**
	 * creates the complement of the requested and optimized paths
	 * based on the provided tree.
	 *
	 * If there is no complement then this is just a glorified
	 * array copy.
	 */
	module.exports = function complement(requested, optimized, tree) {
	    var optimizedComplement = [];
	    var requestedComplement = [];
	    var requestedIntersection = [];
	    var intersectionLength = -1, complementLength = -1;
	    var intersectionFound = false;

	    for (var i = 0, len = optimized.length; i < len; ++i) {
	        // If this does not intersect then add it to the output.
	        var path = optimized[i];
	        var subTree = tree[path.length];

	        // If there is no subtree to look into or there is no intersection.
	        if (!subTree || !hasIntersection(subTree, path, 0)) {

	            if (intersectionFound) {
	                optimizedComplement[++complementLength] = path;
	                requestedComplement[complementLength] = requested[i];
	            }
	        } else {
	            // If there has been no intersection yet and
	            // i is bigger than 0 (meaning we have had only complements)
	            // then we need to update our complements to match the current
	            // reality.
	            if (!intersectionFound && i > 0) {
	                requestedComplement = arraySlice(requested, 0, i);
	                optimizedComplement = arraySlice(optimized, 0, i);
	            }

	            requestedIntersection[++intersectionLength] = requested[i];
	            intersectionFound = true;
	        }
	    }

	    if (!intersectionFound) {
	        return null;
	    }

	    return [requestedIntersection, optimizedComplement, requestedComplement ];
	};


/***/ },
/* 153 */
/***/ function(module, exports) {

	module.exports = function arraySlice(array, indexArg, endArg) {
	    var index = indexArg || 0;
	    var i = -1;
	    var n = array.length - index;

	    if (n < 0) {
	        n = 0;
	    }

	    if (endArg > 0 && n > endArg) {
	        n = endArg;
	    }

	    var array2 = new Array(n);
	    while (++i < n) {
	        array2[i] = array[i + index];
	    }
	    return array2;
	};


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var pathUtils = __webpack_require__(73);
	var toTree = pathUtils.toTree;
	var toPaths = pathUtils.toPaths;

	/**
	 * Flushes the current set of requests.  This will send the paths to the
	 * dataSource.  * The results of the dataSource will be sent to callback which
	 * should perform the zip of all callbacks.
	 * @param {GetRequest} request -
	 * @param {Array} listOfPaths -
	 * @param {Function} callback -
	 * @private
	 */
	module.exports = function flushGetRequest(request, listOfPaths, callback) {
	    if (request._count === 0) {
	        request.requestQueue.removeRequest(request);
	        return;
	    }

	    request.sent = true;
	    request.scheduled = false;

	    // TODO: Move this to the collapse algorithm,
	    // TODO: we should have a collapse that returns the paths and
	    // TODO: the trees.

	    // Take all the paths and add them to the pathMap by length.
	    // Since its a list of paths
	    var pathMap = request._pathMap;
	    var listKeys = Object.keys(listOfPaths);
	    var listIdx = 0, listLen = listKeys.length;
	    for (; listIdx < listLen; ++listIdx) {
	        var paths = listOfPaths[listIdx];
	        for (var j = 0, pathLen = paths.length; j < pathLen; ++j) {
	            var pathSet = paths[j];
	            var len = pathSet.length;

	            if (!pathMap[len]) {
	                pathMap[len] = [pathSet];
	            } else {
	                var pathSetsByLength = pathMap[len];
	                pathSetsByLength[pathSetsByLength.length] = pathSet;
	            }
	        }
	    }

	    // now that we have them all by length, convert each to a tree.
	    var pathMapKeys = Object.keys(pathMap);
	    var pathMapIdx = 0, pathMapLen = pathMapKeys.length;
	    for (; pathMapIdx < pathMapLen; ++pathMapIdx) {
	        var pathMapKey = pathMapKeys[pathMapIdx];
	        pathMap[pathMapKey] = toTree(pathMap[pathMapKey]);
	    }

	    // Take the pathMapTree and create the collapsed paths and send those
	    // off to the server.
	    var collapsedPaths = request._collasped = toPaths(pathMap);
	    var jsonGraphData;

	    // Make the request.
	    // You are probably wondering why this is not cancellable.  If a request
	    // goes out, and all the requests are removed, the request should not be
	    // cancelled.  The reasoning is that another request could come in, after
	    // all callbacks have been removed and be deduped.  Might as well keep this
	    // around until it comes back.  If at that point there are no requests then
	    // we cancel at the callback above.
	    request.
	        requestQueue.
	        model._source.
	        get(collapsedPaths).
	        subscribe(function(data) {
	            jsonGraphData = data;
	        }, function(err) {
	            callback(err, jsonGraphData);
	        }, function() {
	            callback(null, jsonGraphData);
	        });
	};



/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var falcor = __webpack_require__(48);

	var Rx = __webpack_require__(65) && __webpack_require__(156);
	var Observable = Rx.Observable;

	var arraySlice = __webpack_require__(153);

	var noop = __webpack_require__(157);

	var jsongMixin = { outputFormat: { value: "AsJSONG" } };
	var progressiveMixin = { isProgressive: { value: true } };

	/**
	 * A ModelResponse is a container for the results of a get, set, or call operation performed on a Model. The ModelResponse provides methods which can be used to specify the output format of the data retrieved from a Model, as well as how that data is delivered.
	 * @constructor ModelResponse
	 * @augments Observable
	*/
	function ModelResponse(subscribe) {
	    this._subscribe = subscribe;
	}

	ModelResponse.create = function create(model, args) {
	    var response = new ModelResponse(subscribeToResponse);
	    // TODO: make these private
	    response.args = args;
	    response.type = this;
	    response.model = model;
	    return response;
	};

	ModelResponse.prototype = Object.create(Observable.prototype);

	ModelResponse.prototype.constructor = ModelResponse;

	ModelResponse.prototype._mixin = function mixin() {
	    var self = this;
	    var mixins = arraySlice(arguments);
	    return new self.constructor(function(observer) {
	        return self.subscribe(mixins.reduce(function(proto, mixin2) {
	            return Object.create(proto, mixin2);
	        }, observer));
	    });
	};

	/**
	 * Converts the data format of the data in a JSONGraph Model response to a stream of path values.
	 * @name toPathValues
	 * @memberof ModelResponse.prototype
	 * @function
	 * @return ModelResponse.<PathValue>
	 * @example
	var model = new falcor.Model({
	  cache: {
	    user: {
	      name: "Steve",
	      surname: "McGuire"
	    }
	  }
	});

	model.
	  get(["user",["name", "surname"]]).
	  toPathValues().
	  // this method will be called twice, once with the result of ["user", "name"]
	  // and once with the result of ["user", "surname"]
	  subscribe(function(pathValue){
	    console.log(JSON.stringify(pathValue));
	  });
	// prints...
	"{\"path\":[\"user\",\"name\"],\"value\":\"Steve\"}"
	"{\"path\":[\"user\",\"surname\"],\"value\":\"McGuire\"}"
	 */

	ModelResponse.prototype._toJSONG = function toJSONG() {
	    return this._mixin(jsongMixin);
	};

	/**
	 * The progressively method breaks the response up into two parts: the data immediately available in the Model cache, and the data in the Model cache after the missing data has been retrieved from the DataSource.
	 * The progressively method creates a ModelResponse that immediately returns the requested data that is available in the Model cache. If any requested paths are not available in the cache, the ModelResponse will send another JSON message with all of the requested data after it has been retrieved from the DataSource.
	 * @name progressively
	 * @memberof ModelResponse.prototype
	 * @function
	 * @return {ModelResponse.<JSONEnvelope>} the values found at the requested paths.
	 * @example
	var dataSource = (new falcor.Model({
	  cache: {
	    user: {
	      name: "Steve",
	      surname: "McGuire",
	      age: 31
	    }
	  }
	})).asDataSource();

	var model = new falcor.Model({
	  source: dataSource,
	  cache: {
	    user: {
	      name: "Steve",
	      surname: "McGuire"
	    }
	  }
	});

	model.
	  get(["user",["name", "surname", "age"]]).
	  progressively().
	  // this callback will be invoked twice, once with the data in the
	  // Model cache, and again with the additional data retrieved from the DataSource.
	  subscribe(function(json){
	    console.log(JSON.stringify(json,null,4));
	  });

	// prints...
	// {
	//     "json": {
	//         "user": {
	//             "name": "Steve",
	//             "surname": "McGuire"
	//         }
	//     }
	// }
	// ...and then prints...
	// {
	//     "json": {
	//         "user": {
	//             "name": "Steve",
	//             "surname": "McGuire",
	//             "age": 31
	//         }
	//     }
	// }
	*/
	ModelResponse.prototype.progressively = function progressively() {
	    return this._mixin(progressiveMixin);
	};

	ModelResponse.prototype.subscribe = function subscribe(a, b, c) {
	    var observer = a;
	    if (!observer || typeof observer !== "object") {
	        observer = { onNext: a || noop, onError: b || noop, onCompleted: c || noop };
	    }
	    var subscription = this._subscribe(observer);
	    switch (typeof subscription) {
	        case "function":
	            return { dispose: subscription };
	        case "object":
	            return subscription || { dispose: noop };
	        default:
	            return { dispose: noop };
	    }
	};

	ModelResponse.prototype.then = function then(onNext, onError) {
	    var self = this;
	    return new falcor.Promise(function(resolve, reject) {
	        var value, rejected = false;
	        self.toArray().subscribe(
	            function(values) {
	                if (values.length <= 1) {
	                    value = values[0];
	                } else {
	                    value = values;
	                }
	            },
	            function(errors) {
	                rejected = true;
	                reject(errors);
	            },
	            function() {
	                if (rejected === false) {
	                    resolve(value);
	                }
	            }
	        );
	    }).then(onNext, onError);
	};

	function subscribeToResponse(observer) {

	    var model = this.model;
	    var response = new this.type();

	    response.model = model;
	    response.args = this.args;
	    response.outputFormat = observer.outputFormat || "AsPathMap";
	    response.isProgressive = observer.isProgressive || false;
	    response.subscribeCount = 0;
	    response.subscribeLimit = observer.retryLimit || 10;

	    return (response
	        .initialize()
	        .invokeSourceRequest(model)
	        .ensureCollect(model)
	        .subscribe(observer));
	}

	module.exports = ModelResponse;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

	;(function (factory) {
	    var objectTypes = {
	        'boolean': false,
	        'function': true,
	        'object': true,
	        'number': false,
	        'string': false,
	        'undefined': false
	    };

	    var root = (objectTypes[typeof window] && window) || this,
	        freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
	        freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
	        moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
	        freeGlobal = objectTypes[typeof global] && global;

	    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	        root = freeGlobal;
	    }

	    // Because of build optimizers
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(65)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Rx, exports) {
	            return factory(root, exports, Rx);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module && module.exports === freeExports) {
	        module.exports = factory(root, module.exports, require('./rx'));
	    } else {
	        root.Rx = factory(root, {}, root.Rx);
	    }
	}.call(this, function (root, exp, Rx, undefined) {

	  // References
	  var Observable = Rx.Observable,
	    observableProto = Observable.prototype,
	    CompositeDisposable = Rx.CompositeDisposable,
	    AnonymousObservable = Rx.AnonymousObservable,
	    disposableEmpty = Rx.Disposable.empty,
	    isEqual = Rx.internals.isEqual,
	    helpers = Rx.helpers,
	    not = helpers.not,
	    defaultComparer = helpers.defaultComparer,
	    identity = helpers.identity,
	    defaultSubComparer = helpers.defaultSubComparer,
	    isFunction = helpers.isFunction,
	    isPromise = helpers.isPromise,
	    isArrayLike = helpers.isArrayLike,
	    isIterable = helpers.isIterable,
	    inherits = Rx.internals.inherits,
	    observableFromPromise = Observable.fromPromise,
	    observableFrom = Observable.from,
	    bindCallback = Rx.internals.bindCallback,
	    EmptyError = Rx.EmptyError,
	    ObservableBase = Rx.ObservableBase,
	    ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError;

	  var errorObj = {e: {}};
	  var tryCatchTarget;
	  function tryCatcher() {
	    try {
	      return tryCatchTarget.apply(this, arguments);
	    } catch (e) {
	      errorObj.e = e;
	      return errorObj;
	    }
	  }
	  function tryCatch(fn) {
	    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
	    tryCatchTarget = fn;
	    return tryCatcher;
	  }
	  function thrower(e) {
	    throw e;
	  }

	  function extremaBy(source, keySelector, comparer) {
	    return new AnonymousObservable(function (o) {
	      var hasValue = false, lastKey = null, list = [];
	      return source.subscribe(function (x) {
	        var comparison, key;
	        try {
	          key = keySelector(x);
	        } catch (ex) {
	          o.onError(ex);
	          return;
	        }
	        comparison = 0;
	        if (!hasValue) {
	          hasValue = true;
	          lastKey = key;
	        } else {
	          try {
	            comparison = comparer(key, lastKey);
	          } catch (ex1) {
	            o.onError(ex1);
	            return;
	          }
	        }
	        if (comparison > 0) {
	          lastKey = key;
	          list = [];
	        }
	        if (comparison >= 0) { list.push(x); }
	      }, function (e) { o.onError(e); }, function () {
	        o.onNext(list);
	        o.onCompleted();
	      });
	    }, source);
	  }

	  function firstOnly(x) {
	    if (x.length === 0) { throw new EmptyError(); }
	    return x[0];
	  }

	  /**
	   * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
	   * For aggregation behavior with incremental intermediate results, see Observable.scan.
	   * @deprecated Use #reduce instead
	   * @param {Mixed} [seed] The initial accumulator value.
	   * @param {Function} accumulator An accumulator function to be invoked on each element.
	   * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
	   */
	  observableProto.aggregate = function () {
	    var hasSeed = false, accumulator, seed, source = this;
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[0];
	      accumulator = arguments[1];
	    } else {
	      accumulator = arguments[0];
	    }
	    return new AnonymousObservable(function (o) {
	      var hasAccumulation, accumulation, hasValue;
	      return source.subscribe (
	        function (x) {
	          !hasValue && (hasValue = true);
	          try {
	            if (hasAccumulation) {
	              accumulation = accumulator(accumulation, x);
	            } else {
	              accumulation = hasSeed ? accumulator(seed, x) : x;
	              hasAccumulation = true;
	            }
	          } catch (e) {
	            return o.onError(e);
	          }
	        },
	        function (e) { o.onError(e); },
	        function () {
	          hasValue && o.onNext(accumulation);
	          !hasValue && hasSeed && o.onNext(seed);
	          !hasValue && !hasSeed && o.onError(new EmptyError());
	          o.onCompleted();
	        }
	      );
	    }, source);
	  };

	  var ReduceObservable = (function(__super__) {
	    inherits(ReduceObservable, __super__);
	    function ReduceObservable(source, acc, hasSeed, seed) {
	      this.source = source;
	      this.acc = acc;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }

	    ReduceObservable.prototype.subscribeCore = function(observer) {
	      return this.source.subscribe(new InnerObserver(observer,this));
	    };

	    function InnerObserver(o, parent) {
	      this.o = o;
	      this.acc = parent.acc;
	      this.hasSeed = parent.hasSeed;
	      this.seed = parent.seed;
	      this.hasAccumulation = false;
	      this.result = null;
	      this.hasValue = false;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      !this.hasValue && (this.hasValue = true);
	      if (this.hasAccumulation) {
	        this.result = tryCatch(this.acc)(this.result, x);
	      } else {
	        this.result = this.hasSeed ? tryCatch(this.acc)(this.seed, x) : x;
	        this.hasAccumulation = true;
	      }
	      if (this.result === errorObj) { this.o.onError(this.result.e); }
	    };
	    InnerObserver.prototype.onError = function (e) { 
	      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); } 
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.hasValue && this.o.onNext(this.result);
	        !this.hasValue && this.hasSeed && this.o.onNext(this.seed);
	        !this.hasValue && !this.hasSeed && this.o.onError(new EmptyError());
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
	    InnerObserver.prototype.fail = function(e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };

	    return ReduceObservable;
	  }(ObservableBase));

	  /**
	  * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
	  * For aggregation behavior with incremental intermediate results, see Observable.scan.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @param {Any} [seed] The initial accumulator value.
	  * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
	  */
	  observableProto.reduce = function (accumulator) {
	    var hasSeed = false;
	    if (arguments.length === 2) {
	      hasSeed = true;
	      var seed = arguments[1];
	    }
	    return new ReduceObservable(this, accumulator, hasSeed, seed);
	  };

	  /**
	   * Determines whether any element of an observable sequence satisfies a condition if present, else if any items are in the sequence.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @returns {Observable} An observable sequence containing a single element determining whether any elements in the source sequence pass the test in the specified predicate if given, else if any items are in the sequence.
	   */
	  observableProto.some = function (predicate, thisArg) {
	    var source = this;
	    return predicate ?
	      source.filter(predicate, thisArg).some() :
	      new AnonymousObservable(function (observer) {
	        return source.subscribe(function () {
	          observer.onNext(true);
	          observer.onCompleted();
	        }, function (e) { observer.onError(e); }, function () {
	          observer.onNext(false);
	          observer.onCompleted();
	        });
	      }, source);
	  };

	  /** @deprecated use #some instead */
	  observableProto.any = function () {
	    //deprecate('any', 'some');
	    return this.some.apply(this, arguments);
	  };

	  /**
	   * Determines whether an observable sequence is empty.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence is empty.
	   */
	  observableProto.isEmpty = function () {
	    return this.any().map(not);
	  };

	  /**
	   * Determines whether all elements of an observable sequence satisfy a condition.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element determining whether all elements in the source sequence pass the test in the specified predicate.
	   */
	  observableProto.every = function (predicate, thisArg) {
	    return this.filter(function (v) { return !predicate(v); }, thisArg).some().map(not);
	  };

	  /** @deprecated use #every instead */
	  observableProto.all = function () {
	    //deprecate('all', 'every');
	    return this.every.apply(this, arguments);
	  };

	  /**
	   * Determines whether an observable sequence includes a specified element with an optional equality comparer.
	   * @param searchElement The value to locate in the source sequence.
	   * @param {Number} [fromIndex] An equality comparer to compare elements.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence includes an element that has the specified value from the given index.
	   */
	  observableProto.includes = function (searchElement, fromIndex) {
	    var source = this;
	    function comparer(a, b) {
	      return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
	    }
	    return new AnonymousObservable(function (o) {
	      var i = 0, n = +fromIndex || 0;
	      Math.abs(n) === Infinity && (n = 0);
	      if (n < 0) {
	        o.onNext(false);
	        o.onCompleted();
	        return disposableEmpty;
	      }
	      return source.subscribe(
	        function (x) {
	          if (i++ >= n && comparer(x, searchElement)) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(false);
	          o.onCompleted();
	        });
	    }, this);
	  };

	  /**
	   * @deprecated use #includes instead.
	   */
	  observableProto.contains = function (searchElement, fromIndex) {
	    //deprecate('contains', 'includes');
	    observableProto.includes(searchElement, fromIndex);
	  };

	  /**
	   * Returns an observable sequence containing a value that represents how many elements in the specified observable sequence satisfy a condition if provided, else the count of items.
	   * @example
	   * res = source.count();
	   * res = source.count(function (x) { return x > 3; });
	   * @param {Function} [predicate]A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with a number that represents how many elements in the input sequence satisfy the condition in the predicate function if provided, else the count of items in the sequence.
	   */
	  observableProto.count = function (predicate, thisArg) {
	    return predicate ?
	      this.filter(predicate, thisArg).count() :
	      this.reduce(function (count) { return count + 1; }, 0);
	  };

	  /**
	   * Returns the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   * @param {Any} searchElement Element to locate in the array.
	   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
	   * @returns {Observable} And observable sequence containing the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   */
	  observableProto.indexOf = function(searchElement, fromIndex) {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var i = 0, n = +fromIndex || 0;
	      Math.abs(n) === Infinity && (n = 0);
	      if (n < 0) {
	        o.onNext(-1);
	        o.onCompleted();
	        return disposableEmpty;
	      }
	      return source.subscribe(
	        function (x) {
	          if (i >= n && x === searchElement) {
	            o.onNext(i);
	            o.onCompleted();
	          }
	          i++;
	        },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(-1);
	          o.onCompleted();
	        });
	    }, source);
	  };

	  /**
	   * Computes the sum of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence, else if not specified computes the sum on each item in the sequence.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the sum of the values in the source sequence.
	   */
	  observableProto.sum = function (keySelector, thisArg) {
	    return keySelector && isFunction(keySelector) ?
	      this.map(keySelector, thisArg).sum() :
	      this.reduce(function (prev, curr) { return prev + curr; }, 0);
	  };

	  /**
	   * Returns the elements in an observable sequence with the minimum key value according to the specified comparer.
	   * @example
	   * var res = source.minBy(function (x) { return x.value; });
	   * var res = source.minBy(function (x) { return x.value; }, function (x, y) { return x - y; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer] Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a minimum key value.
	   */
	  observableProto.minBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return extremaBy(this, keySelector, function (x, y) { return comparer(x, y) * -1; });
	  };

	  /**
	   * Returns the minimum element in an observable sequence according to the optional comparer else a default greater than less than check.
	   * @example
	   * var res = source.min();
	   * var res = source.min(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the minimum element in the source sequence.
	   */
	  observableProto.min = function (comparer) {
	    return this.minBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };

	  /**
	   * Returns the elements in an observable sequence with the maximum  key value according to the specified comparer.
	   * @example
	   * var res = source.maxBy(function (x) { return x.value; });
	   * var res = source.maxBy(function (x) { return x.value; }, function (x, y) { return x - y;; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer]  Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a maximum key value.
	   */
	  observableProto.maxBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return extremaBy(this, keySelector, comparer);
	  };

	  /**
	   * Returns the maximum value in an observable sequence according to the specified comparer.
	   * @example
	   * var res = source.max();
	   * var res = source.max(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the maximum element in the source sequence.
	   */
	  observableProto.max = function (comparer) {
	    return this.maxBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };

	  /**
	   * Computes the average of an observable sequence of values that are in the sequence or obtained by invoking a transform function on each element of the input sequence if present.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the average of the sequence of values.
	   */
	  observableProto.average = function (keySelector, thisArg) {
	    return keySelector && isFunction(keySelector) ?
	      this.map(keySelector, thisArg).average() :
	      this.reduce(function (prev, cur) {
	        return {
	          sum: prev.sum + cur,
	          count: prev.count + 1
	        };
	      }, {sum: 0, count: 0 }).map(function (s) {
	        if (s.count === 0) { throw new EmptyError(); }
	        return s.sum / s.count;
	      });
	  };

	  /**
	   *  Determines whether two sequences are equal by comparing the elements pairwise using a specified equality comparer.
	   *
	   * @example
	   * var res = res = source.sequenceEqual([1,2,3]);
	   * var res = res = source.sequenceEqual([{ value: 42 }], function (x, y) { return x.value === y.value; });
	   * 3 - res = source.sequenceEqual(Rx.Observable.returnValue(42));
	   * 4 - res = source.sequenceEqual(Rx.Observable.returnValue({ value: 42 }), function (x, y) { return x.value === y.value; });
	   * @param {Observable} second Second observable sequence or array to compare.
	   * @param {Function} [comparer] Comparer used to compare elements of both sequences.
	   * @returns {Observable} An observable sequence that contains a single element which indicates whether both sequences are of equal length and their corresponding elements are equal according to the specified equality comparer.
	   */
	  observableProto.sequenceEqual = function (second, comparer) {
	    var first = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var donel = false, doner = false, ql = [], qr = [];
	      var subscription1 = first.subscribe(function (x) {
	        var equal, v;
	        if (qr.length > 0) {
	          v = qr.shift();
	          try {
	            equal = comparer(v, x);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (doner) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          ql.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        donel = true;
	        if (ql.length === 0) {
	          if (qr.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (doner) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });

	      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
	      isPromise(second) && (second = observableFromPromise(second));
	      var subscription2 = second.subscribe(function (x) {
	        var equal;
	        if (ql.length > 0) {
	          var v = ql.shift();
	          try {
	            equal = comparer(v, x);
	          } catch (exception) {
	            o.onError(exception);
	            return;
	          }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (donel) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          qr.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        doner = true;
	        if (qr.length === 0) {
	          if (ql.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (donel) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });
	      return new CompositeDisposable(subscription1, subscription2);
	    }, first);
	  };

	  function elementAtOrDefault(source, index, hasDefault, defaultValue) {
	    if (index < 0) { throw new ArgumentOutOfRangeError(); }
	    return new AnonymousObservable(function (o) {
	      var i = index;
	      return source.subscribe(function (x) {
	        if (i-- === 0) {
	          o.onNext(x);
	          o.onCompleted();
	        }
	      }, function (e) { o.onError(e); }, function () {
	        if (!hasDefault) {
	          o.onError(new ArgumentOutOfRangeError());
	        } else {
	          o.onNext(defaultValue);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }

	  /**
	   * Returns the element at a specified index in a sequence.
	   * @example
	   * var res = source.elementAt(5);
	   * @param {Number} index The zero-based index of the element to retrieve.
	   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence.
	   */
	  observableProto.elementAt =  function (index) {
	    return elementAtOrDefault(this, index, false);
	  };

	  /**
	   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
	   * @example
	   * var res = source.elementAtOrDefault(5);
	   * var res = source.elementAtOrDefault(5, 0);
	   * @param {Number} index The zero-based index of the element to retrieve.
	   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
	   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence, or a default value if the index is outside the bounds of the source sequence.
	   */
	  observableProto.elementAtOrDefault = function (index, defaultValue) {
	    return elementAtOrDefault(this, index, true, defaultValue);
	  };

	  function singleOrDefaultAsync(source, hasDefault, defaultValue) {
	    return new AnonymousObservable(function (o) {
	      var value = defaultValue, seenValue = false;
	      return source.subscribe(function (x) {
	        if (seenValue) {
	          o.onError(new Error('Sequence contains more than one element'));
	        } else {
	          value = x;
	          seenValue = true;
	        }
	      }, function (e) { o.onError(e); }, function () {
	        if (!seenValue && !hasDefault) {
	          o.onError(new EmptyError());
	        } else {
	          o.onNext(value);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }

	  /**
	   * Returns the only element of an observable sequence that satisfies the condition in the optional predicate, and reports an exception if there is not exactly one element in the observable sequence.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate.
	   */
	  observableProto.single = function (predicate, thisArg) {
	    return predicate && isFunction(predicate) ?
	      this.where(predicate, thisArg).single() :
	      singleOrDefaultAsync(this, false);
	  };

	  /**
	   * Returns the only element of an observable sequence that matches the predicate, or a default value if no such element exists; this method reports an exception if there is more than one element in the observable sequence.
	   * @example
	   * var res = res = source.singleOrDefault();
	   * var res = res = source.singleOrDefault(function (x) { return x === 42; });
	   * res = source.singleOrDefault(function (x) { return x === 42; }, 0);
	   * res = source.singleOrDefault(null, 0);
	   * @memberOf Observable#
	   * @param {Function} predicate A predicate function to evaluate for elements in the source sequence.
	   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   */
	  observableProto.singleOrDefault = function (predicate, defaultValue, thisArg) {
	    return predicate && isFunction(predicate) ?
	      this.filter(predicate, thisArg).singleOrDefault(null, defaultValue) :
	      singleOrDefaultAsync(this, true, defaultValue);
	  };

	  function firstOrDefaultAsync(source, hasDefault, defaultValue) {
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(function (x) {
	        o.onNext(x);
	        o.onCompleted();
	      }, function (e) { o.onError(e); }, function () {
	        if (!hasDefault) {
	          o.onError(new EmptyError());
	        } else {
	          o.onNext(defaultValue);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }

	  /**
	   * Returns the first element of an observable sequence that satisfies the condition in the predicate if present else the first item in the sequence.
	   * @example
	   * var res = res = source.first();
	   * var res = res = source.first(function (x) { return x > 3; });
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate if provided, else the first item in the sequence.
	   */
	  observableProto.first = function (predicate, thisArg) {
	    return predicate ?
	      this.where(predicate, thisArg).first() :
	      firstOrDefaultAsync(this, false);
	  };

	  /**
	   * Returns the first element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   */
	  observableProto.firstOrDefault = function (predicate, defaultValue, thisArg) {
	    return predicate ?
	      this.where(predicate).firstOrDefault(null, defaultValue) :
	      firstOrDefaultAsync(this, true, defaultValue);
	  };

	  function lastOrDefaultAsync(source, hasDefault, defaultValue) {
	    return new AnonymousObservable(function (o) {
	      var value = defaultValue, seenValue = false;
	      return source.subscribe(function (x) {
	        value = x;
	        seenValue = true;
	      }, function (e) { o.onError(e); }, function () {
	        if (!seenValue && !hasDefault) {
	          o.onError(new EmptyError());
	        } else {
	          o.onNext(value);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }

	  /**
	   * Returns the last element of an observable sequence that satisfies the condition in the predicate if specified, else the last element.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate.
	   */
	  observableProto.last = function (predicate, thisArg) {
	    return predicate ?
	      this.where(predicate, thisArg).last() :
	      lastOrDefaultAsync(this, false);
	  };

	  /**
	   * Returns the last element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   */
	  observableProto.lastOrDefault = function (predicate, defaultValue, thisArg) {
	    return predicate ?
	      this.where(predicate, thisArg).lastOrDefault(null, defaultValue) :
	      lastOrDefaultAsync(this, true, defaultValue);
	  };

	  function findValue (source, predicate, thisArg, yieldIndex) {
	    var callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      var i = 0;
	      return source.subscribe(function (x) {
	        var shouldRun;
	        try {
	          shouldRun = callback(x, i, source);
	        } catch (e) {
	          o.onError(e);
	          return;
	        }
	        if (shouldRun) {
	          o.onNext(yieldIndex ? i : x);
	          o.onCompleted();
	        } else {
	          i++;
	        }
	      }, function (e) { o.onError(e); }, function () {
	        o.onNext(yieldIndex ? -1 : undefined);
	        o.onCompleted();
	      });
	    }, source);
	  }

	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the first element that matches the conditions defined by the specified predicate, if found; otherwise, undefined.
	   */
	  observableProto.find = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, false);
	  };

	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns
	   * an Observable sequence with the zero-based index of the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, –1.
	  */
	  observableProto.findIndex = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, true);
	  };

	  /**
	   * Converts the observable sequence to a Set if it exists.
	   * @returns {Observable} An observable sequence with a single value of a Set containing the values from the observable sequence.
	   */
	  observableProto.toSet = function () {
	    if (typeof root.Set === 'undefined') { throw new TypeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var s = new root.Set();
	      return source.subscribe(
	        function (x) { s.add(x); },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(s);
	          o.onCompleted();
	        });
	    }, source);
	  };

	  /**
	  * Converts the observable sequence to a Map if it exists.
	  * @param {Function} keySelector A function which produces the key for the Map.
	  * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
	  * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
	  */
	  observableProto.toMap = function (keySelector, elementSelector) {
	    if (typeof root.Map === 'undefined') { throw new TypeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var m = new root.Map();
	      return source.subscribe(
	        function (x) {
	          var key;
	          try {
	            key = keySelector(x);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }

	          var element = x;
	          if (elementSelector) {
	            try {
	              element = elementSelector(x);
	            } catch (e) {
	              o.onError(e);
	              return;
	            }
	          }

	          m.set(key, element);
	        },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(m);
	          o.onCompleted();
	        });
	    }, source);
	  };

	    return Rx;
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ },
/* 157 */
/***/ function(module, exports) {

	module.exports = function noop() {};


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var Observable = Rx.Observable;
	var Disposable = Rx.Disposable;
	var GetResponse = __webpack_require__(159);
	var IdempotentResponse = __webpack_require__(176);
	var InvalidSourceError = __webpack_require__(72);

	var arrayFlatMap = __webpack_require__(181);
	var emptyArray = new Array(0);

	function SetResponse(subscribe) {
	    IdempotentResponse.call(this, subscribe || subscribeToSetResponse);
	}

	SetResponse.create = IdempotentResponse.create;

	SetResponse.prototype = Object.create(IdempotentResponse.prototype);
	SetResponse.prototype.method = "set";
	SetResponse.prototype.constructor = SetResponse;

	SetResponse.prototype.invokeSourceRequest = function invokeSourceRequest(model) {

	    var source = this;
	    var caught = this.catch(function setJSONGraph(results) {

	        var requestObs;
	        if (results && results.invokeSourceRequest === true) {

	            var envelope = {};
	            var boundPath = model._path;
	            var optimizedPaths = results.optimizedPaths;

	            model._path = emptyArray;
	            model._getPathValuesAsJSONG(model._materialize().withoutDataSource(), optimizedPaths, [envelope]);
	            model._path = boundPath;
	            requestObs = model.
	                _request.set(envelope).
	                do(
	                    function setResponseEnvelope(envelope2) {
	                        source.isCompleted = optimizedPaths.length === envelope2.paths.length;
	                    },
	                    function setResponseError() {
	                        source.isCompleted = true;
	                    }
	                ).
	                materialize().
	                flatMap(function(notification) {
	                    if (notification.kind === "C") {
	                        return Observable.empty();
	                    }
	                    if (notification.kind === "E") {
	                        var ex = notification.exception;
	                        if (InvalidSourceError.is(ex)) {
	                            return Observable.throw(notification.exception);
	                        }
	                    }
	                    return caught;
	                });
	        }
	        else {
	            requestObs = Observable.throw(results);
	        }

	        return requestObs;
	    });

	    return new this.constructor(function(observer) {
	        return caught.subscribe(observer);
	    });
	};

	function subscribeToSetResponse(observer) {

	    if (this.isCompleted) {
	        return subscribeToFollowupGet.call(this, observer);
	    }

	    return subscribeToLocalSet.call(this, observer);
	}

	function subscribeToLocalSet(observer) {

	    if (this.subscribeCount++ > this.subscribeLimit) {
	        observer.onError("Loop kill switch thrown.");
	        return Disposable.empty;
	    }

	    var requestedPaths = [];
	    var optimizedPaths = [];
	    var model = this.model;
	    var isMaster = this.isMaster;
	    var modelRoot = model._root;
	    var outputFormat = this.outputFormat;
	    var errorSelector = modelRoot.errorSelector;

	    var method = this.method;
	    var groups = this.groups;
	    var groupIndex = -1;
	    var groupCount = groups.length;

	    while (++groupIndex < groupCount) {

	        var group = groups[groupIndex];
	        var inputType = group.inputType;
	        var methodArgs = group.arguments;

	        if (methodArgs.length > 0) {

	            var operationName = "_" + method + inputType + outputFormat;
	            var operationFunc = model[operationName];
	            var successfulPaths = operationFunc(model, methodArgs, null, errorSelector);

	            optimizedPaths.push.apply(optimizedPaths, successfulPaths[1]);

	            if (inputType === "PathValues") {
	                requestedPaths.push.apply(requestedPaths, methodArgs.map(pluckPath));
	            } else if (inputType === "JSONGs") {
	                requestedPaths.push.apply(requestedPaths, arrayFlatMap(methodArgs, pluckEnvelopePaths));
	            } else {
	                requestedPaths.push.apply(requestedPaths, successfulPaths[0]);
	            }
	        }
	    }

	    this.requestedPaths = requestedPaths;

	    if (isMaster) {
	        this.isCompleted = true;
	        return subscribeToFollowupGet.call(this, observer);
	    } else {
	        observer.onError({
	            method: method,
	            optimizedPaths: optimizedPaths,
	            invokeSourceRequest: true
	        });
	    }
	}

	function subscribeToFollowupGet(observer) {
	    var response = new GetResponse(this.model, this.requestedPaths);
	    if (this.outputFormat === "AsJSONG") {
	        response = response._toJSONG();
	    }
	    if (this.isProgressive) {
	        response = response.progressively();
	    }
	    return response.subscribe(observer);
	}

	function pluckPath(pathValue) {
	    return pathValue.path;
	}

	function pluckEnvelopePaths(jsonGraphEnvelope) {
	    return jsonGraphEnvelope.paths;
	}

	module.exports = SetResponse;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var ModelResponse = __webpack_require__(155);
	var checkCacheAndReport = __webpack_require__(160);
	var getRequestCycle = __webpack_require__(172);
	var empty = {dispose: function() {}};
	var Observable = __webpack_require__(65).Observable;

	/**
	 * The get response.  It takes in a model and paths and starts
	 * the request cycle.  It has been optimized for cache first requests
	 * and closures.
	 * @param {Model} model -
	 * @param {Array} paths -
	 * @private
	 */
	var GetResponse = module.exports = function GetResponse(model, paths,
	                                                        isJSONGraph,
	                                                        isProgressive) {
	    this.model = model;
	    this.currentRemainingPaths = paths;
	    this.isJSONGraph = isJSONGraph || false;
	    this.isProgressive = isProgressive || false;
	};

	GetResponse.prototype = Object.create(Observable.prototype);

	// becomes a subscribable/thenable from ModelResponse.
	GetResponse.prototype.subscribe = ModelResponse.prototype.subscribe;
	GetResponse.prototype.then = ModelResponse.prototype.then;

	/**
	 * Makes the output of a get response JSONGraph instead of json.
	 * @private
	 */
	GetResponse.prototype._toJSONG = function _toJSONGraph() {
	    return new GetResponse(this.model, this.currentRemainingPaths,
	                           true, this.isProgressive);
	};

	/**
	 * Progressively responding to data in the cache instead of once the whole
	 * operation is complete.
	 * @public
	 */
	GetResponse.prototype.progressively = function progressively() {
	    return new GetResponse(this.model, this.currentRemainingPaths,
	                           this.isJSONGraph, true);
	};

	/**
	 * purely for the purposes of closure creation other than the initial
	 * prototype created closure.
	 *
	 * @private
	 */
	GetResponse.prototype._subscribe = function _subscribe(observer) {
	    var seed = [{}];
	    var errors = [];
	    var isJSONG = observer.isJSONG = this.isJSONGraph;
	    var isProgressive = this.isProgressive;
	    var results = checkCacheAndReport(this.model, this.currentRemainingPaths,
	                                      observer, isProgressive, isJSONG, seed,
	                                      errors);

	    // If there are no results, finish.
	    if (!results) {
	        return empty;
	    }

	    // Starts the async request cycle.
	    return getRequestCycle(this, this.model, results,
	                           observer, seed, errors, 1);
	};


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var gets = __webpack_require__(161);
	var getWithPathsAsJSONGraph = gets.getWithPathsAsJSONGraph;
	var getWithPathsAsPathMap = gets.getWithPathsAsPathMap;

	/**
	 * Checks cache for the paths and reports if in progressive mode.  If
	 * there are missing paths then return the cache hit results.
	 *
	 * @param {Model} model - The model that the request was made with.
	 * @param {Array} requestedMissingPaths -
	 * @param {Boolean} progressive -
	 * @param {Boolean} isJSONG -
	 * @param {Function} onNext -
	 * @param {Function} onError -
	 * @param {Function} onCompleted -
	 * @param {Object} seed - The state of the output
	 * @private
	 */
	module.exports = function checkCacheAndReport(model, requestedPaths, observer,
	                                              progressive, isJSONG, seed,
	                                              errors) {

	    // checks the cache for the data.
	    var results;
	    if (isJSONG) {
	        results = getWithPathsAsJSONGraph(model, requestedPaths, seed);
	    } else {
	        results = getWithPathsAsPathMap(model, requestedPaths, seed);
	    }

	    // We must communicate critical errors from get that are critical
	    // errors such as bound path is broken or this is a JSONGraph request
	    // with a bound path.
	    if (results.criticalError) {
	        observer.onError(results.criticalError);
	        return null;
	    }

	    // We are done when there are no missing paths or the model does not
	    // have a dataSource to continue on fetching from.
	    var hasValues = results.hasValue;
	    var completed = !results.requestedMissingPaths || !model._source;

	    // Copy the errors into the total errors array.
	    if (results.errors) {
	        var errs = results.errors;
	        var errorsLength = errors.length;
	        for (var i = 0, len = errs.length; i < len; ++i, ++errorsLength) {
	            errors[errorsLength] = errs[i];
	        }
	    }

	    // If there are values to report, then report.

	    if (hasValues && (progressive || completed)) {
	        // TODO: Remove the sync counter
	        try {
	            ++model._root.syncRefCount;
	            observer.onNext(seed[0]);
	        } catch(e) {
	            throw e;
	        } finally {
	            --model._root.syncRefCount;
	        }
	    }

	    // if there are missing paths, then lets return them.
	    if (completed) {
	        if (errors.length) {
	            observer.onError(errors);
	        } else {
	            observer.onCompleted();
	        }

	        return null;
	    }

	    // Return the results object.
	    return results;
	};


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var get = __webpack_require__(162);
	var walkPath = __webpack_require__(166);

	var getWithPathsAsPathMap = get(walkPath, false);
	var getWithPathsAsJSONGraph = get(walkPath, true);

	module.exports = {
	    getValueSync: __webpack_require__(138),
	    getBoundValue: __webpack_require__(137),
	    getWithPathsAsPathMap: getWithPathsAsPathMap,
	    getWithPathsAsJSONGraph: getWithPathsAsJSONGraph
	};


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var getCachePosition = __webpack_require__(163);
	var InvalidModelError = __webpack_require__(146);
	var BoundJSONGraphModelError = __webpack_require__(165);
	var SHORTED = __webpack_require__(164);

	module.exports = function get(walk, isJSONG) {
	    return function innerGet(model, paths, seed) {
	        var valueNode = seed[0];
	        var results = {
	            values: seed,
	            optimizedPaths: []
	        };
	        var cache = model._root.cache;
	        var boundPath = model._path;
	        var currentCachePosition = cache;
	        var optimizedPath, optimizedLength = boundPath.length;
	        var i, len;
	        var requestedPath = [];

	        // If the model is bound, then get that cache position.
	        if (optimizedLength) {

	            // JSONGraph output cannot ever be bound or else it will
	            // throw an error.
	            if (isJSONG) {
	                return {
	                    criticalError: new BoundJSONGraphModelError()
	                };
	            }
	            currentCachePosition = getCachePosition(model, boundPath);

	            // If there was a short, then we 'throw an error' to the outside
	            // calling function which will onError the observer.
	            if (currentCachePosition === SHORTED) {
	                return {
	                    criticalError: new InvalidModelError(boundPath, boundPath)
	                };
	            }

	            // We need to get the new cache position and copy the bound
	            // path.
	            optimizedPath = [];
	            for (i = 0; i < optimizedLength; ++i) {
	                optimizedPath[i] = boundPath[i];
	            }
	        }

	        // Update the optimized path if we
	        else {
	            optimizedPath = [];
	            optimizedLength = 0;
	        }

	        for (i = 0, len = paths.length; i < len; i++) {
	            walk(model, cache, currentCachePosition, paths[i], 0,
	                 valueNode, results, requestedPath, optimizedPath,
	                 optimizedLength, isJSONG);
	        }
	        return results;
	    };
	};


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var SHORTED = __webpack_require__(164);
	/**
	 * getCachePosition makes a fast walk to the bound value since all bound
	 * paths are the most possible optimized path.
	 *
	 * @param {Model} model -
	 * @param {Array} path -
	 * @returns {Mixed} - undefined if there is nothing in this position.
	 * @private
	 */
	module.exports = function getCachePosition(model, path) {
	    var currentCachePosition = model._root.cache;
	    var depth = -1;
	    var maxDepth = path.length;

	    // The loop is simple now, we follow the current cache position until
	    //
	    while (++depth < maxDepth &&
	           currentCachePosition && !currentCachePosition.$type) {

	        currentCachePosition = currentCachePosition[path[depth]];
	    }

	    if (depth !== maxDepth && currentCachePosition) {
	        return SHORTED;
	    }

	    return currentCachePosition;
	};


/***/ },
/* 164 */
/***/ function(module, exports) {

	/**
	 * The SHORTED constant.  Since what is returned from a
	 * cache position lookop will always be an object, any non
	 * object will do fine for a constant.
	 * @private
	 */
	module.exports = 1;


/***/ },
/* 165 */
/***/ function(module, exports) {

	/**
	 * When a bound model attempts to retrieve JSONGraph it should throw an
	 * error.
	 *
	 * @private
	 */
	function BoundJSONGraphModelError() {
	    this.message = BoundJSONGraphModelError.message;
	    this.stack = (new Error()).stack;
	}

	// instanceof will be an error, but stack will be correct because its defined in the constructor.
	BoundJSONGraphModelError.prototype = new Error();
	BoundJSONGraphModelError.prototype.name = "BoundJSONGraphModelError";
	BoundJSONGraphModelError.message =
	    "It is not legal to use the JSON Graph " +
	    "format from a bound Model. JSON Graph format" +
	    " can only be used from a root model.";

	module.exports = BoundJSONGraphModelError;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var followReference = __webpack_require__(139);
	var onValueType = __webpack_require__(167);
	var isExpired = __webpack_require__(145);
	var iterateKeySet = __webpack_require__(73).iterateKeySet;
	var $ref = __webpack_require__(91);

	module.exports = function walkPath(model, root, curr, path, depth, seed,
	                                   outerResults, requestedPath,
	                                   optimizedPathArg, optimizedLength, isJSONG,
	                                   fromReferenceArg) {

	    var fromReference = fromReferenceArg;
	    var optimizedPath = optimizedPathArg;

	    // If there is not a value in the current cache position or its a
	    // value type, then we are at the end of the getWalk.
	    if ((!curr || curr && curr.$type) || depth === path.length) {
	        onValueType(model, curr, path, depth, seed, outerResults,
	                requestedPath, optimizedPath, optimizedLength,
	                isJSONG, fromReference);
	        return;
	    }

	    var keySet, i;
	    keySet = path[depth];

	    var isKeySet = typeof keySet === "object";
	    var nextDepth = depth + 1;
	    var iteratorNote = false;
	    var key = keySet;
	    if (isKeySet) {
	        iteratorNote = {};
	        key = iterateKeySet(keySet, iteratorNote);
	    }

	    // The key can be undefined if there is an empty path.  An example of an
	    // empty path is: [lolomo, [], summary]
	    if (key === undefined && iteratorNote.done) {
	        return;
	    }

	    // loop over every key over the keySet
	    var optimizedLengthPlus1 = optimizedLength + 1;
	    do {
	        fromReference = false;

	        var next;

	        if (key === null) {
	            next = curr;
	        }
	        else {
	            next = curr[key];
	            optimizedPath[optimizedLength] = key;
	            requestedPath[depth] = key;
	        }

	        var nextOptimizedPath = optimizedPath;
	        var nextOptimizedLength = optimizedLengthPlus1;

	        // If there is the next position we need to consider references.
	        if (next) {
	            var nType = next.$type;
	            var value = nType && next.value || next;

	            // If next is a reference follow it.  If we are in JSONG mode,
	            // report that value into the seed without passing the requested
	            // path.  If a requested path is passed to onValueType then it
	            // will add that path to the JSONGraph envelope under `paths`
	            if (nextDepth < path.length && nType &&
	                nType === $ref && !isExpired(next)) {
	                if (isJSONG) {
	                    onValueType(model, next, path, nextDepth, seed,
	                                outerResults, null, optimizedPath,
	                                nextOptimizedLength, isJSONG, fromReference);
	                }
	                var ref = followReference(model, root, root, next,
	                                          value, seed, isJSONG);
	                fromReference = true;
	                next = ref[0];
	                var refPath = ref[1];
	                nextOptimizedPath = [];
	                nextOptimizedLength = refPath.length;
	                for (i = 0; i < nextOptimizedLength; ++i) {
	                    nextOptimizedPath[i] = refPath[i];
	                }
	            }
	        }

	        // Recurse to the next level.
	        walkPath(model, root, next, path, nextDepth, seed, outerResults,
	                requestedPath, nextOptimizedPath, nextOptimizedLength,
	                isJSONG, fromReference);

	        // If the iteratorNote is not done, get the next key.
	        if (iteratorNote && !iteratorNote.done) {
	            key = iterateKeySet(keySet, iteratorNote);
	        }

	    } while (iteratorNote && !iteratorNote.done);
	};


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var isExpired = __webpack_require__(145);
	var hardLink = __webpack_require__(140);
	var lru = __webpack_require__(142);
	var removeHardlink = hardLink.remove;
	var splice = lru.splice;
	var $error = __webpack_require__(108);
	var onError = __webpack_require__(168);
	var onValue = __webpack_require__(141);
	var onMissing = __webpack_require__(169);
	var isMaterialized = __webpack_require__(171);
	var __invalidated = __webpack_require__(104);

	/**
	 * When we land on a valueType (or nothing) then we need to report it out to
	 * the outerResults through errors, missing, or values.
	 *
	 * @private
	 */
	module.exports = function onValueType(
	    model, node, path, depth, seed, outerResults,
	    requestedPath, optimizedPath, optimizedLength, isJSONG, fromReference) {

	    var currType = node && node.$type;
	    var requiresMaterializedToReport = node && node.value === undefined;

	    // There are is nothing here, ether report value, or report the value
	    // that is missing.  If there is no type then report the missing value.
	    if (!node || !currType) {
	        if (isMaterialized(model)) {
	            onValue(model, node, seed, depth, outerResults,
	                    requestedPath, optimizedPath, optimizedLength,
	                    isJSONG, fromReference);
	        } else {
	            onMissing(model, path, depth,
	                      outerResults, requestedPath,
	                      optimizedPath, optimizedLength);
	        }
	        return;
	    }

	    // If there are expired value, then report it as missing
	    else if (isExpired(node)) {
	        if (!node[__invalidated]) {
	            splice(model, node);
	            removeHardlink(node);
	        }
	        onMissing(model, path, depth,
	                  outerResults, requestedPath,
	                  optimizedPath, optimizedLength);
	    }

	    // If there is an error, then report it as a value if
	    else if (currType === $error) {
	        if (fromReference) {
	            requestedPath[depth] = null;
	        }
	        if (isJSONG || model._treatErrorsAsValues) {
	            onValue(model, node, seed, depth, outerResults, requestedPath,
	                    optimizedPath, optimizedLength, isJSONG, fromReference);
	        } else {
	            onError(model, node, depth, requestedPath, outerResults);
	        }
	    }

	    // Report the value
	    else {
	        if (fromReference) {
	            requestedPath[depth] = null;
	        }

	        if (!requiresMaterializedToReport ||
	            requiresMaterializedToReport && isMaterialized(model)) {

	            onValue(model, node, seed, depth, outerResults, requestedPath,
	                    optimizedPath, optimizedLength, isJSONG, fromReference);
	        }
	    }
	};



/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var lru = __webpack_require__(142);
	var clone = __webpack_require__(143);
	var promote = lru.promote;

	module.exports = function onError(model, node, depth,
	                                  requestedPath, outerResults) {
	    var value = node.value;
	    if (!outerResults.errors) {
	        outerResults.errors = [];
	    }

	    if (model._boxed) {
	        value = clone(node);
	    }
	    outerResults.errors.push({
	        path: requestedPath.slice(0, depth + 1),
	        value: value
	    });
	    promote(model, node);
	};


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var support = __webpack_require__(170);
	var fastCopy = support.fastCopy;

	module.exports = function onMissing(model, path, depth,
	                                    outerResults, requestedPath,
	                                    optimizedPath, optimizedLength) {
	    var pathSlice;
	    if (!outerResults.requestedMissingPaths) {
	        outerResults.requestedMissingPaths = [];
	        outerResults.optimizedMissingPaths = [];
	    }

	    if (depth < path.length) {
	        pathSlice = fastCopy(path, depth);
	    } else {
	        pathSlice = [];
	    }

	    concatAndInsertMissing(model, pathSlice, depth, requestedPath,
	                           optimizedPath, optimizedLength, outerResults);
	};

	function concatAndInsertMissing(model, remainingPath, depth, requestedPath,
	                                optimizedPath, optimizedLength, results) {

	    // TODO: Performance.
	    results.requestedMissingPaths.push(
	        requestedPath.
	            slice(0, depth).
	            concat(remainingPath));

	    results.optimizedMissingPaths.push(
	        optimizedPath.slice(0, optimizedLength).concat(remainingPath));
	}


/***/ },
/* 170 */
/***/ function(module, exports) {

	function fastCopy(arr, iArg) {
	    var a = [], len, j, i;
	    for (j = 0, i = iArg || 0, len = arr.length; i < len; j++, i++) {
	        a[j] = arr[i];
	    }
	    return a;
	}

	function fastCatSkipNulls(arr1, arr2) {
	    var a = [], i, len, j;
	    for (i = 0, len = arr1.length; i < len; i++) {
	        a[i] = arr1[i];
	    }
	    for (j = 0, len = arr2.length; j < len; j++) {
	        if (arr2[j] !== null) {
	            a[i++] = arr2[j];
	        }
	    }
	    return a;
	}

	function fastCat(arr1, arr2) {
	    var a = [], i, len, j;
	    for (i = 0, len = arr1.length; i < len; i++) {
	        a[i] = arr1[i];
	    }
	    for (j = 0, len = arr2.length; j < len; j++) {
	        a[i++] = arr2[j];
	    }
	    return a;
	}



	module.exports = {
	    fastCat: fastCat,
	    fastCatSkipNulls: fastCatSkipNulls,
	    fastCopy: fastCopy
	};


/***/ },
/* 171 */
/***/ function(module, exports) {

	module.exports = function isMaterialized(model) {
	    return model._materialized && !model._source;
	};


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var checkCacheAndReport = __webpack_require__(160);
	var MaxRetryExceededError = __webpack_require__(173);
	var fastCat = __webpack_require__(170).fastCat;
	var collectLru = __webpack_require__(174);
	var getSize = __webpack_require__(109);
	var AssignableDisposable = __webpack_require__(175);

	/**
	 * The get request cycle for checking the cache and reporting
	 * values.  If there are missing paths then the async request cycle to
	 * the data source is performed until all paths are resolved or max
	 * requests are made.
	 * @param {GetResponse} getResponse -
	 * @param {Model} model - The model that the request was made with.
	 * @param {Object} results -
	 * @param {Function} onNext -
	 * @param {Function} onError -
	 * @param {Function} onCompleted -
	 * @param {Object} seedArg - The state of the output
	 * @private
	 */
	module.exports = function getRequestCycle(getResponse, model, results, observer,
	                                          seed, errors, count) {
	    // we have exceeded the maximum retry limit.
	    if (count === 10) {
	        throw new MaxRetryExceededError();
	    }

	    var requestQueue = model._request;
	    var requestedMissingPaths = results.requestedMissingPaths;
	    var optimizedMissingPaths = results.optimizedMissingPaths;
	    var disposable = new AssignableDisposable();

	    // We need to prepend the bound path to all requested missing paths and
	    // pass those into the requestQueue.
	    var boundRequestedMissingPaths = [];
	    var boundPath = model._path;
	    if (boundPath.length) {
	        for (var i = 0, len = requestedMissingPaths.length; i < len; ++i) {
	            boundRequestedMissingPaths[i] =
	                fastCat(boundPath, requestedMissingPaths[i]);
	        }
	    }

	    // No bound path, no array copy and concat.
	    else {
	        boundRequestedMissingPaths = requestedMissingPaths;
	    }

	    var currentRequestDisposable = requestQueue.
	        get(boundRequestedMissingPaths, optimizedMissingPaths, function() {


	            // Once the request queue finishes, check the cache and bail if
	            // we can.
	            var nextResults = checkCacheAndReport(model, requestedMissingPaths,
	                                                  observer,
	                                                  getResponse.isProgressive,
	                                                  getResponse.isJSONGraph,
	                                                  seed, errors);

	            // If there are missing paths coming back form checkCacheAndReport
	            // the its reported from the core cache check method.
	            if (nextResults) {

	                // update the which disposable to use.
	                disposable.currentDisposable =
	                    getRequestCycle(getResponse, model, nextResults, observer,
	                                    seed, errors, count + 1);
	            }

	            // We have finished.  Since we went to the dataSource, we must
	            // collect on the cache.
	            else {

	                var modelRoot = model._root;
	                var modelCache = modelRoot.cache;
	                collectLru(modelRoot, modelRoot.expired, getSize(modelCache),
	                        model._maxSize, model._collectRatio);
	            }

	        });
	    disposable.currentDisposable = currentRequestDisposable;
	    return disposable;
	};


/***/ },
/* 173 */
/***/ function(module, exports) {

	var NAME = "MaxRetryExceededError";
	/**
	 * A request can only be retried up to a specified limit.  Once that
	 * limit is exceeded, then an error will be thrown.
	 *
	 * @private
	 */
	function MaxRetryExceededError() {
	    this.message = "The allowed number of retries have been exceeded.";
	    this.stack = (new Error()).stack;
	}

	// instanceof will be an error, but stack will be correct because its defined
	// in the constructor.
	MaxRetryExceededError.prototype = new Error();
	MaxRetryExceededError.prototype.name = NAME;
	MaxRetryExceededError.name = NAME;
	MaxRetryExceededError.is = function(e) {
	    return e && e.name === NAME;
	};

	module.exports = MaxRetryExceededError;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __parent = __webpack_require__(107);

	var __head = __webpack_require__(94);
	var __tail = __webpack_require__(95);
	var __next = __webpack_require__(96);
	var __prev = __webpack_require__(97);

	var removeNode = __webpack_require__(131);
	var updateNodeAncestors = __webpack_require__(134);

	module.exports = function collect(lru, expired, totalArg, max, ratioArg, version) {

	    var total = totalArg;
	    var ratio = ratioArg;

	    if (typeof ratio !== "number") {
	        ratio = 0.75;
	    }

	    var shouldUpdate = typeof version === "number";
	    var targetSize = max * ratio;
	    var parent, node, size;

	    node = expired.pop();

	    while (node) {
	        size = node.$size || 0;
	        total -= size;
	        if (shouldUpdate === true) {
	            updateNodeAncestors(node, size, lru, version);
	        } else if (parent = node[__parent]) {
	            removeNode(node, parent, node[__key], lru);
	        }
	        node = expired.pop();
	    }

	    if (total >= max) {
	        var prev = lru[__tail];
	        node = prev;
	        while ((total >= targetSize) && node) {
	            prev = prev[__prev];
	            size = node.$size || 0;
	            total -= size;
	            if (shouldUpdate === true) {
	                updateNodeAncestors(node, size, lru, version);
	            }
	            node = prev;
	        }

	        lru[__tail] = lru[__prev] = node;
	        if (node == null) {
	            lru[__head] = lru[__next] = void 0;
	        } else {
	            node[__next] = void 0;
	        }
	    }
	};


/***/ },
/* 175 */
/***/ function(module, exports) {

	/**
	 * Will allow for state tracking of the current disposable.  Also fulfills the
	 * disposable interface.
	 * @private
	 */
	var AssignableDisposable = function AssignableDisposable(disosableCallback) {
	    this.disposed = false;
	    this.currentDisposable = disosableCallback;
	};


	AssignableDisposable.prototype = {

	    /**
	     * Disposes of the current disposable.  This would be the getRequestCycle
	     * disposable.
	     */
	    dispose: function dispose() {
	        if (this.disposed || !this.currentDisposable) {
	            return;
	        }
	        this.disposed = true;

	        // If the current disposable fulfills the disposable interface or just
	        // a disposable function.
	        var currentDisposable = this.currentDisposable;
	        if (currentDisposable.dispose) {
	            currentDisposable.dispose();
	        }

	        else {
	            currentDisposable();
	        }
	    }
	};


	module.exports = AssignableDisposable;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var Observable = Rx.Observable;

	var ModelResponse = __webpack_require__(155);

	var pathSyntax = __webpack_require__(114);

	var getSize = __webpack_require__(109);
	var collectLru = __webpack_require__(174);

	var arrayClone = __webpack_require__(177);

	var isArray = Array.isArray;
	var isPathValue = __webpack_require__(178);
	var isJSONEnvelope = __webpack_require__(179);
	var isJSONGraphEnvelope = __webpack_require__(180);

	function IdempotentResponse(subscribe) {
	    Observable.call(this, subscribe);
	}

	IdempotentResponse.create = ModelResponse.create;

	IdempotentResponse.prototype = Object.create(Observable.prototype);
	IdempotentResponse.prototype.constructor = IdempotentResponse;

	IdempotentResponse.prototype.subscribeCount = 0;
	IdempotentResponse.prototype.subscribeLimit = 10;

	IdempotentResponse.prototype.initialize = function initializeResponse() {

	    var model = this.model;
	    var outputFormat = this.outputFormat || "AsPathMap";
	    var isProgressive = this.isProgressive;
	    var values = [{}];

	    var groups = [];
	    var args = this.args;

	    var group, groupType;

	    var argIndex = -1;
	    var argCount = args.length;

	    // Validation of arguments have been moved out of this function.
	    while (++argIndex < argCount) {
	        var arg = args[argIndex];
	        var argType;
	        if (isArray(arg) || typeof arg === "string") {
	            arg = pathSyntax.fromPath(arg);
	            argType = "PathValues";
	        } else if (isPathValue(arg)) {
	            arg.path = pathSyntax.fromPath(arg.path);
	            argType = "PathValues";
	        } else if (isJSONGraphEnvelope(arg)) {
	            argType = "JSONGs";
	        } else if (isJSONEnvelope(arg)) {
	            argType = "PathMaps";
	        }
	        if (groupType !== argType) {
	            groupType = argType;
	            group = {
	                inputType: argType,
	                arguments: []
	            };
	            groups.push(group);
	            group.values = values;
	        }

	        group.arguments.push(arg);
	    }

	    this.boundPath = arrayClone(model._path);
	    this.groups = groups;
	    this.outputFormat = outputFormat;
	    this.isProgressive = isProgressive;
	    this.isCompleted = false;
	    this.isMaster = model._source == null;
	    this.values = values;

	    return this;
	};

	IdempotentResponse.prototype.invokeSourceRequest = function invokeSourceRequest(model) {
	    return this;
	};

	IdempotentResponse.prototype.ensureCollect = function ensureCollect(model) {
	    var ensured = this.finally(function ensureCollect() {

	        var modelRoot = model._root;
	        var modelCache = modelRoot.cache;

	        modelRoot.collectionScheduler.schedule(function collectThisPass() {
	            collectLru(modelRoot, modelRoot.expired, getSize(modelCache), model._maxSize, model._collectRatio);
	        });
	    });

	    return new this.constructor(function(observer) {
	        return ensured.subscribe(observer);
	    });
	};

	module.exports = IdempotentResponse;


/***/ },
/* 177 */
/***/ function(module, exports) {

	module.exports = function arrayClone(array) {
	    if (!array) {
	        return array;
	    }
	    var i = -1;
	    var n = array.length;
	    var array2 = [];
	    while (++i < n) {
	        array2[i] = array[i];
	    }
	    return array2;
	};


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = Array.isArray;
	var isObject = __webpack_require__(63);

	module.exports = function isPathValue(pathValue) {
	    return isObject(pathValue) && (
	        isArray(pathValue.path) || (
	            typeof pathValue.path === "string"
	        ));
	};


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(63);

	module.exports = function isJSONEnvelope(envelope) {
	    return isObject(envelope) && ("json" in envelope);
	};


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = Array.isArray;
	var isObject = __webpack_require__(63);

	module.exports = function isJSONGraphEnvelope(envelope) {
	    return isObject(envelope) && isArray(envelope.paths) && (
	        isObject(envelope.jsonGraph) ||
	        isObject(envelope.jsong) ||
	        isObject(envelope.json) ||
	        isObject(envelope.values) ||
	        isObject(envelope.value)
	    );
	};


/***/ },
/* 181 */
/***/ function(module, exports) {

	module.exports = function arrayFlatMap(array, selector) {
	    var index = -1;
	    var i = -1;
	    var n = array.length;
	    var array2 = new Array(n);
	    while (++i < n) {
	        var array3 = selector(array[i], i, array);
	        var j = -1;
	        var k = array3.length;
	        while (++j < k) {
	            array2[++index] = array3[j];
	        }
	    }
	    return array2;
	};


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65) && __webpack_require__(156);
	var Observable = Rx.Observable;
	var CompositeDisposable = Rx.CompositeDisposable;

	var ModelResponse = __webpack_require__(155);
	var InvalidSourceError = __webpack_require__(72);

	var pathSyntax = __webpack_require__(114);

	var $ref = __webpack_require__(91);

	function CallResponse(subscribe) {
	    Observable.call(this, subscribe || subscribeToResponse);
	}

	CallResponse.create = ModelResponse.create;

	CallResponse.prototype = Object.create(Observable.prototype);
	CallResponse.prototype.constructor = CallResponse;

	CallResponse.prototype.invokeSourceRequest = function invokeSourceRequest(model) {
	    return this;
	};

	CallResponse.prototype.ensureCollect = function ensureCollect(model) {
	    return this;
	};

	CallResponse.prototype.initialize = function initializeResponse() {
	    return this;
	};

	function toObservable(x) {
	    return Rx.Observable.defer(function() {
	        return x;
	    });
	}

	function subscribeToResponse(observer) {

	    var args = this.args;
	    var model = this.model;

	    var callPath = pathSyntax.fromPath(args[0]);
	    var callArgs = args[1] || [];
	    var suffixes = (args[2] || []).map(pathSyntax.fromPath);
	    var extraPaths = (args[3] || []).map(pathSyntax.fromPath);

	    var rootModel = model._clone({
	        _path: []
	    });
	    var localRoot = rootModel.withoutDataSource();
	    var boundPath = model._path;
	    var boundCallPath = boundPath.concat(callPath);
	    var boundThisPath = boundCallPath.slice(0, -1);

	    var setCallValuesObs = toObservable(
	            model.withoutDataSource().get(callPath)
	        )
	        .map(function(data) {
	            var curr = data.json;
	            var depth = -1;
	            var length = callPath.length;

	            while (curr && ++depth < length) {
	                curr = curr[callPath[depth]];
	            }
	            var boundModel = rootModel._derefSync(boundThisPath).boxValues();
	            return {
	                model: boundModel,
	                localFn: curr
	            };
	        })
	        .flatMap(getLocalCallObs)
	        .defaultIfEmpty(getRemoteCallObs(model._source))
	        .mergeAll()
	        .flatMap(setCallEnvelope);

	    var disposables = new CompositeDisposable();

	    disposables.add(setCallValuesObs.subscribe(function(envelope) {
	            var paths = envelope.paths;
	            var invalidated = envelope.invalidated;
	            var innerObs = model.get.apply(model, paths);
	            if (observer.outputFormat === "AsJSONG") {
	                innerObs = toObservable(innerObs._toJSONG()).doAction(function(envelope2) {
	                    envelope2.invalidated = invalidated;
	                });
	            }
	            disposables.add(innerObs.subscribe(observer));
	        },
	        function(e) {
	            observer.onError(e);
	        }
	    ));

	    return disposables;

	    function getLocalCallObs(tuple) {

	        var localFn = tuple && tuple.localFn;

	        if (typeof localFn === "function") {

	            var localFnModel = tuple.model;
	            var localThisPath = localFnModel._path;

	            var remoteGetValues = localFn
	                .apply(localFnModel, callArgs)
	                .reduce(aggregateFnResults, {
	                    values: [],
	                    references: [],
	                    invalidations: [],
	                    localThisPath: localThisPath
	                })
	                .flatMap(setLocalValues)
	                .flatMap(getRemoteValues);

	            return Observable.return(remoteGetValues);
	        }

	        return Observable.empty();

	        function aggregateFnResults(results, pathValue) {
	            if (Boolean(pathValue.invalidated)) {
	                results.invalidations.push(results.localThisPath.concat(pathValue.path));
	            } else {
	                var path = pathValue.path;
	                var value = pathValue.value;
	                if (Boolean(value) && typeof value === "object" && value.$type === $ref) {
	                    results.references.push({
	                        path: prependThisPath(path),
	                        value: pathValue.value
	                    });
	                } else {
	                    results.values.push({
	                        path: prependThisPath(path),
	                        value: pathValue.value
	                    });
	                }
	            }
	            return results;
	        }

	        function setLocalValues(results) {
	            var values = results.values.concat(results.references);
	            if (values.length > 0) {
	                return toObservable(localRoot.set.
	                        apply(localRoot, values).
	                        _toJSONG())
	                    .map(function(envelope) {
	                        return {
	                            results: results,
	                            envelope: envelope
	                        };
	                    });
	            } else {
	                return Observable.return({
	                    results: results,
	                    envelope: {
	                        jsonGraph: {},
	                        paths: []
	                    }
	                });
	            }
	        }

	        function getRemoteValues(tuple2) {

	            var envelope = tuple2.envelope;
	            var results = tuple2.results;
	            var values = results.values;
	            var references = results.references;
	            var invalidations = results.invalidations;

	            var rootValues = values.map(pluckPath).map(prependThisPath);
	            var rootSuffixes = references.reduce(prependRefToSuffixes, []);
	            var rootExtraPaths = extraPaths.map(prependThisPath);
	            var rootPaths = rootSuffixes.concat(rootExtraPaths);
	            var envelopeObs;

	            if (rootPaths.length > 0) {
	                envelopeObs = toObservable(rootModel.get.apply(rootModel, rootValues.concat(rootPaths))._toJSONG());
	            } else {
	                envelopeObs = Observable.return(envelope);
	            }

	            return envelopeObs.doAction(function(envelope2) {
	                envelope2.invalidated = invalidations;
	            });
	        }

	        function prependRefToSuffixes(refPaths, refPathValue) {
	            var refPath = refPathValue.path;
	            refPaths.push.apply(refPaths, suffixes.map(function(pathSuffix) {
	                return refPath.concat(pathSuffix);
	            }));
	            return refPaths;
	        }

	        function pluckPath(pathValue) {
	            return pathValue.path;
	        }
	    }

	    function getRemoteCallObs(dataSource) {

	        if (dataSource && typeof dataSource === "object") {
	            return Rx.Observable.defer(function() {
	                var obs;
	                try {
	                    obs = dataSource.call(boundCallPath, callArgs, suffixes, extraPaths);
	                } catch (e) {
	                    obs = Observable.throw(new InvalidSourceError(e));
	                }
	                return obs;
	            }).map(invalidateLocalValues);
	        }

	        return Observable.empty();

	        function invalidateLocalValues(envelope) {
	            var invalidations = envelope.invalidated;
	            if (invalidations && invalidations.length) {
	                rootModel.invalidate.apply(rootModel, invalidations);
	            }
	            return envelope;
	        }
	    }

	    function setCallEnvelope(envelope) {
	        return toObservable(localRoot.set(envelope)).
	            reduce(function(acc) { return acc; }, null).
	            map(function() {
	                return {
	                    invalidated: envelope.invalidated,
	                    paths: envelope.paths.map(function(path) {
	                        return path.slice(boundPath.length);
	                    })
	                };
	            });
	    }

	    function prependThisPath(path) {
	        return boundThisPath.concat(path);
	    }
	}

	module.exports = CallResponse;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var Disposable = Rx.Disposable;

	var IdempotentResponse = __webpack_require__(176);

	function InvalidateResponse(subscribe) {
	    IdempotentResponse.call(this, subscribe || subscribeToInvalidateResponse);
	}

	InvalidateResponse.create = IdempotentResponse.create;

	InvalidateResponse.prototype = Object.create(IdempotentResponse.prototype);
	InvalidateResponse.prototype.method = "invalidate";
	InvalidateResponse.prototype.constructor = InvalidateResponse;

	function subscribeToInvalidateResponse(observer) {

	    var model = this.model;
	    var method = this.method;

	    var groups = this.groups;
	    var groupIndex = -1;
	    var groupCount = groups.length;

	    while (++groupIndex < groupCount) {

	        var group = groups[groupIndex];
	        var inputType = group.inputType;
	        var methodArgs = group.arguments;

	        if (methodArgs.length > 0) {
	            var operationName = "_" + method + inputType + "AsJSON";
	            var operationFunc = model[operationName];
	            operationFunc(model, methodArgs);
	        }
	    }

	    observer.onCompleted();

	    return Disposable.empty;
	}

	module.exports = InvalidateResponse;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var asap = __webpack_require__(58);
	var Rx = __webpack_require__(65);
	var Disposable = Rx.Disposable;

	function ASAPScheduler() {}

	ASAPScheduler.prototype.schedule = function schedule(action) {
	    asap(action);
	    return Disposable.empty;
	};

	ASAPScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
	    var self = this;
	    asap(function() {
	        action(self, state);
	    });
	    return Disposable.empty;
	};

	module.exports = ASAPScheduler;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var Disposable = Rx.Disposable;

	function TimeoutScheduler(delay) {
	    this.delay = delay;
	}

	TimeoutScheduler.prototype.schedule = function schedule(action) {
	    var id = setTimeout(action, this.delay);
	    return Disposable.create(function() {
	        if (id !== void 0) {
	            clearTimeout(id);
	            id = void 0;
	        }
	    });
	};

	TimeoutScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
	    var self = this;
	    var id = setTimeout(function() {
	        action(self, state);
	    }, this.delay);
	    return Disposable.create(function() {
	        if (id !== void 0) {
	            clearTimeout(id);
	            id = void 0;
	        }
	    });
	};

	module.exports = TimeoutScheduler;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __ref = __webpack_require__(86);
	var __prefix = __webpack_require__(85);
	var __parent = __webpack_require__(107);
	var __context = __webpack_require__(87);
	var __version = __webpack_require__(88);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	var $ref = __webpack_require__(91);

	var getBoundValue = __webpack_require__(137);

	var isArray = Array.isArray;
	var promote = __webpack_require__(92);
	var hasOwn = __webpack_require__(62);
	var isObject = __webpack_require__(63);
	var isExpired = __webpack_require__(111);
	var isFunction = __webpack_require__(61);
	var isPrimitive = __webpack_require__(101);
	var expireNode = __webpack_require__(102);
	var incrementVersion = __webpack_require__(105);
	var mergeValueOrInsertBranch = __webpack_require__(147);

	/**
	 * Sets a list of PathMaps into a JSON Graph.
	 * @function
	 * @param {Object} model - the Model for which to insert the PathMaps.
	 * @param {Array.<PathMapEnvelope>} pathMapEnvelopes - the a list of @PathMapEnvelopes to set.
	 * @return {Array.<Path>} - a list of optimized paths for the successfully set values.
	 */

	module.exports = function setPathMaps(model, pathMapEnvelopes, x, errorSelector, comparator) {

	    var modelRoot = model._root;
	    var lru = modelRoot;
	    var expired = modelRoot.expired;
	    var version = incrementVersion();
	    var bound = model._path;
	    var cache = modelRoot.cache;
	    var node = bound.length ? getBoundValue(model, bound).value : cache;
	    var parent = node[__parent] || cache;
	    var initialVersion = cache[__version];

	    var requestedPath = [];
	    var requestedPaths = [];
	    var optimizedPaths = [];
	    var optimizedIndex = bound.length;
	    var pathMapIndex = -1;
	    var pathMapCount = pathMapEnvelopes.length;

	    while (++pathMapIndex < pathMapCount) {

	        var pathMapEnvelope = pathMapEnvelopes[pathMapIndex];
	        var optimizedPath = bound.slice(0);
	        optimizedPath.index = optimizedIndex;

	        setPathMap(
	            pathMapEnvelope.json, 0, cache, parent, node,
	            requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector
	        );
	    }

	    var newVersion = cache[__version];
	    var rootChangeHandler = modelRoot.onChange;

	    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
	        rootChangeHandler();
	    }

	    return [requestedPaths, optimizedPaths];
	};

	/* eslint-disable no-constant-condition */
	function setPathMap(
	    pathMap, depth, root, parent, node,
	    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var keys = getKeys(pathMap);

	    if (keys && keys.length) {

	        var keyIndex = 0;
	        var keyCount = keys.length;
	        var optimizedIndex = optimizedPath.index;

	        do {
	            var key = keys[keyIndex];
	            var child = pathMap[key];
	            var branch = isObject(child) && !child.$type;
	            var results = setNode(
	                root, parent, node, key, child,
	                branch, false, requestedPath, optimizedPath,
	                version, expired, lru, comparator, errorSelector
	            );
	            requestedPath[depth] = key;
	            requestedPath.index = depth;
	            optimizedPath[optimizedPath.index++] = key;
	            var nextNode = results[0];
	            var nextParent = results[1];
	            if (nextNode) {
	                if (branch) {
	                    setPathMap(
	                        child, depth + 1,
	                        root, nextParent, nextNode,
	                        requestedPaths, optimizedPaths, requestedPath, optimizedPath,
	                        version, expired, lru, comparator, errorSelector
	                    );
	                } else {
	                    promote(lru, nextNode);
	                    requestedPaths.push(requestedPath.slice(0, requestedPath.index + 1));
	                    optimizedPaths.push(optimizedPath.slice(0, optimizedPath.index));
	                }
	            }
	            if (++keyIndex >= keyCount) {
	                break;
	            }
	            optimizedPath.index = optimizedIndex;
	        } while (true);
	    }
	}
	/* eslint-enable */

	function setReference(
	    value, root, node, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var reference = node.value;
	    optimizedPath.splice(0, optimizedPath.length);
	    optimizedPath.push.apply(optimizedPath, reference);

	    if (isExpired(node)) {
	        optimizedPath.index = reference.length;
	        expireNode(node, expired, lru);
	        return [undefined, root];
	    }

	    promote(lru, node);

	    var container = node;
	    var parent = root;

	    node = node[__context];

	    if (node != null) {
	        parent = node[__parent] || root;
	        optimizedPath.index = reference.length;
	    } else {

	        var index = 0;
	        var count = reference.length - 1;

	        parent = node = root;

	        do {
	            var key = reference[index];
	            var branch = index < count;
	            var results = setNode(
	                root, parent, node, key, value,
	                branch, true, requestedPath, optimizedPath,
	                version, expired, lru, comparator, errorSelector
	            );
	            node = results[0];
	            if (isPrimitive(node)) {
	                optimizedPath.index = index;
	                return results;
	            }
	            parent = results[1];
	        } while (index++ < count);

	        optimizedPath.index = index;

	        if (container[__context] !== node) {
	            var backRefs = node[__refsLength] || 0;
	            node[__refsLength] = backRefs + 1;
	            node[__ref + backRefs] = container;
	            container[__context] = node;
	            container[__refIndex] = backRefs;
	        }
	    }

	    return [node, parent];
	}

	function setNode(
	    root, parent, node, key, value,
	    branch, reference, requestedPath, optimizedPath,
	    version, expired, lru, comparator, errorSelector) {

	    var type = node.$type;

	    while (type === $ref) {

	        var results = setReference(
	            value, root, node, requestedPath, optimizedPath,
	            version, expired, lru, comparator, errorSelector);

	        node = results[0];

	        if (isPrimitive(node)) {
	            return results;
	        }

	        parent = results[1];
	        type = node && node.$type;
	    }

	    if (type !== void 0) {
	        return [node, parent];
	    }

	    if (key == null) {
	        if (branch) {
	            throw new Error("`null` is not allowed in branch key positions.");
	        } else if (node) {
	            key = node[__key];
	        }
	    } else {
	        parent = node;
	        node = parent[key];
	    }

	    node = mergeValueOrInsertBranch(
	        parent, node, key, value,
	        branch, reference, requestedPath, optimizedPath,
	        version, expired, lru, comparator, errorSelector
	    );

	    return [node, parent];
	}

	function getKeys(pathMap) {

	    if (isObject(pathMap) && !pathMap.$type) {
	        var keys = [];
	        var itr = 0;
	        if (isArray(pathMap)) {
	            keys[itr++] = "length";
	        }
	        for (var key in pathMap) {
	            if (key[0] === __prefix || key[0] === "$" || !hasOwn(pathMap, key)) {
	                continue;
	            }
	            keys[itr++] = key;
	        }
	        return keys;
	    }

	    return void 0;
	}


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = Array.isArray;
	var isPathValue = __webpack_require__(178);
	var isJSONGraphEnvelope = __webpack_require__(180);
	var isJSONEnvelope = __webpack_require__(179);
	var pathSyntax = __webpack_require__(114);

	/**
	 *
	 * @param {Object} allowedInput - allowedInput is a map of input styles
	 * that are allowed
	 * @private
	 */
	module.exports = function validateInput(args, allowedInput, method) {
	    for (var i = 0, len = args.length; i < len; ++i) {
	        var arg = args[i];
	        var valid = false;

	        // Path
	        if (isArray(arg) && allowedInput.path) {
	            valid = true;
	        }

	        // Path Syntax
	        else if (typeof arg === "string" && allowedInput.pathSyntax) {
	            valid = true;
	        }

	        // Path Value
	        else if (isPathValue(arg) && allowedInput.pathValue) {
	            arg.path = pathSyntax.fromPath(arg.path);
	            valid = true;
	        }

	        // jsonGraph {jsonGraph: { ... }, paths: [ ... ]}
	        else if (isJSONGraphEnvelope(arg) && allowedInput.jsonGraph) {
	            valid = true;
	        }

	        // json env {json: {...}}
	        else if (isJSONEnvelope(arg) && allowedInput.json) {
	            valid = true;
	        }

	        // selector functions
	        else if (typeof arg === "function" &&
	                 i + 1 === len &&
	                 allowedInput.selector) {
	            valid = true;
	        }

	        if (!valid) {
	            return new Error("Unrecognized argument " + (typeof arg) + " [" + String(arg) + "] " + "to Model#" + method + "");
	        }
	    }
	    return true;
	};


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var $modelCreated = __webpack_require__(124);
	var clone = __webpack_require__(143);
	var prefix = __webpack_require__(85);

	/**
	 * decends and copies the cache.
	 */
	module.exports = function getCache(cache) {
	    var out = {};
	    _copyCache(cache, out);

	    return out;
	};

	function _copyCache(node, out, fromKey) {
	    // copy and return

	    Object.
	        keys(node).
	        filter(function(k) {
	            return k[0] !== prefix && k !== "$size";
	        }).
	        forEach(function(key) {
	            var cacheNext = node[key];
	            var outNext = out[key];

	            if (!outNext) {
	                outNext = out[key] = {};
	            }

	            // Paste the node into the out cache.
	            if (cacheNext.$type) {
	                var isObject = cacheNext.value && typeof cacheNext.value === "object";
	                var isUserCreatedcacheNext = !node[$modelCreated];
	                var value;
	                if (isObject || isUserCreatedcacheNext) {
	                    value = clone(cacheNext);
	                } else {
	                    value = cacheNext.value;
	                }

	                out[key] = value;
	                return;
	            }

	            _copyCache(cacheNext, outNext, key);
	        });
	}


/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = {
	    path: true,
	    pathSyntax: true
	};


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var pathSyntax = __webpack_require__(114);
	var ModelResponse = __webpack_require__(155);
	var GET_VALID_INPUT = __webpack_require__(189);
	var validateInput = __webpack_require__(187);
	var GetResponse = __webpack_require__(159);

	/**
	 * Performs a get on the cache and if there are missing paths
	 * then the request will be forwarded to the get request cycle.
	 * @private
	 */
	module.exports = function get() {
	    // Validates the input.  If the input is not pathSets or strings then we
	    // will onError.
	    var out = validateInput(arguments, GET_VALID_INPUT, "get");
	    if (out !== true) {
	        return new ModelResponse(function(o) {
	            o.onError(out);
	        });
	    }

	    var paths = pathSyntax.fromPathsOrPathValues(arguments);
	    return new GetResponse(this, paths);
	};


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var GetResponse = __webpack_require__(159);

	/**
	 * Performs a get on the cache and if there are missing paths
	 * then the request will be forwarded to the get request cycle.
	 * @private
	 */
	module.exports = function getWithPaths(paths) {
	    return new GetResponse(this, paths);
	};


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var Rx = __webpack_require__(65);
	var pathSyntax = __webpack_require__(114);

	module.exports = function deref(boundPathArg) {

	    var model = this;
	    var modelRoot = model._root;
	    var pathsIndex = -1;
	    var pathsCount = arguments.length - 1;
	    var paths = new Array(pathsCount);

	    var boundPath = pathSyntax.fromPath(boundPathArg);

	    while (++pathsIndex < pathsCount) {
	        paths[pathsIndex] = pathSyntax.fromPath(arguments[pathsIndex + 1]);
	    }

	    if (modelRoot.syncRefCount <= 0 && pathsCount === 0) {
	        throw new Error("Model#deref requires at least one value path.");
	    }

	    return Rx.Observable.defer(function() {
	        var value;
	        var errorHappened = false;
	        try {
	            ++modelRoot.syncRefCount;
	            value = model._derefSync(boundPath);
	        } catch (e) {
	            value = e;
	            errorHappened = true;
	        } finally {
	            --modelRoot.syncRefCount;
	            return errorHappened ?
	                Rx.Observable.throw(value) :
	                Rx.Observable.return(value);
	        }
	    }).
	    flatMap(function(boundModel) {
	        if (Boolean(boundModel)) {
	            if (pathsCount > 0) {
	                return boundModel.get.
	                    apply(boundModel, paths).
	                    map(function() {
	                        return boundModel;
	                    }).
	                    catch(Rx.Observable.empty());
	            }
	            return Rx.Observable.return(boundModel);
	        } else if (pathsCount > 0) {
	            return model.
	                get.apply(model, paths.map(function(path) {
	                    return boundPath.concat(path);
	                })).
	                map(function() {
	                    return model.deref(boundPath);
	                }).
	                mergeAll();
	        }
	        return Rx.Observable.empty();
	    });
	};


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var ModelResponse = __webpack_require__(155);
	var pathSyntax = __webpack_require__(114);

	module.exports = function getValue(path) {
	    var parsedPath = pathSyntax.fromPath(path);
	    var pathIdx = 0;
	    var pathLen = parsedPath.length;
	    while (++pathIdx < pathLen) {
	        if (typeof parsedPath[pathIdx] === "object") {
	            /* eslint-disable no-loop-func */
	            return new ModelResponse(function(o) {
	                o.onError(new Error("Paths must be simple paths"));
	            });
	            /* eslint-enable no-loop-func */
	        }
	    }

	    var self = this;
	    return new ModelResponse(function(obs) {
	        return self.get(parsedPath).subscribe(function(data) {
	            var curr = data.json;
	            var depth = -1;
	            var length = parsedPath.length;

	            while (curr && ++depth < length) {
	                curr = curr[parsedPath[depth]];
	            }
	            obs.onNext(curr);
	        }, function(err) {
	            obs.onError(err);
	        }, function() {
	            obs.onCompleted();
	        });
	    });
	};


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var jsong = __webpack_require__(113);
	var ModelResponse = __webpack_require__(155);
	var isPathValue = __webpack_require__(178);

	module.exports = function setValue(pathArg, valueArg) {
	    var value = isPathValue(pathArg) ? pathArg : jsong.pathValue(pathArg, valueArg);
	    var pathIdx = 0;
	    var path = value.path;
	    var pathLen = path.length;
	    while (++pathIdx < pathLen) {
	        if (typeof path[pathIdx] === "object") {
	            /* eslint-disable no-loop-func */
	            return new ModelResponse(function(o) {
	                o.onError(new Error("Paths must be simple paths"));
	            });
	            /* eslint-enable no-loop-func */
	        }
	    }
	    var self = this;
	    return new ModelResponse(function(obs) {
	        return self._set(value).subscribe(function(data) {
	            var curr = data.json;
	            var depth = -1;
	            var length = path.length;

	            while (curr && ++depth < length) {
	                curr = curr[path[depth]];
	            }
	            obs.onNext(curr);
	        }, function(err) {
	            obs.onError(err);
	        }, function() {
	            obs.onCompleted();
	        });
	    });
	};


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var pathSyntax = __webpack_require__(114);

	module.exports = function getValueSync(pathArg) {
	    var path = pathSyntax.fromPath(pathArg);
	    if (Array.isArray(path) === false) {
	        throw new Error("Model#getValueSync must be called with an Array path.");
	    }
	    if (this._path.length) {
	        path = this._path.concat(path);
	    }
	    return this._syncCheck("getValueSync") && this._getValueSync(this, path).value;
	};


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var pathSyntax = __webpack_require__(114);
	var isPathValue = __webpack_require__(178);
	var setPathValues = __webpack_require__(136);

	module.exports = function setValueSync(pathArg, valueArg, errorSelectorArg, comparatorArg) {

	    var path = pathSyntax.fromPath(pathArg);
	    var value = valueArg;
	    var errorSelector = errorSelectorArg;
	    var comparator = comparatorArg;

	    if (isPathValue(path)) {
	        comparator = errorSelector;
	        errorSelector = value;
	        value = path;
	    } else {
	        value = {
	            path: path,
	            value: value
	        };
	    }

	    if (isPathValue(value) === false) {
	        throw new Error("Model#setValueSync must be called with an Array path.");
	    }

	    if (typeof errorSelector !== "function") {
	        errorSelector = this._root._errorSelector;
	    }

	    if (typeof comparator !== "function") {
	        comparator = this._root._comparator;
	    }

	    if (this._syncCheck("setValueSync")) {
	        setPathValues(this, [value]);
	        return this._getValueSync(this, value.path).value;
	    }
	};


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var $error = __webpack_require__(108);
	var pathSyntax = __webpack_require__(114);
	var getBoundValue = __webpack_require__(137);
	var getType = __webpack_require__(148);

	module.exports = function derefSync(boundPathArg) {

	    var boundPath = pathSyntax.fromPath(boundPathArg);

	    if (!Array.isArray(boundPath)) {
	        throw new Error("Model#derefSync must be called with an Array path.");
	    }

	    var boundValue = getBoundValue(this, this._path.concat(boundPath));

	    var path = boundValue.path;
	    var node = boundValue.value;
	    var found = boundValue.found;

	    if (!found) {
	        return void 0;
	    }

	    var type = getType(node);

	    if (Boolean(node) && Boolean(type)) {
	        if (type === $error) {
	            if (this._boxed) {
	                throw node;
	            }
	            throw node.value;
	        } else if (node.value === void 0) {
	            return void 0;
	        }
	    }

	    return this._clone({ _path: path });
	};


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var __version = __webpack_require__(88);

	module.exports = function _getVersion(model, path) {
	    // ultra fast clone for boxed values.
	    var gen = model._getValueSync({
	        _boxed: true,
	        _root: model._root,
	        _treatErrorsAsValues: model._treatErrorsAsValues
	    }, path, true).value;
	    var version = gen && gen[__version];
	    return (version == null) ? -1 : version;
	};


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __ref = __webpack_require__(86);
	var __parent = __webpack_require__(107);
	var __context = __webpack_require__(87);
	var __version = __webpack_require__(88);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	var $ref = __webpack_require__(91);

	var getBoundValue = __webpack_require__(137);

	var promote = __webpack_require__(92);
	var getSize = __webpack_require__(109);
	var isExpired = __webpack_require__(111);
	var isFunction = __webpack_require__(61);
	var isPrimitive = __webpack_require__(101);
	var expireNode = __webpack_require__(102);
	var iterateKeySet = __webpack_require__(73).iterateKeySet;
	var incrementVersion = __webpack_require__(105);
	var updateNodeAncestors = __webpack_require__(134);
	var removeNodeAndDescendants = __webpack_require__(130);

	/**
	 * Invalidates a list of Paths in a JSON Graph.
	 * @function
	 * @param {Object} model - the Model for which to insert the PathValues.
	 * @param {Array.<PathValue>} paths - the PathValues to set.
	 */

	module.exports = function invalidatePathSets(model, paths) {

	    var modelRoot = model._root;
	    var lru = modelRoot;
	    var expired = modelRoot.expired;
	    var version = incrementVersion();
	    var bound = model._path;
	    var cache = modelRoot.cache;
	    var node = bound.length ? getBoundValue(model, bound).value : cache;
	    var parent = node[__parent] || cache;
	    var initialVersion = cache[__version];

	    var pathIndex = -1;
	    var pathCount = paths.length;

	    while (++pathIndex < pathCount) {

	        var path = paths[pathIndex];

	        invalidatePathSet(
	            path, 0, cache, parent, node,
	            version, expired, lru
	        );
	    }

	    var newVersion = cache[__version];
	    var rootChangeHandler = modelRoot.onChange;

	    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
	        rootChangeHandler();
	    }
	};

	function invalidatePathSet(
	    path, depth, root, parent, node,
	    version, expired, lru) {

	    var note = {};
	    var branch = depth < path.length - 1;
	    var keySet = path[depth];
	    var key = iterateKeySet(keySet, note);

	    do {
	        var results = invalidateNode(
	            root, parent, node,
	            key, branch, false,
	            version, expired, lru
	        );
	        var nextNode = results[0];
	        var nextParent = results[1];
	        if (nextNode) {
	            if (branch) {
	                invalidatePathSet(
	                    path, depth + 1,
	                    root, nextParent, nextNode,
	                    version, expired, lru
	                );
	            } else if (removeNodeAndDescendants(nextNode, nextParent, key, lru)) {
	                updateNodeAncestors(nextParent, getSize(nextNode), lru, version);
	            }
	        }
	        key = iterateKeySet(keySet, note);
	    } while (!note.done);
	}

	function invalidateReference(root, node, version, expired, lru) {

	    if (isExpired(node)) {
	        expireNode(node, expired, lru);
	        return [undefined, root];
	    }

	    promote(lru, node);

	    var container = node;
	    var reference = node.value;
	    var parent = root;

	    node = node[__context];

	    if (node != null) {
	        parent = node[__parent] || root;
	    } else {

	        var index = 0;
	        var count = reference.length - 1;

	        parent = node = root;

	        do {
	            var key = reference[index];
	            var branch = index < count;
	            var results = invalidateNode(
	                root, parent, node,
	                key, branch, true,
	                version, expired, lru
	            );
	            node = results[0];
	            if (isPrimitive(node)) {
	                return results;
	            }
	            parent = results[1];
	        } while (index++ < count);

	        if (container[__context] !== node) {
	            var backRefs = node[__refsLength] || 0;
	            node[__refsLength] = backRefs + 1;
	            node[__ref + backRefs] = container;
	            container[__context] = node;
	            container[__refIndex] = backRefs;
	        }
	    }

	    return [node, parent];
	}

	function invalidateNode(
	    root, parent, node,
	    key, branch, reference,
	    version, expired, lru) {

	    var type = node.$type;

	    while (type === $ref) {

	        var results = invalidateReference(root, node, version, expired, lru);

	        node = results[0];

	        if (isPrimitive(node)) {
	            return results;
	        }

	        parent = results[1];
	        type = node.$type;
	    }

	    if (type !== void 0) {
	        return [node, parent];
	    }

	    if (key == null) {
	        if (branch) {
	            throw new Error("`null` is not allowed in branch key positions.");
	        } else if (node) {
	            key = node[__key];
	        }
	    } else {
	        parent = node;
	        node = parent[key];
	    }

	    return [node, parent];
	}


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var __key = __webpack_require__(84);
	var __ref = __webpack_require__(86);
	var __prefix = __webpack_require__(85);
	var __parent = __webpack_require__(107);
	var __context = __webpack_require__(87);
	var __version = __webpack_require__(88);
	var __refIndex = __webpack_require__(89);
	var __refsLength = __webpack_require__(90);

	var $ref = __webpack_require__(91);

	var getBoundValue = __webpack_require__(137);

	var promote = __webpack_require__(92);
	var getSize = __webpack_require__(109);
	var hasOwn = __webpack_require__(62);
	var isObject = __webpack_require__(63);
	var isExpired = __webpack_require__(111);
	var isFunction = __webpack_require__(61);
	var isPrimitive = __webpack_require__(101);
	var expireNode = __webpack_require__(102);
	var incrementVersion = __webpack_require__(105);
	var updateNodeAncestors = __webpack_require__(134);
	var removeNodeAndDescendants = __webpack_require__(130);

	/**
	 * Sets a list of PathMaps into a JSON Graph.
	 * @function
	 * @param {Object} model - the Model for which to insert the PathMaps.
	 * @param {Array.<PathMapEnvelope>} pathMapEnvelopes - the a list of @PathMapEnvelopes to set.
	 */

	module.exports = function invalidatePathMaps(model, pathMapEnvelopes) {

	    var modelRoot = model._root;
	    var lru = modelRoot;
	    var expired = modelRoot.expired;
	    var version = incrementVersion();
	    var comparator = modelRoot._comparator;
	    var errorSelector = modelRoot._errorSelector;
	    var bound = model._path;
	    var cache = modelRoot.cache;
	    var node = bound.length ? getBoundValue(model, bound).value : cache;
	    var parent = node[__parent] || cache;
	    var initialVersion = cache[__version];

	    var pathMapIndex = -1;
	    var pathMapCount = pathMapEnvelopes.length;

	    while (++pathMapIndex < pathMapCount) {

	        var pathMapEnvelope = pathMapEnvelopes[pathMapIndex];

	        invalidatePathMap(
	            pathMapEnvelope.json, 0, cache, parent, node,
	            version, expired, lru, comparator, errorSelector
	        );
	    }

	    var newVersion = cache[__version];
	    var rootChangeHandler = modelRoot.onChange;

	    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
	        rootChangeHandler();
	    }
	};

	function invalidatePathMap(pathMap, depth, root, parent, node, version, expired, lru, comparator, errorSelector) {

	    if (isPrimitive(pathMap) || pathMap.$type) {
	        return;
	    }

	    for (var key in pathMap) {
	        if (key[0] !== __prefix && key[0] !== "$" && hasOwn(pathMap, key)) {
	            var child = pathMap[key];
	            var branch = isObject(child) && !child.$type;
	            var results = invalidateNode(
	                root, parent, node,
	                key, child, branch, false,
	                version, expired, lru, comparator, errorSelector
	            );
	            var nextNode = results[0];
	            var nextParent = results[1];
	            if (nextNode) {
	                if (branch) {
	                    invalidatePathMap(
	                        child, depth + 1,
	                        root, nextParent, nextNode,
	                        version, expired, lru, comparator, errorSelector
	                    );
	                } else if (removeNodeAndDescendants(nextNode, nextParent, key, lru)) {
	                    updateNodeAncestors(nextParent, getSize(nextNode), lru, version);
	                }
	            }
	        }
	    }
	}

	function invalidateReference(value, root, node, version, expired, lru, comparator, errorSelector) {

	    if (isExpired(node)) {
	        expireNode(node, expired, lru);
	        return [undefined, root];
	    }

	    promote(lru, node);

	    var container = node;
	    var reference = node.value;
	    var parent = root;

	    node = node[__context];

	    if (node != null) {
	        parent = node[__parent] || root;
	    } else {

	        var index = 0;
	        var count = reference.length - 1;

	        parent = node = root;

	        do {
	            var key = reference[index];
	            var branch = index < count;
	            var results = invalidateNode(
	                root, parent, node,
	                key, value, branch, true,
	                version, expired, lru, comparator, errorSelector
	            );
	            node = results[0];
	            if (isPrimitive(node)) {
	                return results;
	            }
	            parent = results[1];
	        } while (index++ < count);

	        if (container[__context] !== node) {
	            var backRefs = node[__refsLength] || 0;
	            node[__refsLength] = backRefs + 1;
	            node[__ref + backRefs] = container;
	            container[__context] = node;
	            container[__refIndex] = backRefs;
	        }
	    }

	    return [node, parent];
	}

	function invalidateNode(
	    root, parent, node,
	    key, value, branch, reference,
	    version, expired, lru, comparator, errorSelector) {

	    var type = node.$type;

	    while (type === $ref) {

	        var results = invalidateReference(value, root, node, version, expired, lru, comparator, errorSelector);

	        node = results[0];

	        if (isPrimitive(node)) {
	            return results;
	        }

	        parent = results[1];
	        type = node && node.$type;
	    }

	    if (type !== void 0) {
	        return [node, parent];
	    }

	    if (key == null) {
	        if (branch) {
	            throw new Error("`null` is not allowed in branch key positions.");
	        } else if (node) {
	            key = node[__key];
	        }
	    } else {
	        parent = node;
	        node = parent[key];
	    }

	    return [node, parent];
	}


/***/ },
/* 201 */
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

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _lodash = __webpack_require__(2);

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
	        _react2['default'].createElement(
	          'span',
	          null,
	          ' Drop here a CSV file ',
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/about' },
	            ' about '
	          ),
	          ' '
	        )
	      );
	    }
	  }]);

	  return Loader;
	})(_react2['default'].Component);

	exports['default'] = Loader;
	module.exports = exports['default'];

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(203), __webpack_require__(223), __webpack_require__(224), __webpack_require__(225)], __WEBPACK_AMD_DEFINE_RESULT__ = function (when, ReconnectingWebSocket, WsRpc, Hub) {

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
/* 203 */
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

		var timed = __webpack_require__(204);
		var array = __webpack_require__(209);
		var flow = __webpack_require__(212);
		var fold = __webpack_require__(213);
		var inspect = __webpack_require__(214);
		var generate = __webpack_require__(215);
		var progress = __webpack_require__(216);
		var withThis = __webpack_require__(217);
		var unhandledRejection = __webpack_require__(218);
		var TimeoutError = __webpack_require__(208);

		var Promise = [array, flow, fold, generate, progress,
			inspect, withThis, timed, unhandledRejection]
			.reduce(function(Promise, feature) {
				return feature(Promise);
			}, __webpack_require__(220));

		var apply = __webpack_require__(211)(Promise);

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
	})(__webpack_require__(207));


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

		var env = __webpack_require__(205);
		var TimeoutError = __webpack_require__(208);

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
	}(__webpack_require__(207)));


/***/ },
/* 205 */
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
			var vertx = __webpack_require__(206);
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
	}(__webpack_require__(207)));


/***/ },
/* 206 */
/***/ function(module, exports) {

	// This file fixes a problem with when.js while is used in node.
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 207 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 208 */
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
	}(__webpack_require__(207)));

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

		var state = __webpack_require__(210);
		var applier = __webpack_require__(211);

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
	}(__webpack_require__(207)));


/***/ },
/* 210 */
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
	}(__webpack_require__(207)));


/***/ },
/* 211 */
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
	}(__webpack_require__(207)));




/***/ },
/* 212 */
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
	}(__webpack_require__(207)));


/***/ },
/* 213 */
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
	}(__webpack_require__(207)));


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

		var inspect = __webpack_require__(210).inspect;

		return function inspection(Promise) {

			Promise.prototype.inspect = function() {
				return inspect(Promise._handler(this));
			};

			return Promise;
		};

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(207)));


/***/ },
/* 215 */
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
	}(__webpack_require__(207)));


/***/ },
/* 216 */
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
	}(__webpack_require__(207)));


/***/ },
/* 217 */
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
	}(__webpack_require__(207)));



/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

		var setTimer = __webpack_require__(205).setTimer;
		var format = __webpack_require__(219);

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
	}(__webpack_require__(207)));


/***/ },
/* 219 */
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
	}(__webpack_require__(207)));


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

		var makePromise = __webpack_require__(221);
		var Scheduler = __webpack_require__(222);
		var async = __webpack_require__(205).asap;

		return makePromise({
			scheduler: new Scheduler(async)
		});

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(207));


/***/ },
/* 221 */
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
	}(__webpack_require__(207)));


/***/ },
/* 222 */
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
	}(__webpack_require__(207)));


/***/ },
/* 223 */
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
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(203), __webpack_require__(223)], __WEBPACK_AMD_DEFINE_RESULT__ = function (when, ReconnectingWebSocket) {

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
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(223)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ReconnectingWebSocket) {

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

/***/ }
/******/ ]);