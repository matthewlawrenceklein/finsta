import React, { Component } from 'react';
import PhotoCard from './PhotoCard'
import '@firebase/storage';
import "firebase/firestore"
import * as firebase from "firebase/app";
import { FileDrop } from 'react-file-drop'

class PhotoStream extends Component {

    state = {
        photoDropStyle : { border: '1px solid black', width: 300, height: 100, backgroundColor: '#F0FFF0', padding: 20 },
        photos : []
    }

    componentDidMount(){
        this.getPhotos()
    }

    componentDidUpdate(){
        this.renderPhotos()
    }

    handlePhotoDrop = (file, event) => {
        const db = firebase.firestore();
        const storage = firebase.storage().ref();
        const photoFile = file[0]
        const photoRef = storage.child(file[0].name);

        photoRef.put(photoFile).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection('photoURLS').add({url : downloadURL})
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            })
        });
        this.getPhotos()
     }

     getPhotos = () => {
        const db = firebase.firestore();
        const photoURLS = []

        db.collection('photoURLS')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    photoURLS.push(doc.data()) 
                });
                this.setState({
                    photos : photoURLS
                })
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

    renderPhotos = () => {
        return this.state.photos.map((url, idx) => {
            return <PhotoCard key={idx} url={url}/>
        })
    }

    render() {
        return (
            <div>
                <h1>Add photo</h1>
                <div style={this.state.photoDropStyle}>
                    <FileDrop
                        onDragOver={() => this.setState({photoDropStyle : { border: '5px dotted black', width: 300, height: 100, backgroundColor: '#6495ed', padding: 20 } })}
                        onDragLeave={() => this.setState({photoDropStyle : { border: '1px solid black', width: 300, height: 100, backgroundColor: '#F0FFF0', padding: 20 } })}
                        onDrop={(file, event) => this.handlePhotoDrop(file, event)}
                    >
                        Drop image!
                    </FileDrop>

                </div>
                <div className='photostream-container'>
                    { this.state.photos ? this.renderPhotos() : null }
                </div>
            </div>
        );
    }
}

export default PhotoStream;
