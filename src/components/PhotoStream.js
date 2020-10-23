import React, { Component } from 'react';
import PhotoCard from './PhotoCard'
import '@firebase/storage';
import "firebase/firestore"
import * as firebase from "firebase/app";
import { FileDrop } from 'react-file-drop'

class PhotoStream extends Component {

    state = {
        photoDropStyle : { border: '1px solid black', width: 350, height: 100, backgroundColor: '#F0FFF0', color: 'black', padding: 20, borderRadius: 14,  },
        photos : [],
        secret : false, 
        input : '',
        caption : '',
        showCaption : true 
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

        const date = Date.now()
        const caption = this.state.caption 

        photoRef.put(photoFile).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection('photoURLS').add(
                    {
                        url : downloadURL, 
                        caption : caption, 
                        date: date
                    })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            })
        });
        this.setState({caption : ''})
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
                    photos : photoURLS.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
                })
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

    renderPhotos = () => {
        return this.state.photos.map((url, idx) => {
            return <PhotoCard key={idx} photoData={url}/>
        })
    }

    setInput = (e) => {
        this.setState({input : e.target.value})
    }

    checkHandshake = (e) => {
        e.preventDefault()
        if(this.state.input === 'hello'){
            this.setState({secret : true})
        } else {
           alert('incorrect secret')
           this.setState({input : ''})
        } 
    }

    handleCaption = (e) => {
        console.log(e.target.value)
        this.setState({
            caption : e.target.value
        })
    }

    render() {
        return (
            <div className='photostream-master'>
                { this.state.secret ? 
                    <div style={this.state.photoDropStyle}>
                        { this.state.showCaption ? 
                            <form>
                                <input className='form-item2' type='text' placeholder='caption' value={this.state.caption} onChange={this.handleCaption}/>
                            </form>
                        :
                            null 
                        }
                        { this.state.caption ? 
                            <FileDrop
                                onDragOver={() => this.setState({showCaption : false, photoDropStyle : { border: '5px dotted black', width: 350, height: 100, backgroundColor: '#6495ed', padding: 20, color: 'black', borderRadius: 14 } })}
                                onDragLeave={() => this.setState({photoDropStyle : { border: '1px solid black', width: 350, height: 100, backgroundColor: '#F0FFF0', padding: 20, color: 'black', borderRadius: 14 } })}
                                onDrop={(file, event) => this.handlePhotoDrop(file, event)}
                            >
                                Drop image!
                            </FileDrop>
                        :
                         null 
                        }
                    </div>
                : 
                    <div>
                        <form className='form' onSubmit={this.checkHandshake}>
                            <input className='form-item' type='password' placeholder='Secret Handshake' value={this.state.input} onChange={this.setInput}/>
                            <button className='form-item'type='submit'>Go</button>
                        </form>
                    </div>
                }
                <div className='photostream-container'>
                    { this.state.photos ? this.renderPhotos() : null }
                </div>
            </div>
        );
    }
}

export default PhotoStream;
