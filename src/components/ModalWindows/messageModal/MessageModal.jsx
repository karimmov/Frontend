import React, {useContext} from 'react';
import classes from "./MessageModal.module.css";
import {ModalWindowsContext} from "../../../context";

const MessageModal = () => {

	const {messageModal} = useContext(ModalWindowsContext);
	const {isMessageModalActive: isActive, setIsMessageModalActive: setIsActive} = messageModal;


	return (
		<div className={isActive ? `${classes.modal} ${classes.active}` : `${classes.modal}`} onClick={() => setIsActive(false)}>
			<div className={classes.modalContent} onClick={e => e.stopPropagation()}>
				<div className={classes.wrapper}>
					<div className={classes.img}></div>
					<div className={classes.text}>Заказ успешно создан</div>
				</div>
			</div>
		</div>
	);
};

export default MessageModal;