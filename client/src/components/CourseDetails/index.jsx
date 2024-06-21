import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import Category from "../Category";
import './CourseDetails.css';

function CourseDetails() {
    const {courseId} = useParams();
    const location = useLocation();
    const [category, setCategory] = useState([]);
    const [course, setCourse] = useState({
        name: location.state?.name || '',
        description: location.state?.description || '',
    });

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
    }, [courseId, location.state]);

    if (!course) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="course-details-container">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <h3>Разделы курса</h3>
            <ul>
                {category.map(category => (
                    <Category id={category.id} name={category.name} />
                ))}
            </ul>
        </div>
    );
}

export default CourseDetails;