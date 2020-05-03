import React, { Component } from 'react';
import Photo from './Photo';

import './Photo.css';

class Photos extends Component {
    state = {
        photos: [
            {
                imageuri: 'https://images.unsplash.com/photo-1588489543962-9d336c3c08bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            },
            {
                imageuri: 'https://images.unsplash.com/photo-1588483673934-cf9e5add3225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            },
            {
                imageuri: 'https://images.unsplash.com/photo-1588503291572-6b60107fe000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            }
        ],
        selectedFile: ''
    }

    componentDidMount() {
        //get images from backend and update them in the state
    }

    onChangeimage = (event) => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    onSubmitImageHandler = () => {
        // take the image from the state(selectedFile) and add it to backend
    }

    render() {
        let photos = ''
        if (this.state.photos.length > 0) {
            photos = this.state.photos.map((photo, i) => {
                return (
                    <div className='col-md-3'>
                        <Photo key={i} image={photo.imageuri} />
                    </div>
                )
            })
        }
        return (
            <div className='container-fluid'>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-2">Hello</h1>
                        <p className="lead">Welcome Back try adding images to your album</p>
                        <div className="badge badge-pill badge-success" id='upload'>
                            <label class="fileContainer">
                                <img src="https://img.icons8.com/cotton/64/000000/upload.png" alt='' style={{ width: '40px' }} />
                                <input type="file" onChange={(event) => this.onChangeimage(event)} />
                            </label>
                        </div>
                        <button type="button" class="btn btn-light" onClick={this.onSubmitImageHandler}>Add Picture</button>
                    </div>
                </div>
                <div>
                    <div className='row'>
                        {photos}
                    </div>
                </div>
            </div>
        )
    }
}

export default Photos;