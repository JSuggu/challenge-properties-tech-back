INSERT INTO public.role(
	name)
	VALUES ('ADMIN');
	
INSERT INTO public.role(
	name)
	VALUES ('CLIENT');

INSERT INTO public.address(
	country, state, city, street, "number", "zipCode")
	VALUES ('', '', '', '', 1234, '');

INSERT INTO public.person(
	name, lastname, dni, "addressId")
	VALUES ('', '', '', 1);

INSERT INTO public."user"(
	email, password, "accountLocked", "deleteAt", "roleId", "personId")
	VALUES ('admin@gmail.com', 'admin1234', false, null, 1, 1);