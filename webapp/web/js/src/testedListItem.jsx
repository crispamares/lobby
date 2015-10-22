import React, { PropTypes } from 'react'
import {ListGroupItem} from 'react-bootstrap';

class TestedListItem extends React.Component {
    static propTypes : {
        testingState: PropTypes.string.isRequired,
    }
    render () {
        let icon = "glyphicon glyphicon-";
        let textStyle = null;
        switch (this.props.testingState) {
            case "success":
                icon += "ok-circle";
                textStyle = "success";
                break;
            case "error":
                icon += "ban-circle";
                textStyle = "danger"
                break;
            case "waiting":
                icon += "time";
                break;
            default:
                icon = "";
                textStyle = null;
                console.warn("This testingState is not correct:", this.props.testingState);
        }
        return (
            <ListGroupItem bsStyle={textStyle}>
                <span className={icon}></span> <span>{this.props.children}</span>
            </ListGroupItem>
        );
    }
}

export default TestedListItem;
