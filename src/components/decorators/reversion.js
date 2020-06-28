import React, { Component } from "react";

export default Original =>
	class reversion extends Component {
		state = {
			reverted: false
		};

		handleReverse = () =>
			this.setState(state => ({
				reverted: !state.reverted
			}));

		render() {
			return (
				<Original
					{...this.props}
					{...this.state}
					handleReverse={this.handleReverse}
				/>
			);
		}
	};
