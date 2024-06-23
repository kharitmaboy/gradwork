import {Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Courses from "./components/Courses";
import Login from "./components/Login"
import CourseDetails from "./components/CourseDetails";
import CategoryDetails from "./components/CategoryDetails"
import Article from "./components/Article";
import Profile from "./components/Profile"
import {AuthProvider} from "./AuthContext";
import AddCategory from "./components/AddCategory";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import EditCategory from "./components/EditCategory";
import AddArticle from "./components/AddArticle";
import EditArticle from "./components/EditArticle";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

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
                    <Route path="/courses/:courseId/category-edit" element={<AddCategory/>}/>
                    <Route path="/course-edit" element={<AddCourse/>}/>
                    <Route path="/course-edit/:courseId" element={<EditCourse/>}/>
                    <Route path="/category-edit/:categoryId" element={<EditCategory/>}/>
                    <Route path="/categories/:categoryId/article-edit" element={<AddArticle/>}/>
                    <Route path="/article-edit/:articleId" element={<EditArticle/>}/>
                    <Route path="/create-user" element={<CreateUser/>}/>
                    <Route path="/edit-user/:userId" element={<EditUser/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
