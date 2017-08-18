/* 



*/


CREATE OR REPLACE FUNCTION dbo.createNewGame(GameID INT, UserId INT) RETURNS void AS $$
    BEGIN
    INSERT INTO Game_User_Join(GameId, UserId) VALUES (GameId, UserId);
    END
    $$ LANGUAGE plpgsql;
