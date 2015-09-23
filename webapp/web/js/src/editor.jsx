import React, { PropTypes } from 'react';
import _ from 'lodash';
import ReactGridLayout from 'react-grid-layout';


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
    let initialState = {
      //layout: [],   //	    {x:2, y: 0, w: 5, h: 6, i:"c0", handle:".card-title"},
    }
    _.extend(initialState, this.props.model);
    return initialState;
  },
  orderFromLayout(layout) {
    return _.chain(layout)
    .map( (l) => { return {y: l.y, attr: l.attr} })
    .sortBy('y')
    .pluck('attr')
    .value();
  },
  render() {
    let rowHeight = 85;
    let layout = _.map(this.state.order, (attrName, i) => {
      return {x:0, y: i, w: 1, h: 1, i:"c"+hashCode(attrName), attr:attrName, handle:".card-anchor"}
    })

    return (
      <div className="board">
        <ReactGridLayout className="layout"
          layout={layout}
          cols={1}
          rowHeight={rowHeight}
          useCSSTransforms={true}
          onLayoutChange={(layout) => {this.setState({"order": this.orderFromLayout(layout)});}}
          onResizeStop={(layout) => {this.setState({"order": this.orderFromLayout(layout)});}}
          >
          {
            this.state.order.map((attrName, i) => {
              return (
                <div className="card" key={"c"+hashCode(attrName)}>
                  <div>
                    <span className="btn btn-xs btn-default card-anchor glyphicon glyphicon-move" aria-hidden="true"></span>
                    <span> {attrName} </span>
                  </div>
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
