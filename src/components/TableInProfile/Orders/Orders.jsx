import React, {useEffect, useState} from 'react';
import classes from "../Table.module.css";
import OrdersRow from "./OrdersRow";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import resultsRow from "../Results/ResultsRow";


const Orders = () => {

	const [orders, setOrders] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	async function getAnalysisName(id) {
		const url = `http://176.124.192.224/api/GetAnalysisTypeById?id=${id}`;
		const response = await fetch(url);
		const analysis = await response.json();
		return analysis.analysistitle;
	}

	async function getOfficeName(id) {
		const url = `http://176.124.192.224/api/Offices/${id}`
		const response = await fetch(url);
		const name = await response.text();
		return name;
	}

	async function fillTableData() {
		let newArr = [];
		for (let item of orders) {
			const analysisName = await getAnalysisName(item.analysistype);
			const officeName = await getOfficeName(item.office)
			let newRow = {
				analysisName,
				officeName,
				date: item.receptiondate
			}
			newArr.push(newRow);
		}
		setTableData(newArr)
	}

	useEffect(() => {
		const url = "http://176.124.192.224/api/Requests";
		const token = sessionStorage.getItem('token');
		fetch(url, {
			headers: {
				"Authorization": "Bearer " + token
			}
		}).then(response => response.json()).then(result => {
			setOrders(result);
			setIsLoaded(true);
		});
	}, [])


	useEffect(() => {
		if (isLoaded) {
			fillTableData();
		}
	}, [isLoaded])


	return (
		<div className={classes.table}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow sx={{
							backgroundColor: '#c0bebe',
						}}>
							<TableCell>Название анализа</TableCell>
							<TableCell align="right">Адрес офиса</TableCell>
							<TableCell align="right">Дата записи</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map(row =>
							<TableRow key={`${row.analysisName} ${row.date}`}>
								<TableCell component="th" scope="row">
									{row.analysisName}
								</TableCell>
								<TableCell>{row.officeName}</TableCell>
								<TableCell align="right">{row.date}</TableCell>
							</TableRow>
							)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Orders;