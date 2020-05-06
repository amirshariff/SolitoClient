import React from 'react';

const Photo = ({ picture, deleteHandler }) => {
	return (
		<div className="card">
			<img
				src={'http://localhost:8000' + picture.picture_file}
				alt={picture.title}
				className="card-img-top img-thumbnail"
			/>
			<div className="card-body">
				{/* <h5 className="card-title">Title</h5>
         <p className="card-text">Some Photo Content</p> */}
				<button
					onClick={() => deleteHandler(picture.id)}
					type="button"
					className="btn btn-outline-danger"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Photo;
