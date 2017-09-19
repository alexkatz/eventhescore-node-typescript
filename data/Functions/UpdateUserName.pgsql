CREATE OR REPLACE FUNCTION ets.updateUserName(CurrentUserId INT, NewUserName VARCHAR(128)) RETURNS SETOF ets.User AS $$
    DECLARE CurrentUser ets.User%rowtype;
    BEGIN
        UPDATE ets.User SET UserName = NewUserName WHERE UserId = CurrentUserId;
        SELECT * INTO CurrentUser FROM ets.User WHERE UserID = CurrentUserId;
        RETURN NEXT CurrentUser;
    END
    $$ LANGUAGE plpgsql;