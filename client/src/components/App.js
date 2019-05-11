import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import Navbar from './Navbar';
import Lists from './Lists';
import Footer from './Footer';

import '../styles/App.css';

const App = () => {
	// States
	const [user, setUser] = useState({
		name: ''
	});
	const [userLoading, setUserLoading] = useState(false);
	const [userModal, setUserModal] = useState(true);

	const [lists, setLists] = useState([]);
	const [listLoading, setListLoading] = useState(false);
	const [listModal, setListModal] = useState(false);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	// Effects
	useEffect(() => {
		setUserLoading(true);
		axios
			.get('/api/users/me')
			.then(res => {
				if (res.data.user !== null) {
					setUserModal(false);
					setUser(res.data.user);
				} else {
					setUser({ name: '' });
				}
				setUserLoading(false);
			})
			.catch(err => {
				setUser({ name: '' });
				setUserLoading(false);
			});
	}, [user.name]);

	useEffect(() => {
		setListLoading(true);
		axios
			.get('/api/lists')
			.then(res => {
				setLists(res.data.lists);
				setListLoading(false);
			})
			.catch(err => setListLoading(false));
	}, [lists.length]);

	// Other Functions
	const signOut = () => {
		setUser({ name: '' });
	};

	const createList = event => {
		event.preventDefault();
		const listData = {
			title,
			description
		};

		axios.post('/api/lists', listData).then(res => {
			setTitle('');
			setDescription('');
			setListModal(false);
			const updatedList = [res.data.list, ...lists];
			setLists(updatedList);
		});
	};

	const deleteList = listID => {
		axios.delete(`/api/lists/${listID}`).then(res => {
			const updatedList = lists.filter(list => list._id !== res.data.list._id);
			setLists(updatedList);
		});
	};

	const addName = (listID, comment) => {
		const commentByUser = { comment };

		axios.post(`/api/users/${listID}`, commentByUser).then(res => {
			const updatedList = lists.map(list => {
				if (list._id === listID) return res.data.list;
				return list;
			});

			setLists(updatedList);
		});
	};

	const removeName = listID => {
		axios.delete(`/api/users/${listID}`).then(res => {
			const updatedList = lists.map(list => {
				if (list._id === listID) return res.data.list;
				return list;
			});

			setLists(updatedList);
		});
	};

	return (
		<>
			<Navbar signOut={signOut} />
			<div className="container user-info">
				<p>
					Signed In as -{' '}
					<span className="bold">
						{!userLoading && user ? user.name : <span className="loading">Loading...</span>}
					</span>
				</p>
				{user && user.admin && (
					<button className="btn btn--primary" onClick={() => setListModal(true)}>
						Create New List
					</button>
				)}
			</div>
			<Lists
				lists={lists}
				loading={listLoading}
				user={user}
				addName={addName}
				removeName={removeName}
				deleteList={deleteList}
			/>
			<Footer />
			<Modal isOpen={userModal} className="modal" ariaHideApp={false}>
				{!userLoading ? (
					<>
						<h1>Add My Name</h1>
						<h3>
							No more WhatsApp spams{' '}
							<span role="img" aria-label="tada">
								🎉
							</span>
						</h3>
						<h3>Sign In with your IIITV Email ID</h3>
						<a className="btn btn--primary btn--signin" href="/auth/google">
							Sign In
						</a>
					</>
				) : (
					<div className="loading">Loading...</div>
				)}
			</Modal>
			<Modal isOpen={listModal} className="modal" ariaHideApp={false}>
				<p className="modal__close" onClick={() => setListModal(false)}>
					&times;
				</p>
				<h1>Create New List</h1>
				<form onSubmit={createList}>
					<section className="input">
						<label htmlFor="title">Title</label>
						<input id="title" value={title} onChange={e => setTitle(e.target.value)} />
					</section>
					<section className="input">
						<label htmlFor="description">Description</label>
						<textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
					</section>
					<section className="form__cta">
						<input type="submit" className="btn btn--primary" />
						<button className="btn btn--cancel" onClick={() => setListModal(false)}>
							Cancel
						</button>
					</section>
				</form>
			</Modal>
		</>
	);
};

export default App;
