import React, { Component } from 'react'
import axios from 'axios';

class ManageProducts extends Component {

    state = {
        products: []
    }

    // KETIGA
    componentDidMount() {
        axios.get(
            'http://localhost:2019/products'
        ).then((res) => {
             // ditaruh di state.date
             // ketika setState() maka akan render ulang
            this.setState({products: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

       // Rendering List
       renderList = () => {

        // Map data object menjadi list
        // products = []
        // product = {name, description, price, picture}
        // hasilRender = [<tr></tr>, <tr></tr>, ... , <tr></tr>]

        let hasilRender = this.state.products.map((product, index) => {
            return (
                <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td><img 
                            src={product.picture} 
                            alt={product.name}
                            style={{width: "100px"}} 
                        />
                    </td>
                    <td><button className="btn btn-success btn-block">Edit</button></td>
                </tr>
            )
        })

        return(hasilRender)
    }

    onAddProduct = () => {
        // Ambil data dari text input
        let name = this.name.value
        let description = this.desc.value
        let price = this.price.value
        let picture = this.pict.value

        // POST data ke database (JSON)
        axios.post(
            'http://localhost:2019/products', 
            {
                name: name,
                description: description,
                price: price,
                picture: picture
            }
        ).then((res) => {
            this.componentDidMount()
        }).catch((err) => {
            console.log(err)
        })
    }

    // KEDUA
    render() {
        return (
            <div className="container">
            <h1 className="text-center mt-3 mb-3">List Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>


                <h1 className="text-center mt-3 mb-3">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input ref={(input) => {this.name = input}} className="form-control" type="text"/></td>
                            <td><input ref={(input) => {this.desc = input}} className="form-control" type="text"/></td>
                            <td><input ref={(input) => {this.price = input}} className="form-control" type="text"/></td>
                            <td><input ref={(input) => {this.pict = input}} className="form-control" type="text"/></td>
                            <td><button className="btn btn-success btn-block" onClick={this.onAddProduct}>Add</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManageProducts

// 1. componentWillMount()
// 2. render()
// 3. componentDidMount()
// 4. render() // render ulang ketika tertrigger setState()