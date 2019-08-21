import React, { Component } from 'react'

class ImageList extends Component {

    renderList = () => {
        
        // this.props.data = [{}, {}, {}]
        // item = {}
        // hasil = [<img/>, <img/>, <img/>]
        
        let hasil = this.props.data.map((item, index) => {
            return (
                <img 
                    className="m-3"
                    src={item.urls.regular} 
                    alt={item.description}
                    key={index}
                />
            ) 
        })

        return hasil
    }
    

    render() {
        return (
            <div>
                <h1>Search Result</h1>
                {this.renderList()}
            </div>
        )
    }
}

export default ImageList

// this.props.data = [{}, {}, {}]
// {this.renderList()}
// Akan running function renderlist, function tersebut akan me-return array of images
// Kemudian apa yang di return akan di render berbarengan dengan komponen yang lain 