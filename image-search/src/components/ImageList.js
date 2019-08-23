import React, { Component } from 'react'

class ImageList extends Component {

    renderList = () => {
        
        // this.props.data = [{}, {}, {}]
        // item = {}
        // hasil = [<img/>, <img/>, <img/>]
        
        let hasil = this.props.data.map((item, index) => {
            return (
                <a 
                    href={item.urls.full} 
                    key={index} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img 
                        className="mt-3 col-md-4"
                        src={item.urls.regular} 
                        alt={item.description}
                        style={{
                            objectFit: "cover",
                            objectPosition: "100% 0",
                            height: "350px",
                        }}
                    />
                </a>
            ) 
        })

        return hasil
    }
    
    render() {
        return (
            <div>
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