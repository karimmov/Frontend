import React, {useEffect, useState} from 'react';
import classes from "../Table.module.css";
import ResultsRow from "./ResultsRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

const Results = () => {

	const [results, setResults] = useState([]);

	async function getResults() {
		const url = "http://176.124.192.224/api/AnalysisResults";
		const token = sessionStorage.getItem('token');
		const response = await fetch(url, {
			headers: {
				"Authorization": "Bearer " + token
			}
		})
		const json = await response.json();
		setResults(json);
	}

	useEffect(() => {
		getResults();
	}, [])

	function resultsRender() {
		if (results.length === 0)
			return <div className={classes.empty}>Пока вы не сделали ни одного заказа</div>
		return (
			results.map((item) =>
				<ResultsRow key={item.id} result={item}></ResultsRow>
			)
		);
	}

	return (
		<div className={classes.table}>
			{/*<div className={`${classes.tableRow} ${classes.header}`} style={{gridTemplateColumns: '1fr 4fr 1.5fr 1.5fr'}}>*/}
			{/*	<div className={`${classes.column}`}>Дата</div>*/}
			{/*	<div className={`${classes.column}`}>Название</div>*/}
			{/*	<div className={`${classes.column}`}>Статус</div>*/}
			{/*	<div className={`${classes.column}`}>Срок выполнения</div>*/}
			{/*</div>*/}
			{/*{resultsRender()}*/}
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow sx={{
							backgroundColor: '#c0bebe',
						}}>
							<TableCell>Дата</TableCell>
							<TableCell align="right">Название анализа</TableCell>
							<TableCell align="right">Статус</TableCell>
							<TableCell align="right">Срок выполнения</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Results;