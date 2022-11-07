import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/user/userActions";
import { useNavigate } from "react-router-dom";
import { userClear, userSetRememberMe } from "../features/user/userSlice";
import ErrorModal from "../components/Modal/Modal";
import { LoaderWrapper, Loader } from "../utils/Atoms";
import "../style/main.css";

/**
 * Login is a React component that is used to login a user.

 * @returns a react form (useForm) with input and buttons to initate a login request from a user to server
 */
function Login() {
	const { loading, success, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();

	useEffect(() => {
		// redirect authenticated user to profile screen

		if (localStorage.getItem("userToken")) {
			sessionStorage.setItem("userToken", localStorage.getItem("userToken"));
			sessionStorage.setItem("connected", true);
			navigate("/profile");
		} else if (sessionStorage.getItem("userToken")) {
			sessionStorage.setItem("connected", true);
			navigate("/profile");
		} else if (success) {
			dispatch(userClear());
			navigate("/profile");
		}
	}, [success]);

	const submitForm = (data) => {
		if (data.checkbox) {
			dispatch(userSetRememberMe());
		}
		dispatch(userLogin(data));
		reset();
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon" />
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit(submitForm)}>
					{loading && (
						<LoaderWrapper>
							<Loader />
						</LoaderWrapper>
					)}
					{error && <ErrorModal />}
					<div className="input-wrapper">
						<label htmlFor="email">Username</label>
						<input type="email" {...register("email")} required />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" {...register("password")} required />
					</div>
					<div className="input-remember">
						<input type="checkbox" {...register("checkbox")} />
						<label htmlFor="checkbox">Remember me</label>
					</div>
					<button type="submit" className="sign-in-button" disabled={loading}>
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
}

export default Login;
