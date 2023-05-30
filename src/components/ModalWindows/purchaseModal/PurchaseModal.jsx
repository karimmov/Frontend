import React, {useContext, useEffect, useState} from 'react';
import classes from "./PurchaseModal.module.css";
import MyMap from "../../map/MyMap";
import InputField from "../../UI/inputField/InputField";
import {AnalyzesInCartContext, ModalWindowsContext} from "../../../context";
import MyButton from "../../UI/button/MyButton";

const PurchaseModal = ({isActive, setIsActive}) => {

	const [office, setOffice] = useState();
	const [date, setDate] = useState();
	const [buttonText, setButtonText] = useState('Заказать');
	const [isError, setIsError] = useState(false);
	const {analyzesInCart, setAnalyzesInCart} = useContext(AnalyzesInCartContext);
	const {messageModal} = useContext(ModalWindowsContext);


	async function makePurchase() {
		const token = sessionStorage.getItem('token');
		const url = 'http://176.124.192.224/api/Requests';
		const analyzesId = analyzesInCart.map(t => t.analysisid);
		let response;

		for (let item of analyzesId) {
			const request = {
				analysistype: item,
				office: office.officeid,
				date: date
			}
			response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(request),
				headers: {
					'Content-Type': 'application/json',
					"Authorization": "Bearer " + token
				}
			})
		}
		if (response.ok === true) {
			setIsActive(false);
			messageModal.setIsMessageModalActive(true);
			setAnalyzesInCart([]);
		}
	}

	useEffect(() => {
		if (date === undefined || office === undefined || date === '') {
			setIsError(true);
			setButtonText('Заполните поля');
		} else {
			setIsError(false);
			setButtonText('Заказать');
		}
	}, [date, office])


	return (
		<div className={isActive ? `${classes.modal} ${classes.active}` : `${classes.modal}`} onClick={() => setIsActive(false)}>
			<div className={classes.modalContent} onClick={e => e.stopPropagation()}>

				<div className={classes.title}>1) Выберите офис:</div>
				<MyMap onPlacemarkClick={setOffice}></MyMap>
				<InputField value={office ? office.officeaddress : ''} setValue={() => {}} style={{width: '350px', marginTop: '10px'}}></InputField>

				<div className={classes.title}>2) Выберите дату:</div>
				<InputField type={'date'} style={{width: '350px'}} value={date} setValue={setDate}></InputField>

				<MyButton errorMode={isError} style={{marginTop: '30px'}} onClick={() => makePurchase()}>{buttonText}</MyButton>
			</div>


		</div>
	);
};

export default PurchaseModal;