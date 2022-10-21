import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../features/user/userSlice";

//import Error from '../components/Error'
import "../style/main.css";

function Logout() {
	const { loading, success } = useSelector((state) => state.user);
	console.log("Signout useSelector: ", loading, success);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		console.log("useEffect Signout:", loading, success);
		dispatch(userLogout());
		navigate("/");
	}, []);

	return <main className="main bg-dark" />;
};

export default Logout;
