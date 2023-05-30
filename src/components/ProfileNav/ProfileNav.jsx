import React from 'react';
import classes from "./ProfileNav.module.css";
import {Link, useNavigate} from "react-router-dom";

const ProfileNav = ({mode, setMode, modeList}) => {
	const navigation = useNavigate();

	function checkIsActive(currentLinkMode) {
		if (currentLinkMode === mode)
			return `${classes.active} ${classes.navItem}`;
		return `${classes.navItem}`;
	}

	function signOut() {
		sessionStorage.setItem('token', '');
		navigation('/');
	}

	return (
		<nav className={classes.nav}>
			<div className={classes.container}>
				<Link to={'/profile/results'} className={checkIsActive(modeList.results)}
				      onClick={() => setMode(modeList.results)}>Результаты</Link>
				<Link to={'/profile/orders'} className={checkIsActive(modeList.orders)}
				      onClick={() => setMode(modeList.orders)}>Заказы</Link>
				<Link to={'/profile/personal'} className={checkIsActive(modeList.personal)}
				      onClick={() => setMode(modeList.personal)}>Личные данные</Link>
				<div className={classes.navItem} style={{marginLeft: 'auto'}} onClick={signOut}>Выйти из аккаунта</div>
			</div>
		</nav>
	);
};

export default ProfileNav;