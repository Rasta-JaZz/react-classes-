import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { loadAllComments } from "../actionCreator";
import Comment from "../components/comments/comment";
import Loader from "./loader";
import { commentsPageIdsSelector } from "../selectors/index";
import "../components/comments/style.css";

class CommentsPagination extends Component {
	componentDidMount() {
		const { fetchData, page, total } = this.props;
		!total && fetchData && fetchData(page);
	}

	componentDidUpdate() {
		const { fetchData, page, total } = this.props;
		fetchData && fetchData(page);
	}

	render() {
		const { total } = this.props;
		if (!total) return <Loader />;
		return (
			<div>
				{this.getCommentsItem()}
				<nav aria-label="...">{this.getPage()}</nav>
			</div>
		);
	}

	getCommentsItem() {
		const { comments, loading } = this.props;
		if (loading || !comments)
			return (
				<div>
					<Loader />
				</div>
			);
		return (
			<TransitionGroup>
				{comments.ids.map((elem, index) => (
					<CSSTransition
						key={elem}
						timeout={{
							enter: 400,
							exit: 250,
						}}
						classNames="comment"
					>
						<li className="article-list__li">
							<Comment id={elem} commentIndex={index} />
						</li>
					</CSSTransition>
				))}
			</TransitionGroup>
		);
	}

	getPage() {
		const { total } = this.props;

		const items = new Array(Math.floor(total / 5) + 1)
			.fill()
			.map((_, i) => (
				<li className="page-item" key={i}>
					<NavLink className="page-link" to={`/comments/${i + 1}`}>
						{i + 1}
					</NavLink>
				</li>
			));
		return <ul className="pagination justify-content-center">{items}</ul>;
	}
}

export default connect(
	(state, props) => ({
		comments: commentsPageIdsSelector(state, props),
		loading: state.comments.loading,
		total: state.comments.total,
	}),
	{ fetchData: loadAllComments }
)(CommentsPagination);
