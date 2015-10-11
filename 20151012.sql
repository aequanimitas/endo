/* create db first endo_db */

CREATE SEQUENCE endo_item_id_seq;

CREATE TABLE endo_items (
  name varchar(255),
  id smallint NOT NULL DEFAULT nextval('endo_item_id_seq'),
  manu_date date,
  exp_date date);

ALTER SEQUENCE endo_item_id_seq OWNED BY endo_items.id;
