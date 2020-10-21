import React, { Component } from 'react';

class PhotoCard extends Component {
    render() {
        console.log(this.props.url.url)
        return (
            <div>
                <img src={this.props.url.url} alt='stream element' className='photostream-photo'/>
            </div>
        );
    }
}

export default PhotoCard;
