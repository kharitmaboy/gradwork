import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams, Link, useNavigate} from 'react-router-dom';
import Category from "../Category";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import './CourseDetails.css';
import AuthContext from "../../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function CourseDetails() {
    const {courseId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [course, setCourse] = useState({
        name: location.state?.name || '',
        description: location.state?.description || '',
    });
    const [isAdmin, setIsAdmin] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (!location.state) {
            fetch(`/courses/${courseId}`)
                .then(response => response.json())
                .then(data => setCourse(data))
                .catch(error => console.error('Error fetching course details:', error));
            fetch(`/courses/${courseId}/categories`)
                .then(response => response.json())
                .then(data => setCategory(data))
                .catch(error => console.error('Error fetching course details:', error));
        } else {
            fetch(`/courses/${courseId}/categories`)
                .then(response => response.json())
                .then(data => setCategory(data))
                .catch(error => console.error('Error fetching course details:', error));
        }

        const token = Cookies.get('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.status === 'admin') {
                setIsAdmin(true);
            }
        }

    }, [courseId, location.state]);

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот курс?')) {
            try {
                const response = await fetch(`/admin/courses/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                if (response.ok) {
                    navigate('/courses');
                } else {
                    console.error('Ошибка при удалении курса');
                }
            } catch (error) {
                console.error('Ошибка при удалении курса', error);
            }
        }
    };

    if (!course) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="course-details-container">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            {isAdmin && isAuthenticated && (
                <div className="course-actions">
                    <Link to={`/course-edit/${courseId}`} className="edit-button">
                        <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                    <button onClick={handleDelete} className="delete-button">
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
                </div>
            )}
            <h3>Разделы курса</h3>
            <ul>
                {category.map(category => (
                    <Category id={category.id} name={category.name}/>
                ))}
            </ul>
            {isAdmin && isAuthenticated && (
                <Link to={`/courses/${courseId}/category-edit`} className="add-section-button">
                    Добавить раздел
                </Link>
            )}
        </div>
    );
}

export default CourseDetails;