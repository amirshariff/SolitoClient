import React from 'react';
import { withRouter } from 'react-router-dom';
import './PicCard.css';

const PicCard = (props) => {
	const viewHandler = () => {
		props.history.push('/a/' + props.id);
	};

	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.name}</h5>
				<p className="card-text">{props.description}</p>
				<button
					onClick={viewHandler}
					type="button"
					className="btn btn-outline-success"
				>
					View
				</button>
				<button
					onClick={() => props.deleteHandler(props.id)}
					type="button"
					className="btn btn-outline-danger"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default withRouter(PicCard);
