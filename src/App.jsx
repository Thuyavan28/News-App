import { useState, useEffect } from "react";

const API_KEY = 'd3fea39d39738a7fabed86e7fd3d8831';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("world");
  const [lang, setLang] = useState("en");
  const [country, setCountry] = useState("us");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  const countries = [
    { code: "au", name: "Australia" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "cn", name: "China" },
    { code: "eg", name: "Egypt" },
    { code: "fr", name: "France" },
    { code: "de", name: "Germany" },
    { code: "gr", name: "Greece" },
    { code: "hk", name: "Hong Kong" },
    { code: "in", name: "India" },
    { code: "ie", name: "Ireland" },
    { code: "it", name: "Italy" },
    { code: "jp", name: "Japan" },
    { code: "nl", name: "Netherlands" },
    { code: "no", name: "Norway" },
    { code: "pk", name: "Pakistan" },
    { code: "pe", name: "Peru" },
    { code: "ph", name: "Philippines" },
    { code: "pt", name: "Portugal" },
    { code: "ro", name: "Romania" },
    { code: "ru", name: "Russian Federation" },
    { code: "sg", name: "Singapore" },
    { code: "se", name: "Sweden" },
    { code: "ch", name: "Switzerland" },
    { code: "tw", name: "Taiwan" },
    { code: "ua", name: "Ukraine" },
    { code: "gb", name: "United Kingdom" },
    { code: "us", name: "United States" },
  ];

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "zh", name: "Chinese" },
    { code: "nl", name: "Dutch" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "hi", name: "Hindi" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ml", name: "Malayalam" },
    { code: "mr", name: "Marathi" },
    { code: "no", name: "Norwegian" },
    { code: "pt", name: "Portuguese" },
    { code: "ro", name: "Romanian" },
    { code: "ru", name: "Russian" },
    { code: "es", name: "Spanish" },
    { code: "sv", name: "Swedish" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "uk", name: "Ukrainian" },
  ];

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");
      const url = `https://gnews.io/api/v4/search?q=${query}&lang=${lang}&country=${country}&max=10&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.articles) {
        setArticles(data.articles);
      } else {
        setError("No articles found or invalid API key");
        setArticles([]);
      }
    } catch (err) {
      setError("Failed to fetch news");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [query, country, lang]);

  const handleSearch = () => {
    if (!input.trim()) {
      setError("Enter a search query");
      return;
    }
    setQuery(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      
      <div className="sticky top-0 z-20 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-black text-white text-center mb-6 tracking-tight drop-shadow-lg">
            🌍 NewsExplorer
          </h1>

         
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
           
            <div className="flex w-full lg:w-2/5">
              <input
                type="text"
                placeholder="🔍 Discover news about space, sports, tech..."
                className="flex-grow p-4 border-0 rounded-l-2xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-purple-300 text-gray-800 placeholder-gray-500 shadow-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button
                onClick={handleSearch}
                className="px-6 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold rounded-r-2xl hover:from-amber-500 hover:to-amber-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Search
              </button>
            </div>

          
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <select
                value={country}
                className="p-4 border-0 rounded-2xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 shadow-lg font-medium"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">🌎 All Countries</option>
                {countries.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                value={lang}
                className="p-4 border-0 rounded-2xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-rose-300 text-gray-800 shadow-lg font-medium"
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="">🗣️ All Languages</option>
                {languages.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* News Articles Section */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-gradient-to-r from-red-100 to-pink-100 border-l-4 border-red-500 p-6 rounded-2xl shadow-lg text-center">
            <p className="text-red-700 text-xl font-semibold">⚠️ {error}</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image || "https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=Breaking+News"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {article.source?.name || "News"}
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-3 leading-tight group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-12 shadow-lg">
              <p className="text-2xl text-gray-600 font-semibold">📰 No news articles found. Try a different search!</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">Stay Informed with NewsExplorer</p>
          <p className="text-gray-400 mt-2">Your window to the world's latest happenings</p>
        </div>
      </footer>
    </div>
  );
}

export default App;