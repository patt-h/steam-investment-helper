import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import TopBar from './components/TopBar'
import Table from './components/Table'
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Table />} />
      </Routes>
      <BottomBar />
    </Router>
  );
}

export default App;
