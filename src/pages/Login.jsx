import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/user/userActions";
import { useNavigate } from "react-router-dom";
import { userClear } from "../features/user/userSlice";
import Modal from "../components/Modal/Modal";
import { LoaderWrapper, Loader } from "../utils/Atoms";
import "../style/main.css";

function Login() {
	const { loading, success, error } = useSelector((state) => state.user);
	console.log("login useSelector: ", loading, success, error);
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	useEffect(() => {
		// redirect authenticated user to profile screen
		console.log("Login useEffect :", loading, success);
		if (success) {
      console.log("Login useEffect Navigate");
      dispatch(userClear())
      navigate("/profile");}
	}, [success]);

	const submitForm = (data) => {
    if (data.checkbox) {
					document.cookie=`email=${data.email};  SameSite=Strict`;
				}
		console.log("submitForm: ", data); 
		dispatch(userLogin(data));
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon" />
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit(submitForm)}>
          {loading && <LoaderWrapper><Loader /></LoaderWrapper>}
          {error && <Modal />}
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
