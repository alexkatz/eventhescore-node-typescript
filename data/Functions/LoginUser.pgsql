/* Example for how to use: 

select * from loginUser('ethan.dubois@outlook.com', 'Ethan', 'DuBois', 'asdfasdfpoj.com/imageurl', 'Facebook');

*/


CREATE OR REPLACE FUNCTION ets.loginUser(NewEmail VARCHAR(500), NewUserName VARCHAR(128), NewFirstName VARCHAR(128), NewLastName VARCHAR(128), NewImageUrl VARCHAR(500), NewAuthPlatform VARCHAR(128)) RETURNS SETOF ets.User AS $$
    DECLARE CurrentUser ets.User%rowtype;
    DECLARE CurrentUserId INTEGER = -1;
    BEGIN
        SELECT userId INTO CurrentUserId FROM ets.User WHERE Email = NewEmail;
        --RAISE NOTICE 'CurrentUserId: %', CurrentUserId;
        IF CurrentUserId IS NULL
        THEN
            SELECT * INTO CurrentUserId FROM createNewUser(NewEmail, NewUserName, NewFirstName, NewLastName, NewImageUrl, NewAuthPlatform);
        END IF;
        SELECT * INTO CurrentUser FROM ets.User WHERE UserId = CurrentUserID;
        RETURN NEXT CurrentUser;
    END
    $$ LANGUAGE plpgsql;