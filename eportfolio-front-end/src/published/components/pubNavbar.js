import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../components/styles/Navbar.css';

function PubNavbar({user}) {
    const [click, setClick] = useState(false);
    const [, setButton] = useState(true);
    let username = user.username;

    const handleDropDownMenuClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to={'/publish/home/'+username} 
                    className='navbar-logo' onClick={closeMobileMenu}>
                        ePortfolio
                    </Link>
                    <div className='menu-icon' onClick={handleDropDownMenuClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        <li className='nav-item'>
                            <Link
                                to={'/publish/home/'+username} 
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Overview
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to={'/publish/projects/'+username} 
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Projects
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to={'/publish/workExperience/'+username} 
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Work Experience
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to={'/publish/achievements/'+username} 
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Achievements
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to={'/publish/qualification/'+username} 
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Qualifications
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default withRouter(PubNavbar);