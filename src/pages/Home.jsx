import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import iconChat from "../assets/icon-chat.png";
import iconMoney from "../assets/icon-money.png";
import iconSecurity from "../assets/icon-security.png";
import "../style/main.css";

/**
 * Home is a function that returns a main Html that contains a Welcome page with ARGENT Bank information and capabilities
 *
 * @returns A React Fragment. Welcome page
 */
function Home() {
	const navigate = useNavigate();
	const { isLogged } = useSelector((state) => state.user);

	// redirect authenticated user to profile screen if not already connected
	useEffect(() => {
		// if userToken in localStorgae only, then reload state is needed
		if (localStorage.getItem("userToken") && !sessionStorage.getItem("userToken")) {
			sessionStorage.setItem("userToken", localStorage.getItem("userToken"));
			sessionStorage.setItem("connected", true);
			navigate("/profile");
			return;
		}
		// if state data present, then no reload needed
		if (isLogged) {
			navigate("/");
			return;
		}
		// else if useToken in storage, then reload state is needed
		if (sessionStorage.getItem("userToken")) {
			sessionStorage.setItem("connected", true);
			navigate("/profile");
		}
	}, []);

	return (
		<main>
			<div className="hero">
				<section className="hero-content">
					<h2 className="sr-only">Promoted Content</h2>
					<p className="subtitle">No fees.</p>
					<p className="subtitle">No minimum deposit.</p>
					<p className="subtitle">High interest rates.</p>
					<p className="text">Open a savings account with Argent Bank today!</p>
				</section>
			</div>
			<section className="features">
				<h2 className="sr-only">Features</h2>
				<div className="feature-item">
					<img src={iconChat} alt="Chat Icon" className="feature-icon" />
					<h3 className="feature-item-title">You are our #1 priority</h3>
					<p>
						Need to talk to a representative? You can get in touch through our 24/7 chat or through
						a phone call in less than 5 minutes.
					</p>
				</div>
				<div className="feature-item">
					<img src={iconMoney} alt="Chat Icon" className="feature-icon" />
					<h3 className="feature-item-title">More savings means higher rates</h3>
					<p>The more you save with us, the higher your interest rate will be!</p>
				</div>
				<div className="feature-item">
					<img src={iconSecurity} alt="Chat Icon" className="feature-icon" />
					<h3 className="feature-item-title">Security you can trust</h3>
					<p>We use top of the line encryption to make sure your data and money is always safe.</p>
				</div>
			</section>
		</main>
	);
}

export default Home;
