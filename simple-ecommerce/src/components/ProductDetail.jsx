import React, { Component } from 'react'
import axios from 'axios'

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: null
        }
    }

    componentDidMount() {
        axios.get(
            `http://localhost:2019/products/${this.props.match.params.id}`
        ).then((res) => {      
            this.setState({
                product: res.data
            })     
        })
    }

    render() {
        // Ketika product bukan null
        if(this.state.product){
            return (
                <div className="container container-top">
                    <div className="row">
                        <div className="card col-5 mx-auto">
                            <div className="row">
                                <img src={this.state.product.picture} alt={this.state.product.name} className="col-12"/>
                            </div>
                        </div>
                        <div className="col-7 product-data">
                        <h2>{this.state.product.name}</h2>
                            <p><img src="../star-5.png" alt="rating" className="mr-2"/>{this.state.product.rating}</p>
                            <h3 className="text-orange">Rp. {this.state.product.price}</h3>
                            <p className="mt-5 mb-4">{this.state.product.description}</p>
                            <div className="row">
                                <div className="col-2 qty-input">
                                    <input className="form-control" type="number" placeholder="Jumlah"/>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-orange">Add To Cart</button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container container-top">
                    <h1 className="text-center">Loading</h1>
                </div>
            )
        }
    }
}

export default ProductDetail