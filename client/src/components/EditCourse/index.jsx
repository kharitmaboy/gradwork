import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../AddCourse/AddCourse.css';

const EditCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ name: '', description: '' });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`/courses/${courseId}`);
                const data = await response.json();
                setCourse({ name: data.name, description: data.description });
            } catch (error) {
                console.error('Ошибка при загрузке курса', error);
            }
        };

        fetchCourse();
    }, [courseId]);

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
            const response = await fetch(`/admin/courses/${courseId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(course)
            });
            if (response.ok) {
                navigate(`/courses/${courseId}`);
            } else {
                console.error('Ошибка при обновлении курса');
            }
        } catch (error) {
            console.error('Ошибка при обновлении курса', error);
        }
    };

    return (
        <div className="add-course-container">
            <h2>Редактировать курс</h2>
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
                        required={true}
                        value={course.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Обновить</button>
            </form>
        </div>
    );
};

export default EditCourse;