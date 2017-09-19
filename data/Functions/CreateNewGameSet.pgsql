/* 

example: 


DO
  $$
DECLARE NewGameSetId INTEGER;
BEGIN
EXECUTE 'SELECT * FROM createNewGame(1, 1, ''Ethan and Alex Pool Game 2'' );' INTO NewGameId;
  
raise notice 'New game ID is %', NewGameId;
END $$

*/


CREATE OR REPLACE FUNCTION ets.createNewGameSet(GameTypeId INT) RETURNS INT AS $$
    DECLARE NewGameSetId INTEGER;
    BEGIN
    INSERT INTO GameSet (GameTypeId, GameSetName, StartDt) VALUES (GameTypeId, GameSetId, GameName) RETURNING GameId INTO [STRICT] NewGameId;
    END
    $$ LANGUAGE plpgsql;
