import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout, userResetRememberMe, userClearError } from "../../features/user/userSlice";
import "../../style/main.css";

Modal.setAppElement("#root");

const disconnectMsgs = [
	"NetworkError when attempting to fetch resource.",
	"Failed to fetch",
	"Error ! Requested page doesn't exist",
];

/**
 *  ErrorModal is a React component in charge of displaying error information in modal
 *  when a http request fails or the url page requested doesn't exist
 *
 *  @returns a div html with error information
 */
export default function ErrorModal() {
	const [isOpen, setIsOpen] = useState(true);
	const { error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Close Modal and disconnect if unauthorized error status or server not reachable
	function toggleModal() {
		setIsOpen(!isOpen);
		if (error.status === 401) {
			dispatch(userResetRememberMe());
			dispatch(userLogout());
			navigate("/");
		} else if (disconnectMsgs.includes(error)) {
			dispatch(userClearError());
			if (error !== "Error ! Requested page doesn't exist") {
				dispatch(userResetRememberMe());
				dispatch(userLogout());
			}
			navigate("/");
		}
	}

	// Error information can include or not status code
	function printError() {
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
