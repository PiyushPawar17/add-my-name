import React, { useState } from 'react';
import Modal from 'react-modal';

const List = ({ list, user, addName, removeName, deleteList }) => {
	const [comment, setComment] = useState('');
	const [commentModal, setCommentModal] = useState(false);

	const [deleteModal, setDeleteModal] = useState(false);

	const addNameToList = event => {
		event.preventDefault();

		addName(list._id, comment);
		setComment('');
	};

	const removeNameFromList = () => {
		removeName(list._id);
	};

	const deleteCurrentList = () => {
		deleteList(list._id);
	};

	return (
		<div className="list">
			{user && user.admin && (
				<p className="list__delete" onClick={() => setDeleteModal(true)}>
					&times;
				</p>
			)}
			<header className="list__title">
				<h2>{list.title}</h2>
			</header>
			<section className="list__description">
				<p>{list.description}</p>
			</section>
			<section className="list__students-list">
				<p>List of Students</p>
				<ul>
					{list.studentList.map(student => (
						<li key={student.student._id}>
							{student.student.name}{' '}
							{student.comment && student.comment.length > 0 && `- ${student.comment}`}
						</li>
					))}
				</ul>
			</section>
			<section className="list__cta">
				{user && !list.studentList.find(student => student.student._id === user._id) ? (
					<button className="btn btn--primary" onClick={() => setCommentModal(true)}>
						Add My Name
					</button>
				) : (
					<button className="btn btn--danger" onClick={removeNameFromList}>
						Remove My Name
					</button>
				)}
			</section>
			<Modal isOpen={commentModal} className="modal">
				<form onSubmit={addNameToList}>
					<section className="input">
						<label htmlFor="comment">Comment (Optional)</label>
						<input id="comment" value={comment} onChange={e => setComment(e.target.value)} />
					</section>
					<section className="form__cta">
						<input type="submit" className="btn btn--primary" />
						<button className="btn btn--cancel" onClick={() => setCommentModal(false)}>
							Cancel
						</button>
					</section>
				</form>
			</Modal>
			<Modal isOpen={deleteModal} className="modal">
				<h1>Delete &apos;{list.title}&apos; List?</h1>
				<section className="form__cta">
					<button className="btn btn--danger" onClick={deleteCurrentList}>
						Delete
					</button>
					<button className="btn btn--cancel" onClick={() => setDeleteModal(false)}>
						Cancel
					</button>
				</section>
			</Modal>
		</div>
	);
};

export default List;
