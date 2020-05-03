import React, { Component } from 'react';
import PicCard from './PicCard';

import './Album.css';

class Album extends Component {
    state = {
        albums: [
            {
                id: 1,
                album_name: 'Album1',
                album_description: 'Description of Album1',
                is_private: false
            },
            {
                id: 2,
                album_name: 'Album2',
                album_description: 'Description of Album2',
                is_private: true
            },
            {
                id: 3,
                album_name: 'Album3',
                album_description: 'Description of Album3',
                is_private: true
            },
            {
                id: 4,
                album_name: 'Album4',
                album_description: 'Description of Album4',
                is_private: false
            }
        ],
        albumName: ''
    }

    // componentDidMount() {

    //     fetch('http://localhost:8000/api/get_albums/')
    //         .then((res) => res.json())
    //         .then((json) => { 
    //             this.setState({
    //                 albums: json
    //             })
    //          })

    // }

    createAlbumHandler = () => {
        //create album in the backend with the albumName in state
    }

    albumNameChangeHandler = (event) => {
        this.setState({
            albumName: event.target.value
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
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" onChange={(event) => { this.albumNameChangeHandler(event) }} placeholder="Album name" aria-label="Album's name" aria-describedby="createone" />
                            <div class="input-group-append">
                                <button class="btn btn-succes" type="button" id="createone" onClick={this.createAlbumHandler}>Submit</button>
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