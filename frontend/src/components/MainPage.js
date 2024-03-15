import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Navbar from './Navbar';
import './mainpage.css';

const MainPage = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [isLogoVisible, setIsLogoVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 100);

        const textTimer = setTimeout(() => {
            setIsLogoVisible(true);
        }, 1600);
    
        return () => {
            clearTimeout(timer);
            clearTimeout(textTimer);
        }
    }, []);

    return (
    <>
    <Navbar />
    <div className="triangle-container">
        <div className="triangle"></div>
    </div>
    <CSSTransition
        in={isVisible}
        timeout={1500}
        classNames="logo-fade"
    >
        <img src="https://raw.githubusercontent.com/patt-h/steam-investment-helper/master/frontend/public/page_icon.png" className="main-logo"></img>
    </CSSTransition>
    <CSSTransition
        in={isLogoVisible}
        timeout={1500}
        classNames="welcome-container"
    >
        <div className="welcome-container">
            Track all of your investments with current price, profit and price history
            <a href="http://localhost:3000/investments">
                <button className="welcome-button">Get started</button>
            </a>
        </div>
    </CSSTransition>
    </>
    );
}

export default MainPage;