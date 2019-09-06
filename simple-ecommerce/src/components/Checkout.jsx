import React, { Component } from 'react'


class Checkout extends Component {

    checkoutBody = () => {
        return this.props.carts.map((cart) => {
            return (
                <tr key={cart.id}>
                    <td>{cart.product_id}</td>
                    <td>{cart.name}</td>   
                    <td>{this.formatCurrency(cart.price)}</td>
                    <td>{cart.qty}</td>
                    <td>{this.formatCurrency(cart.qty * cart.price)}</td>
                </tr>
            )
        })
    }

    checkoutTotal = () => {
        let total = 0
        this.props.carts.forEach((cart) => {
            total += (cart.qty * cart.price)
        })
        return (
            <tr>
                <th colSpan='4'>TOTAL</th>
                <td>{this.formatCurrency(total)}</td>
            </tr>
        )
    }

    formatCurrency(number) {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
    }

    render() {

        // bukan null
        if (this.props.carts){
        return (
            <div className="container container-top">
            <h1>TOTAL</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>QTY</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.checkoutBody()} 
                        {this.checkoutTotal()}
                    </tbody>
                </table>
            </div>
        )
        } else {
            return null
        }
    }
}

export default Checkout