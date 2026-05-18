import { useEffect, useState } from "react";
import './NewNews.css';

function NewNews() {

  const [newnews, setNews] = useState({ articles: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("Iran"); // default query

  const toggleMode = () => setDarkMode(!darkMode);

  // Fetch news function
  const getNews = async (query = "Iran") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=6&apikey=68c20d6d93b363ce9e18bccc29879aa7`
      );
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews({ articles: [] });
    }
    setIsLoading(false);
  };

  // Initial load
  useEffect(() => {
    getNews(searchQuery);
  }, []);

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      getNews(searchQuery);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={darkMode ? "news-app dark" : "news-app"}>

      {/* HEADER */}
      <header className="news-header">
        <div className="container header-flex">
          <h2 className="logo">NewsSphere</h2>
          <div className="header-actions">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="search-input"
            />
            <button className="search-btn" onClick={handleSearch}>Search</button>
            <button className="mode-toggle" onClick={toggleMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section container">
        <div className="hero-card">
          <img src="https://picsum.photos/1200/600" className="hero-img" alt="Hero" />
          <div className="hero-overlay">
            <h1 className="hero-title">The Future of Artificial Intelligence</h1>
            <p className="hero-desc">
              AI technologies are reshaping industries and creating new opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="news-section container">
        <h3 className="section-title">Latest News</h3>
        <div className="news-grid">
          {newnews.articles.map((article, index) => (
            <div className="news-card" key={index}>
              <img
                src={article.image || "https://picsum.photos/400/200"}
                alt="news"
                onError={(e) => { e.target.src = "https://picsum.photos/400/200"; }}
              />
              <div className="card-content">
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <p className="source">{article.source.name} • {new Date(article.publishedAt).toDateString()}</p>
                <a href={article.url} target="_blank" rel="noreferrer" className="read-btn">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="news-footer">
        <p>© 2026 NewsSphere</p>
      </footer>

    </div>
  );
}

export default NewNews;