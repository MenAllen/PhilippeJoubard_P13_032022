import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { userLogout } from "../../features/user/userSlice"
import { useDispatch } from "react-redux"
import logo from "../../assets/argentBankLogo.png"
import "../../style/main.css"

/**
 *  Header is a React component in charge of displaying header part of all pages
 *  depending on the connected state, it will display specific navigation menu
 * 
 *  @returns a nav with navigation menu
 */
function Header() {
	const dispatch = useDispatch()

	// retrieve store data to know about user connexion
	const { firstName } = useSelector((state) => state.user)
	const connected = sessionStorage.getItem('connected')
	console.log("Header: ", firstName, connected)

	function Signout() {
		dispatch(userLogout())
	}

	// Header actions depend on user connection
	function headerActions() {
		if (connected)
			return (
				<div>
					<NavLink to="/profile" className="main-nav-item">
						<i className="fa fa-user-circle"/>{ ` ${firstName}` }
					</NavLink>
					<NavLink to="/" className="main-nav-item" onClick={Signout}>
						<i className="fa fa-sign-out"/> Sign Out
					</NavLink>
				</div>
			)
		return (
			<div>
				<NavLink to="/login" className="main-nav-item">
					<i className="fa fa-user-circle"/> Sign In
				</NavLink>
			</div>
		)
	}

	return (
		<nav className="main-nav">
			<NavLink to="/" className="main-nav-logo" >
				<img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</NavLink>
			{headerActions()}
		</nav>
	)
}

export default Header
