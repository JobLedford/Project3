import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <header>
            <div className="container">
                <div className="ya">
                    <h1>Everything Zen  L.L.C.</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/about'>About</Link>
                            </li>
                            <li>
                                <Link to='/contact'>Contact</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;