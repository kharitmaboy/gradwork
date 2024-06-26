INSERT INTO users (username, password_hash, name, surname, email, status)
VALUES ('admin', '4d5045494772616475617465576f726b53616c74466f7250617373b1b3773a05c0ed0176787a4f1574ff0075f7521e',
        'Андрей', 'Харитонов', 'example@mail.ru', 'admin'),
       ('user', '4d5045494772616475617465576f726b53616c74466f7250617373b1b3773a05c0ed0176787a4f1574ff0075f7521e',
        'Дмитрий', 'Сапрыкин', 'example_d@mail.ru', 'user');

INSERT INTO courses (name, description)
VALUES ('Разработка на React', 'Создание интерактивных пользовательских интерфейсов с использованием React'),
       ('Введение в Web-технологии', 'Основы HTML, CSS и JavaScript'),
       ('Продвинутый JavaScript',
        'Продвинутые темы JavaScript, такие как замыкания, прототипы и асинхронное программирование');

INSERT INTO categories (name, course_id)
VALUES ('Введение в React', 1),
       ('Основные концепции React', 1),
       ('Управление состоянием', 1),
       ('Работа с формами', 1),
       ('Роутинг в React', 1),
       ('Введение', 2),
       ('Основы HTML', 2),
       ('Основы CSS', 2),
       ('Основы JavaScript', 2),
       ('Практика и проекты', 2),
       ('Введение', 3),
       ('Современный JavaScript (ES6 и далее)', 3),
       ('Асинхронное программирование', 3),
       ('Работа с данными', 3),
       ('Продвинутая работа с функциями', 3);

INSERT INTO articles (title, body, date, user_id, category_id)
VALUES ('Введение',
        'React — это популярная JavaScript-библиотека для создания пользовательских интерфейсов, разработанная компанией Facebook. Она используется для построения динамических и интерактивных веб-приложений. Основной концепцией React является компонентный подход, который позволяет разбивать интерфейс на независимые, переиспользуемые части',
        now(), 1, 1);