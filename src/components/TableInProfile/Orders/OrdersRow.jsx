import React, {useEffect, useState} from 'react';
import classes from "../Table.module.css";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

const OrdersRow = ({order, style}) => {

	const [analysisName, setAnalysisName] = useState('');
	const [officeName, setOfficeName] = useState('');

	function formatDate(date) {
		let year = date.substring(0,4);
		let month = date.substring(5, 7);
		let day = date.substring(8,10);
		return `${day}.${month}.${year}`;
	}



	useEffect(() => {
		async function getAnalysisName() {
			const url = `http://176.124.192.224/api/GetAnalysisTypeById?id=${order.analysistype}`;
			const response = await fetch(url);
			const analysis = await response.json();
			setAnalysisName(analysis.analysistitle);
		}
		async function getOfficeName() {
			const url = `http://176.124.192.224/api/Offices/${order.office}`
			const response = await fetch(url);
			const name = await response.text();
			setOfficeName(name);
		}
		getAnalysisName();
		getOfficeName();
	}, [])

	return (
		<div className={`${classes.tableRow}` } style={style}>
			<div className={classes.column}>{analysisName}</div>
			<div className={classes.column}>{officeName}</div>
			<div className={classes.column}>{formatDate(order.receptiondate)}</div>
		</div>
	);
};

export default OrdersRow;