import React, { Component } from "react";

export default OriginalComponent =>
	class toggleOpen extends Component {
		state = {
			isOpen: false
		};

		toggleOpen = () =>
			this.setState(state => ({
				isOpen: !state.isOpen
			}));

		render() {
			return (
				<OriginalComponent
					{...this.state}
					{...this.props}
					toggleOpen={this.toggleOpen}
				/>
			);
		}
	};
