import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';

function Article() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch(`/articles/${articleId}`)
            .then(response => response.json())
            .then(data => setArticle(data))
            .catch(error => console.error('Error fetching article details:', error));
    }, [articleId]);

    if (!article) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="article-container">
            <h2>{article.title}</h2>
            <div className="article-content">
                {article.body}
            </div>
        </div>
    );
}

export default Article;