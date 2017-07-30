CREATE TABLE Game_Player_Join (GameId int NOT NULL, PlayerId int NOT NULL, Score float, Rank int, CONSTRAINT PK_Game_Player_Join_GameId_PlayerId PRIMARY KEY (GameId, PlayerId));
