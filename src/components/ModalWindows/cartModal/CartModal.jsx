import React, {useContext, useState} from 'react';
import classes from "./CartModal.module.css";
import ItemInCart from "./ItemInCart";
import MyButton from "../../UI/button/MyButton";
import AuthorizedFetch from "../../../API/AuthorizedFetch";
import {AnalyzesInCartContext, ModalWindowsContext, PurchaseModalContext} from "../../../context";
import MessageModal from "../messageModal/MessageModal";

const CartModal = () => {

	const [isError, setIsError] = useState(false);
	const [buttonText, setButtonText] = useState('Оформить заказ');
	const {cartModal, purchaseModal} = useContext(ModalWindowsContext);
	const {analyzesInCart, setAnalyzesInCart} = useContext(AnalyzesInCartContext);

	function onDelete(removedItem) {
		setAnalyzesInCart(analyzesInCart.filter(item => item.analysisid !== removedItem.analysisid));
	}

	function checkIsActive() {
		if (cartModal.isCartModalActive === false) return `${classes.modalCart}`;
		return `${classes.active} ${classes.modalCart}`;
	}

	function getAmountPrice(analyzes) {
		let sum = 0;
		for (let item of analyzes) {
			sum += item.price;
		}
		return sum;
	}

	async function makePurchase() {
		if (!await AuthorizedFetch.checkIsAuthenticate())
		{
			showError();
			return;
		}
		purchaseModal.setIsPurchaseModalActive(true);
	}

	function showError() {
		setIsError(true);
		setButtonText('Авторизуйтесь')
		setTimeout(() => {
			setIsError(false);
			setButtonText('Оформить заказ')
		}, 5000)
	}

	function renderAnalyzes() {
		if (analyzesInCart.length == 0) return <div className={classes.emptyCaption}>Корзина пуста :(</div>
		return analyzesInCart.map(analysis =>
			<ItemInCart key={analysis.analysisid} item={analysis} onDelete={onDelete}></ItemInCart>)
	}

	return (
		<div className={checkIsActive()}>
			<div className={classes.list}>
				{renderAnalyzes()}
			</div>
			<div className={classes.bottomWrapper}>
				<div className={classes.amount}>Итого: {getAmountPrice(analyzesInCart)}₽</div>
				<MyButton style={{width:'180px', height: '35px'}} onClick={makePurchase} errorMode={isError}>{buttonText}</MyButton>
			</div>

		</div>
	);
};

export default CartModal;