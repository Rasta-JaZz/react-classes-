import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actionCreator";

class Comment extends Component {
	render() {
		const { comment } = this.props;
		return (
			<div className="card m-2">
				<div className="card-body">
					<button
						onClick={this.handleDeleteComment}
						className=" float-right btn btn-outline-danger btn-sm"
					>
						&#10006;
					</button>
					{comment.text}
					<span className="blockquote-footer float-right text-muted mr-2">
						{" "}
						by {comment.user}
					</span>
				</div>
			</div>
		);
	}

	handleDeleteComment = () => {
		const { deleteComment, id, articleId, commentIndex } = this.props;
		deleteComment(id, articleId, commentIndex);
	};
}

export default connect(
	(state, ownProps) => ({
		comment: state.comments.entities[ownProps.id]
	}),
	{ deleteComment }
)(Comment);
