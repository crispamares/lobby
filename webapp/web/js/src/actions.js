import Context from 'context';

export const SET_ORDER = 'SET_ORDER';
export const TOGGLE_CARD_EXPANSION = 'TOGGLE_CARD_EXPANSION';
export const SET_ATTR_LABEL = 'SET_ATTR_LABEL';
export const SET_ATTR_TYPE = 'SET_ATTR_TYPE';
export const FILL_FROM_SCHEMA = 'FILL_FROM_SCHEMA';
export const INIT_CARDS = 'INIT_CARDS';

export const RENAME_COLUMNS_REQUEST = 'RENAME_COLUMNS_REQUEST';
export const RENAME_COLUMNS_FAILURE = 'RENAME_COLUMNS_FAILURE';
export const RENAME_COLUMNS_SUCCESS = 'RENAME_COLUMNS_SUCCESS';


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


export function renameColumnsRequest(namesMap) {
    return {type: RENAME_COLUMNS_REQUEST};
}
export function renameColumnsSuccess(namesMap) {
    return {type: RENAME_COLUMNS_SUCCESS, namesMap};
}
export function renameColumnsFailure(namesMap, error) {
    return {type: RENAME_COLUMNS_FAILURE, namesMap, error};
}

export function renameColumns(tableName, namesMap) {
    const rpc = Context.instance().rpc;
    return (dispatch) => {
        dispatch(renameColumnsRequest(namesMap));

        rpc.call("TableSrv.rename_columns", [tableName, namesMap])
        .then(() => dispatch(renameColumnsSuccess(namesMap)))
        .otherwise((error) => dispatch(renameColumnsFailure(namesMap, error)))
    }
}
