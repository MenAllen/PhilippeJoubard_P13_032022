import React from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"

function Error() {
	const ErrorPageContainer = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 3rem;
		font-weight: 500;
		min-height: 80vh;
	`;

	return (
		<ErrorPageContainer>
			<h2>Error !</h2>
			<p>
				Requested page doesn't exist
			</p>
			<Link to="/" style={{ color: "#ff6060", fontSize: "2rem" }}>
				<h3>Back to Home page</h3>
			</Link>
		</ErrorPageContainer>
	);
}

export default Error;