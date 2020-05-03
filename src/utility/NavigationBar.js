import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css';

const NavigationBar = (props) => {
	return (
		<div className='container-fluid'>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand ml-0" to='/'>Solito</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav ml-auto">
						{
							!props.logged_in ?
								<Fragment>
									<li id='login'><Link to="/login" style={{ outline: 'none' }} onClick={props}>Login</Link></li>
									<li id='signup'><Link to="/signup" style={{ outline: 'none' }}>SignUp</Link></li>
								</Fragment> :
								<Fragment>
									<li id='albums' role='button'><Link to="/albums" style={{ outline: 'none' }}>Albums</Link></li>
									<li id='logout'><Link to="/logout" style={{ outline: 'none' }}>Logout</Link></li>
								</Fragment>
						}
					</ul>
				</div>
			</nav>
		</div>
	);
}
export default NavigationBar;