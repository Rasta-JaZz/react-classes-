import {
	ADD_COMMENT,
	LOAD_ARTICLE_COMMENTS,
	SUCCESS,
	START,
	LOAD_ALL_COMMENTS,
} from "../constants";
import { DELETE_COMMENT } from "../constants";
import produce from "immer";
import { arrToMap } from "../utilits/index";

const commentsState = {
	entities: {},
	pagination: {},
	loaded: false,
	total: null,
	keys: [],
};

export default (state = commentsState, action) => {
	const { type, payload, randomId, response } = action;

	return produce(state, (draft) => {
		if (type === LOAD_ARTICLE_COMMENTS + SUCCESS) {
			const loadedComments = draft.entities;
			draft.entities = arrToMap(response);
			Object.assign(draft.entities, loadedComments);
			return draft;
		} else if (type === ADD_COMMENT) {
			const comment = payload.commentObject;
			draft.entities[randomId] = { ...comment };
		} else if (type === DELETE_COMMENT) {
			delete draft[payload.id];
		} else if (type === LOAD_ALL_COMMENTS + START) {
			draft.pagination[payload.page] = {};
			draft.pagination.loading = true;
			draft.pagination[payload.page].ids = [];
		} else if (type === LOAD_ALL_COMMENTS + SUCCESS) {
			draft.pagination[payload.page].ids = response.records.map(
				(comment) => comment.id
			);
			const oldDraft = draft.entities;
			draft.entities = arrToMap(response.records);
			Object.assign(draft.entities, oldDraft);
			draft.pagination.loading = false;
			draft.total = response.total;
		}
	});
};
