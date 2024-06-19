import Header from "./components/Header";
import Footer from "./components/Footer";
import Course from "./components/Course";

function App() {
    return (
        <div className="App">
            <Header/>

            <main>
                <div className="container">
                    <h2>Доступные курсы</h2>
                    <div className="course-list">
                        <Course title="Введение в Web-технологии" description="Основы HTML, CSS и JavaScript." />
                        <Course title="Продвинутый JavaScript" description="Продвинутые темы JavaScript, такие как замыкания, прототипы и асинхронное программирование." />
                        <Course title="Разработка на React" description="Создание интерактивных пользовательских интерфейсов с использованием React." />
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default App;
