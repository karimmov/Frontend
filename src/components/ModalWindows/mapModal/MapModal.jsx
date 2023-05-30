import React, {useEffect, useState} from 'react';
import classes from "./MapModal.module.css";
import MyMap from "../../map/MyMap";


const MapModal = ({isActive, setIsActive}) => {

	return (
		<div className={isActive ? `${classes.modal} ${classes.active}` : `${classes.modal}`} onClick={() => setIsActive(false)}>
			<div className={classes.modalContent} onClick={e => e.stopPropagation()}>
				<div className={classes.title}>Наши офисы:</div>
				<MyMap onPlacemarkClick={() => {}}></MyMap>
			</div>
		</div>
	);
};

export default MapModal;