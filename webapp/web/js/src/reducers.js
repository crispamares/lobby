import {combineReducers} from 'redux';
import _ from "lodash";
import {SET_ORDER, SET_ATTR_LABEL, SET_ATTR_TYPE,
    TOGGLE_CARD_EXPANSION, FILL_FROM_SCHEMA, INIT_CARDS,
    RENAME_COLUMNS_REQUEST, RENAME_COLUMNS_FAILURE, RENAME_COLUMNS_SUCCESS,
    CREATE_NEW_TABLE_REQUEST, CREATE_NEW_TABLE_FAILURE, CREATE_NEW_TABLE_SUCCESS}
    from './actions';
import undoable, {excludeAction} from 'redux-undo';

// {
//     attributes: {
//         attrsByName: {},
//         order: [],
//         index: ''
//     }
// }

function attributes(state = {}, action) {
    switch (action.type) {
        case SET_ATTR_LABEL:
            return _.merge({}, state, {attrsByName: {[action.attr] : {label: action.label}}});
        case SET_ATTR_TYPE:
            return _.merge({}, state, {attrsByName: {[action.attr] : {attribute_type: action.attrType}}});
        case SET_ORDER:
            return _.assign({}, state, {order: [...action.order]});
        case FILL_FROM_SCHEMA:
            let attributes = _.cloneDeep(action.schema.attributes);
            _.forOwn(attributes, (attr, key) => { attr.name = key; attr.label = key;});
            return _.assign({}, state, {attrsByName: attributes, order: _.keys(attributes), index: action.schema.index});
        default:
            return state;
    }
}

function cards(state={}, action) {
    switch (action.type) {
        case TOGGLE_CARD_EXPANSION:
            return _.assign({}, state, {[action.cardKey] : {expanded: ! state[action.cardKey]['expanded']}});
        case INIT_CARDS:
            let expandedByDefault = false;
            let names = _.keys(action.attributes);
            return _.zipObject(names, _.fill(Array(names.length), {'expanded': expandedByDefault}));
        default:
            return state;
    }
}

function table(state={}, action) {
    switch (action.type) {
        case RENAME_COLUMNS_REQUEST:
            return _.assign({}, state, {renamingState: "waiting"});
        case RENAME_COLUMNS_FAILURE:
            return _.assign({}, state, {renamingState: "error"});
        case RENAME_COLUMNS_SUCCESS:
            return _.assign({}, state, {renamingState: "success"});
        case CREATE_NEW_TABLE_REQUEST:
            return _.assign({}, state, {creatingNewTableState: "waiting"});
        case CREATE_NEW_TABLE_FAILURE:
            return _.assign({}, state, {creatingNewTableState: "error"});
        case CREATE_NEW_TABLE_SUCCESS:
            return _.assign({}, state, {creatingNewTableState: "success"});
        default:
            return state;
    }
}

const editorReducer = combineReducers({
    table: table,
    attributes: undoable(attributes, {filter: excludeAction(SET_ATTR_LABEL)}),
    cards: undoable(cards)
});
export default editorReducer;
