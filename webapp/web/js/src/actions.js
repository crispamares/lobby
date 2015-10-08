
export const SET_ORDER = 'SET_ORDER';
export const TOGGLE_CARD_EXPANSION = 'TOGGLE_CARD_EXPANSION'
export const SET_ATTR_LABEL = 'SET_ATTR_LABEL';
export const SET_ATTR_TYPE = 'SET_ATTR_TYPE';

export function setOrder(order) {
    return {type: SET_ORDER, order};
}

export function toggleCardExpansion(cardKey) {
    return {type: TOGGLE_CARD_EXPANSION, cardKey};
}

export function setAttrLabel(attr, label) {
    return {label: SET_ATTR_LABEL, attr, label};
}

export function setAttrType(attr, type) {
    return {type: SET_ATTR_TYPE, attr, type};
}
