import React, { Component } from 'react'
import axios from 'axios';

class ManageProducts extends Component {

    state = {
        products: [],
        selectedId: 0
    }

    // KETIGA
    // Akan running setelah render() dijalankan
    componentDidMount() {
         // Ambil (GET) semua products data dari database
         console.log("mulai componentDidMount()")
         this.getData()
         console.log("selesai componentDidMount()")
    }

    // Mengambil data dari database
    getData = () => {
        axios.get(
            'http://localhost:2019/products'

        ).then((res) => {
            // Ditaruh di state.data
            console.log("mulai setState() (async)")
            this.setState({products: res.data})
            console.log("selesai setState() (async)")

        }).catch((err)=>{
            console.log(err)
        })
        console.log("mulai getData()")
    }

    // Input data
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
            this.getData()
        }).catch((err) => {
            console.log(err)
        })
    }

    // Edit data
    onEditClick = (id) => {
        this.setState({selectedId: id})
    }

    // Render Product List
    productList = () => {

        // Map data object menjadi list
        // products = []
        // product = {name, description, price, picture}
        // hasilRender = [<tr></tr>, <tr></tr>, ... , <tr></tr>]

        let hasilRender = this.state.products.map((product)=>{
            
            // Jika id tidak sama dengan yang terdaftar di state
            if(product.id !== this.state.selectedId){
                // render sebagai list
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>
                            <img 
                                src={product.picture} 
                                alt={product.name}
                                style={{width: "100px"}} 
                            />
                        </td>
                        <td>
                            <button 
                                className='btn btn-warning'
                                // anonymous function
                                onClick={() => {this.onEditClick(product.id)}}
                                >
                                Edit
                            </button>
                        </td>
                    </tr>
                )
            } else {
                // render sebagai textbox
                return (
                    <tr key={product.id}>
                        <td><input type="text" className="form-control mt-4 mb-4"/></td>
                        <td><input type="text" className="form-control mt-4 mb-4"/></td>
                        <td><input type="text" className="form-control mt-4 mb-4"/></td>
                        <td><input type="text" className="form-control mt-4 mb-4"/></td>
                        <td>
                            <button className='btn btn-danger mt-4 mb-4'>
                                Cancel
                            </button>
                        </td>
                    </tr>
                )
            }
        })
        console.log("render product list")
        return hasilRender
    }

    // KEDUA, KEEMPAT
    render() {
        console.log("mulai render()")
        return (
            <div className="container">
            <h1 className="text-center mt-4 mb-4">Product List</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESCRIPTION</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.productList()}
                    </tbody>
                </table>

                <h1 className="text-center mt-4 mb-4">Add Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESCRIPTION</th>
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
                {console.log("selesai render()")}
            </div>
        )
    }
}

export default ManageProducts

// React lifecycle
// 1. componentWillMount()
// 2. render()
// 3. componentDidMount()
// 4. render() // render ulang ketika tertrigger setState()

// Memberikan function ke onClick
// 1. Function tidak menerima argument
//    Langsung tuliskan nama function tersebut di dalam kurung kurawal onClick
//    contoh:
//    onClick = {this.somethingToDo}

// 2. Function yang menerima argument
//    Masukkan terlebih dahulu ke onClick sebuah anonymous function () => {}
//    Baru masukkan function yang ingin kita panggil di dalam anonymous funcion tersebut
//    contoh:
//    onClick = { () => { this.somethingToDo(23) } }
