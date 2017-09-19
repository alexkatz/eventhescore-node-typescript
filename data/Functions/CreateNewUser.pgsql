<<<<<<< HEAD
CREATE OR REPLACE FUNCTION ets.createNewUser(Email VARCHAR(500), FirstName VARCHAR(128), LastName VARCHAR(128), ImageUrl VARCHAR(500), authPlatform VARCHAR(128)) RETURNS INT AS $$
=======
CREATE OR REPLACE FUNCTION createNewUser(Email VARCHAR(500), UserName VARCHAR(128), FirstName VARCHAR(128), LastName VARCHAR(128), ImageUrl VARCHAR(500), authPlatform VARCHAR(128)) RETURNS INT AS $$
>>>>>>> d48148ed4b5584476f78efe16ff74c44c395ee94
    DECLARE NewUserId INTEGER;
    BEGIN
    INSERT INTO ets.User (Email, UserName, FirstName, LastName, ImageUrl, authPlatform) VALUES (Email, UserName, FirstName, LastName, ImageUrl, authPlatform) RETURNING UserId INTO NewUserId;
    RETURN NewUserId;
    END
    $$ LANGUAGE plpgsql;