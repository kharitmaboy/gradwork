import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../AuthContext';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import './Profile.css';
import {useNavigate, Link} from "react-router-dom";

const Profile = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        status: ''
    });
    const [usersList, setUsersList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('access_token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const response = await fetch('/user', {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('access_token')}`
                        }
                    });
                    const data = await response.json();
                    setUser(data);
                    if (decodedToken.status === 'admin') {
                        setIsAdmin(true);
                        fetchUsersList();
                    }
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя', error);
            }
        };

        const fetchUsersList = async () => {
            try {
                const response = await fetch('/admin/users', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                const data = await response.json();
                setUsersList(data.data);
            } catch (error) {
                console.error('Ошибка при загрузке списка пользователей', error);
            }
        };

        const fetchArticles = async () => {
            try {
                const response = await fetch('/user/articles', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Ошибка при загрузке списка пользователей', error);
            }
        };

        fetchUserData();
        fetchArticles();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('access_token')
            if (token) {
                const response = await fetch(`/user`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    },
                    body: JSON.stringify(user)
                });
                if (response.ok) {
                    navigate(`/profile`)
                } else {
                    console.error('Ошибка при сохранении данных');
                }
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса на сервер', error);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleArticleClick = (articleId) => {
        navigate(`/articles/${articleId}`);
    };

    if (!isAuthenticated) {
        return <div>Вы не авторизованы. Войдите в аккаунт.</div>;
    }

    return (
        <div className="profile-container">
            <h2>Личный кабинет</h2>
            <form onSubmit={handleSaveClick}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Фамилия:</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={user.surname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Сохранить изменения</button>
            </form>
            {isAdmin && isAuthenticated && (
                <div className="admin-section">
                    <h3>Список пользователей</h3>
                    <ul className="users-list">
                        {usersList.map(user => (
                            <li key={user.id} onClick={() => handleUserClick(user.id)}>
                                {user.username} - {user.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {isAdmin && isAuthenticated && (
                <Link to="/create-user" className="create-user-button">Создать пользователя</Link>
            )}
            {!isAdmin && isAuthenticated && (
                <div className="admin-section">
                    <h3>Мои статьи</h3>
                    <ul className="users-list">
                        {articles.map(article => (
                            <li key={article.id} onClick={() => handleArticleClick(article.id)}>
                                {article.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;