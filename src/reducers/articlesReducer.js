// reducers/articlesReducer.js

const initialState = {
  articles: [],
  loading: false,
  error: null,
  currentPage: 1,
  pages: 1,
  total: 0,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        currentPage: action.payload.currentPage,
        pages: action.payload.pages,
        total: action.payload.total,
      };
    case "FETCH_ARTICLES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default articlesReducer;
