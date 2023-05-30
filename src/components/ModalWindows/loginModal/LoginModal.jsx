import React, {useState} from 'react';
import classes from "./LoginModal.module.css";
import AuthorizationBlock from "./AuthorizationBlock";
import RegistrationBlock from "./RegistrationBlock";

const LoginModal = ({isActive, setIsActive}) => {

	const viewMode = {
		auth: 'auth',
		reg: 'reg'
	}
	const [viewModeState, setViewModeState] = useState(viewMode.auth)

	function checkIsActive() {
		if (isActive === false)
			return `${classes.loginModal}`;
		return `${classes.active} ${classes.loginModal}`;
	}

	function getCurrentView() {
		if (viewModeState === viewMode.auth)
			return <AuthorizationBlock></AuthorizationBlock>
		return <RegistrationBlock></RegistrationBlock>

	}

	return (
		<div className={checkIsActive()} onClick={() => setIsActive(false)}>
			<div className={classes.content} onClick={e => e.stopPropagation()}>
				<div className={classes.title}>
					<div className={classes.selector} style={viewModeState === viewMode.auth ? {borderColor: '#3CB6DC'} : {borderColor: "gray"}}
					     onClick={() => setViewModeState(viewMode.auth)}>Авторизация</div>
					<div className={classes.selector} style={viewModeState === viewMode.reg ? {borderColor: '#3CB6DC'} : {borderColor: "gray"}}
					     onClick={() => setViewModeState(viewMode.reg)}>Регистрация</div>
				</div>
				{getCurrentView()}
			</div>
		</div>
	);
};

export default LoginModal;