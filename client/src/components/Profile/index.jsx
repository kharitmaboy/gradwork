import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../AuthContext';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import './Profile.css';

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        status: ''
    });
    const [usersList, setUsersList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

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
                    setUser({
                        username: data.username,
                        password: data.password,
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                        status: decodedToken.status,
                    });
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

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Запрос на обновление данных пользователя на сервере
            console.log('Данные пользователя для отправки на сервер:', user);
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя', error);
        }
    };

    if (!isAuthenticated) {
        return <div>Вы не авторизованы. Войдите в аккаунт.</div>;
    }

    return (
        <div className="profile-container">
            <h2>Личный кабинет</h2>
            <form onSubmit={handleSubmit}>
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
                        value={user.password}
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
            {isAdmin && (
                <div className="admin-section">
                    <h3>Список пользователей</h3>
                    <ul>
                        {usersList.map((user, index) => (
                            <li key={index}>{user.username} - {user.email}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;