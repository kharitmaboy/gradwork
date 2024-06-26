import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';
import Cookies from "js-cookie";

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
        status: 'user'
    });

    useEffect(() => {
        // Загрузка данных о пользователе для редактирования
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/admin/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('access_token')}`
                    }
                });
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveUser = async (e) => {
        e.preventDefault(); // Предотвращает перезагрузку страницы
        try {
            const response = await fetch(`/admin/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                navigate('/profile');
            } else {
                console.error('Ошибка при обновлении пользователя');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса на сервер', error);
        }
    };

    return (
        <div className="edit-user-container">
            <h2>Редактирование пользователя</h2>
            <form className="edit-user-form" onSubmit={handleSaveUser}>
                <label htmlFor="username">Имя пользователя:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required={true}
                    value={userData.username}
                    onChange={handleInputChange}
                />
                <label htmlFor="password">Пароль:</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    required={true}
                    value={''}
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
                <label htmlFor="name">Фамилия:</label>
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
                    onChange={handleInputChange}
                >
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                </select>
                <button type="submit" className="button">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default EditUser;
