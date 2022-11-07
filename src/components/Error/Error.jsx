import React, { useEffect } from "react";
import styled from "styled-components";
import ErrorModal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { userSetError } from "../../features/user/userSlice";

const ErrorPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	font-size: 3rem;
	font-weight: 500;
	min-height: 80vh;
`;

/**
 *  Error is a React component in charge of displaying error message through modal
 *
 *  @returns a container modal with error message
 */
function Error() {
	const dispatch = useDispatch();

	// Launch Action: set the error to be displayed in modal
	useEffect(() => {
		dispatch(userSetError());
	}, []);

	return <ErrorPageContainer className="ErrorPageContainer">{<ErrorModal />}</ErrorPageContainer>;
}

export default Error;
