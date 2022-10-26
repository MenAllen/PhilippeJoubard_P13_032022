import React, { useEffect } from "react"
import styled from "styled-components"
import Modal from "../Modal/Modal"
import { useDispatch } from "react-redux"
import { userSetError } from "../../features/user/userSlice";

const ErrorPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	font-size: 3rem;
	font-weight: 500;
	min-height: 80vh;
`;

function Error() {
	const dispatch = useDispatch()

	// Launch Action: set the error to be displayed in modal
	useEffect(() => {
		console.log("Error useEffect ")
		dispatch(userSetError())
	}, [])

	return <ErrorPageContainer className="ErrorPageContainer">{<Modal />}</ErrorPageContainer>
}

export default Error
