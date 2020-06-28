import React, { Component } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";
import CommentsPagination from "../commentsPagination";

export default function ({ match }) {
	return match.isExact ? (
		<Redirect to="/comments/1" />
	) : (
		<Route path="/comments/:page" render={getCommentsList} />
	);

	function getCommentsList({ match }) {
		return <CommentsPagination page={match.params.page} />;
	}
}
