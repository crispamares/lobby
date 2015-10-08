import React, { PropTypes } from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


const ToolBar = React.createClass({
    PropTypes : {
        onUndoClick: PropTypes.func.isRequired,
        onRedoClick: PropTypes.func.isRequired
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
                    <NavDropdown eventKey={3} title="Dropdown" id="nav-brand-dropdown">
                        <MenuItem eventKey="1" onSelect={ (ev) => {console.log("cola"); window.location = "http://localhost:8888" } }>
                            GO GO GO
                        </MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
})

export default ToolBar
