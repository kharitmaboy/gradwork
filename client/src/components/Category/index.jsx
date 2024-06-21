import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Category.css';

function Category({ id, name }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categories/${id}`, { state: { name } });
    };

    return (
        <li className="category" onClick={handleClick}>
            <Link to={`/categories/${id}`}>
                {name}
            </Link>
        </li>
    );
}

export default Category;
