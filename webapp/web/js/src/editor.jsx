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
  render() {

    let rowHeight = 45;
    let expanded = this.state.expanded;
    let order = this.state.order;

    // Compute the layout from state.order and state.expanded
    let _lastY = 0;
    let layout = _.map(order, (attrName, i) => {
      let height = expanded[attrName] ? 3: 1;
      _lastY += expanded[attrName] ? 3: 1;
      let result = {x:0, y: _lastY, w: 1, h: height, i:"c"+hashCode(attrName), attr:attrName, handle:".card-anchor"}
      return result;
    })

    return (
      <div className="board">
        <ReactGridLayout className="layout"
          layout={layout}
          cols={1}
          rowHeight={rowHeight}
          useCSSTransforms={true}
          onLayoutChange={(newLayout) => {
            if (! _.isEqual(order, this.orderFromLayout(newLayout))) {  // Avoids infinite recursion
              this.setState({"order": this.orderFromLayout(newLayout)});
            }
          }}
          onResizeStop={(layout) => {this.setState({"order": this.orderFromLayout(layout)});}}
          >
          {
            this.state.order.map((attrName, i) => {
              return (
                <div className="card" key={"c"+hashCode(attrName)}>
                  <Card
                    attrName={attrName}
                    expanded={expanded[attrName]}
                    onHeaderClick={() => {
                      expanded[attrName] = ! expanded[attrName];
                      this.setState({"expanded": expanded});
                    }}/>
                </div>
              );
            })
          }
        </ReactGridLayout>
      </div>
    );
  }
})


class Card extends React.Component {
  static propTypes = {
    onHeaderClick: PropTypes.func.isRequired
  }
  onAccept () {

  }
  onCancel () {

  }
  render () {
    let attrName = this.props.attrName;
    let expanded = this.props.expanded;
    var cx = React.addons.classSet;
    var contentClasses = cx({
      'card-content': true,
      'hidden': ! this.props.expanded
    });
    return (
      <div>
        <span className="btn btn-xs btn-default card-anchor glyphicon glyphicon-move" aria-hidden="true"></span>
        <span className="card-header" onClick={(ev) => {this.props.onHeaderClick(ev)}}> {attrName} </span>
        <div className={contentClasses} >
          Paco
        </div>
      </div>
    )
  }
}

export default Editor;
