import React, { Component } from "react";
import ArticleList from "../ArticleList";
import Article from "../article/Article";
import { Route } from "react-router-dom";

class ArticlesPage extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-3">
					<ArticleList />
				</div>
				<div className="col-9">
					<Route
						path="/articles/:id"
						render={this.getArticle}
					></Route>
				</div>
			</div>
		);
	}
	getArticle = ({ match }) => {
		console.log("match :>> ", match);
		return <Article id={match.params.id} key={match.params.id} />;
	};
}

export default ArticlesPage;
