CREATE OR REPLACE FUNCTION userNameExists(NewUserName VARCHAR(128)) RETURNS boolean AS $$
    DECLARE userNameExists boolean = false;
    BEGIN
    IF EXISTS (SELECT 1 FROM ets.User WHERE UserName = NewUserName) THEN
    userNameExists = true;
    END IF;
    RETURN userNameExists;
    END
    $$ LANGUAGE plpgsql;