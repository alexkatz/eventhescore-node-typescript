CREATE TABLE ets.Game_User_Join (GameId int NOT NULL, UserId int NOT NULL, Score float, Rank int, CONSTRAINT PK_Game_User_Join_GameId_UserId PRIMARY KEY (GameId, UserId));
