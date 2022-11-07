import React from "react";
import propTypes from "prop-types";
import "../../style/main.css";

/**
 *  Account is a React component in charge of displaying bank accounts data for a user.
 *
 *  @prop {string} mode can be one of 'normal' for page display, or 'edit' when editing name
 
 *  @returns 3 html sections
 */
function Account({ mode }) {
	return (
		<>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className={`transaction-button transaction-button-${mode}`}>
						View transactions
					</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className={`transaction-button transaction-button-${mode}`}>
						View transactions
					</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className={`transaction-button transaction-button-${mode}`}>
						View transactions
					</button>
				</div>
			</section>
		</>
	);
}

Account.propTypes = {
	mode: propTypes.string.isRequired,
};

export default Account;
