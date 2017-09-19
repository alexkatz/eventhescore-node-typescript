CREATE FUNCTION ets.testprocedure() RETURNS TABLE(name character varying) AS $$            
  SELECT GameName FROM ets.Game;        
$$ LANGUAGE sql;