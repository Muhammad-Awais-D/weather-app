import React, { useState, useMemo } from "react";

const OlxUI = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const products = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      price: 450000,
      location: "Gulberg, Lahore",
      category: "Mobiles",
      img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 2,
      title: "Sport Bike 250cc",
      price: 850000,
      location: "DHA, Karachi",
      category: "Vehicles",
      img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 3,
      title: "Custom RTX 4090 Build",
      price: 1200000,
      location: "F-7, Islamabad",
      category: "Electronics",
      img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 4,
      title: "MacBook Pro M3",
      price: 680000,
      location: "Bahria Town, Lahore",
      category: "Electronics",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=500",
    },
  ];

  // --- Real-time Filter Logic ---
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  return (
    <div className={`min-vh-100 pb-5 transition-all ${isDarkMode ? "bg-dark-custom text-light" : "bg-light text-dark"}`}>
      
      {/* --- Modern Glass Navbar --- */}
      <nav className={`navbar sticky-top border-bottom px-4 py-3 backdrop-blur ${isDarkMode ? "bg-dark-nav border-secondary" : "bg-white bg-opacity-75 border-light"}`}>
        <div className="container">
          <h3 className="fw-black m-0 tracking-tighter">
            MARKET<span className="text-primary">PLACE</span>
          </h3>

          <div className="ms-auto d-flex align-items-center gap-2 gap-md-4">
            {/* Dark Mode Toggle */}
            <button 
              className={`btn rounded-circle p-2 border-0 shadow-none ${isDarkMode ? "text-warning" : "text-muted"}`}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            <button className={`btn btn-link text-decoration-none fw-semibold ${isDarkMode ? "text-light" : "text-dark"}`} onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm d-none d-md-block">
              + Post Ad
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Search Bar --- */}
      <div className={`${isDarkMode ? "bg-dark-card border-bottom border-secondary" : "bg-white border-bottom"} py-5 mb-5`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className={`p-2 rounded-4 shadow-lg d-flex flex-column flex-md-row gap-2 ${isDarkMode ? "bg-secondary bg-opacity-25" : "bg-light"}`}>
                <div className="d-flex align-items-center flex-grow-1 px-3">
                  <span className="me-2 opacity-50">🔍</span>
                  <input 
                    className="form-control border-0 bg-transparent shadow-none w-100" 
                    placeholder="Search for anything..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="vr d-none d-md-block mx-2 opacity-25"></div>
                <select 
                  className="form-select border-0 bg-transparent w-auto fw-medium shadow-none cursor-pointer"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Mobiles</option>
                  <option>Vehicles</option>
                  <option>Electronics</option>
                </select>
                <button className="btn btn-primary rounded-3 px-4 py-2 fw-bold">Find</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Filter Stats --- */}
      <div className="container mb-4">
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold m-0">
                {filteredProducts.length > 0 ? `Results (${filteredProducts.length})` : "No items found"}
            </h5>
            <small className="opacity-50">Updated just now</small>
        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className="container">
        <div className="row g-4">
          {filteredProducts.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.id}>
              <div className={`card border-0 shadow-sm h-100 overflow-hidden rounded-4 card-hover ${isDarkMode ? "bg-dark-card border border-secondary" : "bg-white"}`}>
                <div className="position-relative">
                  <img src={item.img} className="card-img-top" alt={item.title} style={{ height: "220px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 end-0 m-3">
                    <button className="btn btn-blur rounded-circle p-2 shadow-sm leading-none">❤️</button>
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-primary fw-bold small uppercase tracking-wide">{item.category}</span>
                    <span className="opacity-50 small">📍 {item.location.split(',')[1]}</span>
                  </div>
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-black text-primary m-0">Rs {item.price.toLocaleString()}</h4>
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3">View</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Login Modal --- */}
      {showLogin && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content border-0 rounded-4 p-4 shadow-lg ${isDarkMode ? "bg-dark-card text-light" : "bg-white"}`}>
              <div className="text-center mb-4">
                <h3 className="fw-bold">Sign In</h3>
                <p className="opacity-75">Access your premium dashboard</p>
              </div>
              <input className={`form-control border-0 mb-3 py-3 ${isDarkMode ? "bg-secondary bg-opacity-25 text-white" : "bg-light"}`} placeholder="Email" />
              <input className={`form-control border-0 mb-4 py-3 ${isDarkMode ? "bg-secondary bg-opacity-25 text-white" : "bg-light"}`} type="password" placeholder="Password" />
              <button className="btn btn-primary w-100 py-3 fw-bold rounded-3 mb-2">Login</button>
              <button className="btn btn-link text-decoration-none w-100 opacity-50" onClick={() => setShowLogin(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles for custom logic */}
      <style>{`
        .bg-dark-custom { background-color: #0f172a !important; }
        .bg-dark-nav { background-color: rgba(15, 23, 42, 0.8) !important; }
        .bg-dark-card { background-color: #1e293b !important; }
        .backdrop-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04) !important; }
        .btn-blur { background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.3); }
        .transition-all { transition: background-color 0.4s ease, color 0.4s ease; }
        .fw-black { font-weight: 900; }
        .tracking-tighter { letter-spacing: -1.5px; }
      `}</style>

    </div>
  );
};

export default OlxUI;