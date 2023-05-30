import React from 'react';
import classes from "./FilterContainer.module.css";

const FilterContainer = ({setIsModalActive, onPopularClick, onAllClick, inputProps}) => {

	return (
		<div className={classes.wrapper}>
			<div className={classes.selector}>
				<div className={classes.item} onClick={() => onAllClick()}>Все анализы</div>
				<div className={classes.item} onClick={() => onPopularClick()}>Популярные анализы</div>
				<div className={classes.item} onClick={() => setIsModalActive(true)}>Категории</div>
				<input className={classes.input} placeholder={'Поиск по анализам...'}
				       value={inputProps.searchQuery}
				       onChange={(e) => inputProps.setSearchQuery(e.target.value)}/>
			</div>
		</div>
	);
};

export default FilterContainer;