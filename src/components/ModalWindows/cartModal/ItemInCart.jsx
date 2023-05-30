import React from 'react';
import classes from "./ItemInCart.module.css";

const ItemInCart = ({item, onDelete}) => {
	return (
		<div className={classes.itemInCart}>
			<div className={classes.title}>{item.analysistitle}</div>
			<div className={classes.price}>{item.price}₽</div>
			<div className={classes.delete} onClick={() => onDelete(item)}></div>
		</div>
	);
};

export default ItemInCart;