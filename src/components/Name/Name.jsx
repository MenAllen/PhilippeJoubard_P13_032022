import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userName, userProfile } from "../../features/user/userActions";
import { userClear } from "../../features/user/userSlice";
import { LoaderWrapper, Loader } from "../../utils/Atoms";
import ErrorModal from "../Modal/Modal";
import "../../style/main.css";

/**
 *  Name is a React component in charge of displaying name modification menu
 *  and sending http put request to server
 *
 *  @returns a div html with react-hook-form useForm
 */
function Name({ mode, setMode }) {
	const dispatch = useDispatch();
	const { register, reset, handleSubmit } = useForm();
	const { firstName, lastName, loading, error, isLogged } = useSelector((state) => state.user);

	const editRef = useRef();
	const formRef = useRef();
	const dataProfile = {};

	// Launch Action: Profile request to server on first render
	useEffect(() => {
		console.log('profileUseEffect: ', isLogged)
		if (!isLogged) {
			if (sessionStorage.getItem("userToken")) {
				dispatch(userProfile(dataProfile));	
			} else if (localStorage.getItem("userToken")) {
				sessionStorage.setItem("userToken", localStorage.getItem("userToken"));
				sessionStorage.setItem("connected", true);
				dispatch(userProfile(dataProfile));
			}	
		}
	}, []);

	// Update input default values to avoid re-typing
	useEffect(() => {
		const defaultValues = {};
		defaultValues.firstName = firstName;
		defaultValues.lastName = lastName;
		reset({ ...defaultValues });
	}, [loading]);

	// Check if name different not to send request for no use
	const differentName = (name) => {
		if (name.firstName === firstName && name.lastName === lastName) {
			return false;
		}
		return true;
	};

	// Launch Action : Clear user state then Dispatch Name update request
	const submitForm = (dataName) => {
		if (differentName(dataName)) {
			dispatch(userClear());
			dispatch(userName(dataName));
		}
		toggleEditName();
	};

	// Edit Name button
	function toggleEditName() {
		if (!loading) {
			if (editRef.current.classList.contains("nodisplay")) {
				setMode("normal");
				editRef.current.classList.remove("nodisplay");
				formRef.current.classList.add("nodisplay");
				return;
			}
			setMode("edit");
			editRef.current.classList.add("nodisplay");
			formRef.current.classList.remove("nodisplay");
		}
	}

	return (
		<div className="header">
			{loading && (
				<LoaderWrapper>
					<Loader />
				</LoaderWrapper>
			)}
			{error && <ErrorModal />}
			<h1 className={`welcome-${mode}`}>Welcome back</h1>
			<h1 className={`name-${mode}`}>
				{firstName} {lastName} !
			</h1>
			<button className="edit-button" onClick={toggleEditName} ref={editRef}>
				Edit Name
			</button>
			<div className="update-name-container nodisplay" ref={formRef}>
				<form onSubmit={handleSubmit(submitForm)}>
					<div>
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
					</div>
					<div>
						<button type="submit" className="save-button">
							Save
						</button>
						<button type="button" className="cancel-button" onClick={toggleEditName}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Name;
