import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Register extends Component {

    onRegisterSubmit = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        
        // POST data tersebut ke db.json

        axios.post(
            'http://localhost:2019/users', 
            {
                username: username,
                email: email,
                password: password
            }
        ).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        if(!this.props.username){
            return (
                <div className="container login-top">
                    <div className="row">
                        <div className="col-sm-8 col-md-4 mx-auto">
                            <div className="card-body">
                                <h2>Register</h2>
                                <form onSubmit={this.onRegisterSubmit}>
                                    <div className="input-group"><input ref={(input)=>{this.username = input}} type="text" className="form-control mt-3" placeholder="Username"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.email = input}} type="email" className="form-control mt-3" placeholder="Email"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
                                    <div className="text-center">
                                        <button className="btn btn-block btn-success mt-4" onClick={this.onRegisterSubmit}>Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}

// Function yang akan mengambil data dari redux state dan menjadikannya props
const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Register)