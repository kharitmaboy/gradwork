import React, { useEffect, useState } from 'react';
import {useLocation, useParams, Link} from 'react-router-dom';
import './CategoryDetails.css';

function CategoryDetails() {
    const {categoryId} = useParams();
    const location = useLocation();
    const [article, setArticle] = useState([]);
    const [category, setCategory] = useState({
        name: location.state?.name || '',
    });

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
    }, [categoryId, location.state]);

    if (!category) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="section-details-container">
            <h2>{category.name}</h2>
            <ul>
                {article.map(article => (
                    <li key={article.id} className="article">
                        <Link to={`/articles/${article.id}`}>
                            <h4>{article.title}</h4>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryDetails;