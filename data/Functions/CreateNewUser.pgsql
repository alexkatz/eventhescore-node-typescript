CREATE OR REPLACE FUNCTION ets.createNewUser(Email VARCHAR(500), FirstName VARCHAR(128), LastName VARCHAR(128), ImageUrl VARCHAR(500), authPlatform VARCHAR(128)) RETURNS INT AS $$
    DECLARE NewUserId INTEGER;
    BEGIN
    INSERT INTO ets.User (Email, FirstName, LastName, ImageUrl, authPlatform) VALUES (Email, FirstName, LastName, ImageUrl, authPlatform) RETURNING UserId INTO NewUserId;
    RETURN NewUserId;
    ENDÏ
    $$ LANGUAGE plpgsql;