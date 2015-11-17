import Context from 'context';

export const SET_ORDER = 'SET_ORDER';
export const TOGGLE_CARD_EXPANSION = 'TOGGLE_CARD_EXPANSION';
export const SET_ATTR_LABEL = 'SET_ATTR_LABEL';
export const SET_ATTR_TYPE = 'SET_ATTR_TYPE';
export const FILL_FROM_SCHEMA = 'FILL_FROM_SCHEMA';
export const INIT_CARDS = 'INIT_CARDS';
export const DISMISS_MSG = 'DISMISS_MSG';

export const LOAD_TABLE_REQUEST = 'LOAD_TABLE_REQUEST';
export const LOAD_TABLE_FAILURE = 'LOAD_TABLE_FAILURE';
export const LOAD_TABLE_SUCCESS = 'LOAD_TABLE_SUCCESS';

export const RENAME_COLUMNS_REQUEST = 'RENAME_COLUMNS_REQUEST';
export const RENAME_COLUMNS_FAILURE = 'RENAME_COLUMNS_FAILURE';
export const RENAME_COLUMNS_SUCCESS = 'RENAME_COLUMNS_SUCCESS';

export const CREATE_NEW_TABLE_REQUEST = 'CREATE_NEW_TABLE_REQUEST';
export const CREATE_NEW_TABLE_FAILURE = 'CREATE_NEW_TABLE_FAILURE';
export const CREATE_NEW_TABLE_SUCCESS = 'CREATE_NEW_TABLE_SUCCESS';

export const WRITE_TABLE_REQUEST = 'WRITE_TABLE_REQUEST';
export const WRITE_TABLE_FAILURE = 'WRITE_TABLE_FAILURE';
export const WRITE_TABLE_SUCCESS = 'WRITE_TABLE_SUCCESS';

export const CONFIG_INDYVA_REQUEST = 'CONFIG_INDYVA_REQUEST';
export const CONFIG_INDYVA_FAILURE = 'CONFIG_INDYVA_FAILURE';
export const CONFIG_INDYVA_SUCCESS = 'CONFIG_INDYVA_SUCCESS';

export function setOrder(order) {
    return {type: SET_ORDER, order};
}

export function toggleCardExpansion(cardKey) {
    return {type: TOGGLE_CARD_EXPANSION, cardKey};
}

export function initCards(attributes) {
    return {type: INIT_CARDS, attributes};
}

export function setAttrLabel(attr, label) {
    return {type: SET_ATTR_LABEL, attr, label};
}

export function setAttrType(attr, type) {
    return {type: SET_ATTR_TYPE, attr, attrType: type};
}

export function fillFromSchema(schema) {
    return {type: FILL_FROM_SCHEMA, schema};
}

export function dismissMsg() {
    return {type: DISMISS_MSG};
}

export function renameColumns(tableName, namesMap) {
    const rpc = Context.instance().rpc;
    if (_.isEmpty(namesMap)) {
        /* If nothing has to be renamed, dispatch a success */
        return (dispatch) => {
            return Promise.resolve(dispatch({type: RENAME_COLUMNS_SUCCESS, namesMap}));
        }
    }
    return (dispatch) => {
        dispatch({type: RENAME_COLUMNS_REQUEST});

        return rpc.call("TableSrv.rename_columns", [tableName, namesMap])
        .then(() => dispatch({type: RENAME_COLUMNS_SUCCESS, namesMap}))
        .otherwise((error) => dispatch({type: RENAME_COLUMNS_FAILURE, namesMap, error}))
    }
}


export function createNewTable(name, sourceTable, schema) {
    const rpc = Context.instance().rpc;
    return (dispatch) => {
        dispatch({type: CREATE_NEW_TABLE_REQUEST})

        return rpc.call("TableSrv.get_data", [sourceTable])
        .then( (data) => {
            return rpc.call("TableSrv.new_table", [name, data, schema])
        })
        .then(() => dispatch({type: CREATE_NEW_TABLE_SUCCESS}))
        .otherwise((error) => dispatch({type: CREATE_NEW_TABLE_FAILURE, error}));
    }
}


export function loadTable(tableName, filePath) {
    const rpc = Context.instance().rpc;
    return (dispatch) => {
        dispatch({type: LOAD_TABLE_REQUEST});

        return rpc.call("IOSrv.read_csv", [tableName, filePath]).then(
            table => { return rpc.call("TableSrv.schema", [table]) })
        .then( schema => {
            dispatch({type: LOAD_TABLE_SUCCESS, filePath})
            dispatch(fillFromSchema(schema));
            dispatch(initCards(schema.attributes));
        })
        .otherwise( error => { dispatch({type: LOAD_TABLE_FAILURE, error}) });
    }
}

export function writeTable(tableName, filePath) {
    const rpc = Context.instance().rpc;
    return (dispatch) => {
        dispatch({type: WRITE_TABLE_REQUEST});

        return rpc.call("IOSrv.write_csv", [tableName, filePath])
        .then( () => { dispatch({type: WRITE_TABLE_SUCCESS}) })
        .otherwise( error => { dispatch({type: WRITE_TABLE_FAILURE, error}) });
    }
}


export function configIndyva(tableName) {
    const rpc = Context.instance().rpc;
    return (dispatch) => {
        dispatch({type: CONFIG_INDYVA_REQUEST});

        return rpc.call("config_app", [{dataset: tableName}])
        .then( () => { dispatch({type: CONFIG_INDYVA_SUCCESS}) })
        .otherwise( error => { dispatch({type: CONFIG_INDYVA_FAILURE, error}) });
    }
}
