DROP SCHEMA IF EXISTS Management;
CREATE SCHEMA Management;
USE Management;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('employee', 'manager') NOT NULL,
  total_absence_days INT DEFAULT 23,
  PRIMARY KEY (id)
);

CREATE TABLE absences (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);