import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";

function RedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const saved = sessionStorage.getItem("redirect");
    if (saved) {
      sessionStorage.removeItem("redirect");
      navigate(saved.replace("/arsportfolio.github.io", ""), { replace: true });
    }
  }, [navigate]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/smart-annotation" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
