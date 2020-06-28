import React, { PureComponent } from "react";
import CommentList from "../comments/commentList";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import { deleteArticle, loadArticleById } from "../../actionCreator/index";
import { connect } from "react-redux";
import Loader from "../loader";

class Article extends PureComponent {
	componentDidMount() {
		const { id, loadArticleById, article } = this.props;
		console.log("updating :>> ");

		if (!article || !article.text) loadArticleById(id);
	}

	render() {
		const { article } = this.props;

		if (!article) {
			return <Loader />;
		}
		return (
			<div className="card mb-3 ">
				<div className="card-header ">
					<h3>{article.title}</h3>
				</div>
				<div className="card-body  ">
					<h6 className="card-subtitle text-muted">
						дата создания :{" "}
						{new Date(article.date).toLocaleDateString()}
					</h6>
					<div>{this.body}</div>
				</div>
			</div>
		);
	}

	get body() {
		const { article } = this.props;
		return (
			<div>
				{!article.loaded ? (
					<Loader />
				) : (
					<CSSTransition
						in={article.loaded}
						classNames="article__text"
						timeout={500}
						mountOnEnter
						unmountOnExit
					>
						<section className="card-text">
							<button
								className="btn btn-outline-danger btn-sm float-right"
								onClick={this.handleDelete}
							>
								&#10006;
							</button>
							{article.text}
						</section>
					</CSSTransition>
				)}
				<CommentList
					comments={article.comments}
					articleId={article.id}
				/>{" "}
			</div>
		);
	}

	handleDelete = () => {
		const { article, deleteArticle } = this.props;
		deleteArticle(article.id);
	};
}
export default connect(
	(state, ownProps) => ({
		article: state.articles.entities[ownProps.id]
	}),
	{ deleteArticle, loadArticleById }
)(Article);
