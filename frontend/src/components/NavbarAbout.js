import './navbarabout.css';

const NavbarAbout = () => {
    return (
        <div className="about-topbar">
            <ul className="nav-about-topbar">
                <a href="http://localhost:3000">
                <li>Main Page</li>
                </a>
                <a href="http://localhost:3000/investments">
                <li>Investments</li>
                </a>
            </ul>
        </div>
    );
}


export default NavbarAbout;