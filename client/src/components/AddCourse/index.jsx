import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './AddCourse.css';

const AddCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState({ name: '', description: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/admin/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(course)
            });
            if (response.ok) {
                navigate('/');
            } else {
                console.error('Ошибка при добавлении курса');
            }
        } catch (error) {
            console.error('Ошибка при добавлении курса', error);
        }
    };

    return (
        <div className="add-course-container">
            <h2>Добавить новый курс</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Название курса:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required={true}
                        value={course.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание курса:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default AddCourse;