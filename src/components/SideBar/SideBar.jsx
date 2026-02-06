import React from 'react';
import './sideBar.scss';
import { NavLink } from 'react-router-dom';

const SideBar = ({ mobileMenu, toggleMobileMenu }) => {
	const handleMenuClick = () => {
		if (mobileMenu) {
			toggleMobileMenu();
		}
	};
	return (
		<div className={`journal-sidebar ${mobileMenu ? 'journal-sidebar--mobile' : ''}`}>
			<div className="journal-sidebar__wrapper">
				<div className="journal-sidebar__menu">
					<NavLink to="/journal-page" end>
						<h4 onClick={handleMenuClick} className="journal-sidebar__menu-item">
							Days
						</h4>
					</NavLink>
					<NavLink to="/journal-moods" end>
						<h4 onClick={handleMenuClick} className="journal-sidebar__menu-item">
							Moods
						</h4>
					</NavLink>
					<NavLink to="/journal-habits" end>
						<h4 onClick={handleMenuClick} className="journal-sidebar__menu-item">
							Habits
						</h4>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
