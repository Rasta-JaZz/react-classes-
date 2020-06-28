import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../actionCreator/index";

class Input extends Component {
	state = {
		user: "",
		text: ""
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.addComment(this.state);
		this.setState({
			user: "",
			text: ""
		});
	};

	handleChange = type => event => {
		const { value } = event.target;

		this.setState({
			[type]: value
		});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-row">
					<div className="col-3">
						<input
							onChange={this.handleChange("user")}
							value={this.state.user}
							type="text"
							className="form-control"
							placeholder="Имя"
						/>
					</div>
					<div className="col-7">
						<input
							onChange={this.handleChange("text")}
							value={this.state.text}
							type="text"
							className="form-control"
							placeholder="Комментарий"
						/>
					</div>
					<div className="col ">
						<button
							type="submit"
							className="btn btn-success float-right "
						>
							Добавить
						</button>
					</div>
				</div>
			</form>
		);
	}
}

export default connect(null, (dispatch, ownProps) => ({
	addComment: commentObject =>
		dispatch(addComment(commentObject, ownProps.articleId))
}))(Input);
