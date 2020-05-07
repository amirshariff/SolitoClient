import React, { Component } from 'react';
import Photo from './Photo';

class PublicAlbum extends Component {
	renderPictures = () => {
		return this.props.album.pictures.map((picture, i) => {
			return (
				<div key={i} className="col-md-3">
					<Photo picture={picture} />
				</div>
			);
		});
	};

	render() {
		return (
			<div className="container-fluid">
				<div className="jumbotron jumbotron-fluid">
					<div className="container">
						<h1 className="display-2">{this.props.album.album_name}</h1>
						<h1>Public</h1>
					</div>
				</div>
				<div>
					<div className="row">{this.renderPictures()}</div>
				</div>
			</div>
		);
	}
}

export default PublicAlbum;
