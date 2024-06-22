import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Cookies from 'js-cookie';
import './AddCategory.css';

const AddCategory = () => {
    const {courseId} = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({name: '', course_id: parseInt(courseId)});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/admin/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(category)
            });
            if (response.ok) {
                navigate(`/courses/${courseId}`);
            } else {
                console.error('Ошибка при добавлении раздела');
            }
        } catch (error) {
            console.error('Ошибка при добавлении раздела', error);
        }
    };

    return (
        <div className="add-section-container">
            <h2>Добавить новый раздел</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Название раздела:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={category.name}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default AddCategory;
