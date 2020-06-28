import React, { Component } from "react";
import ArticleList from "../components/routes/articlesPage";
import CommentsPage from "./routes/commentsPage";
import "bootstrap/dist/css/bootstrap.css";
import "react-day-picker/lib/style.css";
import RangeDayPiker from "../components/dayPiker";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1 className="display-4">React App</h1>
				</div>
				<nav className="nav nav-pills flex-column flex-sm-row m-3">
					<div>
						<NavLink
							to="/calendar"
							activeClassName="flex-sm-fill text-sm-center nav-link active"
							className="flex-sm-fill text-sm-center nav-link"
						>
							Календарь
						</NavLink>
					</div>
					<div>
						<NavLink
							to="/articles"
							className="flex-sm-fill text-sm-center nav-link"
						>
							Статьи
						</NavLink>
					</div>
					<div>
						<NavLink
							to="/comments"
							className="flex-sm-fill text-sm-center nav-link"
						>
							Комментарии
						</NavLink>
					</div>
				</nav>
				<Route path="/calendar" component={RangeDayPiker} />
				<Route path="/articles" component={ArticleList} />
				<Route path="/comments" component={CommentsPage} />
			</div>
		);
	}
}

export default App;
