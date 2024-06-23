import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../AddArticle/AddArticle.css'
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const EditArticle = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const token = Cookies.get('access_token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUserId(decodedToken.user_id)
                }

                const response = await fetch(`/articles/${articleId}`);
                const data = await response.json();
                setArticle(data);
            } catch (error) {
                console.error('Ошибка при загрузке статьи', error);
            }
        };

        fetchArticle();
    }, [articleId]);

    const handleSave = async () => {
        try {
            if (userId === article.user_id) {
                await fetch(`/user/articles/${articleId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access_token')}`
                    },
                    body: JSON.stringify(article)
                });
            } else {
                await fetch(`/admin/articles/${articleId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access_token')}`
                    },
                    body: JSON.stringify(article)
                });
            }
            navigate(`/articles/${articleId}`);
        } catch (error) {
            console.error('Ошибка при сохранении статьи', error);
        }
    };

    return (
        <div className="add-article-container">
            <h1>Редактировать статью</h1>
            <input
                type="text"
                value={article.title}
                onChange={(e) => setArticle(prevArticle => ({...prevArticle, title: e.target.value}))}
                placeholder="Заголовок статьи"
                className="article-title-input"
            />
            <CKEditor
                editor={ClassicEditor}
                data={article.body}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setArticle(prevArticle => ({...prevArticle, body: data}));
                }}
            />
            <button type="submit" className="save-article-button" onClick={handleSave}>
                Сохранить статью
            </button>
        </div>
    );
};

export default EditArticle;
