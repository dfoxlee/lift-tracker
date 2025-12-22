create schema lift_tracker;

use lift_tracker;

create table
   ref_code_domain (
      ref_code_domain_id int primary key auto_increment,
      ref_code_domain_name varchar(200) not null unique
   );

create table
   ref_code (
      ref_code_id int primary key auto_increment,
      ref_code_name varchar(200) not null unique,
      ref_code_domain_id int,
      constraint FK_ref_code_ref_code_domain_id foreign key (ref_code_domain_id) references ref_code_domain (ref_code_domain_id)
   );

create table
   user(
      user_id int primary key auto_increment,
      email varchar(250) not null unique,
      hashed_password varchar(500) not null,
      token varchar(3000),
      created_date timestamp default current_timestamp not null,
      email_confirmation_token varchar(3000),
      confirmed_date timestamp,
      weight_unit_preference_id int,
      constraint FK_user_weight_unit_preference_id foreign key (weight_unit_preference_id) references ref_code (ref_code_id)
   );

create table
   workout (
      workout_id int primary key auto_increment,
      user_id int,
      workout_name varchar(200) not null,
      created_date timestamp default current_timestamp not null,
      constraint FK_workout_user_id foreign key (user_id) references user(user_id) on delete cascade
   );

create table
   exercise (
      exercise_id int primary key auto_increment,
      workout_id int,
      exercise_order int not null,
      exercise_name varchar(200) not null,
      constraint FK_exercise_workout_id foreign key (workout_id) references workout (workout_id) on delete cascade
   );

create table
   exercise_set (
      exercise_set_id int primary key auto_increment,
      exercise_id int,
      exercise_set_order int not null,
      reps int,
      weight decimal(10, 2),
      weight_unit_id int,
      constraint FK_exercise_set_exercise_id foreign key (exercise_id) references exercise (exercise_id) on delete cascade,
      constraint FK_exercise_set_weight_unit_id foreign key (weight_unit_id) references ref_code (ref_code_id)
   );

create table
   completed_workout (
      completed_workout_id int primary key auto_increment,
      user_id int not null,
      completed_workout_name varchar(200) not null,
      completed_date timestamp default current_timestamp not null,
      constraint FK_completed_workout_user_id foreign key (user_id) references user(user_id) on delete cascade
   );

create table
   completed_exercise (
      completed_exercise_id int primary key auto_increment,
      completed_workout_id int not null,
      completed_exercise_order int not null,
      completed_exercise_name varchar(200) not null,
      constraint FK_completed_exercise_completed_workout_id foreign key (completed_workout_id) references completed_workout (completed_workout_id) on delete cascade
   );

create table
   completed_exercise_set (
      completed_exercise_set_id int primary key auto_increment,
      completed_exercise_id int not null,
      completed_exercise_set_order int not null,
      completed_reps int,
      completed_weight decimal(10, 2),
      completed_weight_unit_id int,
      is_completed boolean default false not null,
      constraint FK_completed_exercise_set_completed_exercise_id foreign key (completed_exercise_id) references completed_exercise (completed_exercise_id) on delete cascade,
      constraint FK_completed_exercise_set_completed_weight_unit_id foreign key (completed_weight_unit_id) references ref_code (ref_code_id)
   );

insert into
   ref_code_domain (ref_code_domain_name)
values
   ('Weight Units');

insert into
   ref_code (ref_code_name, ref_code_domain_id)
values
   ('lb', 1),
   ('kg', 1);