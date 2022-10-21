import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userProfile, userName } from "../features/user/userActions";
import { LoaderWrapper, Loader } from "../utils/Atoms";
import ErrorModal from "../components/Error/ErrorModal";
import "../style/main.css";

function Profile() {
	const dispatch = useDispatch();
	const { loading, action, success, userInfo, error } = useSelector((state) => state.user);
	const [sendRequest, setSendRequest] = useState(false);
	const { register, reset, handleSubmit } = useForm();

	const editRef = useRef();
	const formRef = useRef();
	const dataProfile = {};

	// Launch profile request to server
	useEffect(() => {
		console.log("Profile useEffect ", sendRequest, loading);
		if (!loading && !sendRequest){
			dispatch(userProfile(dataProfile));
      setSendRequest(true);
		}
	}, []);

	// Display or Hide Edit Name buttons
	function toggleEditName() {

    // Reset input values first
    reset({firstName: "", lastName: ""})

		if (editRef.current.classList.contains("nodisplay")) {
			editRef.current.classList.remove("nodisplay");
			formRef.current.classList.add("nodisplay");
			return;
		}
		editRef.current.classList.add("nodisplay");
		formRef.current.classList.remove("nodisplay");
	}

	// Dispatch Name update request
	const submitForm = (dataName) => {
		console.log("submitForm: ", dataName);
		dispatch(userName(dataName));
    reset({firstName: "", lastName: ""})
    toggleEditName()
	};

  // Display Error received from API can be string or object
	const errorDisplay = () => {
		if (typeof error === "string") {
			return <ErrorModal message={error} />;
		}
		if (error) {
			return <ErrorModal status={error.status} message={error.message} />;
		}
	};

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{userInfo.firstName} !
				</h1>
				<button className="edit-button" onClick={toggleEditName} ref={editRef}>
					Edit Name
				</button>
				<div className="update-name-container nodisplay" ref={formRef}>
					<form onSubmit={handleSubmit(submitForm)}>
          {loading && <LoaderWrapper><Loader /></LoaderWrapper>}
          {errorDisplay()}
						<input
							className="input-name"
							placeholder={userInfo.firstName}
							{...register("firstName")}
              required
						/>
						<input
							className="input-name"
							placeholder={userInfo.lastName}
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
	);
}

export default Profile;
