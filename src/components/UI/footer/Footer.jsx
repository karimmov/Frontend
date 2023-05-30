import React, {useState} from 'react';
import classes from "./Footer.module.css";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ModalWindowsContext} from "../../../context";

const Footer = () => {

	const navigate = useNavigate();
	const {mapModal} = useContext(ModalWindowsContext);
	return (
		<div className={classes.footer}>

			<div className={classes.container}>
				<div className={classes.footer__info}>
					<div className={classes.infoItem} onClick={() => mapModal.setIsMapModalActive(true)}>Адреса</div>
					<div className={classes.infoItem}>Контакты</div>
					<div className={classes.infoItem} onClick={() => navigate('/about-us')}>О нас</div>
				</div>
				<div className={`${classes.footer__tel} ${classes.infoItem}`}>8 888 888 88 88</div>
			</div>
		</div>
	);
};

export default Footer;