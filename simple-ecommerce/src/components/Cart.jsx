import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

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

    onDeleteProduct = (idProduct) => {
        let array = this.state.products
        let deletedArray = this.state.products

        for (let i=0; i<array.length ; i++){
            if (array[i].id === idProduct){
                deletedArray.splice(i,1)
            }
        }

        this.setState({products: deletedArray})
    }

    onQtyChange =(id, val)=> {
        let array = this.state.products
        for (let i = 0; i< array.length; i++){
            if(array[i].id === id){
                array[i].qtyProduct = val
            }
        }

        this.setState({products: array})
    }

    cartList = () => {
        return this.state.products.map((product)=>{
            return (
                <tr key={product.id}>
                    <td><img src={product.picture} alt={product.name} width="100"/></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><input type="number" value={product.qtyProduct} onChange={(e) => this.onQtyChange(product.id, e.target.value)}/></td>
                    <td><button type="button" onClick={()=>{this.onDeleteProduct(product.id)}}>Delete</button></td>
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
            <h1 className="text-center mt-4 mb-4">Shopping Cart</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>PICTURE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>QTY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cartList()}  
                        <tr>
                            <th colSpan="4">TOTAL BELANJA</th>
                            <th>Rp {this.totalShopping()}</th>
                        </tr>
                    </tbody>
                </table>
                <Link type="button" to='/checkout'>Checkout</Link>
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

export default connect(mapStateToProps)(Cart)