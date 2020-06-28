import {
	DELETE_ARTICLE_FROM_ID,
	ADD_COMMENT,
	DELETE_COMMENT,
	LOAD_ALL_ARTICLES,
	SUCCESS,
	START,
	LOAD_ARTICLE,
	LOAD_ARTICLE_COMMENTS,
} from "../constants"
import { arrToMap } from "../utilits/index"
import produce from "immer"

const articlesState = {
	entities: [],
	loaded: false,
	loading: false,
	error: null,
}

const articleReducer = (state = articlesState, action) => {
	const { type, payload, randomId, response } = action

	return produce(state, (draft) => {
		if (type === DELETE_ARTICLE_FROM_ID) {
			delete draft.entities[payload.id]
			console.log("state :>> ", state)
			console.log("draft :>> ", draft.entities)
		} else if (type === ADD_COMMENT) {
			draft.entities[payload.articleId].comments.push(randomId)
		} else if (type === DELETE_COMMENT) {
			draft.entities[payload.articleId].comments.splice(
				[payload.commentIndex],
				1
			)
		} else if (type === LOAD_ALL_ARTICLES + SUCCESS) {
			const oldArticle = draft.entities
			draft.entities = arrToMap(response)
			Object.assign(draft.entities, oldArticle)
			draft.loading = false
			draft.loaded = true
			return draft
		} else if (type === LOAD_ALL_ARTICLES + START) {
			draft.loading = true
		} else if (type === LOAD_ARTICLE + START) {
			// draft.entities[payload.id].loaded = false;
		} else if (type === LOAD_ARTICLE + SUCCESS) {
			draft.entities[payload.id] = response
			draft.entities[payload.id].loaded = true
		} else if (type === LOAD_ARTICLE_COMMENTS + SUCCESS) {
			draft.entities[payload.articleId].commentsLoaded = true
		}
	})
}

export default articleReducer
