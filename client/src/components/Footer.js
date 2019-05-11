import React from 'react';

import GitHub from '../img/github.svg';

const Footer = () => (
	<footer className="footer">
		<div className="container">
			<div className="footer__logo">
				<a href="https://github.com/PiyushPawar17/add-my-name" target="_blank" rel="noreferrer noopener">
					<img src={GitHub} alt="GitHub" />
				</a>
			</div>
		</div>
	</footer>
);

export default Footer;
