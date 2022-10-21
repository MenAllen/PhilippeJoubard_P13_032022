import React from "react"
import styled from "styled-components"

const ErrorWrapper = styled.div`
	margin: 30px;
	display: flex;
	flex-direction: column;
	background-color: #fbfbfb;
	align-items: center;
`;

const ErrorTitle = styled.h1`
	color: #000000;
	font-weight: 300;
`;

function Error() {

	return (
		<ErrorWrapper>
			<ErrorTitle>Oups...Il semblerait que la page que vous cherchez n’existe pas</ErrorTitle>
		</ErrorWrapper>
	);
}

export default Error;
