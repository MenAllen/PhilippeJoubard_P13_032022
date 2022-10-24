import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Modal.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ErrorModal() {
	const [isOpen, setIsOpen] = useState(true);
	const { loading, error } = useSelector((state) => state.user);

	function toggleModal() {
		setIsOpen(!isOpen);
	}

	function printError() {
		console.log("printError :", error);
		if (typeof error === "string") {
			return <div className="modalMessage">{error}</div>;
		}
		if (error) {
			return (
				<>
					<div className="modalMessage">{error.message}</div>
					<div className="modalStatus">{`Status ${error.status}`}</div>
				</>
			);
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
				{printError()}
				<button className="sign-in-button" onClick={toggleModal}>
					Close
				</button>
			</Modal>
		</div>
	);
}
