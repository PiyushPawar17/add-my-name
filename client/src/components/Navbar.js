import React from 'react';

const Navbar = ({ signOut }) => (
	<nav className="navbar">
		<div className="container">
			<div className="navbar__content">
				<div className="navbar__logo">
					<h1>Add My Name</h1>
				</div>
				<div className="navbar__auth">
					<a href="/auth/logout" onClick={signOut}>
						Sign Out
					</a>
				</div>
			</div>
		</div>
	</nav>
);

export default Navbar;
