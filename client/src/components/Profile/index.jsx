import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../AuthContext';
import './Profile.css';

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: ''
    });

    // Имитация загрузки данных пользователя из API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setUser({
                    username: 'john_doe',
                    email: 'john.doe@example.com',
                    firstName: 'John',
                    lastName: 'Doe'
                });
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя', error);
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
            // Здесь ваш запрос на сервер для обновления данных пользователя
            console.log('Данные пользователя для отправки на сервер:', user);
            // После успешного обновления данных можно добавить обратную связь для пользователя
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя', error);
            // Обработка ошибок обновления данных
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
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        disabled // Отключено для изменения
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default Profile;
