-- DROP OLD SHIT

DROP FUNCTION IF EXISTS ets.createNewGame(GameTypeId INT, GameSetId INT, GameName VARCHAR(128));
DROP FUNCTION IF EXISTS ets.createNewGameSet(GameTypeId INT);
DROP FUNCTION IF EXISTS ets.createNewUser(Email VARCHAR(500), FirstName VARCHAR(128), LastName VARCHAR(128), ImageUrl VARCHAR(500), authPlatform VARCHAR(128));
DROP FUNCTION IF EXISTS ets.loginUser(NewEmail VARCHAR(500), NewUserName VARCHAR(128), NewFirstName VARCHAR(128), NewLastName VARCHAR(128), NewImageUrl VARCHAR(500), NewAuthPlatform VARCHAR(128));
DROP FUNCTION IF EXISTS ets.userNameExists(UserName VARCHAR(128));
DROP FUNCTION IF EXISTS ets.updateUserName(CurrentUserId INT, NewUserName VARCHAR(128));
DROP FUNCTION IF EXISTS ets.addUserToGame(GameID INT, UserId INT);

DROP TABLE IF EXISTS ets.gameAttribute CASCADE;
DROP TABLE IF EXISTS ets.UserHighScore CASCADE;
DROP TABLE IF EXISTS ets.game_User_Join CASCADE;
DROP TABLE IF EXISTS ets.User CASCADE;
DROP TABLE IF EXISTS ets.gameSet CASCADE;
DROP TABLE IF EXISTS ets.gameType CASCADE;
DROP TABLE IF EXISTS ets.gameTypeConfig CASCADE;
DROP TABLE IF EXISTS ets.game CASCADE;

DROP SCHEMA IF EXISTS ets;

-- CREATE SCHEMA

CREATE SCHEMA ets;
SET search_path TO ets;

-- CREATE TABLES

CREATE TABLE ets.Game_User_Join (GameId int NOT NULL, UserId int NOT NULL, Score float, Rank int, CONSTRAINT PK_Game_User_Join_GameId_UserId PRIMARY KEY (GameId, UserId));
CREATE TABLE ets.Game (GameId SERIAL, GameTypeId INT NOT NULL, GameSetId INT NOT NULL, GameName VARCHAR(128), StartDt TIMESTAMP WITH TIME ZONE NOT NULL, EndDt TIMESTAMP WITH TIME ZONE);
CREATE TABLE ets.GameAttribute (GameId int NOT NULL, AttributeName VARCHAR(128) NOT NULL, AttributeValue VARCHAR(500), CONSTRAINT PK_GameAttribute_GameId_AttributeName PRIMARY KEY (GameId, AttributeName));
CREATE TABLE ets.GameSet (GameSetId SERIAL, GameTypeId INT NOT NULL, GameSetName VARCHAR(128), StartDt TIMESTAMP WITH TIME ZONE NOT NULL, EndDt TIMESTAMP WITH TIME ZONE);
CREATE TABLE ets.GameType (GameTypeId int NOT NULL, GameTypeName VARCHAR(128), CONSTRAINT PK_GameType_GameTypeId PRIMARY KEY (GameTypeId));
CREATE TABLE ets.GameTypeConfig (GameTypeId int NOT NULL, AttributeName VARCHAR(128) NOT NULL, CONSTRAINT PK_GameTypeConfig_GameTypeId_AttributeName PRIMARY KEY (GameTypeId, AttributeName));
CREATE TABLE ets.User (UserId SERIAL, Email VARCHAR(128) NOT NULL, UserName VARCHAR(128), FirstName VARCHAR(128), LastName VARCHAR(128), ImageUrl VARCHAR(500), Nickname VARCHAR(128), AuthPlatform VARCHAR(128), CONSTRAINT UK_User_Email UNIQUE (Email));
CREATE TABLE ets.UserHighScore (UserId int NOT NULL, GameTypeId int NOT NULL, HighScore float, CONSTRAINT PK_UserHighScore_UserId_GameTypeId PRIMARY KEY (UserId, GameTypeId));


-- CREATE FUNCTIONS

CREATE OR REPLACE FUNCTION ets.addUserToGame(GameID INT, UserId INT) RETURNS void AS $$
    BEGIN
        INSERT INTO Game_User_Join(GameId, UserId) VALUES (GameId, UserId);
    END
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ets.createNewGame(GameTypeId INT, GameSetId INT, GameName VARCHAR(128)) RETURNS INT AS $$
    DECLARE NewGameId INTEGER;
    BEGIN
        INSERT INTO Game (GameSetId, GameTypeId, GameName, StartDt) VALUES (GameTypeId, GameSetId, GameName) RETURNING GameId INTO NewGameId;
        RETURN NewGameId;
    END
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ets.createNewGameSet(GameTypeId INT) RETURNS INT AS $$
    DECLARE NewGameSetId INTEGER;
    BEGIN
    INSERT INTO GameSet (GameTypeId, GameSetName, StartDt) VALUES (GameTypeId, GameSetId, GameName) RETURNING GameSetId INTO NewGameSetId;
    END
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ets.createNewUser(Email VARCHAR(500), FirstName VARCHAR(128), LastName VARCHAR(128), ImageUrl VARCHAR(500), authPlatform VARCHAR(128)) RETURNS INT AS $$
    DECLARE NewUserId INTEGER;
    BEGIN
        INSERT INTO ets.User (Email, FirstName, LastName, ImageUrl, authPlatform) VALUES (Email, FirstName, LastName, ImageUrl, authPlatform) RETURNING UserId INTO NewUserId;
        RETURN NewUserId;
    END
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ets.loginUser(NewEmail VARCHAR(500), NewUserName VARCHAR(128), NewFirstName VARCHAR(128), NewLastName VARCHAR(128), NewImageUrl VARCHAR(500), NewAuthPlatform VARCHAR(128)) RETURNS SETOF ets.User AS $$
    DECLARE CurrentUser ets.User%rowtype;
    DECLARE CurrentUserId INTEGER = -1;
    BEGIN
        SELECT userId INTO CurrentUserId FROM ets.User WHERE Email = NewEmail;
        --RAISE NOTICE 'CurrentUserId: %', CurrentUserId;
        IF CurrentUserId IS NULL
        THEN
            SELECT * INTO CurrentUserId FROM createNewUser(NewEmail, NewUserName, NewFirstName, NewLastName, NewImageUrl, NewAuthPlatform);
        END IF;
        SELECT * INTO CurrentUser FROM ets.User WHERE UserId = CurrentUserID;
        RETURN NEXT CurrentUser;
    END
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ets.updateUserName(CurrentUserId INT, NewUserName VARCHAR(128)) RETURNS SETOF ets.User AS $$
    DECLARE CurrentUser ets.User%rowtype;
    BEGIN
        UPDATE ets.User SET UserName = NewUserName WHERE UserId = CurrentUserId;
        SELECT * INTO CurrentUser FROM ets.User WHERE UserID = CurrentUserId;
        RETURN NEXT CurrentUser;
    END
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ets.userNameExists(NewUserName VARCHAR(128)) RETURNS boolean AS $$
DECLARE userNameExists boolean = false;
BEGIN
    IF EXISTS (SELECT 1 FROM ets.User WHERE UserName = NewUserName) THEN
    userNameExists = true;
    END IF;
    RETURN userNameExists;
END
$$ LANGUAGE plpgsql;
