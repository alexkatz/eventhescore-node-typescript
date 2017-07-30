CREATE TABLE PlayerHighScore (PlayerId int NOT NULL, GameTypeId int NOT NULL, HighScore float, CONSTRAINT PK_PlayerHighScore_PlayerId_GameTypeId PRIMARY KEY (PlayerId, GameTypeId));
