CREATE OR REPLACE FUNCTION ets.addUserToGame(GameID INT, UserId INT) RETURNS void AS $$
    BEGIN
    INSERT INTO Game_User_Join(GameId, UserId) VALUES (GameId, UserId);
    END
    $$ LANGUAGE plpgsql;
