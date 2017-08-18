-- INSERT mock data

INSERT INTO GameType(GameTypeId, GameTypeName) VALUES (1, 'Pool');

INSERT INTO GameTypeConfig(GameTypeId, AttributeName) VALUES (1, 'SolidScratchCount'), (1, 'StripeScratchCount'), (1, 'WinningColor'), (1, 'SolidPocketStreak'), (1, 'StripePocketStreak');

INSERT INTO GameSet(GameTypeID, GameSetName, StartDt) VALUES (1, 'Ethan and Alex Pool Round 1', CURRENT_TIMESTAMP);

INSERT INTO Game(GameTypeId, GameSetId, GameName, StartDt) VALUES (1, 1, 'Ethan and Alex Pool Game 1', CURRENT_TIMESTAMP);

INSERT INTO GameAttribute(GameId, AttributeName, AttributeValue) VALUES (1, 'SolidScratchCount', '3'), (1, 'StripeScratchCount', '1'), (1, 'WinningColor', 'Solids');

INSERT INTO User(UserName, Email, Nickname) VALUES ('Ethan DuBois', 'dubois90@gmail.com', 'slappony94'), ('Alex Katz', 'alexanderikatz@gmail.com', 'mrdawglecakez31');

INSERT INTO Game_User_Join(GameId, UserId, Score, Rank) VALUES (1, 1, 1, 1), (1, 2, 0, 2);

INSERT INTO UserHighScore(UserId, GameTypeId, HighScore) VALUES (1, 1, 1), (2, 1, 0);