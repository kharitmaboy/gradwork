import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../AddArticle/AddArticle.css'
import Cookies from "js-cookie";

const EditArticle = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: '',
        body: ''
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
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
            await fetch(`/admin/articles/${articleId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(article)
            });
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
                onChange={(e) => setArticle({...article, title: e.target.value})}
                placeholder="Заголовок статьи"
                className="article-title-input"
            />
            <CKEditor
                editor={ClassicEditor}
                data={article.body}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setArticle({...article, body: data});
                }}
            />
            <button type="submit" className="save-article-button" onClick={handleSave}>
                Сохранить статью
            </button>
        </div>
    );
};

export default EditArticle;
