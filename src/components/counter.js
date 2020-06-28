import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increment } from "../actionCreator";

class counter extends Component {
	static propTypes = {
		number: PropTypes.number,
		increment: PropTypes.func
	};

	render() {
		const { number, handleIncrement } = this.props;
		return (
			<div>
				<h3>{number}</h3>
				<button
					onClick={handleIncrement}
					className="btn btn-outline-dark"
				>
					increment
				</button>
			</div>
		);
	}
}

const mapStateToProps = storeState => ({
	number: storeState.counter
});

const mapDispatchToProps = {
	handleIncrement: increment
};

export default connect(mapStateToProps, mapDispatchToProps)(counter);
