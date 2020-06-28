import {
	INCREMENT,
	DELETE_ARTICLE_FROM_ID,
	CHANGE_DATE_RANGE,
	ADD_COMMENT,
	DELETE_COMMENT,
	LOAD_ALL_ARTICLES,
	LOAD_ARTICLE,
	LOAD_ARTICLE_COMMENTS,
	START,
	SUCCESS,
	FAIL,
	LOAD_ALL_COMMENTS
} from "../constants";

export function increment() {
	return {
		type: INCREMENT
	};
}

export function deleteArticle(id) {
	return {
		type: DELETE_ARTICLE_FROM_ID,
		payload: { id }
	};
}

export function changeFilters(dateRange) {
	return {
		type: CHANGE_DATE_RANGE,
		payload: { dateRange }
	};
}

export function addComment(commentObject, articleId) {
	return {
		type: ADD_COMMENT,
		payload: { commentObject, articleId },
		generateId: true
	};
}

export function deleteComment(id, articleId, commentIndex) {
	return {
		type: DELETE_COMMENT,
		payload: { id, articleId, commentIndex }
	};
}

export function loadAllArticles() {
	return {
		type: LOAD_ALL_ARTICLES,
		callAPI: "/api/article/"
	};
}

export function loadArticleById(id) {
	return dispatch => {
		dispatch({
			type: LOAD_ARTICLE + START,
			payload: { id }
		});

		// setTimeout(() => {
		fetch(`/api/article/${id}`)
			.then(res => res.json())
			.then(response =>
				dispatch({
					type: LOAD_ARTICLE + SUCCESS,
					payload: { id },
					response
				})
			)
			.catch(error => {
				dispatch({
					type: LOAD_ARTICLE + FAIL,
					payload: { id },
					error
				});
			});
		// }, 2000);
	};
}

export function loadArticleComments(articleId) {
	return {
		type: LOAD_ARTICLE_COMMENTS,
		callAPI: `/api/comment?article=${articleId}`,
		payload: { articleId }
	};
}

export function loadAllComments(page) {
	return (dispatch, getState) => {
		const {
			comments: { pagination }
		} = getState();
		if (pagination.hasOwnProperty(page)) return;

		dispatch({
			type: LOAD_ALL_COMMENTS,
			callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`,
			payload: { page }
		});
	};
}
