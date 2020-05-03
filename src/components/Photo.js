import React from 'react';

const Photo = (props) => {
    const deleteHandler = () => {
        
    }
    return (
        <div className="card">
            <img src={props.image} alt={props.image} className="card-img-top img-thumbnail" />
            <div className="card-body">
                {/* <h5 className="card-title">Title</h5>
         <p className="card-text">Some Photo Content</p> */}
                <button onClick={deleteHandler} type="button" className="btn btn-outline-danger">Delete</button>
            </div>
        </div>
    )
}

export default Photo;