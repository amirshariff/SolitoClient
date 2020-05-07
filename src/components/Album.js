import React, { Component } from 'react';
import PrivateAlbum from './PrivateAlbum';
import PublicAlbum from './PublicAlbum';
import './Photo.css';

class Album extends Component {
	state = {
		id: 0,
		creator: 0,
		album_name: '',
		is_private: true,
		pictures: [],
	};

	componentDidMount() {
		const albumId = this.props.match.params.albumId;
		const token = localStorage.getItem('token');
		const options = {
			headers: { Authorization: `Token ${token}` },
		};

		fetch(`http://localhost:8000/api/album/${albumId}`, token ? options : null)
			.then((r) => r.json())
			.then((albumInfo) => {
				this.setState(albumInfo);
			})
			.catch((error) => {
				this.props.history.push('/404');
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

	onTogglePriPub = (event) => {
		fetch(`http://localhost:8000/api/album/${this.state.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				is_private: !this.state.is_private,
			}),
		})
			.then((r) => r.json())
			.then((updatedAlbum) => {
				this.setState({ is_private: updatedAlbum.is_private });
			});
	};

	render() {
		return this.props.user && this.props.user.id === this.state.creator ? (
			<PrivateAlbum
				deleteHandler={this.deleteHandler}
				album={this.state}
				onSubmitImageHandler={this.onSubmitImageHandler}
				onTogglePriPub={this.onTogglePriPub}
			/>
		) : (
			<PublicAlbum album={this.state} />
		);
	}
}

export default Album;
