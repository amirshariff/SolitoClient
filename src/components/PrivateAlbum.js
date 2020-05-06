import React, { Component } from 'react';

import Photo from './Photo';

class PrivateAlbum extends Component {
	state = {
		selectedFile: null,
	};

	renderPictures = () => {
		return this.props.album.pictures.map((picture, i) => {
			return (
				<div key={i} className="col-md-3">
					<Photo picture={picture} deleteHandler={this.deleteHandler} />
				</div>
			);
		});
	};

	onChangeimage = (event) => {
		this.setState({
			selectedFile: event.target.files[0],
		});
	};

	deleteHandler = (pictureId) => {
		fetch(`http://localhost:8000/api/picture_delete/${pictureId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		}).then(() => {
			const updatedPictures = this.state.pictures.filter(
				(p) => p.id !== pictureId
			);

			this.setState({ pictures: updatedPictures });
		});
	};

	render() {
		return (
			<div className="container-fluid">
				<div className="jumbotron jumbotron-fluid">
					<div className="container">
						<h1 className="display-2">{this.props.album.album_name}</h1>
						<p className="lead">Welcome Back try adding images to your album</p>
						<div className="badge badge-pill badge-success" id="upload">
							{/* <label className="fileContainer">
								<img
									src="https://img.icons8.com/cotton/64/000000/upload.png"
									alt=""
									style={{ width: '40px' }}
								/>
								<input
									type="file"
									onChange={(event) => this.onChangeimage(event)}
								/>
							</label> */}
						</div>
						<form
							type="button"
							className="btn btn-light"
							onClick={() =>
								this.props.onSubmitImageHandler(this.state.selectedFile)
							}
						>
							Add Picture
						</form>
					</div>
				</div>
				<div>
					<div className="row">{this.renderPictures()}</div>
				</div>
			</div>
		);
	}
}

export default PrivateAlbum;
