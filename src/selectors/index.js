import { createSelector } from "reselect";

export const articlesMapSelector = (state) => state.articles.entities;
export const dateRangeSelector = (state) => state.filter.dateRange;
export const articleLoadedSelector = (state) => state.articles.loaded;

// export const commentsKeyOfPageSelector = (state) => state.comments.keys;
export const pageSelector = (_, props) => props.page;
export const commentsKeyOfPageSelector = (state) => state.comments.keys;

export const commentsPagenationSelector = (state) => state.comments.pagination;
export const commentsPageIdsSelector = createSelector(
	commentsPagenationSelector,
	pageSelector,
	(pagination, page) => {
		return pagination[page];
	}
);

// export const commentsKeysSelector = createSelector(
// 	commentsKeyOfPageSelector,
// 	pageSelector,
// 	(keys, page) => {
// 		if (keys.length > 5) {
// 			return keys.filter((_, index) => {
// 				return (page - 1) * 5 < index + 1 && index + 1 < page * 5 + 1;
// 			});
// 		}
// 		return keys;
// 	}
// );

export const articleListSelector = createSelector(
	articlesMapSelector,
	(articleMap) => Object.values(articleMap)
);

export const filtratedArticles = createSelector(
	articleListSelector,
	dateRangeSelector,
	(articles, dateRange) => {
		const { from, to } = dateRange;

		return articles.filter((elem) => {
			const parsedArticles = Date.parse(elem.date);
			return (
				!from || !to || (parsedArticles > from && parsedArticles < to)
			);
		});
	}
);
