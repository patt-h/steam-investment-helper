import './bottombar.css';

const BottomBar = () => {

    return (
        <div className="bottombar">
            <div className="bottombar-text">
                Created by <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="github-image"></img>
                <a href="https://github.com/patt-h" target="_blank">patt-h</a>
                <div className="clause">
                    This site is not associated with Valve Corp.
                    All images are property of their respective owners.
                </div>
            </div>
        </div>
    )
}

export default BottomBar;