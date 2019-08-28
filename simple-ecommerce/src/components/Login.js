import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// Action Creator
// Setelah dimasukkan ke connect, akan dipanggil sebagai this.props.onLoginUser
const onLoginUser = (dataId, dataUsername) => {
    
    // Action
    // Ini akan jadi parameter kedua di AuthReducer
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: dataId,
            username: dataUsername
        }
    }
}

class Login extends Component {
    
    onLoginClick = () => {
        // Hanya ketika menggunakan GET, data harus di dalam params: {}
        axios.get (
            'http://localhost:2019/users',
            {
                params: {
                    username: this.username.value,
                    password: this.password.value
                }
            }
        ).then((res)=> {

            // res.data merupakan sebuah array
            // jika data ditemukan, length > 0
            // jika data tidak ditemukan, length = 0
            if (res.data.length === 0){
                console.log('User tidak ditemukan')
            } else {
                this.props.onLoginUser(
                    res.data[0].id,
                    res.data[0].username
                )
            }

        })
    }

    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 col-md-4 mt-5 mx-auto card">
                    <div className="card-body">
                        <div className="card-title">
                            <h1>Login</h1>
                        </div>
                        <form>
                                <div className="input-group"><input ref={(input)=>{this.username = input}} type="text" className="form-control mt-3" placeholder="Username"/></div>
                                <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
                        </form>
                        <div className="text-center">
                            <button className="btn btn-block btn-primary mt-4" onClick={this.onLoginClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default connect(null,{onLoginUser})(Login)