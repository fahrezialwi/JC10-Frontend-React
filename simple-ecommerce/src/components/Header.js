import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap'

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
    }
}

export default Header