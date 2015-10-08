import {combineReducers} from 'redux';
import {SET_ORDER, SET_ATTR_LABEL, SET_ATTR_TYPE, TOGGLE_CARD_EXPANSION} from './actions';

function attributes(state = {}, action) {
    let change = {};
    switch (action.type) {
        case SET_ATTR_LABEL:
            change[action.attr] = {label: action.label};
            return Object.assign({}, state, change);
        case SET_ATTR_TYPE:
            change[action.attr] = {type: action.type};
            return Object.assign({}, state, change);
        default:
            return state;
    }
}

function order(state=[], action) {
    switch (action.type) {
        case SET_ORDER:
            return [...action.order]
        default:
            return state;
    }
}

function cards(state={}, action) {
    switch (action.type) {
        case TOGGLE_CARD_EXPANSION:
            let change = {};
            change[action.cardKey] = ! state[action.cardKey];
            return Object.assign({}, state, change);
        default:
            return state;
    }
}

const editorReducer = combineReducers({attributes, order, cards});
export default editorReducer;
