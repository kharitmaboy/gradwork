import './Course.css'

function Index({ title, description }) {
    return (
        <div className="course-item">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default Index
