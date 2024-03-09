import './App.css';
import Item from './components/Item'

function App() {
  return (
    <><div className="topbar">
      <div className="buttons">
        <button>Main Page</button>
        <a href="https://steamcommunity.com/market/search?appid=730" target="_blank">
        <button>Steam Market</button>
        </a>
        <button>About</button>
      </div>
    </div>
    
    <div className="App">
        <Item />
    </div></>
  );
}

export default App;
