import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Name from "../components/Name/Name";
import Account from "../components/Account/Account";
import "../style/main.css";

/**
 * Profile is a function that returns a main element that contains a Name and an Account component.
 * @returns The Name and the Account components are being returned.
 */
function Profile() {
	const navigate = useNavigate();
	// useState used to toggle between display and edit themes (color)
	const [displayMode, setDisplayMode] = useState("normal");

	return (
		<main className={`main bg-dark-${displayMode}`}>
			<Name mode={displayMode} setMode={setDisplayMode} />
			<Account mode={displayMode} />
		</main>
	);
}

export default Profile;
