import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import TopBar from './components/TopBar'
import Item from './components/Item'

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
