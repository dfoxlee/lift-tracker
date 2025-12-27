create schema lift_tracker;

use lift_tracker;

CREATE TABLE
   `ref_code_domain` (
      `ref_code_domain_id` int NOT NULL AUTO_INCREMENT,
      `ref_code_domain_name` varchar(200) NOT NULL,
      PRIMARY KEY (`ref_code_domain_id`),
      UNIQUE KEY `ref_code_domain_name` (`ref_code_domain_name`)
   ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `ref_code` (
      `ref_code_id` int NOT NULL AUTO_INCREMENT,
      `ref_code_name` varchar(200) NOT NULL,
      `ref_code_domain_id` int DEFAULT NULL,
      PRIMARY KEY (`ref_code_id`),
      UNIQUE KEY `ref_code_name` (`ref_code_name`),
      KEY `FK_ref_code_ref_code_domain_id` (`ref_code_domain_id`),
      CONSTRAINT `FK_ref_code_ref_code_domain_id` FOREIGN KEY (`ref_code_domain_id`) REFERENCES `ref_code_domain` (`ref_code_domain_id`)
   ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `user` (
      `user_id` int NOT NULL AUTO_INCREMENT,
      `email` varchar(250) NOT NULL,
      `hashed_password` varchar(500) NOT NULL,
      `token` varchar(3000) DEFAULT NULL,
      `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `email_confirmation_token` varchar(3000) DEFAULT NULL,
      `confirmed_date` timestamp NULL DEFAULT NULL,
      `weight_unit_preference_id` int DEFAULT NULL,
      PRIMARY KEY (`user_id`),
      UNIQUE KEY `email` (`email`),
      KEY `FK_user_weight_unit_preference_id` (`weight_unit_preference_id`),
      CONSTRAINT `FK_user_weight_unit_preference_id` FOREIGN KEY (`weight_unit_preference_id`) REFERENCES `ref_code` (`ref_code_id`)
   ) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `workout` (
      `workout_id` int NOT NULL AUTO_INCREMENT,
      `user_id` int DEFAULT NULL,
      `workout_name` varchar(200) NOT NULL,
      `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`workout_id`),
      KEY `FK_workout_user_id` (`user_id`),
      CONSTRAINT `FK_workout_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
   ) ENGINE = InnoDB AUTO_INCREMENT = 44 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `exercise` (
      `exercise_id` int NOT NULL AUTO_INCREMENT,
      `workout_id` int DEFAULT NULL,
      `exercise_order` int NOT NULL,
      `exercise_name` varchar(200) NOT NULL,
      `latest_exercise_note` varchar(500) DEFAULT NULL,
      PRIMARY KEY (`exercise_id`),
      KEY `FK_exercise_workout_id` (`workout_id`),
      CONSTRAINT `FK_exercise_workout_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`workout_id`) ON DELETE CASCADE
   ) ENGINE = InnoDB AUTO_INCREMENT = 110 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `exercise_set` (
      `exercise_set_id` int NOT NULL AUTO_INCREMENT,
      `exercise_id` int DEFAULT NULL,
      `exercise_set_order` int NOT NULL,
      `reps` int DEFAULT NULL,
      `weight` decimal(10, 2) DEFAULT NULL,
      `weight_unit_id` int DEFAULT NULL,
      `latest_exercise_set_note` varchar(500) DEFAULT NULL,
      PRIMARY KEY (`exercise_set_id`),
      KEY `FK_exercise_set_exercise_id` (`exercise_id`),
      KEY `FK_exercise_set_weight_unit_id` (`weight_unit_id`),
      CONSTRAINT `FK_exercise_set_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`exercise_id`) ON DELETE CASCADE,
      CONSTRAINT `FK_exercise_set_weight_unit_id` FOREIGN KEY (`weight_unit_id`) REFERENCES `ref_code` (`ref_code_id`)
   ) ENGINE = InnoDB AUTO_INCREMENT = 320 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `completed_workout` (
      `completed_workout_id` int NOT NULL AUTO_INCREMENT,
      `user_id` int NOT NULL,
      `completed_workout_name` varchar(200) NOT NULL,
      `completed_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`completed_workout_id`),
      KEY `FK_completed_workout_user_id` (`user_id`),
      CONSTRAINT `FK_completed_workout_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
   ) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `completed_exercise` (
      `completed_exercise_id` int NOT NULL AUTO_INCREMENT,
      `completed_workout_id` int NOT NULL,
      `completed_exercise_order` int NOT NULL,
      `completed_exercise_name` varchar(200) NOT NULL,
      `completed_exercise_notes` varchar(500) DEFAULT NULL,
      `user_id` int DEFAULT NULL,
      PRIMARY KEY (`completed_exercise_id`),
      KEY `FK_completed_exercise_completed_workout_id` (`completed_workout_id`),
      KEY `FK_completed_exercise_user_id` (`user_id`),
      CONSTRAINT `FK_completed_exercise_completed_workout_id` FOREIGN KEY (`completed_workout_id`) REFERENCES `completed_workout` (`completed_workout_id`) ON DELETE CASCADE,
      CONSTRAINT `FK_completed_exercise_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
   ) ENGINE = InnoDB AUTO_INCREMENT = 98 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
   `completed_exercise_set` (
      `completed_exercise_set_id` int NOT NULL AUTO_INCREMENT,
      `completed_exercise_id` int NOT NULL,
      `completed_exercise_set_order` int NOT NULL,
      `completed_reps` int DEFAULT NULL,
      `completed_weight` decimal(10, 2) DEFAULT NULL,
      `completed_weight_unit_id` int DEFAULT NULL,
      `is_completed` tinyint(1) NOT NULL DEFAULT '0',
      `completed_exercise_set_notes` varchar(500) DEFAULT NULL,
      PRIMARY KEY (`completed_exercise_set_id`),
      KEY `FK_completed_exercise_set_completed_exercise_id` (`completed_exercise_id`),
      KEY `FK_completed_exercise_set_completed_weight_unit_id` (`completed_weight_unit_id`),
      CONSTRAINT `FK_completed_exercise_set_completed_exercise_id` FOREIGN KEY (`completed_exercise_id`) REFERENCES `completed_exercise` (`completed_exercise_id`) ON DELETE CASCADE,
      CONSTRAINT `FK_completed_exercise_set_completed_weight_unit_id` FOREIGN KEY (`completed_weight_unit_id`) REFERENCES `ref_code` (`ref_code_id`)
   ) ENGINE = InnoDB AUTO_INCREMENT = 312 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
   `ref_code_domain` (`ref_code_domain_name`)
VALUES
   ('Weight Units');

INSERT INTO
   `ref_code` (
      `ref_code_name`,
      `ref_code_domain_id`
   )
VALUES
   ('lb', 1),
   ('kg', 1);