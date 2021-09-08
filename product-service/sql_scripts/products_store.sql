create extension if not exists "uuid-ossp";

drop table if exists stocks;
drop table if exists products;

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer,
	image_url text not null
);

insert
	into
	products (title,
	description,
	price,
	image_url)
values 
	('Sand Crawler',
'Digger Crawler',
150000,
'https://starwars-visualguide.com/assets/img/vehicles/4.jpg'),
  ('T-16 skyhopper',
'T-16 skyhopper',
14500,
'https://starwars-visualguide.com/assets/img/vehicles/6.jpg'),
('X-34 landspeeder',
'X-34 landspeeder',
10550,
'https://starwars-visualguide.com/assets/img/vehicles/7.jpg'),
('TIE/LN starfighter',
'Twin Ion Engine/Ln Starfighter',
7680,
'https://starwars-visualguide.com/assets/img/vehicles/8.jpg'),
('Snowspeeder',
't-47 airspeeder',
2925,
'https://starwars-visualguide.com/assets/img/vehicles/14.jpg'),
('TIE bomber',
'TIE/sa bomber',
6630,
'https://starwars-visualguide.com/assets/img/vehicles/16.jpg'),
('AT-AT',
'All Terrain Armored Transport',
1200,
'https://starwars-visualguide.com/assets/img/vehicles/18.jpg'),
('AT-ST',
'All Terrain Scout Transport',
180,
'https://starwars-visualguide.com/assets/img/vehicles/19.jpg'),
('Storm IV Twin-Pod cloud car',
'Storm IV Twin-Pod',
75000,
'https://starwars-visualguide.com/assets/img/vehicles/20.jpg'),
('Sail barge',
'Modified Luxury Sail Barge',
285000,
'https://starwars-visualguide.com/assets/img/vehicles/24.jpg');

create table stocks (
	id uuid primary key default uuid_generate_v4(),
	product_id uuid references products (id) unique,
	"count" integer
);

insert into stocks ("product_id", "count") select id, floor(random() * 10 + 1)::int from products;

select p.id, p.title, p.description, p.price, p.image_url, s.count from products p join stocks s on p.id = s.product_id;
