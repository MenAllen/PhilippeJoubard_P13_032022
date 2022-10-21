import React, { useState } from "react";
import "./errorModal.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ErrorModal({ status, message }) {
	const [isOpen, setIsOpen] = useState(true);

	function toggleModal() {
		setIsOpen(!isOpen);
	}

	function printStatus() {
		console.log("printStatus :", status);
		if (typeof status != "undefined") {
			return <div className="modalStatus">{`Status ${status}`}</div>;
		}
	}

	return (
		<div className="errorModal">
			<Modal
				isOpen={isOpen}
				onRequestClose={toggleModal}
				contentLabel="My dialog"
				className="mymodal"
				overlayClassName="myoverlay"
				closeTimeoutMS={200}>
				<div className="modalMessage">{message}</div>
				{printStatus()}
				<button className="sign-in-button" onClick={toggleModal}>
					Close
				</button>
			</Modal>
		</div>
	);
}
