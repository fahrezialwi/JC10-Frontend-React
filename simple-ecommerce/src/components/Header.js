import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap'
import { connect } from 'react-redux'

// Function untuk mengambil data di redux state
const mapStateToProps = (state) => {
  return {
    username: state.auth.username
  }
}

class Header extends Component {

    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
          isOpen: false
        }
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        })
      }

    render() {
      if(!this.props.username){
        return (
          <div>
            <Navbar color="dark" dark expand="md">
              <div className="container">
                <Link className="navbar-brand" to="/">Simple E-Commerce</Link>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink className="nav-link" to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/login'>
                            <Button className='mx-3' color="primary">Login</Button>
                        </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </div>
            </Navbar>
          </div>
        )
      } else {
        return (
          <div>
            <Navbar color="dark" dark expand="md">
              <div className="container">
                <Link className="navbar-brand" to="/">Simple E-Commerce</Link>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink className="nav-link" to="/manageproducts">Manage Products</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Hello, {this.props.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Profile
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </div>
            </Navbar>
          </div>
        )
      }
    }
}

export default connect(mapStateToProps)(Header)