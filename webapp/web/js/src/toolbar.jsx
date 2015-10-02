import React, { PropTypes } from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


const ToolBar = React.createClass({
  render () {
    return (
      <Navbar brand="Lobby" fixedTop>
        <Nav navbar right>
          <NavItem eventKey={1}>
            <span className="glyphicon glyphicon-backward"></span> Undo
          </NavItem>
          <NavItem eventKey={2}>
             Redo <span className="glyphicon glyphicon-forward"></span>
          </NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="nav-brand-dropdown">
            <MenuItem eventKey="1">Action</MenuItem>
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
