import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactGridLayout from 'react-grid-layout';
import {Button} from 'react-bootstrap';

import Card from './card';
import ToolBar from './toolbar';

let hashCode = function(str) {
  var hash = 0, i, chr, len;
  if (str.length == 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const Editor = React.createClass({
  getInitialState() {
    let expandedByDefault = false;
    let initialState = {};
    _.extend(initialState, this.props.model);
    initialState["expanded"] = _.zipObject(initialState.order, _.fill(Array(initialState.order.length), expandedByDefault));
    return initialState;
  },
  orderFromLayout(layout) {
    return _.chain(layout)
    .map( (l) => { return {y: l.y, attr: l.attr} })
    .sortBy('y')
    .pluck('attr')
    .value();
  },
  toggleCardExpansion (attrName) {
    this.state.expanded[attrName] = ! this.state.expanded[attrName];
    this.setState({"expanded": this.state.expanded});
  },
  linkAttribute (attrName, key, value) {
    this.state['attributes'][attrName][key] = value;
    this.setState(this.state);
  },
  render() {

    let rowHeight = 45;
    let expandedRows = 5;
    let expanded = this.state.expanded;
    let attributes = this.state.attributes;
    let order = this.state.order;

    // Compute the layout from state.order and state.expanded
    let _lastY = 0;
    let layout = _.map(order, (attrName, i) => {
      let height = expanded[attrName] ? expandedRows : 1;
      _lastY += expanded[attrName] ? expandedRows : 1;
      let result = {x:0, y: _lastY, w: 1, h: height, i:"c"+hashCode(attrName), attr:attrName, handle:".card-anchor"}
      return result;
    })

    return (
      <div className="board">

        <ToolBar></ToolBar>

        <ReactGridLayout className="layout"
          layout={layout}
          cols={1}
          rowHeight={rowHeight}
          useCSSTransforms={true}
          isResizable={false}
          onLayoutChange={(newLayout) => {
            let newOrder = this.orderFromLayout(newLayout);
            if (! _.isEqual(order, newOrder)) {  // Avoids infinite recursion
              this.setState({"order": newOrder});
            }
          }}
          onResizeStop={(layout) => {this.setState({"order": this.orderFromLayout(layout)});}}
          >
          {
            this.state.order.map((attrName, i) => {
              let attrType = attributes[attrName]["attribute_type"];
              let attrLabel = attributes[attrName]["label"];
              return (
                <div key={"c"+hashCode(attrName)}>
                  <Card
                    attrLabel={attrLabel}
                    attrType={attrType}
                    order={i + 1}
                    expanded={expanded[attrName]}
                    onAttrLabelChanged={(ev) => this.linkAttribute(attrName, 'label', ev.target.value)}
                    onAttrTypeChanged={(ev) => this.linkAttribute.bind(this, attrName, 'attribute_type', ev.target.value)}
                    onHeaderClick={() => {this.toggleCardExpansion(attrName)}}/>
                </div>
              );
            })
          }
        </ReactGridLayout>
      </div>
    );
  }
})

export default Editor;
