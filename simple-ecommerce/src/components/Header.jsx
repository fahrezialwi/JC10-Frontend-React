import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {

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

// Action Creator
const onLogoutUser = () => {
    
  // Action
  return {
      type: 'LOGOUT_SUCCESS'
  }
}

// Function untuk mengambil data di redux state dan menjadikannya props
const mapStateToProps = (state) => {
  console.log(state)
  return {
    username: state.auth.username
  }
}

class Header extends Component {

    constructor(props) {
      super(props)
      // this.toggle = this.toggle.bind(this)
      this.state = {
        isOpen: false
      }
    }

    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    onSearchSubmit = (e) => {
      e.preventDefault()
      alert("Fitur belum tersedia")
    }

    onLogoutClick = () => {
      this.props.onLogoutUser()
      localStorage.removeItem(
        'userData'
      )
    }

    render() {
      if(!this.props.username){
        return (
          <div>
            <Navbar color="light" light expand="md" fixed="top">
              <div className="container">
                <Link className="navbar-brand" to="/">tukupedia</Link>
                <form className="input-group input-search" onSubmit={this.onSearchSubmit}>
                    <input type="text" className="form-control" placeholder="Search product" id="search-input"/>
                    <div className="input-group-append">
                      <button className="btn btn-success" type="button" id="search-button" onClick={this.onSearchSubmit}>Search</button>
                    </div>
                </form>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink className="nav-link mr-3 text-light-dark" to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/login'>
                          <button className="btn btn-outline-success">Login</button>
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
            <Navbar color="light" light expand="md" fixed="top">
              <div className="container">
                <Link className="navbar-brand" to="/">tukupedia</Link>
                <form className="input-group input-search" onSubmit={this.onSearchSubmit}>
                    <input type="text" className="form-control" placeholder="Search product" id="search-input"/>
                    <div className="input-group-append">
                      <button className="btn btn-success" type="button" id="search-button" onClick={this.onSearchSubmit}>Search</button>
                    </div>
                </form>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink className="nav-link" to="/manageproducts">Manage Products</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="navbar-dropdown">
                      Hello, {this.props.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem className="text-light-dark">
                        Profile
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem className="text-light-dark" onClick={this.onLogoutClick}>
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

export default connect(mapStateToProps,{onLogoutUser})(Header)