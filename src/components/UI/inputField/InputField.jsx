import React from 'react';
import classes from './InputField.module.css'

const InputField = ({value, setValue, title, type, style}) => {
	return (
		<div className={classes.inputField} style={style}>
			<div className={classes.inputTitle}>{title}</div>
			<input className={classes.input} value={value} type={type} onChange={(e) => setValue(e.target.value)}/>
		</div>
	);
};

export default InputField;