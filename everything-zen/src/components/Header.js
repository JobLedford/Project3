import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header>
            <h1>Everything Zen  L.L.C.</h1>
            <nav>
                {/* fill later dood */}
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;