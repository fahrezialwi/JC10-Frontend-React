import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            searchProducts: []  
        }
    }
    
    componentDidMount() {
        axios.get(
            'http://localhost:2019/products'
        ).then((res) => {
            this.setState({
                products: res.data,
                searchProducts: res.data
            })
        })
    }

    // Filter
    onFilterClick = () => {
        let name = this.name.value
        let min = parseInt(this.minimum.value)
        let max = parseInt(this.maximum.value)

        if(isNaN(min)){
            min = 0
        }

        if(isNaN(max)){
            max = Infinity
        }

        let hasilFilter = this.state.products.filter((product) => {
                return (product.name.toLowerCase().includes(name.toLowerCase()) && min <= product.price && max >= product.price)   
        })

        this.setState({searchProducts: hasilFilter})
    }

    // Reset
    onResetClick = () => {
        // prevState = state saat ini
        this.setState((prevState) => {
            return {
                searchProducts: prevState.products
            }
        })
    }

    productList = () => {
        // products = [{}, {}, {}]
        // product = {id, name, description, price, picture}
        return this.state.searchProducts.map((product) => {
            return (
                <div className="col-lg-3 col-md-6 col-sm-12" key={product.id}>
                    <div className="card p-3 mb-3">
                    <img src={product.picture} alt={product.name} className="card-img-top"/>
                        <h6 className="card-title word-break">{product.name}</h6>
                        <p className="card-text">Rp. {product.price}</p>
                        <input className="form-control mb-2" type="number" placeholder="Qty"/>
                        <div>
                            <button className="btn btn-outline-success btn-block">Detail</button>
                            <button className="btn btn-success btn-block">Add To Cart</button>
                        </div>
                        </div>
                </div>
            )
        })
    }
    
    render() {
        return (
            <div className="container container-top">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className="card p-3 filter-position">
                            <div className="border-bottom card-title mb-3">
                                <h5>Filter Product</h5>
                            </div>
                            <form className="form-group">
                                <h6>Name</h6>
                                <input ref={(input) => {this.name = input}} className="form-control mb-3" type="text"/>
                                <h6>Price</h6>
                                <input ref={(input) => {this.minimum = input}} className="form-control mb-2" type="number" placeholder="Minimum"/>
                                <input ref={(input) => {this.maximum = input}} className="form-control mb-2" type="number" placeholder="Maximum"/>
                            </form>
                            <button className="btn btn-success btn-block" onClick={this.onFilterClick}>Filter</button>
                            <button className="btn btn-outline-success btn-block" onClick={this.onResetClick}>Reset</button>
                        </div>
                    </div>
                    
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="row">
                            {this.productList()}
                        </div>
                    </div>
                    
                   
                    
                </div>
            </div>
        )
    }
}

export default Home