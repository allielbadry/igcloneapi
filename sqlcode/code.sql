-- create the database
CREATE DATABASE igclone;

-- use the database
USE igclone;

-- user schema
CREATE TABLE users(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);

-- photo schema
CREATE TABLE photos(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(user_id) 
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- comment schema
CREATE TABLE comments(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment_text VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    photo_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY(photo_id)
    REFERENCES photos(id)
    ON DELETE CASCADE
);

-- like schema
CREATE TABLE likes(
    user_id INTEGER NOT NULL,
    photo_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY(photo_id)
    REFERENCES photos(id)
    ON DELETE CASCADE,
    PRIMARY KEY(user_id, photo_id)
);

-- follow schema
CREATE TABLE follows(
    follower_id INTEGER NOT NULL,
    followee_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(follower_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY(followee_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    PRIMARY KEY(follower_id, followee_id)
);

-- tag schema
CREATE TABLE tags(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE
);

-- photo - tag schema
CREATE TABLE photo_tags(
    photo_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY(photo_id)
    REFERENCES photos(id)
    ON DELETE CASCADE,
    FOREIGN KEY(tag_id)
    REFERENCES tags(id)
    ON DELETE CASCADE,
    PRIMARY KEY(photo_id, tag_id)
);

-- select username,
-- count(*) as total
-- from users
-- inner join likes
--  on users.id = likes.user_id
-- group by users.id
-- having total = (select count(*) from photos);