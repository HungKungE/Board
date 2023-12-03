import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBackground from "./Icons/Imgs/homeBackGround.jpg";
import IndexPage from "./Pages/IndexPage";
import HomePage from "./Pages/HomePage";

const App: React.FunctionComponent = () => {
  return (
    <div className="w-full h-screen">
      <img
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        alt="background_1"
        src={HomeBackground}
      />
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
