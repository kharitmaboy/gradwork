import {Link} from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <h1>Учебный Портал</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="/">Главная</a></li>
                    </ul>
                </nav>
                <div className="login-btn">
                    <Link to="/login" className="btn">Вход в аккаунт</Link>
                </div>
            </div>
        </header>
    )
}

export default Header
