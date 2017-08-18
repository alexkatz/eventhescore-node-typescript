CREATE TABLE UserHighScore (UserId int NOT NULL, GameTypeId int NOT NULL, HighScore float, CONSTRAINT PK_UserHighScore_UserId_GameTypeId PRIMARY KEY (UserId, GameTypeId));
