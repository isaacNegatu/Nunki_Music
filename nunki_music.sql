CREATE DATABASE "nunki_music";

CREATE TABLE "artist"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"artist_api_url" VARCHAR(255) NOT NULL
);

CREATE TABLE "track"(
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL,
	"image_url" VARCHAR(255) NOT NULL,
	"track_api_url" VARCHAR(255) NOT NULL,
	"artist_id" INT REFERENCES "artist"
);

CREATE TABLE "playlist"(
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "track_playlist"(
	"track_id" INT NOT NULL REFERENCES "track",
	"playlist_id" INT NOT NULL REFERENCES "playlist"
);
