import React, {useEffect, useState} from 'react';
import Course from '../Course';
import './Courses.css';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/courses')
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    return (
        <main>
            <div>
                <h2>Доступные курсы</h2>
                <div className="course-list">
                    {courses.map(course => (
                        <Course key={course.id} id={course.id} name={course.name} description={course.description}/>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Courses;