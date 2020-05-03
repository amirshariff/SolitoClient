import React, { Fragment, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


const NavigationBar = (props) => {
	const [albums, setAlbums] = useState([])
    return (
			<div>
				<Navbar bg="dark" variant="light">
					<Navbar.Brand ><NavLink to='/'>Solito</NavLink></Navbar.Brand>
				<Nav className="mr-auto">

					{!props.logged_in ?
						<Fragment>
							<NavLink to='login'  > Login</NavLink>
							<NavLink to='signup' > Sign Up</NavLink> 
							 
							
						</Fragment>
						:
						<NavLink to='logout' onClick={props.handle_logout}> Log Out</NavLink>
						
					}


					</Nav>
					
				</Navbar>
			</div>
		);
}
export default NavigationBar;
