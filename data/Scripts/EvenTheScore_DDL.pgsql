SET search_path TO dbo;

-- Drop statements to reset db --

DROP TABLE Game;
DROP TABLE GameSet;
DROP TABLE GameType;
DROP TABLE GameTypeConfig;
DROP TABLE GameAttribute;
DROP TABLE User;
DROP TABLE Game_User_Join;
DROP TABLE UserHighScore;



-- Create base tables

CREATE TABLE Game (GameId SERIAL, GameTypeId INT NOT NULL, GameSetId INT, GameName VARCHAR(128), StartDt TIMESTAMP WITH TIME ZONE NOT NULL, EndDt TIMESTAMP WITH TIME ZONE);
CREATE TABLE GameSet (GameSetId SERIAL, GameTypeId INT NOT NULL, GameSetName VARCHAR(128), StartDt TIMESTAMP WITH TIME ZONE NOT NULL, EndDt TIMESTAMP WITH TIME ZONE);
CREATE TABLE GameType (GameTypeId int NOT NULL, GameTypeName VARCHAR(128), CONSTRAINT PK_GameType_GameTypeId PRIMARY KEY (GameTypeId));
CREATE TABLE GameTypeConfig (GameTypeId int NOT NULL, AttributeName VARCHAR(128) NOT NULL, CONSTRAINT PK_GameTypeConfig_GameTypeId_AttributeName PRIMARY KEY (GameTypeId, AttributeName));
CREATE TABLE GameAttribute (GameId int NOT NULL, AttributeName VARCHAR(128) NOT NULL, AttributeValue VARCHAR(500), CONSTRAINT PK_GameAttribute_GameId_AttributeName PRIMARY KEY (GameId, AttributeName));
CREATE TABLE User (UserId SERIAL, UserName VARCHAR(128) NOT NULL, Email VARCHAR(128) NOT NULL, ProfilePicUrl VARCHAR(500), Nickname VARCHAR(128), CONSTRAINT UK_User_Email UNIQUE (Email));
CREATE TABLE Game_User_Join (GameId int NOT NULL, UserId int NOT NULL, Score float, Rank int, CONSTRAINT PK_Game_User_Join_GameId_UserId PRIMARY KEY (GameId, UserId));
CREATE TABLE UserHighScore (UserId int NOT NULL, GameTypeId int NOT NULL, HighScore float, CONSTRAINT PK_UserHighScore_UserId_GameTypeId PRIMARY KEY (UserId, GameTypeId));

-- INSERT mock data

INSERT INTO GameType(GameTypeId, GameTypeName) VALUES (1, 'Pool');

INSERT INTO GameTypeConfig(GameTypeId, AttributeName) VALUES (1, 'SolidScratchCount'), (1, 'StripeScratchCount'), (1, 'WinningColor'), (1, 'SolidPocketStreak'), (1, 'StripePocketStreak');

INSERT INTO GameSet(GameTypeID, GameSetName, StartDt) VALUES (1, 'Ethan and Alex Pool Round 1', CURRENT_TIMESTAMP);

INSERT INTO Game(GameTypeId, GameSetId, GameName, StartDt) VALUES (1, 1, 'Ethan and Alex Pool Game 1', CURRENT_TIMESTAMP);

INSERT INTO GameAttribute(GameId, AttributeName, AttributeValue) VALUES (1, 'SolidScratchCount', '3'), (1, 'StripeScratchCount', '1'), (1, 'WinningColor', 'Solids');

INSERT INTO User(UserName, Email, Nickname) VALUES ('Ethan DuBois', 'dubois90@gmail.com', 'slappony94'), ('Alex Katz', 'alexanderikatz@gmail.com', 'mrdawglecakez31');

INSERT INTO Game_User_Join(GameId, UserId, Score, Rank) VALUES (1, 1, 1, 1), (1, 2, 0, 2);

INSERT INTO UserHighScore(UserId, GameTypeId, HighScore) VALUES (1, 1, 1), (2, 1, 0);

-- Test queries

SELECT g.GameId, gs.GameSetName, g.GameName, gt.GameTypeName, p.UserName, p.Nickname, phs.HighScore, ga.AttributeName, ga.AttributeValue
FROM Game g
    INNER JOIN GameType gt
        ON g.GameTypeId = gt.GameTypeId
    INNER JOIN GameSet gs
        ON g.GameSetId = gs.GameSetId
    INNER JOIN Game_User_Join gpj
        ON g.GameId = gpj.GameId
    INNER JOIN User p 
        ON gpj.UserId = p.UserId
    INNER JOIN UserHighScore phs
        ON p.UserId = phs.UserId
            AND g.GameTypeId = phs.GameTypeId
    INNER JOIN GameTypeConfig gtc 
        ON gt.GameTypeId = gtc.GameTypeId 
    INNER JOIN GameAttribute ga 
        ON g.GameId = ga.GameId 
            AND gtc.AttributeName = ga.AttributeName