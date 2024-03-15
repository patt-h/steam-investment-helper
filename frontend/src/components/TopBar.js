import './topbar.css'

const TopBar = () => {
    return (
    <div className="topbar">
      <ul className="nav-topbar">
        <a href="http://localhost:3000/">
        <li>Main Page</li>
        </a>
        <a href="https://steamcommunity.com/market/search?appid=730" target="_blank">
        <li>Steam Market</li>
        </a>
        <a href="http://localhost:3000/about">
        <li>About</li>
        </a>
      </ul>
    </div>
    )
}

export default TopBar;