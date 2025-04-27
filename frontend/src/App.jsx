import React, { useLayoutEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; /* Import for page routing */
import { Home } from "./Pages/Home"; /* Home page */
import Questions from "./Pages/Questions"; /* Questions page */
import { Completion } from './Pages/Completion'; /* Completion page */
import 'bootstrap/dist/css/bootstrap.min.css';

// Wrapper to instantly scroll to the top of the page when the route changes
const ResetLocation = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

// Main app function
function App() {
  return (
    <Router>
      <ResetLocation>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Questions" element={<Questions/>}/>
            <Route path="/Completion" element={<Completion/>}/>
        </Routes>
      </ResetLocation>
    </Router>
  );
}

export default App;