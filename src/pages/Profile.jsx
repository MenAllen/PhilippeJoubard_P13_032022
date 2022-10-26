import React, { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { userName, userProfile } from "../features/user/userActions"
import { userClear } from "../features/user/userSlice"
import { LoaderWrapper, Loader } from "../utils/Atoms"
import Modal from "../components/Modal/Modal"
import "../style/main.css"

function Profile() {
	const dispatch = useDispatch()
	const { register, reset, handleSubmit } = useForm()
	const { firstName, lastName, loading, success, error } = useSelector((state) => state.user)
	console.log("profile useSelector: ", loading, success, error)

	const editRef = useRef()
	const formRef = useRef()
	const dataProfile = {}

	// Launch Action: Profile request to server on first render and hide name
	useEffect(() => {
		console.log("Profile useEffect ", loading, success)
  	dispatch(userProfile(dataProfile))
	}, [])

	// Launch Action : Clear user state then Dispatch Name update request
	const submitForm = (dataName) => {
		console.log("submitForm: ", dataName, loading, success)
		dispatch(userClear())
		dispatch(userName(dataName))
	}

	// Display or Hide Edit Name buttons
	function toggleEditName(action) {
		console.log("toggleEditName: ", loading)
		if (!loading) {
			// Reset input values first
			reset({ firstName: "", lastName: "" })

			if (editRef.current.classList.contains("nodisplay")) {
        editRef.current.classList.remove("nodisplay")
				formRef.current.classList.add("nodisplay")
				return
			}
			editRef.current.classList.add("nodisplay")
			formRef.current.classList.remove("nodisplay")
		}
	}

	return (
		<main className="main bg-dark">
						{loading && (
							<LoaderWrapper>
								<Loader />
							</LoaderWrapper>
						)}
						{error && <Modal />}
				<div className="header">
				<h1>
					Welcome back
					<br />
					{firstName} {lastName} !
				</h1>
				<button className="edit-button" onClick={toggleEditName} ref={editRef}>
					Edit Name
				</button>
				<div className="update-name-container nodisplay" ref={formRef}>
					<form onSubmit={handleSubmit(submitForm)}>
						{error && <Modal />}
						<input
							className="input-name"
							placeholder={firstName}
							{...register("firstName")}
							required
						/>
						<input
							className="input-name"
							placeholder={lastName}
							{...register("lastName")}
							required
						/>
						<button type="submit" className="save-button">
							Save
						</button>
					</form>
					<button className="cancel-button" onClick={toggleEditName}>
						Cancel
					</button>
				</div>
			</div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	)
}

export default Profile
