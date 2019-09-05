import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }


    componentDidMount() {
         this.getData()
    }

    getData = () => {

        localStorage.removeItem('cart')
        localStorage.setItem(
            'cart',
            JSON.stringify(this.state.products)
        )
   
        if(this.props.arrayCart.length !== 0){
            let arrayId = this.props.arrayCart.map((val) => {
                return val.idProduct
            })
            
            axios.get(
                'http://localhost:2019/products', 
                {
                    params: {
                        id: arrayId
                    }
                }

            ).then((res) => {

                let array = []
                for(let i = 0; i< res.data.length; i++){
                    array.push({
                        ...res.data[i],
                        ...(this.props.arrayCart.find(elem => elem.idProduct === res.data[i].id))
                    })
                }

                this.setState({products: array})

            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    cartList = () => {
        return this.state.products.map((product)=>{
            return (
                <tr key={product.id}>
                    <td><img src={product.picture} alt={product.name} width="100"/></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.qtyProduct}</td>
                </tr>
            )
        })
        
    }

    totalShopping = () => {
        let total = 0
        let array = this.state.products
        for (let i = 0; i< array.length; i++){
            total += array[i].price * array[i].qtyProduct
        }
        return total
    }

    render() {
        if (this.props.username){
        return (
            <div className="container container-top">
            <h1 className="text-center mt-4 mb-4">Checkout</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>PICTURE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>QTY</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {this.cartList()}  
                        <tr>
                            <th>TOTAL BELANJA</th>
                            <th></th>
                            <th></th>
                        
                            <th>Rp {this.totalShopping()}</th>
                        </tr>
               
                    </tbody>
                </table>
            </div>
        )
        } else {
            return <Redirect to='/login'/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        arrayCart: state.cart,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Checkout)