import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addToCart } from '../actions'

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: []
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

    onAddToCartClick = (id, qty) => {
        let cart = this.props.arrayCart

        let quantity = parseInt(qty.value)

        let flag = 0

        if (cart.length !== 0){
            for (let i=0 ; i<cart.length ; i++){
                if(id === cart[i].idProduct){
                    cart[i].qtyProduct += quantity
                    flag = 1
                } 
            }
        }
        
        if (flag===0){
            cart.push({
                idProduct: id,
                qtyProduct: quantity
            })
            
        }
        console.log(cart)
        this.props.addToCart(cart)

         
        localStorage.setItem(
            'cart',
            JSON.stringify(this.props.arrayCart)
        )

        alert("Product has been added to cart")
       
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
                                    <input ref={(input) => {this.quantity = input}} className="form-control" type="number" min="1" placeholder="Jumlah"/>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-orange" onClick={()=> {this.onAddToCartClick(this.state.product.id, this.quantity)}}>Add To Cart</button>
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

const mapStateToProps = (state) => {
    return {
        arrayCart: state.cart
    }
}

export default connect(mapStateToProps,{addToCart})(ProductDetail)