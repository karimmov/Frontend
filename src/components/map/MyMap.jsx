import React, {useEffect, useState} from 'react';
import classes from "./Map.module.css";
import {Placemark, YMaps, Map} from "@pbe/react-yandex-maps";

const MyMap = ({onPlacemarkClick}) => {

	const [offices, setOffices] = useState([]);

	async function getOfficesGeo() {
		const url = 'http://176.124.192.224/api/Offices';
		const response = await fetch(url);
		setOffices(await response.json());
	}

	useEffect(() => {
		getOfficesGeo();
	}, [])

	function renderPlacemarks() {
		return offices.map((item) =>
			<Placemark geometry={[item.latitude, item.longitude]}
			           key={item.officeid}
			           properties={{
				           balloonContentBody:
				           item.officeaddress
				           }}
			           modules={["geoObject.addon.balloon"]}
			           onClick={() => onPlacemarkClick(item)}
			/>
		)
	}

	return (
		<div className={classes.mapWrapper}>
			<YMaps >
					<Map defaultState={{ center: [57.152988, 65.541228], zoom: 12 }} className={classes.map}>
						{renderPlacemarks()}
					</Map>
			</YMaps>
		</div>
	);
};

export default MyMap;