import { useEffect, useState } from 'react';
import './News.css';

function News() {
    const [news, setNews] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [randomIndex, setRandomIndex] = useState(0); // Store the random choice

    const getnews = async () => {
        try {
            const response = await fetch("https://gnews.io/api/v4/search?q=world&lang=en&max=6&apikey=68c20d6d93b363ce9e18bccc29879aa7");
            const data = await response.json();
            setNews(data);
            // Generate a random number between 0 and the number of articles received
            if (data.articles && data.articles.length > 0) {
                const randomNum = Math.floor(Math.random() * data.articles.length);
                setRandomIndex(randomNum);
            }
            
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { getnews(); }, []);

    if (isLoading) {
        return (
            <div className='loader-container'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
const featuredArticle = news?.articles[randomIndex]
    return (
        <div className="news-app">
            {/* New Branding / Logo Header */}
            <header className="brand-header py-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="logo-wrapper">
                        <img src='./images/corvit-logo.png' />
                        <h1 className="logo-text">Corvit<span>News</span></h1>
                    </div>
                    <div className="date-display d-none d-md-block">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* 2. New Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top main-nav">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#newsNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="newsNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#world">World</a></li>
                            <li className="nav-item"><a className="nav-link" href="#politics">Politics</a></li>
                            <li className="nav-item"><a className="nav-link" href="#tech">Technology</a></li>
                            <li className="nav-item"><a className="nav-link" href="#science">Science</a></li>
                            <li className="nav-item"><a className="nav-link" href="#health">Health</a></li>
                            <li className="nav-item"><a className="nav-link" href="#sports">Sports</a></li>
                        </ul>
                    </div>
                    <form className="d-flex search-bar" role="search">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search news..."
                                    aria-label="Search"
                                />
                                <button className="btn btn-premium" type="submit">
                                    Search
                                </button>
                            </div>
                        </form>
                </div>
            </nav>

            {/* Breaking News Ticker */}
            <div className="breaking-ticker">
                <div className="container">
                    <span className="badge-breaking">BREAKING</span>
                    <marquee behavior="scroll" direction="left">
                        {news?.articles[0]?.title} • {news?.articles[1]?.title}
                    </marquee>
                </div>
            </div>

            {/* Hero Section */}
            {featuredArticle && (
            <header className="hero-section container mt-4">
                <div className="hero-card">
                    <img src={featuredArticle.image} alt="Featured" className="hero-img" />
                    <div className="hero-overlay">
                        <span className="category-tag">Featured</span>
                        <h1>{featuredArticle.title}</h1>
                            <p>{featuredArticle.description}</p>
                            <a 
                                href={featuredArticle.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="btn-read-more"
                            >
                                Read Full Story <span>&rarr;</span>
                            </a>
                    </div>
                </div>
            </header> )}

            {/* Latest News Grid */}
            <main className="container mt-5">
                <div className="section-header">
                    <h3 className="title">Latest Updates</h3>
                    <div className="title-underline"></div>
                </div>

                <div className="row g-4">
                    {news != null && news.articles.map((article) => (
                        <div className="col-lg-4 col-md-6" >
                            <div className="news-card">
                                <div className="card-img-wrapper">
                                    <img src={article.image} alt={article.title} />
                                </div>
                                <div className="card-body-custom">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.description?.substring(0, 100)}...</p>
                                    <p className="source">{article.source.name} • {new Date(article.publishedAt).toDateString()}</p>
                                    <a href={article.url} target="_blank" rel="noreferrer" className="btn-read-more">
                                        Read Full Article <span>&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="footer-modern mt-5">
                <div className="container text-center">
                    <p>© 2026 <span className="text-coral">Corvit News</span> - Empowering Information</p>
                </div>
            </footer>
        </div>
    );
}

export default News;