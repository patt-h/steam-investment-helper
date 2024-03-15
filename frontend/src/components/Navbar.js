import './navbar.css';

const Navbar = () => {
    return (
        <div className="nav">
            <div className="nav-logo">Steam Investment Helper</div>
            <ul className="nav-menu">
                <a href="http://localhost:3000/investments">
                <li>Investments</li>
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

export default Navbar;