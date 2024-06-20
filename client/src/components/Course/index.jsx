import { useNavigate } from 'react-router-dom';
import './Course.css';

function Course({ id, name, description }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/courses/${id}`, { state: { name, description } });
    };

    return (
        <div className="course-item" onClick={handleClick}>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Course;