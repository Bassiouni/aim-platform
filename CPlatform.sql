CREATE TYPE "Entity" AS ENUM (
  'USER',
  'PERMISSION',
  'COURSE',
  'GALLERY',
  'LESSON',
  'LEVEL'
);

CREATE TYPE "Action" AS ENUM (
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
);

CREATE TABLE "user" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL
);

CREATE TABLE "enrolled_course" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "course_id" integer NOT NULL,
  "user_id" integer NOT NULL
);

CREATE TABLE "course" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL
);

CREATE TABLE "level" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "course_id" integer NOT NULL
);

CREATE TABLE "lesson" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "content_file" path NOT NULL,
  "level_id" integer NOT NULL
);

CREATE TABLE "visited_lesson" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "lesson_id" integer NOT NULL
);

CREATE TABLE "gallery" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "photo_path" path NOT NULL,
  "user_id" integer NOT NULL
);

CREATE TABLE "permission" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "entity" Entity,
  "action" Action
);

CREATE TABLE "user_permission" (
  "id" integer UNIQUE PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "permission_id" integer NOT NULL
);

ALTER TABLE "enrolled_course" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "enrolled_course" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "level" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("id");

ALTER TABLE "lesson" ADD FOREIGN KEY ("level_id") REFERENCES "level" ("id");

ALTER TABLE "visited_lesson" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "visited_lesson" ADD FOREIGN KEY ("lesson_id") REFERENCES "lesson" ("id");

ALTER TABLE "gallery" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_permission" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "permission" ("id");
