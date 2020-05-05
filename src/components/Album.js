import React, { Component } from 'react';
import PicCard from './PicCard';

import './Album.css';
// import { useRadioGroup } from '@material-ui/core';

class Album extends Component {
    state = {
        albums: [],
        newAlbum : ''
    }

    componentDidMount() {

        fetch('http://localhost:8000/api/get_albums/', {
            method: 'GET',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    albums: json.album
                })
            })

    }

    createAlbumHandler = () => { 
        fetch('http://localhost:8000/api/addalbum/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,

            },
            body: JSON.stringify({
                album_name: this.state.newAlbum
                
               
            })
        }) 
    }
      
    albumNameChangeHandler = (event) => {
        this.setState({
            newAlbum: event.target.value
        })

    }


    render() {
        let albums = ''
        if (this.state.albums.length > 0) {
            albums = this.state.albums.map((album) => {
                return (
                    <div className='col-md-3'>
                        <PicCard
                            id={album.id}
                            key={album.id}
                            name={album.album_name}
                            // description={album.album_description}
                            viewing={album.is_private ? false : true}
                        />
                    </div>
                )
            })
        }
        return (
            <div className='container-fluid'>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-2">Hello</h1>
                        <p className="lead">Manage Your Albums</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" onChange={(event) => { this.albumNameChangeHandler(event) }} placeholder="Album name" aria-label="Album's name" aria-describedby="createone" />
                            <div className="input-group-append">
                                <button className="btn btn-succes" type="button" id="createone" onClick={this.createAlbumHandler}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    {albums}
                </div>
            </div>
        );
    }
}

export default Album;