import React, { PropTypes } from 'react'
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';

class OrderedFlowList extends React.Component {
    static propTypes : {
        values: PropTypes.array.isRequired,
        onShift: propTypes.func.isRequired,
        onAscending: propTypes.func.isRequired,
        onDescendig: propTypes.func.isRequired,
    }
    render () {
        const {values, onShift, onAscending, onDescending} = this.props;

        const visible = (values.length === 0) ? " hidden" : "";
        return (
            <div className={"row" + visible}>
                <div className="col-sm-2">
                    <ButtonGroup bsSize="xsmall" vertical block>
                        <Button onClick={()=> onAscending()}> Ascending </Button>
                        <Button onClick={()=> onDescending()}> Descending </Button>
                    </ButtonGroup>
                </div>
                <div className="col-sm-10">
                    <ButtonToolbar >
                        {
                            values.map((value, i) => {
                                return (
                                    <ButtonGroup key={"k"+i} bsSize="xsmall">
                                        <Button onClick={()=> onShift(i, Math.max(i - 1, 0))}> - </Button>
                                        <Button disabled style={ {opacity: 1} }>
                                            <span className="text-muted">{(i+1) + ": "}</span><span>{value}</span>
                                        </Button>
                                        <Button onClick={()=> onShift(i, Math.min(i + 1, values.length - 1))}> + </Button>
                                    </ButtonGroup>
                                )
                            })
                        }
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
}

export default OrderedFlowList;
