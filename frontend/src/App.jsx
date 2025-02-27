import { HashRouter as Router, Routes, Route } from 'react-router-dom'; /* Import for page routing */
import { Home } from "./Pages/Home"; /* Home page */
import Questions from "./Pages/Questions"; /* Questions page */
import { Completion } from './Pages/Completion'; /* Completion page */

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Questions" element={<Questions/>}/>
          <Route path="/Completion" element={<Completion/>}/>
      </Routes>
    </Router>
    // <div>
    //   <Questions/>
    // </div>
  );
}

export default App;
