import React, { Component } from 'react';

class Album extends Component {
    state = {
        albums: []
    }

    componentDidMount() {
        
        fetch('http://localhost:8000/api/get_albums/')
            .then((res) => res.json())
            .then((json) => {console.log(json) })
                   
    }
    render() {

        return (
            <div>
                
            </div>
        );
    }
}

export default Album;
