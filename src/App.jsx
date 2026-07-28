import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/smart-annotation" element={<BlogPost />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
