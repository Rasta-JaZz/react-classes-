import React, { Component } from "react";
import reversion from "./decorators/reversion";
const style = {
	fontSize: "30px",
	marginLeft: "10px"
};

class Header extends Component {
	render() {
		const { reverted, handleReverse } = this.props;
		return (
			<div className="jumbotron">
				<h1 className="display-4">
					React App
					<button style={style} onClick={handleReverse}>
						{reverted ? (
							<span>&#11014;</span>
						) : (
							<span>&#11015;</span>
						)}
					</button>
				</h1>
			</div>
		);
	}
}

export default reversion(Header);
