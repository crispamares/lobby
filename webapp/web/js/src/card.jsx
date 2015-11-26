import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Button, ButtonToolbar, Input} from 'react-bootstrap';
import OrderedFlowList from './orderedFlowList';

const Card = React.createClass({
    PropTypes : {
        onHeaderClick: PropTypes.func.isRequired,
        onAttrLabelChanged: PropTypes.func.isRequired,
        onAttrTypeChanged: PropTypes.func.isRequired,
        attrLabel: PropTypes.string.isRequired,
        attrType: PropTypes.string.isRequired,
        attrOrder: PropTypes.array,
        order: PropTypes.number.isRequired,
        expanded: PropTypes.bool.isRequired,
    },
    shouldComponentUpdate(nextProps, nextState) {
        return  ! _.isEqual(nextProps, this.props, (x,y) => { if (_.isFunction(x)) {return true} });
    },
    render () {
        const props = this.props;
        const attrOrder = (_.isArray(this.props.attrOrder)) ? this.props.attrOrder : [];
        const cardClasses =  React.addons.classSet({
            'card': true,
            'expanded': this.props.expanded,
        });
        const contentClasses =  React.addons.classSet({
            'card-content': true,
            'hidden': ! this.props.expanded,
        });

        return (
            <div className={cardClasses}>
                <div className="btn btn-xs btn-default card-anchor card-move">
                    <span className="icon glyphicon glyphicon-move"></span>
                </div>
                <div className="card-header" onClick={(ev) => {this.props.onHeaderClick(ev)}}>
                    <span className="card-title">
                        { props.order + ".- " + props.attrLabel}
                    </span>
                    <span className="pull-right text-muted"> { _.startCase(props.attrType.toLowerCase()) }  </span>
                </div>
                <div className={contentClasses}>

                    <form className="form-horizontal" onSubmit={(ev)=> { ev.preventDefault() }}>
                        <Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10"
                            value={props.attrLabel} onChange={props.onAttrLabelChanged}/>
                        <Input type="select" label="Attribute Type" labelClassName="col-xs-2" wrapperClassName="col-xs-10"
                            value={props.attrType} onChange={props.onAttrTypeChanged}>
                            <option value="QUANTITATIVE">Quantitative</option>
                            <option value="CATEGORICAL">Categorical</option>
                            <option value="ORDINAL">Ordinal</option>
                        </Input>
                    </form>

                    <OrderedFlowList values={attrOrder}></OrderedFlowList>
                </div>
            </div>
        )
    }
})

export default Card;
