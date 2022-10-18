import React from "react"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/user/userActions'

//import Error from '../components/Error'
import "../style/main.css"

const Login = () => {
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const submitForm = (data) => {
    console.log("submitForm: ", data)
    dispatch(userLogin(data))
  }

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon" />
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit(submitForm)}>
					<div className="input-wrapper">
						<label htmlFor="email">Username</label>
						<input type="email" {...register('email')} required/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" {...register('password')} required/>
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button type='submit' className="sign-in-button" disabled={loading}>
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
}

export default Login;
