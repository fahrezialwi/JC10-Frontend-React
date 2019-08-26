import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import ManageProducts from './ManageProducts'
import Register from './Register'
import Login from './Login'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/manageproducts' component={ManageProducts} />
            </BrowserRouter>
        )
    }
}

export default App