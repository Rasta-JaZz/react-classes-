import React, { Component } from "react";
import Comment from "./comment";
import { loadArticleComments } from "../../actionCreator/index";
import toggleOpen from "../decorators/toggleOpen";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style.css";
import Input from "../input";
import Loader from "../loader";
import { connect } from "react-redux";

class CommentList extends Component {
	componentDidUpdate() {
		const {
			fetchData,
			articleId,
			isArticleLoaded,
			isLoaded,
			isOpen
		} = this.props;
		isOpen && !isLoaded && isArticleLoaded && fetchData(articleId);
		console.log("udating :>> ");
	}

	get comHeader() {
		const { toggleOpen, isOpen, articleId } = this.props;
		return (
			<div className="container">
				<div className="card-header ">
					<button
						className="btn btn-secondary btn-sm float-right"
						onClick={toggleOpen}
					>
						{isOpen ? "скрыть" : "показать"}
					</button>
					<h5>Коментарии</h5>
				</div>
				<div>
					<CSSTransition
						in={isOpen}
						timeout={750}
						classNames="comment"
						mountOnEnter
						unmountOnExit
					>
						<ul>
							<div>
								{!this.props.isLoaded ? (
									<Loader />
								) : (
									this.bodyCommentList
								)}

								<Input articleId={articleId} />
							</div>
						</ul>
					</CSSTransition>
				</div>
			</div>
		);
	}

	get bodyCommentList() {
		const { comments, articleId } = this.props;
		if (!comments) {
			return <p className="text-muted">Нет комментариев</p>;
		}
		return (
			<TransitionGroup>
				{comments.map((elem, index) => (
					<CSSTransition
						key={elem}
						timeout={550}
						classNames="comment"
					>
						<li className="article-list__li">
							<Comment
								id={elem}
								articleId={articleId}
								commentIndex={index}
							/>
						</li>
					</CSSTransition>
				))}
			</TransitionGroup>
		);
	}

	render() {
		return <div>{this.comHeader}</div>;
	}
}

const toggleOpenComList = toggleOpen(CommentList);

export default connect(
	(state, ownProps) => ({
		isLoaded: state.articles.entities[ownProps.articleId].commentsLoaded,
		isArticleLoaded: state.articles.entities[ownProps.articleId].loaded
	}),
	{
		fetchData: loadArticleComments
	}
)(toggleOpenComList);
