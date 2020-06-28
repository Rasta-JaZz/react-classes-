import React, { Component } from "react";
import Loader from "../loader";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import "./style.css";
import { filtratedArticles, articleLoadedSelector } from "../../selectors";
import { loadAllArticles } from "../../actionCreator/index";
import { NavLink } from "react-router-dom";

class ArticleList extends Component {
	static propTypes = {
		articles: PropTypes.array.isRequired
	};

	render() {
		if (!this.props.loaded) return <Loader />;
		return <ul className="list-group d-inline-block">{this.body}</ul>;
	}

	get body() {
		const { articles } = this.props;

		return articles.map(elem => (
			<li key={elem.id} className="list-group-item ">
				<NavLink
					to={`/articles/${elem.id}`}
					style={{ textDecoration: "none" }}
					activeStyle={{ color: "red" }}
				>
					{elem.title}
				</NavLink>
			</li>
		));
	}

	componentDidMount() {
		const { loaded, fetchData } = this.props;
		!loaded && fetchData && fetchData();
	}
}

export default connect(
	state => {
		return {
			loaded: articleLoadedSelector(state),
			articles: filtratedArticles(state)
		};
	},
	{ fetchData: loadAllArticles }
)(ArticleList);
