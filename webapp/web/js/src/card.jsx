import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Button, ButtonToolbar, Input} from 'react-bootstrap';

const Card = React.createClass({
  PropTypes : {
    onHeaderClick: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAttrLabelChanged: PropTypes.func.isRequired,
    onAttrTypeChanged: PropTypes.func.isRequired,
    attrLabel: PropTypes.string.isRequired,
    attrType: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
  },
  shouldComponentUpdate(nextProps, nextState) {
    return  ! _.isEqual(nextProps, this.props, (x,y) => { if (_.isFunction(x)) {return true} });
  },
  render () {
    let props = this.props;

    var cardClasses =  React.addons.classSet({
      'card': true,
      'expanded': this.props.expanded,
    });
    var contentClasses =  React.addons.classSet({
      'card-content': true,
      'hidden': ! this.props.expanded,
    });
    return (
      <div className={cardClasses}>
        <div className="btn btn-xs btn-default card-anchor card-move glyphicon glyphicon-move" aria-hidden="true"></div>
        <div className="card-header">
          <div className="card-title" onClick={(ev) => {this.props.onHeaderClick(ev)}}>
            { props.order + ".- " + props.attrLabel}
          </div>
        </div>
        <div className={contentClasses}>

          <form className="form-horizontal" onSubmit={(ev)=> { props.onAccept(ev);  ev.preventDefault() }}>
            <Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={props.attrLabel} onChange={(ev) => { ev.preventDefault(); props.onAttrLabelChanged(ev);}}/>
            <Input type="select" label="Attribute Type" labelClassName="col-xs-2" wrapperClassName="col-xs-10"
              value={props.attrType} onChange={props.onAttrTypeChanged}>
              <option value="QUANTITATIVE">Quantitative</option>
              <option value="CATEGORICAL">Categorical</option>
              <option value="ORDINAL">Ordinal</option>
            </Input>
          </form>

          <div className="buttons">
            <ButtonToolbar>
              <Button bsStyle="default" bsSize="small" onClick={(ev) => {props.onCancel(ev)}}> Cancel </Button>
              <Button bsStyle="primary" bsSize="small" onClick={(ev) => {props.onAccept(ev)}}>Apply Changes</Button>
            </ButtonToolbar>
          </div >
        </div>
      </div>
    )
  }
})

export default Card;
