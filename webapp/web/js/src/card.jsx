import React, { PropTypes } from 'react';
import { addons } from 'react/addons';
import _ from 'lodash';
import {Button, ButtonToolbar, Input} from 'react-bootstrap';


const Card = React.createClass({
  mixins: [addons.LinkedStateMixin],
  PropTypes : {
    onHeaderClick: PropTypes.func.isRequired,
    attrName: PropTypes.string.isRequired,
    attrType: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
  },
  getInitialState () {
    return {
      attrName: this.props.attrName,
      attrType: this.props.attrType,
    };
  },
  onAccept (ev) {
    // TODO: Save Changes
    this.props.onHeaderClick(ev);
  },
  onCancel (ev) {
    this.setState(this.getInitialState());
    this.props.onHeaderClick(ev);
  },
  render () {
    let attrName = this.state.attrName;
    let expanded = this.props.expanded;
    let order = this.props.order;
    let linkState = this.linkState;

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
            { order + ".- " + attrName}
          </div>
        </div>
        <div className={contentClasses}>

          <form className="form-horizontal" onSubmit={(ev)=> { this.onAccept(ev);  ev.preventDefault() }}>
            <Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" valueLink={linkState('attrName')}/>
            <Input type="select" label="Attribute Type" labelClassName="col-xs-2" wrapperClassName="col-xs-10" valueLink={linkState('attrType')}>
              <option value="QUANTITATIVE">Quantitative</option>
              <option value="CATEGORICAL">Categorical</option>
              <option value="ORDINAL">Ordinal</option>
            </Input>
          </form>

          <div className="buttons">
            <ButtonToolbar>
              <Button bsStyle="default" bsSize="small" onClick={(ev) => {this.onCancel(ev)}}> Cancel </Button>
              <Button bsStyle="primary" bsSize="small" onClick={(ev) => {this.onAccept(ev)}}>Apply Changes</Button>
            </ButtonToolbar>
          </div >
        </div>
      </div>
    )
  }
})

export default Card;
