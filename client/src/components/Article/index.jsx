import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ReactHTMLParser from 'html-react-parser';
import './Article.css';
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import AuthContext from "../../AuthContext";

function Article() {
    const {articleId} = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    const {isAuthenticated} = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetch(`/articles/${articleId}`)
            .then(response => response.json())
            .then(data => setArticle(data))
            .catch(error => console.error('Error fetching article details:', error));

        const token = Cookies.get('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id)
            if (decodedToken.status === 'admin') {
                setIsAdmin(true);
            }
        }

        fetch(`/articles/${articleId}/author`)
            .then(response => response.json())
            .then(data => setAuthorName(data))
            .catch(error => console.error('Error fetching article details:', error));
    }, [articleId]);

    const handleEdit = () => {
        navigate(`/article-edit/${articleId}`);
    };

    const handleDelete = async () => {
        if (userId === article.user_id) {
            try {
                await fetch(`/user/articles/${articleId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access_token')}` // Предположим, что токен хранится в localStorage
                    }
                });
                navigate(`/`); // Перенаправить на страницу со списком статей после удаления
            } catch (error) {
                console.error('Ошибка при удалении статьи', error);
            }
        } else {
            try {
                await fetch(`/admin/articles/${articleId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access_token')}` // Предположим, что токен хранится в localStorage
                    }
                });
                navigate(`/`); // Перенаправить на страницу со списком статей после удаления
            } catch (error) {
                console.error('Ошибка при удалении статьи', error);
            }
        }
    };

    if (!article) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="article-container">
            <h2>{article.title}</h2>
            <p className="article-info">
                Автор: {authorName} | Дата создания: {new Date(article.date).toLocaleDateString()}
            </p>
            {(isAdmin || userId === article.user_id) && isAuthenticated && (
                <div className="article-actions">
                    <button className="edit-btn-article" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <button className="delete-btn-article" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
                </div>
            )}
            <div className="article-content">
                {ReactHTMLParser(article.body)}
            </div>
        </div>
    );
}

export default Article;