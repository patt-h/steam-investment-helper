import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import NavbarAbout from "./NavbarAbout";
import './aboutpage.css';

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [isSpringLogoVisible, setIsSpringLogoVisible] = useState(false);
    const [isReactLogoVisible, setIsReactLogoVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 100);

        const springTimer = setTimeout(() => {
            setIsHeaderVisible(true);
        }, 1600);

        const reactTimer = setTimeout(() => {
            setIsSpringLogoVisible(true);
        }, 3100);

        const aboutTimer = setTimeout(() => {
            setIsReactLogoVisible(true);
        }, 4600);
    
        return () => {
            clearTimeout(timer);
            clearTimeout(springTimer);
            clearTimeout(reactTimer);
            clearTimeout(aboutTimer);
        }
    }, []);


    return (
        <>
        <NavbarAbout />
        <div className="about-container">
            <CSSTransition
                in={isVisible}
                timeout={1500}
                classNames="header-fade"
            >   
                <div className="header-container">
                    <h1 className="about-header">Project created with</h1> 
                </div>
            </CSSTransition>
            <CSSTransition
                in={isHeaderVisible}
                timeout={1500}
                classNames="spring-fade"
            >   
                <div className="spring-container">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1024px-Spring_Boot.svg.png" className="spring-logo"></img>
                    <div className="spring-text">
                        Spring
                    </div>
                </div>    
            </CSSTransition>
            <CSSTransition
                in={isSpringLogoVisible}
                timeout={1500}
                classNames="react-fade"
            >   
                <div className="react-container">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" className="react-logo"></img>
                    <div className="react-text">
                        React
                    </div>
                </div>    
            </CSSTransition>
            <CSSTransition
                in={isReactLogoVisible}
                timeout={1500}
                classNames="text-fade"
            >
                <div className="text-container">
                    <div className="text-content">
                        <div className="text-about">
                            <h1>About</h1>
                            <p>
                                This project was made using Java's framework Spring to develop backend for application and React framework for frontend.
                                Database is running on MySQL. It's my first React application but I think it turned out pretty good.
                            </p>
                            
                            <p>
                                Application uses Steam Market API to retrieve information about current item prices and Steam Apis API to get item images.
                            </p>

                            <p>
                                I see some opportunities to develop this project, so this is not the final version. I would say this is a demo
                                of what this app could be in the future.
                            </p>

                            <p>
                                <br />
                                Version 1.0.0
                            </p>

                            <ul className="about-links">
                                <br />
                                <li>
                                    <a href="https://github.com/patt-h/steam-investment-helper" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="github-image-about"></img>
                                    Repository
                                    </a>
                                </li>
                                <br />
                                <li>
                                    <a href="https://steamcommunity.com/id/qualitydank/" target="_blank">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png" className="steam-image-about"></img>
                                    My Steam
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
        </>
    )
}



export default AboutPage;