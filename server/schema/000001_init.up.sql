CREATE TYPE status AS ENUM ('admin', 'user');

CREATE TABLE users
(
    id            serial       not null unique,
    username      varchar(31)  not null unique,
    password_hash varchar(255) not null,
    name          varchar(31),
    surname       varchar(31),
    email         varchar(63),
    status        status       not null
);

CREATE TABLE courses
(
    id          serial       not null unique,
    name        varchar(31)  not null unique,
    description varchar(255) not null
);

CREATE TABLE categories
(
    id        serial                                        not null unique,
    name      varchar(255)                                  not null unique,
    course_id int references courses (id) on delete cascade not null
);

CREATE TABLE articles
(
    id          serial                                           not null unique,
    title       varchar(255)                                     not null unique,
    body        varchar                                          not null,
    date        timestamp,
    user_id     int references users (id) on delete cascade      not null,
    category_id int references categories (id) on delete cascade not null
);