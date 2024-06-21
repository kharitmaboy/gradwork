import {Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Courses from "./components/Courses";
import Login from "./components/Login"
import CourseDetails from "./components/CourseDetails";
import CategoryDetails from "./components/CategoryDetails"

function App() {
    return (
        <div className="App">
            <Header/>

            <Routes>
                <Route path='/' element={<Courses/>}/>
                <Route path="/courses/:courseId" element={<CourseDetails/>}/>
                <Route path="/categories/:categoryId" element={<CategoryDetails/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>

            {/*<Footer/>*/}
        </div>
    );
}

export default App;
