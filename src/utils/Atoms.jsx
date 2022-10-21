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
	display: flex;
	justify-content: center;
	padding-bottom: 20px;
	padding-top: 20px;
	position: absolute;
	top: 0;
	right: 10%;
	z-index: 10;
`;

export const Loader = styled.div`
	padding: 10px;
	border: 6px solid black;
	border-bottom-color: transparent;
	border-radius: 22px;
	animation: ${rotate} 1s infinite linear;
	height: 0;
	width: 0;
`;
