create table greet (
	id serial not null primary key,
    name text not null,
	counter int not null default 0
);
