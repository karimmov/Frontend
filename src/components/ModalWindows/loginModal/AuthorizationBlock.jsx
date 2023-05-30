import React, {useState} from 'react';
import classes from "./LoginModal.module.css";
import MyButton from "../../UI/button/MyButton";
import {Link, useNavigate} from "react-router-dom";

const AuthorizationBlock = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAuthSuccess, setIsAuthSuccess] = useState(true);
	const nav = useNavigate();

	function checkIsActive() {
		if (isAuthSuccess === true)
			return `${classes.error}`;
		return `${classes.errorActive} ${classes.error}`;
	}

	async function authenticate(e) {
		e.preventDefault();
		let requestURL = `http://176.124.192.224/api/authenticate?username=${email}&password=${password}`;
		const response = await fetch(requestURL, {
			method: "POST"
		});
		if (response.ok === true) {
			let data = await response.json();
			sessionStorage.setItem('token', data.access_token);
			nav('/profile');
		}
		else {
			setIsAuthSuccess(false);
			console.log("Error: ", response.status);
		}
	}

	return (
		<form className={classes.inputsContainer}>
			<div className={classes.wrapper}>
				<div className={classes.inputTitle}>Email</div>
				<input className={classes.input} value={email} onChange={e => setEmail(e.target.value)} type="email"/>
			</div>
			<div className={classes.wrapper}>
				<div className={classes.inputTitle}>Пароль</div>
				<input className={classes.input} value={password} onChange={e => setPassword(e.target.value)} type="password"/>
			</div>
			<div className={checkIsActive()}>Неверный пароль</div>
			<MyButton style={{marginLeft: '220px', marginTop: '5px'}} onClick={(e) => authenticate(e)}>Продолжить</MyButton>
		</form>
	);
};

export default AuthorizationBlock;