import { HashRouter as Router, Routes, Route } from 'react-router-dom'; /* Import for page routing */
import { Home } from "./Pages/Home"; /* Home page */
import { Question1 } from "./Pages/Question1"; /* Question 1 page */
import { Question2 } from "./Pages/Question2"; /* Question 2 page */
import { Question3 } from "./Pages/Question3"; /* Question 3 page */
import { Question4 } from "./Pages/Question4"; /* Question 4 page */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Question1" element={<Question1/>}/>
        <Route path="/Question2" element={<Question2/>}/>
        <Route path="/Question3" element={<Question3/>}/>
        <Route path="/Question4" element={<Question4/>}/>
      </Routes>
    </Router>
  );
}

export default App;
