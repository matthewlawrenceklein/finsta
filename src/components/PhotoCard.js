import React, { Component } from 'react';

class PhotoCard extends Component {
    render() {
        return (
            <div className='photostream-card'>
                <img src={this.props.url.url} alt='stream element' className='photostream-photo'/>
                <h4> {this.props.url.caption}</h4>
                {/* <h4> {this.props.url.date}</h4> */}
            </div>
        );
    }
}

export default PhotoCard;
