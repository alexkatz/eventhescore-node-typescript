-- INSERT mock data

INSERT INTO gameType(gameTypeId, gameTypeName) VALUES (1, 'Pool');

INSERT INTO gameTypeConfig(gameTypeId, AttributeName) VALUES (1, 'SolidScratchCount'), (1, 'StripeScratchCount'), (1, 'WinningColor'), (1, 'SolidPocketStreak'), (1, 'StripePocketStreak');

INSERT INTO gameSet(gameTypeID, gameSetName, StartDt) VALUES (1, 'Ethan and Alex Pool Round 1', CURRENT_TIMESTAMP);

INSERT INTO game(gameTypeId, gameSetId, gameName, StartDt) VALUES (1, 1, 'Ethan and Alex Pool game 1', CURRENT_TIMESTAMP);

INSERT INTO gameAttribute(gameId, AttributeName, AttributeValue) VALUES (1, 'SolidScratchCount', '3'), (1, 'StripeScratchCount', '1'), (1, 'WinningColor', 'Solids');

INSERT INTO ets.user(Email, FirstName, LastName, Nickname) VALUES ('dubois90@gmail.com', 'Ethan', 'DuBois', 'slappony94'), ('alexanderikatz@gmail.com', 'Alex', 'Katz', 'mrdawglecakez31');

INSERT INTO game_user_Join(gameId, userId, Score, Rank) VALUES (1, 1, 1, 1), (1, 2, 0, 2);

INSERT INTO userHighScore(userId, gameTypeId, HighScore) VALUES (1, 1, 1), (2, 1, 0);