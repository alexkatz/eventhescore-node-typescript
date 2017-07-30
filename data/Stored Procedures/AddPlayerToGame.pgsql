/* 



*/


CREATE OR REPLACE FUNCTION createNewGame(GameID INT, PlayerId INT RETURNS void AS $$
    BEGIN
    INSERT INTO Game_Player_Join(GameId, PlayerId) VALUES (GameId, PlayerId);
    END
    $$ LANGUAGE plpgsql;
