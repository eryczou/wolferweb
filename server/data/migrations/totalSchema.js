exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('relationship')
    .dropTableIfExists('comment')
    .dropTableIfExists('post_detail')
    .dropTableIfExists('post')
    .dropTableIfExists('profile')
    .dropTableIfExists('token')
    .dropTableIfExists('user')
    .raw(`CREATE TABLE user (
      user_id int(10) unsigned NOT NULL AUTO_INCREMENT,
      email varchar(63) NOT NULL,
      username varchar(63) DEFAULT NULL,
      password varchar(63) NOT NULL,
      status smallint(1) NOT NULL DEFAULT '0',
      last_login datetime DEFAULT NULL,
      time_created datetime DEFAULT NULL,
      time_updated datetime DEFAULT NULL,
      PRIMARY KEY (user_id),
      UNIQUE KEY user_email_unique (email),
      UNIQUE KEY user_username_unique (username),
      KEY user_email_index (email),
      KEY user_username_index (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
    .raw(`CREATE TABLE token (
      user_id int(10) unsigned NOT NULL,
      device varchar(31) NOT NULL,
      refresh varchar(63) DEFAULT NULL,
      time_created datetime DEFAULT NULL,
      time_updated datetime DEFAULT NULL,
      PRIMARY KEY (user_id, device),
      CONSTRAINT token_user_id_foreign FOREIGN KEY (user_id) REFERENCES user (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
    .raw(`CREATE TABLE profile (
      user_id int(10) unsigned NOT NULL DEFAULT '0',
      gender varchar(6) DEFAULT NULL,
      birthday varchar(10) DEFAULT NULL,
      headshot_url varchar(255) DEFAULT NULL,
      time_created datetime DEFAULT NULL,
      time_updated datetime DEFAULT NULL,
      PRIMARY KEY (user_id),
      CONSTRAINT profile_user_id_foreign FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
    .raw(`CREATE TABLE post (
      post_id int(10) unsigned NOT NULL AUTO_INCREMENT,
      user_id int(10) unsigned NOT NULL,
      slug varchar(127) DEFAULT NULL,
      title varchar(127) DEFAULT NULL,
      tag varchar(63) DEFAULT NULL,
      status tinyint(1) DEFAULT NULL,
      time_created datetime DEFAULT NULL,
      time_updated datetime DEFAULT NULL,
      PRIMARY KEY (post_id),
      KEY post_user_id_foreign_idx (user_id),
      CONSTRAINT post_user_id_foreign FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
    .raw(`CREATE TABLE post_detail (
      post_id int(10) unsigned NOT NULL,
      post_body tinytext NOT NULL,
      PRIMARY KEY (post_id),
      UNIQUE KEY post_id_UNIQUE (post_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
    .raw(`CREATE TABLE comment (
      comment_id int(10) unsigned NOT NULL,
      user_id int(10) unsigned NOT NULL,
      post_id int(10) unsigned NOT NULL,
      comment_body varchar(1023) DEFAULT NULL,
      status tinyint(1) DEFAULT NULL,
      time_created datetime DEFAULT NULL,
      time_updated datetime DEFAULT NULL,
      PRIMARY KEY (comment_id,user_id,post_id),
      UNIQUE KEY comment_id_UNIQUE (comment_id),
      UNIQUE KEY user_id_UNIQUE (user_id),
      UNIQUE KEY post_id_UNIQUE (post_id),
      CONSTRAINT comment_post_id_foreign FOREIGN KEY (post_id) REFERENCES post (post_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT comment_user_id_foreign FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
    .raw(`CREATE TABLE relationship (
      user_a int(10) unsigned NOT NULL,
      user_b int(10) unsigned NOT NULL,
      relation_type varchar(15) NOT NULL,
      status tinyint(1) DEFAULT NULL,
      time_created datetime DEFAULT NULL,
      time_updated datetime DEFAULT NULL,
      PRIMARY KEY (user_a,user_b),
      UNIQUE KEY user_a_UNIQUE (user_a),
      UNIQUE KEY user_b_UNIQUE (user_b),
      CONSTRAINT user_a_user_id_foreign FOREIGN KEY (user_a) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT user_b_user_id_foreign FOREIGN KEY (user_b) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
    .raw(``)
    .then(function() {
      console.log(`
      user table created
      token table created
      profile table created
      post table created
      post_detail table created
      comment table created
      relationship table created
      `)
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('user')
    .then(function() {
      console.log('Users table dropped')
    })
}
