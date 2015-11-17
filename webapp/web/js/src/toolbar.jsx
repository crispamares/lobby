import React, { PropTypes } from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

const ToolBar = React.createClass({
    getDefaultProps () {
        return {
            startAnalysisEnabled: true
        };
    },
    PropTypes : {
        onUndoClick: PropTypes.func.isRequired,
        onRedoClick: PropTypes.func.isRequired,
        onStartAnalysisClick: PropTypes.func.isRequired,
        startAnalysisEnabled: PropTypes.bool.isRequired
    },
    render () {
        return (
            <Navbar brand="Lobby" fixedTop>
                <Nav navbar right>
                    <NavItem eventKey={1} onClick={this.props.onUndoClick}>
                        <span className="glyphicon glyphicon-backward"></span> <span>Undo</span>
                    </NavItem>
                    <NavItem eventKey={2} onClick={this.props.onRedoClick}>
                        <span>Redo</span> <span className="glyphicon glyphicon-forward"></span>
                    </NavItem>
                    <div className="navbar-form navbar-left">
                        <Button bsStyle="primary"
                            disabled={!this.props.startAnalysisEnabled}
                            onClick={()=> {if (this.props.startAnalysisEnabled) this.props.onStartAnalysisClick()}}>
                            Start the Anlaysis
                        </Button>
                    </div>
                </Nav>
            </Navbar>
        )
    }
})

export default ToolBar
