import React, { PropTypes } from 'react'

class OrderedFlowList extends React.Component {
    static propTypes : {
        values: PropTypes.array.isRequired,
    }
    render () {
        const values = this.props.values;
        console.log("--->" , values);
        return (
            <div>
                {
                    values.map((value, i) => {
                        return <span>{(i+1) + ". " + value}</span>
                    })
                }
            </div>
        );
    }
}

export default OrderedFlowList;
