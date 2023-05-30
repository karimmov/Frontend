import React from 'react';
import classes from "../Table.module.css";

const ResultsRow = ({result}) => {

	function formatDate(date) {
		let year = date.substring(0,4);
		let month = date.substring(5, 7);
		let day = date.substring(8,10);
		return `${day}.${month}.${year}`;
	}

	return (
		<div className={`${classes.tableRow}`}>
			<div className={classes.column}>{formatDate(result.date)}</div>
			<div className={classes.column}>{result.analysistype}</div>
			<div className={classes.column}>{result.status}</div>
			<div className={classes.column}> - </div>
		</div>
	);
};

export default ResultsRow;