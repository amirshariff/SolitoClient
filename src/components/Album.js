import React, { Component } from 'react';
import PrivateAlbum from './PrivateAlbum';
import PublicAlbum from './PublicAlbum';
import './Photo.css';

class Album extends Component {
	state = {
		id: 0,
		creator: 0,
		album_name: '',
		is_private: false,
		pictures: [],
	};

	componentDidMount() {
		const albumId = this.props.match.params.albumId;

		fetch(`http://localhost:8000/api/album/${albumId}`, {
			headers: { Authorization: `Token ${localStorage.getItem('token')}` },
		})
			.then((r) => r.json())
			.then((albumInfo) => {
				this.setState(albumInfo);
			});
	}

	onSubmitImageHandler = (file) => {
		const data = new FormData();

		data.append('picture_file', file);
		data.append('album_id', this.state.id);
		data.append('title', 'Untitled');

		fetch('http://localhost:8000/api/addpicture/', {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
			body: data,
		})
			.then((res) => res.json())
			.then((newPicture) => {
				this.setState({ pictures: [...this.state.pictures, newPicture] });
			})
			.catch((err) => {
				throw new Error(err);
			});
	};

	render() {
		return this.props.user && this.props.user.id === this.state.creator ? (
			<PrivateAlbum
				album={this.state}
				onSubmitImageHandler={this.onSubmitImageHandler}
			/>
		) : (
			<PublicAlbum album={this.state} />
		);
	}
}

export default Album;
