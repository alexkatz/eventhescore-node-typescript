CREATE FUNCTION dbo.testprocedure() RETURNS TABLE(name character varying) AS $$            
  SELECT GameName FROM dbo.Game;        
$$ LANGUAGE sql;