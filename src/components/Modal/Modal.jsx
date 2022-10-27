import React, { useState } from "react"
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { userLogout, userResetRememberMe } from "../../features/user/userSlice"
import "./Modal.css"

Modal.setAppElement("#root")

const disconnectMsgs = [
  "NetworkError when attempting to fetch resource.",
  "Failed to fetch",
  "Error ! Requested page doesn't exist"
]

export default function ErrorModal() {
	const [isOpen, setIsOpen] = useState(true)
	const { error } = useSelector((state) => state.user)
	const dispatch = useDispatch()
  const navigate = useNavigate();

	// Close Modal and disconnect if unauthorized error status or server not reachable
	function toggleModal() {
		console.log("toggleModal ", isOpen)
		setIsOpen(!isOpen)
		if ((error.status === 401) || (disconnectMsgs.includes(error))) {
			console.log("CheckDisconnect activated")
			localStorage.removeItem("userToken") // deletes token from storage
			dispatch(userResetRememberMe())
			dispatch(userLogout())
			navigate("/")
		}
	}

	function printError() {
		console.log("printError :", error, isOpen)
		if (typeof error === "string") {
			return <div className="modalMessage">{error}</div>
		}
		if (error) {
			return (
				<>
					<div className="modalMessage">{error.message}</div>
					<div className="modalStatus">{`Status ${error.status}`}</div>
				</>
			)
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
	)
}
