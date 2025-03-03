DROP SCHEMA IF EXISTS volunteer;
CREATE SCHEMA volunteer;
USE volunteer;

/* DATABASE SCHEMA */
CREATE TABLE admin (
    admin_id SMALLINT UNSIGNED NOT NULL,
    password VARCHAR(45) NOT NULL,
    username VARCHAR(40) DEFAULT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (admin_id)
);

CREATE TABLE country (
    country_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (country_id),
    country VARCHAR(50) NOT NULL
);

CREATE TABLE city (
    city_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (city_id),
    city VARCHAR(50) NOT NULL,
    country_id SMALLINT UNSIGNED NOT NULL,
    KEY idx_country_id (country_id),
    CONSTRAINT fk_city_country FOREIGN KEY (country_id) REFERENCES country (country_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE address (
    address_id SMALLINT UNSIGNED AUTO_INCREMENT,
    address VARCHAR(50) NOT NULL,
    city_id SMALLINT UNSIGNED NOT NULL,
    postal_code SMALLINT UNSIGNED DEFAULT NULL,
    PRIMARY KEY (address_id),
    KEY idx_city_id (city_id),
    CONSTRAINT fk_address_city FOREIGN KEY (city_id) REFERENCES city (city_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE managers (
    manager_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(40) NOT NULL,
    create_date DATETIME NOT NULL,
    address_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (manager_id),
    KEY idx_fk_last_name (last_name),
    CONSTRAINT fk_manager_address FOREIGN KEY (address_id) REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE organisation (
    organisation_id SMALLINT UNSIGNED AUTO_INCREMENT,
    organisation_name VARCHAR(50) NOT NULL,
    organisation_description VARCHAR(250) NOT NULL,
    address_id SMALLINT UNSIGNED NOT NULL,
    manager_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (organisation_id),
    CONSTRAINT fk_organisation_manager FOREIGN KEY (manager_id) REFERENCES managers (manager_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_organisation_address FOREIGN KEY (address_id) REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE user (
    user_id SMALLINT UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    email VARCHAR(40) DEFAULT NULL,
    create_date DATETIME NOT NULL,
    address_id SMALLINT UNSIGNED NOT NULL,
    organisation_id SMALLINT UNSIGNED DEFAULT NULL,
    PRIMARY KEY (user_id),
    KEY idx_fk_last_name (last_name),
    CONSTRAINT fk_user_address FOREIGN KEY (address_id) REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_user_organisation FOREIGN KEY (organisation_id) REFERENCES organisation (organisation_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE events (
    event_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    address_id SMALLINT UNSIGNED NOT NULL,
    organisation_id SMALLINT UNSIGNED NOT NULL,
    manager_id SMALLINT UNSIGNED NOT NULL,
    event_name VARCHAR(50) NOT NULL,
    event_description VARCHAR(250) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_date DATETIME NOT NULL,
    PRIMARY KEY (event_id),
    KEY idx_organisation_id (organisation_id),
    KEY idx_manager_id (manager_id),
    CONSTRAINT fk_event_organisation FOREIGN KEY (organisation_id) REFERENCES organisation (organisation_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_event_manager FOREIGN KEY (manager_id) REFERENCES managers (manager_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_event_address FOREIGN KEY (address_id) REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE email (
    email_id SMALLINT UNSIGNED NOT NULL,
    user_id SMALLINT UNSIGNED NOT NULL,
    manager_id SMALLINT UNSIGNED NOT NULL,
    email_address VARCHAR(50) NOT NULL,
    PRIMARY KEY (email_id),
    CONSTRAINT fk_email_user FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_email_manager FOREIGN KEY (manager_id) REFERENCES managers (manager_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE rsvp (
    rsvp_id SMALLINT UNSIGNED AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    event_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (rsvp_id),
    CONSTRAINT fk_rsvp_user FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_rsvp_event FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE posts (
    post_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    organisation_id SMALLINT UNSIGNED NOT NULL,
    author_type ENUM('manager', 'admin') NOT NULL,
    author_id SMALLINT UNSIGNED NOT NULL,
    post_title VARCHAR(100) NOT NULL,
    post_content TEXT NOT NULL,
    visibility ENUM('public', 'private') NOT NULL,
    post_date DATETIME NOT NULL,
    PRIMARY KEY (post_id),
    CONSTRAINT fk_posts_organisation FOREIGN KEY (organisation_id) REFERENCES organisation (organisation_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_posts_author_manager FOREIGN KEY (author_id) REFERENCES managers (manager_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_posts_author_admin FOREIGN KEY (author_id) REFERENCES admin (admin_id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* DATA ENTRIES */
INSERT INTO admin(admin_id, first_name, last_name, username, password) VALUES
(1, 'John', 'Doe', 'johndoe', 'password1'),
(2, 'Jane', 'Smith', 'janesmith', 'password2'),
(3, 'Robert', 'Brown', 'robertbrown', 'password3'),
(4, 'Emily', 'Davis', 'emilydavis', 'password4');

INSERT INTO country (country_id, country) VALUES
(1, 'Australia');

INSERT INTO city (city_id, city, country_id) VALUES
(1, 'Sydney', 1);

INSERT INTO address (address_id, address, city_id, postal_code) VALUES
(1, '123 Main St', 1, 2000),
(2, '456 Elm St', 1, 2001),
(3, '789 Pine St', 1, 2002),
(4, '101 Maple St', 1, 2003),
(5, '202 Oak St', 1, 2004);

INSERT INTO managers (first_name, last_name, email, create_date, address_id) VALUES
('Michael', 'Jordan', 'michael.jordan@example.com', '2024-06-03 12:00:00', 1),
('LeBron', 'James', 'lebron.james@example.com', '2024-06-03 12:00:00', 2),
('Kobe', 'Bryant', 'kobe.bryant@example.com', '2024-06-03 12:00:00', 3),
('Tim', 'Duncan', 'tim.duncan@example.com', '2024-06-03 12:00:00', 4),
('Shaquille', 'ONeal', 'shaquille.oneal@example.com', '2024-06-03 12:00:00', 5);

INSERT INTO organisation (organisation_id, organisation_name, organisation_description, address_id, manager_id) VALUES
(1, 'Wildlife Conservation', 'Dedicated to protecting wildlife and their habitats', 1, 1),
(2, 'Urban Development', 'Focus on sustainable urban growth and planning', 2, 2),
(3, 'Green Energy', 'Promoting renewable energy sources and practices', 3, 3),
(4, 'Community Outreach', 'Supporting local communities through various programs', 4, 4),
(5, 'Arts & Culture', 'Encouraging artistic expression and cultural appreciation', 5, 5);

INSERT INTO user (first_name, last_name, username, password, email, create_date, address_id, organisation_id) VALUES
('Alice', 'Johnson', 'alicej', 'alicepass', 'alice.johnson@example.com', '2024-06-03 12:00:00', 1, 1),
('Bob', 'Williams', 'bobw', 'bobpass', 'bob.williams@example.com', '2024-06-03 12:00:00', 2, 2),
('Charlie', 'Miller', 'charliem', 'charliepass', 'charlie.miller@example.com', '2024-06-03 12:00:00', 3, 3),
('Diana', 'Moore', 'dianam', 'dianapass', 'diana.moore@example.com', '2024-06-03 12:00:00', 4, 4),
('Edward', 'Taylor', 'edwardt', 'edwardpass', 'edward.taylor@example.com', '2024-06-03 12:00:00', 5, 5);

INSERT INTO events (address_id, organisation_id, manager_id, event_name, event_description, event_type, event_date) VALUES
(1, 1, 1, 'Wildlife Awareness Day', 'Raising awareness about wildlife conservation', 'Education', '2024-07-01 10:00:00'),
(2, 2, 2, 'Urban Planning Workshop', 'Workshop on sustainable urban planning', 'Workshop', '2024-07-15 09:00:00'),
(3, 3, 3, 'Green Energy Summit', 'Summit on renewable energy initiatives', 'Conference', '2024-08-10 08:30:00'),
(4, 4, 4, 'Community Health Fair', 'Health fair for local community members', 'Health', '2024-09-05 11:00:00'),
(5, 5, 5, 'Art Exhibition', 'Exhibition showcasing local artists', 'Exhibition', '2024-10-20 14:00:00');


INSERT INTO rsvp (user_id, event_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO posts (organisation_id, author_type, author_id, post_title, post_content, visibility, post_date) VALUES
(1, 'manager', 1, 'Welcome to Wildlife Conservation', 'Join us in our mission to protect wildlife.', 'public', '2024-06-03 12:00:00'),
(2, 'manager', 2, 'Urban Planning Updates', 'Latest updates on urban development projects.', 'public', '2024-06-04 14:00:00'),
(3, 'manager', 3, 'Green Energy Initiatives', 'Learn about our new renewable energy projects.', 'public', '2024-06-05 16:00:00'),
(4, 'manager', 4, 'Community Outreach Programs', 'Details about upcoming community support activities.', 'public', '2024-06-06 10:00:00'),
(5, 'manager', 4, 'Arts & Culture Events', 'Upcoming events celebrating arts and culture.', 'public', '2024-06-07 08:00:00');
/* Sample Queries */
-- List users with address ID 1
SELECT user.first_name, user.last_name, address.address
FROM user
INNER JOIN address ON user.address_id = address.address_id
WHERE address.address_id = 1;

-- List organisations and their managers
SELECT organisation.organisation_id, organisation.organisation_name, managers.first_name, managers.last_name
FROM organisation
JOIN managers ON organisation.manager_id = managers.manager_id;
