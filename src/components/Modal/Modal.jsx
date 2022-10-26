import React, { useState } from "react"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { userLogout, userResetRememberMe } from "../../features/user/userSlice"
import "./Modal.css"

Modal.setAppElement("#root")

export default function ErrorModal() {
	const dispatch = useDispatch()
	const [isOpen, setIsOpen] = useState(true)
	const { error } = useSelector((state) => state.user)
	const navigate = useNavigate()

	// Close Modal and disconnect if unauthorized error status or server not reachable
	function toggleModal() {
		console.log("toggleModal ", isOpen)
		setIsOpen(!isOpen);
		if ((error.status === 401)  || (error === "NetworkError when attempting to fetch resource.") || (error === "Error ! Requested page doesn't exist")) {
			localStorage.removeItem("userToken"); // deletes token from storage
			dispatch(userResetRememberMe())
			dispatch(userLogout());
			navigate("/");
		}
	}

	function printError() {
		console.log("printError :", error, isOpen);
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
