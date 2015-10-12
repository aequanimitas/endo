/* create db first endo_db */

CREATE TABLE endo_items (
  id SERIAL,
  name varchar(255),
  manu_date date,
  exp_date DATE NOT NULL);
