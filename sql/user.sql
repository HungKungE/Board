CREATE TABLE IF NOT EXISTS user_info (
  user_id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(20) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  join_time TIMESTAMP NOT NULL,
  user_role ENUM('admin', 'user') NOT NULL,
  PRIMARY KEY (user_id)
);
