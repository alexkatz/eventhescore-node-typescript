CREATE OR REPLACE FUNCTION testProcedure()) RETURNS VARCHAR(128) AS $$
    SELECT 'Hello, world!'
    END
    $$ LANGUAGE plpgsql;