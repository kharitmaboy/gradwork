import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../AuthContext';
import Cookies from 'js-cookie';
import './Header.css';

function Header() {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('access_token');
        setIsAuthenticated(false);
        navigate("/")
    };

    return (
        <header className="header">
            <div className="container">
                <h1>Учебный портал</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        {isAuthenticated ? (
                            <>
                                <li><Link to="/profile">Личный кабинет</Link></li>
                                <li>
                                    <button className="header-btn" onClick={handleLogout}>Выйти</button>
                                </li>
                            </>
                        ) : (
                            <li><Link to="/login">Вход в аккаунт</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;