CREATE OR REPLACE FUNCTION update_default_user_theme() RETURNS trigger AS $$
BEGIN
     --RAISE NOTICE 'NEW.layoutsetid is currently %', NEW.layoutsetid;
     UPDATE layoutset set themeid = 'vgrtheme_WAR_vgrtheme' WHERE layoutsetid = NEW.layoutsetid;
     --RAISE NOTICE 'NEW.themeid is currently %', NEW.themeid;
     --NEW.themeid := 'vgrtheme_WAR_vgrtheme';
     RETURN NEW;
END
$$ LANGUAGE plpgsql;

--Drop existing trigger
DROP TRIGGER update_default_user_theme ON layoutset;

--Add trigger
CREATE TRIGGER update_default_user_theme AFTER INSERT ON layoutset
  FOR EACH ROW EXECUTE PROCEDURE update_default_user_theme();