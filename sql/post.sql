CREATE TABLE IF NOT EXISTS post (
  post_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_likes(
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  likes BOOLEAN DEFAULT 0,
  dislikes BOOLEAN DEFAULT 0,
  PRIMARY KEY (post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES post(post_id)
);