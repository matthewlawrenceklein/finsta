import React, { Component } from 'react';

class PhotoCard extends Component {
    render() {
        return (
            <div className='photostream-card'>
                <img src={this.props.photoData.url} alt='stream element' className='photostream-photo'/>
                <h4> {this.props.photoData.caption}
                    <br/>
                     {new Date(this.props.photoData.date).toString().slice(0,15)} 
                </h4>
            </div>
        );
    }
}

export default PhotoCard;
