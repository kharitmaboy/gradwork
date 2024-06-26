import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../AddCategory/AddCategory.css';

const EditCategory = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: ''});

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`/categories/${categoryId}`);
                const data = await response.json();
                setCategory({ name: data.name });
            } catch (error) {
                console.error('Ошибка при загрузке курса', error);
            }
        };

        fetchCategory();
    }, [categoryId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/admin/categories/${categoryId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(category)
            });
            if (response.ok) {
                navigate(`/categories/${categoryId}`);
            } else {
                console.error('Ошибка при обновлении курса');
            }
        } catch (error) {
            console.error('Ошибка при обновлении курса', error);
        }
    };

    return (
        <div className="add-course-container">
            <h2>Редактировать раздел</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Название раздела:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required={true}
                        value={category.name}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Обновить</button>
            </form>
        </div>
    );
};

export default EditCategory;