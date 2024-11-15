export const fetchArticles =
  (query = "", page = 1, pageSize = 12, orderBy = "newest", section = "") =>
  async (dispatch) => {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });

    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      let apiUrl = `https://content.guardianapis.com/search?api-key=cae658f8-8af5-4106-bec4-66232092b612&show-fields=thumbnail&page=${page}&page-size=${pageSize}&order-by=${orderBy}`;

      if (query) {
        apiUrl += `&q=${query}`;
      }

      if (section) {
        apiUrl += `&tag=${section}/${section}`;
      }

      const response = await fetch(apiUrl);
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
