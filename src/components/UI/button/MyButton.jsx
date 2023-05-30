import React from 'react';
import classes from './MyButton.module.css'

const MyButton = ({children, style, onClick, errorMode, pressedMode}) => {

	function modeRender() {
		if (errorMode === true) return `${classes.error}`;
		if (pressedMode === true) return `${classes.pressed}`;
		return `${classes.myButton}`
	}

	return (
		<button style={style} className={modeRender()} onClick={pressedMode || errorMode ? () => {} : onClick}>
			{children}
		</button>
	);
};

export default MyButton;