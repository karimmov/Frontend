import React, {useContext, useEffect, useState} from 'react';
import classes from "./AnalysisBlock.module.css";
import MyButton from "../UI/button/MyButton";
import {AnalyzesInCartContext} from "../../context";

const AnalysisBlock = ({data}) => {

	const {analyzesInCart, setAnalyzesInCart} = useContext(AnalyzesInCartContext);
	const [buttonText, setButtonText] = useState('В корзину');
	const [isPressed, setIsPressed] = useState(false);
	const buttonStyle = {
		height: '30px',
		position: 'absolute',
		bottom: '10%',
		right: '30px',
	}

	useEffect(() => {
		let isInclude = false;
		for (let item of analyzesInCart) {
			if (data.analysisid === item.analysisid)
				isInclude = true;
		}
		if (isInclude) {
			setButtonText('Добавлено');
			setIsPressed(true);
		} else {
			setButtonText('В корзину');
			setIsPressed(false);
		}
	}, [analyzesInCart])


	return (
		<div className={classes.analysisBlock}>
			<div className={classes.title}>{data.analysistitle}</div>
			<div className={classes.duration}>{data.duration}</div>
			<div className={classes.price}>{data.price}₽</div>
			<MyButton pressedMode={isPressed} style={buttonStyle} onClick={() => setAnalyzesInCart([...analyzesInCart, data])}>{buttonText}</MyButton>
		</div>
	);
};

export default AnalysisBlock;