--DROP SCHEMA eta;

--CREATE SCHEMA ets;

SET search_path TO ets;

-- Drop statements to reset db --

 DROP TABLE game;
 DROP TABLE gameSet;
 DROP TABLE gameType;
 DROP TABLE gameTypeConfig;
 DROP TABLE gameAttribute;
 DROP TABLE ets.User;
 DROP TABLE game_User_Join;
 DROP TABLE UserHighScore;



-- Create base tables

CREATE TABLE game (gameId SERIAL, gameTypeId INT NOT NULL, gameSetId INT, gameName VARCHAR(128), StartDt TIMESTAMP WITH TIME ZONE NOT NULL, EndDt TIMESTAMP WITH TIME ZONE);
CREATE TABLE gameSet (gameSetId SERIAL, gameTypeId INT NOT NULL, gameSetName VARCHAR(128), StartDt TIMESTAMP WITH TIME ZONE NOT NULL, EndDt TIMESTAMP WITH TIME ZONE);
CREATE TABLE gameType (gameTypeId int NOT NULL, gameTypeName VARCHAR(128), CONSTRAINT PK_gameType_gameTypeId PRIMARY KEY (gameTypeId));
CREATE TABLE gameTypeConfig (gameTypeId int NOT NULL, AttributeName VARCHAR(128) NOT NULL, CONSTRAINT PK_gameTypeConfig_gameTypeId_AttributeName PRIMARY KEY (gameTypeId, AttributeName));
CREATE TABLE gameAttribute (gameId int NOT NULL, AttributeName VARCHAR(128) NOT NULL, AttributeValue VARCHAR(500), CONSTRAINT PK_gameAttribute_gameId_AttributeName PRIMARY KEY (gameId, AttributeName));
CREATE TABLE ets.User (UserId SERIAL, UserName VARCHAR(128) NOT NULL, Email VARCHAR(128) NOT NULL, ProfilePicUrl VARCHAR(500), Nickname VARCHAR(128), CONSTRAINT UK_User_Email UNIQUE (Email));
CREATE TABLE game_User_Join (gameId int NOT NULL, UserId int NOT NULL, Score float, Rank int, CONSTRAINT PK_game_User_Join_gameId_UserId PRIMARY KEY (gameId, UserId));
CREATE TABLE userHighScore (UserId int NOT NULL, gameTypeId int NOT NULL, HighScore float, CONSTRAINT PK_UserHighScore_UserId_gameTypeId PRIMARY KEY (UserId, gameTypeId));

-- INSERT mock data

INSERT INTO gameType(gameTypeId, gameTypeName) VALUES (1, 'Pool');

INSERT INTO gameTypeConfig(gameTypeId, AttributeName) VALUES (1, 'SolidScratchCount'), (1, 'StripeScratchCount'), (1, 'WinningColor'), (1, 'SolidPocketStreak'), (1, 'StripePocketStreak');

INSERT INTO gameSet(gameTypeID, gameSetName, StartDt) VALUES (1, 'Ethan and Alex Pool Round 1', CURRENT_TIMESTAMP);

INSERT INTO game(gameTypeId, gameSetId, gameName, StartDt) VALUES (1, 1, 'Ethan and Alex Pool game 1', CURRENT_TIMESTAMP);

INSERT INTO gameAttribute(gameId, AttributeName, AttributeValue) VALUES (1, 'SolidScratchCount', '3'), (1, 'StripeScratchCount', '1'), (1, 'WinningColor', 'Solids');

INSERT INTO ets.User(UserName, Email, Nickname) VALUES ('Ethan DuBois', 'dubois90@gmail.com', 'slappony94'), ('Alex Katz', 'alexanderikatz@gmail.com', 'mrdawglecakez31');

INSERT INTO game_User_Join(gameId, UserId, Score, Rank) VALUES (1, 1, 1, 1), (1, 2, 0, 2);

INSERT INTO UserHighScore(UserId, gameTypeId, HighScore) VALUES (1, 1, 1), (2, 1, 0);

-- Test queries

SELECT g.gameId, gs.gameSetName, g.gameName, gt.gameTypeName, p.UserName, p.Nickname, phs.HighScore, ga.AttributeName, ga.AttributeValue
FROM game g
    INNER JOIN gameType gt
        ON g.gameTypeId = gt.gameTypeId
    INNER JOIN gameSet gs
        ON g.gameSetId = gs.gameSetId
    INNER JOIN game_User_Join gpj
        ON g.gameId = gpj.gameId
    INNER JOIN ets.User p 
        ON gpj.UserId = p.UserId
    INNER JOIN UserHighScore phs
        ON p.UserId = phs.UserId
            AND g.gameTypeId = phs.gameTypeId
    INNER JOIN gameTypeConfig gtc 
        ON gt.gameTypeId = gtc.gameTypeId 
    INNER JOIN gameAttribute ga 
        ON g.gameId = ga.gameId 
            AND gtc.AttributeName = ga.AttributeName