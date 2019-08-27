import React, { Component } from 'react'

class Login extends Component {
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
                            <div className="input-group"><input type="text" className="form-control mt-3" placeholder="Username"/></div>
                            <div className="input-group"><input type="password" className="form-control mt-3" placeholder="Password"/></div>
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

export default Login