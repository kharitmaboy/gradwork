import {Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Courses from "./components/Courses";
import Login from "./components/Login"
import CourseDetails from "./components/CourseDetails";
import CategoryDetails from "./components/CategoryDetails"
import Article from "./components/Article";
import Profile from "./components/Profile"
import {AuthProvider} from "./AuthContext";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path='/' element={<Courses/>}/>
                    <Route path="/courses/:courseId" element={<CourseDetails/>}/>
                    <Route path="/categories/:categoryId" element={<CategoryDetails/>}/>
                    <Route path="/articles/:articleId" element={<Article/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
