import React, {useEffect, useState} from 'react';
import Header from "../components/UI/header/Header";
import Footer from "../components/UI/footer/Footer";
import '../styles/style.css';
import {Navigate, Route, Routes} from "react-router-dom";
import ProfileNav from "../components/ProfileNav/ProfileNav";
import ClientData from "../components/clientData/ClientData";
import Results from "../components/TableInProfile/Results/Results";
import Orders from "../components/TableInProfile/Orders/Orders";

const Profile = () => {

	const viewModeList = {
		orders: 1,
		results: 2,
		personal: 3
	}

	function Client(id, name, phoneNumber, email, password, birthDate) {
		this.id = id;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.password = password;
		this.birthDate = birthDate;
	}

	const [client, setClient] = useState({});

	useEffect(() => {
		async function getClientInfo() {
			const token = sessionStorage.getItem('token');
			const url = 'http://176.124.192.224/api/Client';
			const response = await fetch(url, {
				headers: {
					"Authorization": "Bearer " + token
				}
			})
			const json = await response.json();
			setClient(new Client(json.Clientid, json.Clientname, json.Phonenumber, json.Email, json.Passwordhash, json.BirthDate));
		}
		getClientInfo();
	}, []);


	const [viewMode, setViewMode] = useState(viewModeList.results)
	return (
		<div className='profile'>
			<div className="content">
				<Header viewMode={'profile'}></Header>
				<ProfileNav mode={viewMode} setMode={setViewMode} modeList={viewModeList}></ProfileNav>
				<div className="container" style={{width: '1200px'}}>
					<div className="clientName" style={{fontSize: '28px', padding: '30px 0'}}>{client.name}</div>
					<Routes>
						<Route path={'/results'} element={<Results client={client}></Results>}/>
						<Route path={'/personal'} element={<ClientData client={client}></ClientData>}/>
						<Route path={'/orders'} element={<Orders></Orders>}/>
						<Route
							path="*"
							element={<Navigate to="/profile/results" replace />}
						/>
					</Routes>
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
};

export default Profile;