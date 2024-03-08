import './App.css';
import Item from './components/Item'

function App() {
  return (
    <><div className="topbar">
      <div className="buttons">
        <button>Main Page</button>
        <button>Market</button>
        <button>About</button>
      </div>
    </div>
    
    <div className="App">
        <Item />
    </div></>
  );
}

export default App;
