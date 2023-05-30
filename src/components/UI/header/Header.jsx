import React, {useContext} from 'react';
import './Header.css'
import MyButton from "../button/MyButton";
import {useNavigate} from "react-router-dom";
import AuthorizedFetch from "../../../API/AuthorizedFetch";
import {ModalWindowsContext} from "../../../context";

const Header = ({setIsLoginModalActive, viewMode}) => {

	const {cartModal} = useContext(ModalWindowsContext);

	const buttonStyle = {
		backgroundColor: '#ECECEC',
		color: '#2b839b',
		height: '36px',
		borderRadius: '2px',
		paddingBottom: '0px',
		textAlign: 'center',
		paddingTop: '0px',
		marginRight: '20px'
	}

	const navigation = useNavigate();

	async function onProfileButtonClick() {
		const isAuth = await AuthorizedFetch.checkIsAuthenticate();
		isAuth ? navigation('/profile') : setIsLoginModalActive(true);
	}

	return (
		<div className="header">
			<div className="container">
				<div className='header__logo-wrapper'>
					<div className="header__logo" onClick={() => navigation('/')}></div>
					<div className="header__name">A-LAB</div>
				</div>
				<div>
					<MyButton style={buttonStyle} onClick={() => cartModal.setIsCartModalActive(!cartModal.isCartModalActive)}>Корзина</MyButton>
					{viewMode === 'profile' ?
						<MyButton style={buttonStyle} onClick={() => navigation('/')}>На главную</MyButton> :
						<MyButton style={buttonStyle} onClick={() => onProfileButtonClick()}>Личный кабинет</MyButton>}
				</div>
			</div>
		</div>
	);
};

export default Header;