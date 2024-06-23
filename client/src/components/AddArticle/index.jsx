import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import AuthContext from '../../AuthContext';
import Cookies from 'js-cookie';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './AddArticle.css';
import {jwtDecode} from "jwt-decode";

const AddArticle = () => {
    const {categoryId} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const {isAuthenticated} = useContext(AuthContext);

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            const token = Cookies.get('access_token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user_id

                const articleData = {
                    title,
                    body,
                    date: parseInt(Date.now()/1000),
                    user_id: userId,
                    category_id: parseInt(categoryId),
                };

                const response = await fetch(`/user/articles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(articleData)
                });

                if (response.ok) {
                    navigate(`/categories/${categoryId}`);
                } else {
                    console.error('Ошибка при добавлении статьи');
                }
            }

        } catch (error) {
            console.error('Ошибка при добавлении статьи', error);
        }
    };

    return (
        <div className="add-article-container">
            <h2>Добавить статью</h2>
            {isAuthenticated && (
                <form onSubmit={handleSave}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Заголовок статьи"
                        className="article-title-input"
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        data={body}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setBody(data);
                        }}
                    />
                    <button type="submit" className="save-article-button">
                        Сохранить статью
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddArticle;
