import React, {useEffect, useState} from 'react';
import InputField from "../UI/inputField/InputField";
import classes from "./clientData.module.css";
import MyButton from "../UI/button/MyButton";

const ClientData = ({client}) => {

	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [password, setPassword] = useState('');



	useEffect(() => {
		setName(client.name);
		setPhoneNumber(client.phoneNumber);
		setEmail(client.email);
		setBirthDate(client.birthDate);
		setPassword(client.password);
	}, [client])


	async function postClient() {
		const token = sessionStorage.getItem('token');
		const url = `http://176.124.192.224/api/Client/${client.id}`;
		const editedClient = {
			clientid: client.id,
			Clientname: name,
			Phonenumber: phoneNumber,
			Passwordhash: password,
			Email: email,
			BirthDate: birthDate
		};
		await fetch(url, {
			method: 'PUT',
			body: JSON.stringify(editedClient),
			headers: {
				'Content-Type': 'application/json',
				"Authorization": "Bearer " + token
			}
		});
	}

	return (
		<div className='clientData'>
			<div className={classes.title}>Личные данные</div>
			<div className={classes.inputFieldsContainer}>
				<div>
					<div className={classes.inputTitle}>Имя клиента</div>
					<InputField value={name} setValue={setName}></InputField>
				</div>
				<div>
					<div className={classes.inputTitle}>Номер телефона</div>
					<InputField value={phoneNumber} setValue={setPhoneNumber}></InputField>
				</div>
				<div>
					<div className={classes.inputTitle}>Email</div>
					<InputField   value={email} setValue={setEmail}></InputField>
				</div>
				<div>
					<div className={classes.inputTitle}>Дата рождения</div>
					<InputField value={birthDate} setValue={setBirthDate} type={'date'}></InputField>
				</div>
				<div>
					<div className={classes.inputTitle}>Пароль</div>
					<InputField value={password} setValue={setPassword} type={'password'}></InputField>
				</div>



				<div className={classes.buttonWrapper}>
					<MyButton style={{backgroundColor: '#a29c9c'}}>Отменить</MyButton>
					<MyButton onClick={() => postClient()}>Сохранить изменения</MyButton>
				</div>
			</div>

		</div>
	);
};

export default ClientData;