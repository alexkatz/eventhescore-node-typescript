/* Example for how to use: 

select * from loginUser('ethan.dubois@outlook.com', 'Ethan', 'DuBois', 'asdfasdfpoj.com/imageurl', 'Facebook');

*/


CREATE OR REPLACE FUNCTION loginUser(NewEmail VARCHAR(500), NewFirstName VARCHAR(128), NewLastName VARCHAR(128), NewImageUrl VARCHAR(500), NewAuthPlatform VARCHAR(128)) RETURNS INT AS $$
    DECLARE CurrentUserId INTEGER = -1;
    BEGIN
        SELECT userId INTO CurrentUserId FROM ets.User WHERE Email = NewEmail;
        --RAISE NOTICE 'CurrentUserId: %', CurrentUserId;
        IF CurrentUserId IS NULL
        THEN
            SELECT * INTO CurrentUserId FROM createNewUser(NewEmail, NewFirstName, NewLastName, NewImageUrl, NewAuthPlatform);
        END IF;
        RETURN CurrentUserId;
    END
    $$ LANGUAGE plpgsql;