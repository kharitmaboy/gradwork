import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import AuthContext from "../../AuthContext";
import './CategoryDetails.css';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

function CategoryDetails() {
    const {categoryId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [article, setArticle] = useState([]);
    const [category, setCategory] = useState({
        name: location.state?.name || '',
    });
    const {isAuthenticated} = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!location.state) {
            fetch(`/categories/${categoryId}`)
                .then(response => response.json())
                .then(data => setCategory(data))
                .catch(error => console.error('Error fetching course details:', error));
            fetch(`/categories/${categoryId}/articles`)
                .then(response => response.json())
                .then(data => setArticle(data))
                .catch(error => console.error('Error fetching course details:', error));
        } else {
            fetch(`/categories/${categoryId}/articles`)
                .then(response => response.json())
                .then(data => setArticle(data))
                .catch(error => console.error('Error fetching course details:', error));
        }

        const token = Cookies.get('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.status === 'admin') {
                setIsAdmin(true);
            }
        }
    }, [categoryId, location.state]);

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот раздел?')) {
            try {
                const response = await fetch(`/admin/categories/${categoryId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                if (response.ok) {
                    navigate(`/`);
                } else {
                    console.error('Ошибка при удалении раздела');
                }
            } catch (error) {
                console.error('Ошибка при удалении раздела', error);
            }
        }
    };

    const handleAddArticle = () => {
        navigate(`/categories/${categoryId}/article-edit`);
    };

    if (!category) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="section-details-container">
            <h2>{category.name}</h2>
            {isAdmin && isAuthenticated && (
                <div className="section-actions">
                    <button onClick={() => navigate(`/category-edit/${categoryId}`)} className="edit-button-ctg">
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <button onClick={handleDelete} className="delete-button-ctg">
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
                </div>
            )}
            <ul>
                {article.map(article => (
                    <li key={article.id} className="article">
                        <Link to={`/articles/${article.id}`}>
                            <h4>{article.title}</h4>
                        </Link>
                    </li>
                ))}
            </ul>
            {isAuthenticated && (
                <button onClick={handleAddArticle} className="add-article-button">
                    Добавить статью
                </button>
            )}
        </div>
    );
}

export default CategoryDetails;