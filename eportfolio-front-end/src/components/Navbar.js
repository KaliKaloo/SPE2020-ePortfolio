import React, { useState, useEffect } from 'react';
import { useHistory, Link, withRouter } from 'react-router-dom';
import '../components/styles/Navbar.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Dropdown} from 'react-bootstrap';


function Navbar() {
    const history = useHistory();
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    let username = JSON.parse(localStorage.getItem('user')).username;

    const handleDropDownMenuClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const handleLogout = () => {
        history.push('/');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        localStorage.clear();
        document.title = `ePortfolio`;
        window.location.reload(true);
    }

    const logoutButton = () => {
        handleLogout();
        closeMobileMenu();
    }

    const publishButton = () => {
        closeMobileMenu();
        window.open("/publish/home/"+ username, "_blank");
    }

    const showButton = () => {
        if (window.innerWidth <= 1200) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href="#/action-1"
          ref={ref}
          onClick={e => {
            e.preventDefault();
            onClick(e);
          }}
        >
          <div className="btn-outline-light">
            <MoreVertIcon style={{ color: 'white'}}/> 
          </div>
          {children}
        </a>
      ));

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
                        ePortfolio
                    </Link>
                    <div className='menu-icon' onClick={handleDropDownMenuClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link 
                                data-testid="Projects"
                                to='/projects'
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Projects
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/workExperience'
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Work Experience
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/achievements'
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Achievements
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/qualification'
                                className='nav-links'
                                onClick={closeMobileMenu}>
                                Qualifications
                            </Link>
                        </li>

                        {button? 
                            <>
                                <li className='nav-item-special'>
                                    <Link
                                        to='/editor'
                                        className='nav-links-special'
                                        onClick={closeMobileMenu}>
                                        Post
                                    </Link>
                                </li>

                                <li className='nav-item-special'>
                                    <Link
                                        to='/home'
                                        className='nav-links-special' 
                                        onClick={publishButton}>
                                        Publish
                                    </Link>
                                </li>
                                <li className='nav-links-more-icon'>
                                    <Dropdown>        
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"/>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="1" href='/settings_general'>Settings</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">Help</Dropdown.Item>
                                            <Dropdown.Item eventKey="3" onClick={logoutButton}>Logout</Dropdown.Item>
                                        
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </>
                        :
                            <div className="settings-section">
                                <li className='nav-item'>
                                    <Link
                                        to='/settings_general'
                                        className='nav-links'
                                        >
                                        Settings
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        to='/'
                                        className='nav-links'
                                        >
                                        Help
                                    </Link>
                                </li>

                                <li className='nav-item'>
                                    <Link
                                        to='/editor'
                                        className='nav-links-mobile'
                                        onClick={closeMobileMenu}>
                                        Post
                                    </Link>
                                </li>

                                <li className='nav-item'>
                                    <Link
                                        to='/home'
                                        className='nav-links-mobile'
                                        onClick={publishButton}>
                                        Publish
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        to='/'
                                        className='nav-links-mobile'
                                        onClick={logoutButton}>
                                        Logout
                                    </Link>
                                </li>
                            </div>
                        }

                        
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default withRouter(Navbar);