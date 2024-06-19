import './Header.css'

function Index() {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <h1>Учебный Портал</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Главная</a></li>
                        <li><a href="#">Курсы</a></li>
                        <li><a href="#">О нас</a></li>
                        <li><a href="#">Контакты</a></li>
                    </ul>
                </nav>
                <div className="login-btn">
                    <a href="#" className="btn">Вход в аккаунт</a>
                </div>
            </div>
        </header>
    )
}

export default Index
