INSERT INTO department(name)
VALUES
  ('HR'),
  ('Engineering'),
  ('Sales');

INSERT INTO role(title, salary, department_id)
VALUES
  ('Manager', 80000, 1),
  ('Engineer', 75000, 2),
  ('Sales Rep', 45000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Smith', 1, NULL),
  ('Shirley', 'Gates', 2, 1),
  ('Harry', 'Nottingham', 3, 1);

