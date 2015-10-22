import {combineReducers} from 'redux';
import _ from "lodash";
import {SET_ORDER, SET_ATTR_LABEL, SET_ATTR_TYPE,
    TOGGLE_CARD_EXPANSION, FILL_FROM_SCHEMA, INIT_CARDS} from './actions';
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

const editorReducer = combineReducers({
    tableName: (state="", action) => state,
    attributes: undoable(attributes, {filter: excludeAction(SET_ATTR_LABEL)}),
    cards: undoable(cards)
});
export default editorReducer;
