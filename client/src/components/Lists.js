import React from 'react';

import List from './List';

const Lists = ({ lists, loading, user, addName, removeName, deleteList }) => (
	<main className="lists container">
		<h1 className="heading--primary">Lists</h1>
		<section className="lists__lists">
			{!loading ? (
				lists.map(list => (
					<List
						key={list._id}
						list={list}
						user={user}
						addName={addName}
						removeName={removeName}
						deleteList={deleteList}
					/>
				))
			) : (
				<div className="loading">Loading...</div>
			)}
		</section>
	</main>
);

export default Lists;
