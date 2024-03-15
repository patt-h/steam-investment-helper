import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import MainPage from "./components/MainPage";
import Table from './components/Table'
import AboutPage from './components/AboutPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage/>}  />
        <Route exact path="/investments" element={<Table />} />
        <Route exact path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
