CREATE TABLE IF NOT EXISTS comment (
  comment_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  create_time TIMESTAMP NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comment_likes(
  comment_id INT NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  likes BOOLEAN DEFAULT 0,
  dislikes BOOLEAN DEFAULT 0,
  PRIMARY KEY (comment_id, post_id, user_id),
  FOREIGN KEY (comment_id) REFERENCES comment(comment_id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user_info(user_id) ON DELETE CASCADE
);