import { CHANGE_DATE_RANGE, DELETE_ARTICLE } from "../constants/index";

const defaultFilters = {
	selected: [],
	dateRange: {
		from: null,
		to: null
	}
};

export default (filter = defaultFilters, action) => {
	const { type, payload } = action;

	switch (type) {
		case CHANGE_DATE_RANGE:
			//            return Object.assign({}, filters, { dateRange: payload.dateRange })
			return { ...filter, dateRange: payload.dateRange };

		case DELETE_ARTICLE:
			return {
				...filter,
				selected: filter.selected.filter(
					selected => selected.value !== payload.id
				)
			};
		default:
			return filter;
	}
};
