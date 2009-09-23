CREATE OR REPLACE FUNCTION assign_users_to_vgr_group() RETURNS refcursor AS $$
DECLARE
    ref refcursor;
    uid integer;

--vgr group id: 7764636
BEGIN
	OPEN ref FOR SELECT userid FROM user_;
	LOOP
		FETCH ref INTO uid;
			IF  NOT FOUND THEN
			EXIT;  -- exit loop
			END IF;
			insert into users_groups values (uid, 7764636);
	END LOOP;
	RETURN uid;
END;
$$ LANGUAGE plpgsql;

SELECT assign_users_to_vgr_group();
