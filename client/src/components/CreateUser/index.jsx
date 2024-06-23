// CreateUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';
import Cookies from "js-cookie";

const CreateUser = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
        status: 'user'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateUser = async (e) => {
        e.preventDefault(); // Предотвращает перезагрузку страницы
        try {
            const response = await fetch('/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                navigate('/profile');
            } else {
                console.error('Ошибка при создании пользователя');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса на сервер', error);
        }
    };

    return (
        <div className="create-user-container">
            <h2>Создание нового пользователя</h2>
            <form className="create-user-form" onSubmit={handleCreateUser}>
                <label htmlFor="username">Имя пользователя:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    required={true}
                    onChange={handleInputChange}
                />
                <label htmlFor="password">Пароль:</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={userData.password}
                    required={true}
                    onChange={handleInputChange}
                />
                <label htmlFor="name">Имя:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                />
                <label htmlFor="surname">Фамилия:</label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={userData.surname}
                    onChange={handleInputChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="status">Статус:</label>
                <select
                    id="status"
                    name="status"
                    value={userData.status}
                    required={true}
                    onChange={handleInputChange}
                >
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                </select>
                <button type="submit">Создать пользователя</button>
            </form>
        </div>
    );
};

export default CreateUser;
