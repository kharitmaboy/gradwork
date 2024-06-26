import React, {useEffect, useState, useContext} from 'react';
import {Link} from "react-router-dom";
import Course from '../Course';
import './Courses.css';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import AuthContext from "../../AuthContext";

function Courses() {
    const { isAuthenticated } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/courses')
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
            .catch(error => console.error('Error fetching courses:', error));

        const token = Cookies.get('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.status === 'admin') {
                setIsAdmin(true);
            }
        }
    }, []);

    return (
        <main>
            <div>
                <h2>Доступные курсы</h2>
                <div className="course-list">
                    {courses && ( courses.map(course => (
                        <Course key={course.id} id={course.id} name={course.name} description={course.description}/>
                    )))}
                </div>
                {isAdmin && isAuthenticated && (
                    <Link to="/course-edit" className="add-course-button">
                        Добавить курс
                    </Link>
                )}
            </div>
        </main>
    );
}

export default Courses;