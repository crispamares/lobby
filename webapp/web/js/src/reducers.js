import {combineReducers} from 'redux';
import _ from "lodash";
import {SET_ORDER, SET_ATTR_LABEL, SET_ATTR_TYPE, SET_ATTR_ORDER,
    TOGGLE_CARD_EXPANSION, FILL_FROM_SCHEMA, INIT_CARDS, DISMISS_MSG,
    SET_CARD_HEIGHT,
    LOAD_TABLE_REQUEST, LOAD_TABLE_FAILURE, LOAD_TABLE_SUCCESS,
    RENAME_COLUMNS_REQUEST, RENAME_COLUMNS_FAILURE, RENAME_COLUMNS_SUCCESS,
    CREATE_NEW_TABLE_REQUEST, CREATE_NEW_TABLE_FAILURE, CREATE_NEW_TABLE_SUCCESS,
    WRITE_TABLE_REQUEST, WRITE_TABLE_FAILURE, WRITE_TABLE_SUCCESS,
    CONFIG_INDYVA_REQUEST, CONFIG_INDYVA_FAILURE, CONFIG_INDYVA_SUCCESS,
    FETCH_DISTINCT_VALUES_REQUEST, FETCH_DISTINCT_VALUES_FAILURE, FETCH_DISTINCT_VALUES_SUCCESS,
}
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
        case SET_ATTR_ORDER:
            return _.merge({}, state, {attrsByName: {[action.attr] : {meta: {order: action.order}}}});
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
    let attrState = null;
    switch (action.type) {
        case TOGGLE_CARD_EXPANSION:
            attrState = _.assign({}, state[action.cardKey], {expanded: ! state[action.cardKey]['expanded']});
            return _.assign({}, state, {[action.cardKey] : attrState});
        case SET_CARD_HEIGHT:
            attrState = _.assign({}, state[action.cardKey], {height: action.height});
            return _.assign({}, state, {[action.cardKey] : attrState});
        case INIT_CARDS:
            const expandedByDefault = false;
            const cardHeightDefault = 1;
            const names = _.keys(action.attributes);
            return _.zipObject(names, _.fill(Array(names.length), {'expanded': expandedByDefault, 'height': cardHeightDefault}));
        default:
            return state;
    }
}

function table(state={}, action) {
    switch (action.type) {
        case LOAD_TABLE_REQUEST:
            return _.assign({}, state, {loadingTableState: "waiting"});
        case LOAD_TABLE_FAILURE:
            return _.assign({}, state, {loadingTableState: "error"});
        case LOAD_TABLE_SUCCESS:
            const fileName = path.parse(action.filePath).name;
            return _.assign({}, state, {loadingTableState: "success", fileName});
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
        case WRITE_TABLE_REQUEST:
            return _.assign({}, state, {writingTableState: "waiting"});
        case WRITE_TABLE_FAILURE:
            return _.assign({}, state, {writingTableState: "error"});
        case WRITE_TABLE_SUCCESS:
            return _.assign({}, state, {writingTableState: "success"});
        case CONFIG_INDYVA_REQUEST:
            return _.assign({}, state, {configuringIndyvaState: "waiting"});
        case CONFIG_INDYVA_FAILURE:
            return _.assign({}, state, {configuringIndyvaState: "error"});
        case CONFIG_INDYVA_SUCCESS:
            return _.assign({}, state, {configuringIndyvaState: "success"});

        default:
            return state;
    }
}

function snackbar(state={}, action) {
    switch (action.type) {
        case LOAD_TABLE_FAILURE:
        case RENAME_COLUMNS_FAILURE:
        case CREATE_NEW_TABLE_FAILURE:
        case WRITE_TABLE_FAILURE:
        case CONFIG_INDYVA_FAILURE:
        case FETCH_DISTINCT_VALUES_FAILURE:
            let msg = action.error.message
            msg = msg.substr(2, msg.length - 6)
            return _.assign({}, state, {msgStyle: "danger", msg, dismissed: false});
        case DISMISS_MSG:
            return _.assign({}, state, {dismissed: true});
        default:
            return state;
    }
}


const editorReducer = combineReducers({
    table: table,
    snackbar:snackbar,
    attributes: undoable(attributes, {filter: excludeAction(SET_ATTR_LABEL)}),
    cards: undoable(cards)
});
export default editorReducer;
