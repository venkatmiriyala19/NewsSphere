// actions/articleActions.js

export const fetchArticles =
  (query = "", page = 1, pageSize = 10, orderBy = "newest") =>
  async (dispatch) => {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(
        `https://content.guardianapis.com/search?q=${query}&api-key=b6cc4b89-4977-45fa-8efa-d72716e68d49&show-fields=thumbnail&page=${page}&page-size=${pageSize}&order-by=${orderBy}`
      );
      const data = await response.json();
      dispatch({
        type: "FETCH_ARTICLES_SUCCESS",
        payload: {
          articles: data.response.results,
          currentPage: data.response.currentPage,
          pages: data.response.pages,
          total: data.response.total,
        },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ARTICLES_FAILURE", payload: error.message });
    }
  };
