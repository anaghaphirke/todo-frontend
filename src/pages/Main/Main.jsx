import React from 'react';
import { useState } from 'react';
import './main.scss';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const Main = () => {
	const [mobileMenu, setMobileMenu] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenu((prev) => !prev);
	};

	return (
		<>
			<Header toggleMobileMenu={toggleMobileMenu}></Header>
			<div className="journal-page">
				<SideBar mobileMenu={mobileMenu} toggleMobileMenu={toggleMobileMenu}></SideBar>
				<Outlet />
			</div>
		</>
	);
};

export default Main;
