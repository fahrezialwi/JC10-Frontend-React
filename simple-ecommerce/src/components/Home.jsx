import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from './ProductItem'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            processedProducts: []
        }
    }
    
    componentDidMount() {
        axios.get(
            'http://localhost:2019/products'
        ).then((res) => {
            this.setState({
                products: res.data,
                processedProducts: res.data
            })
        })
    }

    // Filter
    onFilterSubmit = (e) => {
        e.preventDefault()
        this.setState({processedProducts: this.setState.products})

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
        this.setState({processedProducts: hasilFilter})
    }

    // Sort
    onSelectChange = (e) => {
        let hasilSort
        if (e.target.value === "name"){
            hasilSort = this.state.processedProducts.sort((a, b) => {
                if(a.name > b.name){
                    return 1
                } else if(a.name < b.name){
                    return -1
                } else {
                    return 0
                }
            })
        } else if (e.target.value === "lowest"){
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return a.price - b.price
            })
        } else if (e.target.value === "highest"){
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return b.price - a.price
            })
        } else if (e.target.value === "rating"){
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return b.rating - a.rating
            })
        } else if (e.target.value === "relevance"){
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return a.id - b.id
            })
        }
        this.setState({processedProducts: hasilSort})
    }

    productList = () => {
        // products = [{}, {}, {}]
        // product = {id, name, description, price, seller, rating, picture}
        return this.state.processedProducts.map((product) => {
            return <ProductItem product={product} key={product.id}/>
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
                            <form onBlur={this.onFilterSubmit}>
                                <h6>Name</h6>
                                <input ref={(input) => {this.name = input}} className="form-control mb-3" type="text"/>
                                <h6>Price</h6>
                                <input ref={(input) => {this.minimum = input}} className="form-control mb-2" type="number" placeholder="Minimum"/>
                                <input ref={(input) => {this.maximum = input}} className="form-control mb-2" type="number" placeholder="Maximum"/>
                            </form>
                        </div>
                    </div>
                    
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="text-right mb-3">
                            Sort by
                            <select className="ml-3" onChange = {this.onSelectChange}>
                                <option value="relevance">Relevance</option>
                                <option value="name">Name</option>
                                <option value="lowest">Lowest Price</option>
                                <option value="highest">Highest Price</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                        <div className="row row-list">
                            {this.productList()}
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default Home