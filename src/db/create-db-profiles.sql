DROP TABLE IF EXISTS profiles; 

CREATE TABLE IF NOT EXISTS profiles 
  ( 
     id         INT PRIMARY KEY auto_increment, 
    user_id    INT NOT NULL,
    address VARCHAR(50)NOT NULL,
    CONSTRAINT `fk_profile_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `nodeApp`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  ); 
  