/* 

example: 


DO
  $$
DECLARE NewGameId INTEGER;
BEGIN
EXECUTE 'SELECT * FROM createNewGame(1, 1, ''Ethan and Alex Pool Game 2'' );' INTO NewGameId;
  
raise notice 'New game ID is %', NewGameId;
END $$

*/


CREATE OR REPLACE FUNCTION createNewGame(GameTypeId INT, GameSetId INT, GameName VARCHAR(128)) RETURNS INT AS $$
    DECLARE NewGameId INTEGER;
    BEGIN
    INSERT INTO Game (GameSetId, GameTypeId, GameName, StartDt) VALUES (GameTypeId, GameSetId, GameName) RETURNING GameId INTO NewGameId;
    RETURN NewGameId;
    END
    $$ LANGUAGE plpgsql;
