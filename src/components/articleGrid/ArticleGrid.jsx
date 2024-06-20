import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../actions/articleActions.js";
import "./ArticleGrid.css";
import AnimatedBackground from "../animatedBackground/AnimatedBackground";
import SearchComponent from "../searchComponent/SearchComponent";
import SectionsComponent from "../sections/SectionsComponent.jsx";

const ArticleGrid = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);
  const currentPage = useSelector((state) => state.articles.currentPage);
  const totalPages = useSelector((state) => state.articles.pages);

  const [query, setQuery] = useState(""); // Default query
  const [page, setPage] = useState(1);
  const [currentSection, setCurrentSection] = useState(""); // Default section

  useEffect(() => {
    dispatch(fetchArticles(query, page, 12, "newest", currentSection));
  }, []);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setCurrentSection(""); // Reset to first page when performing a new search
    dispatch(fetchArticles(query, 1, 12, "newest", ""));
  };

  const handleSectionClick = (section) => {
    setCurrentSection(section === "all" ? "" : section);
    setQuery(section === "all" ? "" : section);
    setPage(1);
    dispatch(
      fetchArticles(
        section === "all" ? "" : section,
        1,
        12,
        "newest",
        section === "all" ? "" : section
      )
    );
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        dispatch(fetchArticles(query, newPage, 12, "newest", currentSection));
        return newPage;
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setPage((prevPage) => {
        const newPage = prevPage - 1;
        dispatch(fetchArticles(query, newPage, 12, "newest", currentSection));
        return newPage;
      });
    }
  };

  const goToPage = (pageNumber) => {
    setPage(() => {
      dispatch(fetchArticles(query, pageNumber, 12, "newest", currentSection));
      return pageNumber;
    });
  };

  const renderPagination = () => {
    if (totalPages === 0) return null;

    const pageNumbers = [];
    const visiblePages = 8; // Number of visible page numbers before showing ellipsis

    // Calculate start and end points for pagination display
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust startPage and endPage if they go out of bounds
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Add ellipsis at the beginning if needed
    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => goToPage(1)} className="page-numbers">
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="startEllipsis" className="page-numbers">
            ...
          </span>
        );
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={currentPage === i ? "active-page-number" : "page-numbers"}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="endEllipsis" className="page-numbers">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="page-numbers"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="button"
        >
          <div className="button-box">
            <span className="button-elem">
              <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
            <span className="button-elem">
              <svg viewBox="0 0 46 40">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
          </div>
        </button>
        {pageNumbers}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="button"
        >
          <div className="button-box">
            <span className="button-elem">
              <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.9 16.938H43c1.7 0 3 1.3 3 3s-1.3 3-3 3H9.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z"></path>
              </svg>
            </span>
            <span className="button-elem">
              <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20.038c0-.7.3-1.5.8-2.1l16-17c1.1-1 3.2-1.4 4.4-.3 1.2 1.1 1.2 3.3 0 4.4L9.9 16.938H43c1.7 0 3 1.3 3 3s-1.3 3-3 3H9.9l11.3 11.9c1 1 1.2 3.3 0 4.4-1.2 1.1-3.3.8-4.4-.3l-16-17c-.5-.5-.8-1.1-.8-1.9z"></path>
              </svg>
            </span>
          </div>
        </button>
      </div>
    );
  };

  return (
    <>
      <AnimatedBackground />
      <SearchComponent onSearch={handleSearch} />
      <SectionsComponent
        onSectionClick={handleSectionClick}
        currentSection={currentSection}
      />
      <div className="article-grid page-container">
        {loading && (
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        )}
        {error && (
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h3>Oops! Page not found</h3>
                <h1>
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </h1>
              </div>
              <h2>we are sorry, but the page you requested was not found</h2>
            </div>
          </div>
        )}
        {!loading && !error && articles.length === 0 && (
          <p>No articles found.</p>
        )}
        {!loading &&
          !error &&
          articles.map((article) => (
            <div key={article.id} className="article-item gradient-border">
              {article.fields && article.fields.thumbnail && (
                <img src={article.fields.thumbnail} alt={article.webTitle} />
              )}
              <h2>
                <a
                  href={article.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.webTitle}
                </a>
              </h2>
              <p>{new Date(article.webPublicationDate).toLocaleString()}</p>
              <p>{article.sectionName}</p>
            </div>
          ))}
      </div>
      {renderPagination()}
    </>
  );
};

export default ArticleGrid;
