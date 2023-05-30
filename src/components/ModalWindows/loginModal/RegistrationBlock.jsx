import React, {useState} from 'react';
import classes from "./LoginModal.module.css";
import MyButton from "../../UI/button/MyButton";
import {useNavigate} from "react-router-dom";

const RegistrationBlock = () => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegSuccess, setIsRegSuccess] = useState(true);
	const [errorText, setErrorText] = useState('');
	const nav = useNavigate();

	async function authenticate() {
		let requestURL = `http://176.124.192.224/api/authenticate?username=${email}&password=${password}`;
		const response = await fetch(requestURL, {
			method: "POST"
		});
		if (response.ok === true) {
			console.log(await response);
			let data = await response.json();
			sessionStorage.setItem('token', data.access_token);
			nav('/profile');
		}
		else {
			console.log("Error: ", response.status);
		}
	}

	async function register(e) {
		e.preventDefault();
		if (firstName === '' || lastName === '' || email === '' || password === '') {
			setIsRegSuccess(false);
			setErrorText('Заполните поля');
			return;
		}
		const url = `http://176.124.192.224/api/Client?name=${firstName} ${lastName}&email=${email}&password=${password}`;
		const response = await fetch(url, {
			method: "POST"
		});
		if (response.ok === true) {
			authenticate();
		} else {
			setErrorText('Пользователь с таким email уже существует');
			setIsRegSuccess(false);
		}
	}

	return (
		<form className={classes.inputsContainer}>
			<div className={classes.wrapper}>
				<div className={classes.inputTitle}>Фамилия</div>
				<input className={classes.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"/>
			</div>
			<div className={classes.wrapper}>
				<div className={classes.inputTitle}>Имя</div>
				<input className={classes.input} value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"/>
			</div>
			<div className={classes.wrapper}>
				<div className={classes.inputTitle}>Email</div>
				<input className={classes.input} value={email} onChange={(e) => setEmail(e.target.value)} type="email"/>
			</div>
			<div className={classes.wrapper}>
				<div className={classes.inputTitle}>Пароль</div>
				<input className={classes.input} value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
			</div>
			<div className={isRegSuccess ? `${classes.error}` : `${classes.error} ${classes.errorActive}`}>{errorText}</div>
			<MyButton onClick={(e) => register(e)} style={{marginLeft: '220px', marginTop: '5px'}}>Продолжить</MyButton>
		</form>
	);
};

export default RegistrationBlock;