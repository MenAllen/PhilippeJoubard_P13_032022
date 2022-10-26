import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
	background-color: transparent;
	display: flex;
	justify-content: center;
	padding-bottom: 10px;
	padding-top: 10px;
	position: fixed;
	top: 0;
	right: 50%;
	z-index: 10;
`;

export const Loader = styled.div`
	background-color: transparent;
	padding: 10px;
	border: 6px solid black;
	border-bottom-color: transparent;
	border-radius: 22px;
	animation: ${rotate} 1s infinite linear;
	height: 0;
	width: 0;
`;
