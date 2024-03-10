const TopBar = () => {
    return (
    <div className="topbar">
      <div className="buttons">
        <a href="http://localhost:3000/">
        <button>Main Page</button>
        </a>
        <a href="https://steamcommunity.com/market/search?appid=730" target="_blank">
        <button>Steam Market</button>
        </a>
        <button>About</button>
      </div>
    </div>
    )
}

export default TopBar;